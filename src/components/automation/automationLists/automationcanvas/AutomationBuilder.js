import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";
import "./automation.css";
import { FilterNode, TriggerNode, ActionNode } from "./nodes";
import apis, { getAsl } from "./services/";

const onNodeMouseEnter = (event, node) => {};
const onNodeMouseMove = (event, node) => {};
const onNodeMouseLeave = (event, node) => {};
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
};

const edgeType = "smoothstep";
const initBgColor = "#1A192B";

let nodeId = localStorage.getItem("nodeId")
  ? JSON.parse(localStorage.getItem("nodeId"))
  : 0;
let edgeId = localStorage.getItem("edgeId")
  ? JSON.parse(localStorage.getItem("edgeId"))
  : 0;
const getNodeId = (type) => type + `-${nodeId++}`;
const getEdgeId = () => `edge-${edgeId++}`;
const nodeTypes = {
  trigger: TriggerNode,
  filter: FilterNode,
  action: ActionNode,
};
const AutomationBuilder = () => {
  let iniElements = localStorage.getItem("element")
    ? JSON.parse(localStorage.getItem("element"))
    : [];
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(iniElements);
  const [bgColor] = useState(initBgColor);
  const onConnect = (params) => {
    let validate = getConnectionDetails(params.source, params.target);
    if (validate) {
      setElements((els) =>
        addEdge(
          { ...params, id: getEdgeId(), type: edgeType, animated: true },
          els
        )
      );
      const updatedElem = [...elements];
      updatedElem.forEach((el) => {
        if (params.source === el.id) {
          el.data.nodes.next = [...el.data.nodes.next, params.target];
        }
        if (params.target === el.id) {
          el.data.nodes.previous = params.source;
        }
      });
    } else {
      let id = getEdgeId();
      setElements((els) =>
        addEdge(
          { ...params, id: id, type: "smoothstep", style: { stroke: "red" } },
          els
        )
      );
      setTimeout(() => {
        setElements((els) =>
          removeElements(
            [
              {
                ...params,
                id: id,
                type: "smoothstep",
                style: { stroke: "red" },
              },
            ],
            els
          )
        );
      }, 500);
    }
  };
  const onElementsRemove = (elementsToRemove) => {
    if (elementsToRemove.length) {
      if (
        elementsToRemove[0].data.nodes.previous === "" ||
        elementsToRemove[0].data.nodes.next.length === 0
      ) {
        setElements((els) => removeElements(elementsToRemove, els));
        return;
      }
      const nextElemArr = elementsToRemove[0].data.nodes.next;
      const currentID = elementsToRemove[0].id;
      const updatedElem = [...elements];
      const getElementObject = (id) => {
        return elements.filter((el) => el.id === id)[0];
      };
      const previousElem = getElementObject(
        elementsToRemove[0].data.nodes.previous
      );
      previousElem.data.nodes.next = previousElem.data.nodes.next.filter(
        (e) => e !== currentID.toString()
      );
      updatedElem.forEach((el) => {
        if (el.id === previousElem.id) {
          el = previousElem;
        }
      });

      if (nextElemArr.length) {
        nextElemArr.forEach((el) => {
          updatedElem.forEach((e) => {
            if (e.id === el) {
              e.data.nodes.previous = "";
            }
          });
        });
      }
      setTimeout(() => {
        setElements((els) => removeElements(elementsToRemove, updatedElem));
      });
    }
  };

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const onNodeDragStop = (event, node) => {
    event.preventDefault();
    setElements((elms) =>
      elms.map((el) => {
        if (el.id === node.id) {
          el.position.x = node.position.x;
          el.position.y = node.position.y;
        }
        return { ...el };
      })
    );
  };

  const resetAutomation = () => {
    localStorage.removeItem("element");
    localStorage.removeItem("nodeId");
    localStorage.removeItem("edgeId");
    setElements((els) => removeElements(elements, els));
  };

  const getBlueprintDetails = async () => {
    const bluePrintElem = elements.filter(
      (el) => typeof el.source == "undefined"
    );
    const brokenElem = bluePrintElem.find((el) => {
      if (
        (el.type !== "trigger" && el.data.nodes.previous == "") ||
        (el.type === "trigger" && el.data.nodes.next.length == 0)
      ) {
        return el;
      }
    });
    if (typeof brokenElem == "undefined") {
      console.log(bluePrintElem);
      localStorage.removeItem("element");
      localStorage.removeItem("nodeId");
      localStorage.removeItem("edgeId");
      setTimeout(() => {
        localStorage.setItem("element", JSON.stringify(elements));
        localStorage.setItem("nodeId", JSON.stringify(nodeId));
        localStorage.setItem("edgeId", JSON.stringify(edgeId));
      }, 500);
    } else {
      alert("You have broken element. Make sure to connect all the nodes");
    }

    /* ================================== ASL Genaration Start ================================== */
    let payload = { element: elements };
    console.log("api started");
    await apis.getAsl(JSON.stringify(payload)).then((res) => {
      if (res.data.success) {
        console.log("api success");
        console.log(res.data.asl);
      } else {
        console.log("api error ! " + res.data.message);
      }
    });

    /* ================================== ASL Genaration End ================================== */
  };

  const onDrop = (event) => {
    event.preventDefault();
    const types = {
      trigger: "Trigger",
      action: "Action",
      filter: "Filter",
    };
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getNodeId(type),
      type,
      position,
      data: { label: `${types[type]}`, nodes: { next: [], previous: "" } },
    };
    setElements((es) => es.concat(newNode));
  };
  const getConnectionDetails = (source, target) => {
    const sourcePosition = source.indexOf("-");
    const sourceType = source.substring(0, sourcePosition);
    const targetPosition = target.indexOf("-");
    const targetType = target.substring(0, targetPosition);
    let returnType = false;
    let connectedTrigger = false;
    let connectedAction = false;
    let connectedFilter = false;
    let duplicateConnection = false;
    let parallelFilter = false;
    let activeConnection = false;
    const updatedElem = [...elements];
    updatedElem.forEach((el) => {
      if (source === el.source && target === el.target) {
        duplicateConnection = true;
      }
      if (source === el.target && target === el.source) {
        duplicateConnection = true;
      }
      if (targetType === "action" || targetType === "filter") {
        if (sourceType !== "trigger") {
          if (target === el.source || target === el.target) {
            activeConnection = true;
          }
        }
      }
      if (el.source === source) {
        const matchedTarget = el.target;
        const matchedTargetPosition = matchedTarget.indexOf("-");
        const matchedTargetType = matchedTarget.substring(
          0,
          matchedTargetPosition
        );
        if (matchedTargetType !== targetType) {
          parallelFilter = true;
        }
      }
      if (source === el.source) {
        const oldPosition = el.target.indexOf("-");
        const oldConnection = el.target.substring(0, oldPosition);
        switch (oldConnection) {
          case "trigger":
            connectedTrigger = true;
            break;
          case "action":
            connectedAction = true;
            break;
          case "filter":
            connectedFilter = true;
            break;
          default:
            connectedFilter = false;
            connectedTrigger = false;
            connectedAction = false;
            break;
        }
      }
    });
    if (duplicateConnection || activeConnection || parallelFilter) {
      returnType = false;
    } else {
      switch (sourceType) {
        case "trigger":
          switch (targetType) {
            case "trigger":
              returnType = false;
              break;
            case "action":
              if (connectedAction) {
                returnType = false;
              } else {
                returnType = true;
              }
              break;
            case "filter":
              returnType = true;
              break;
            default:
              returnType = false;
              break;
          }
          break;
        case "action":
          switch (targetType) {
            case "trigger":
              returnType = false;
              break;
            case "action":
              if (connectedAction) {
                returnType = false;
              } else {
                returnType = true;
              }
              break;
            case "filter":
              returnType = true;
              break;
            default:
              returnType = false;
              break;
          }
          break;
        case "filter":
          switch (targetType) {
            case "trigger":
              returnType = true;
              break;
            case "action":
              if (connectedAction) {
                returnType = false;
              } else {
                returnType = true;
              }
              break;
            case "filter":
              returnType = false;
              break;
            default:
              returnType = false;
              break;
          }
          break;
        default:
          returnType = false;
          break;
      }
    }

    return returnType;
  };
  return (
    <div className="automationDnD">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            selectNodesOnDrag={false}
            connectionLineType={edgeType}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseMove={onNodeMouseMove}
            onNodeMouseLeave={onNodeMouseLeave}
            onNodeContextMenu={onNodeContextMenu}
            style={{ background: bgColor }}
            onNodeDragStop={onNodeDragStop}
          >
            <Controls />
          </ReactFlow>
          <div className="buttonArea">
            <button type="button" className="button" onClick={resetAutomation}>
              Reset
            </button>
            <button
              type="button"
              className="button"
              onClick={getBlueprintDetails}
            >
              Save
            </button>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default AutomationBuilder;
