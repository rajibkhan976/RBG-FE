import React, {useState, useRef, useEffect} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";
import "./automation.css";
import { FilterNode, TriggerNode, ActionNode, ActionMessage } from "./nodes";
import {Filter} from "./modals/filter";
import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import resetIcon from "../../../../assets/images/resetIcon.svg";
import blueSettingIcon from "../../../../assets/images/blueSettingIcon.svg";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import Loader from "../../../shared/Loader";
import {AutomationServices} from "../../../../services/automation/AutomationServices";

const AutomationBuilder = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [idNode, setIdNode] = useState(0);
  const [idEdge, setIdEdge] = useState(0);
  const [elements, setElements] = useState([]);
  const [bgColor] = useState("#1A192B");
  const [automationModal, setAutomationModal] = useState(null);
  const [automationName, setAutomationName] = useState('');
  const [automationId, setAutomationId] = useState(0);
  const [automationNameError, setAutomationNameError] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [automationUrl, setAutomationUrl] = useState('');
  const [automationUrlId, setAutomationUrlId] = useState('');
  const [to, setTo] = useState('');
  const [toError, setToError] = useState(false);
  const [from, setFrom] = useState('');
  const [fromError, setFromError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [nId, setNId] = useState(false);
  const [webhookData, setWebhookData] = useState([]);
  const edgeType = "smoothstep";
  const nodeTypes = {
    trigger: TriggerNode,
    filter: FilterNode,
    action: ActionNode,
    actionMessage: ActionMessage
  };
  const onNodeMouseEnter = (event, node) => {
    const thisNodeTarget = event.target;
    const thisNodeType = node.data.label;
    if (
        document.querySelector(".btnEditNode") !== null &&
        document.querySelectorAll(".btnEditNode").length > -1
    ) {
      for (
          var i = 0;
          i < document.querySelectorAll(".btnEditNode").length;
          i++
      ) {
        document.querySelectorAll(".btnEditNode")[i].remove();
      }
    }

    if (
      document.querySelector(".btnDeleteNode") !== null &&
      document.querySelectorAll(".btnDeleteNode").length > -1
    ) {
      for (
        var i = 0;
        i < document.querySelectorAll(".btnDeleteNode").length;
        i++
      ) {
        document.querySelectorAll(".btnDeleteNode")[i].remove();
      }
    }

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    switch (thisNodeType) {
      case "Trigger":
        editButton.classList.add(
            "btn",
            "btnEditNode",
            thisNodeType.toLowerCase() + "-Editbtn"
        );
        editButton.style.cssText = `
          background:#fff;border:1px solid #434345;padding:3.5px;width:24px;height:24px;border-radius:50%;position:absolute;top:0;right:0;transition:all cubic-bezier(.215,.61,.355,1) .4s;-webkit-transition:all cubic-bezier(.215,.61,.355,1) .4s;-moz-transition:all cubic-bezier(.215,.61,.355,1) .4s;-ms-transition:all cubic-bezier(.215,.61,.355,1) .4s;-o-transition:all cubic-bezier(.215,.61,.355,1) .4s
        `;
        editButton.innerHTML =
            '<svg style="fill:#434345;-webkit-appearance:none;backface-visibility:hidden;-webkit-backface-visibility:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.377 14.378" className="automationCog"><g transform="translate(-7.826 -7.824)"><circle className="a" cx="1.239" cy="1.239" r="1.239" transform="translate(13.775 13.774)"/><path className="a" d="M21.911,13.785l-1.732-.325a5.346,5.346,0,0,0-.414-1l1-1.465a.372.372,0,0,0-.043-.456L19.489,9.3a.372.372,0,0,0-.456-.043l-1.465,1a5.359,5.359,0,0,0-1.033-.422l-.323-1.723a.373.373,0,0,0-.352-.292H14.112a.372.372,0,0,0-.352.292l-.326,1.74a5.341,5.341,0,0,0-.991.414L11,9.28a.372.372,0,0,0-.456.043L9.3,10.559a.372.372,0,0,0-.043.456l1,1.456a5.369,5.369,0,0,0-.408.991l-1.732.324a.373.373,0,0,0-.292.352v1.748a.373.373,0,0,0,.292.352l1.731.324a5.357,5.357,0,0,0,.417,1.011l-.985,1.44a.372.372,0,0,0,.043.456L10.558,20.7a.372.372,0,0,0,.456.043l1.439-.985a5.378,5.378,0,0,0,.981.409l.326,1.74a.373.373,0,0,0,.352.292H15.86a.373.373,0,0,0,.352-.292l.323-1.724a5.4,5.4,0,0,0,1.022-.417l1.458,1a.372.372,0,0,0,.456-.043l1.236-1.235a.372.372,0,0,0,.043-.456l-.992-1.449a5.357,5.357,0,0,0,.423-1.023l1.73-.324a.373.373,0,0,0,.292-.352V14.137A.373.373,0,0,0,21.911,13.785Zm-6.9,4.227a3,3,0,1,1,3-3A3,3,0,0,1,15.014,18.012Z" transform="translate(0)"/></g></svg>';

        editButton.addEventListener("click", (event) =>
            triggerEdit(event, node)
        );
        thisNodeTarget.closest(".react-flow__node").appendChild(editButton);

        deleteButton.classList.add(
          "btn",
          "btnDeleteNode",
          thisNodeType.toLowerCase() + "-Deletebtn"
        );
        deleteButton.addEventListener("click", (event) =>
            deleteNode(event, node)
        );
        thisNodeTarget.closest(".react-flow__node-trigger").appendChild(deleteButton);
        break;

      case "Filter":
        editButton.classList.add(
            "btn",
            "btnEditNode",
            thisNodeType.toLowerCase() + "-Editbtn"
        );
        editButton.style.cssText = `
          background:#fff;border:1px solid #434345;padding:3.5px;width:24px;height:24px;border-radius:50%;position:absolute;top:0;right:0;transition:all cubic-bezier(.215,.61,.355,1) .4s;-webkit-transition:all cubic-bezier(.215,.61,.355,1) .4s;-moz-transition:all cubic-bezier(.215,.61,.355,1) .4s;-ms-transition:all cubic-bezier(.215,.61,.355,1) .4s;-o-transition:all cubic-bezier(.215,.61,.355,1) .4s
        `;
        editButton.innerHTML =
            '<svg style="fill:#434345;-webkit-appearance:none;backface-visibility:hidden;-webkit-backface-visibility:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.377 14.378" className="automationCog"><g transform="translate(-7.826 -7.824)"><circle className="a" cx="1.239" cy="1.239" r="1.239" transform="translate(13.775 13.774)"/><path className="a" d="M21.911,13.785l-1.732-.325a5.346,5.346,0,0,0-.414-1l1-1.465a.372.372,0,0,0-.043-.456L19.489,9.3a.372.372,0,0,0-.456-.043l-1.465,1a5.359,5.359,0,0,0-1.033-.422l-.323-1.723a.373.373,0,0,0-.352-.292H14.112a.372.372,0,0,0-.352.292l-.326,1.74a5.341,5.341,0,0,0-.991.414L11,9.28a.372.372,0,0,0-.456.043L9.3,10.559a.372.372,0,0,0-.043.456l1,1.456a5.369,5.369,0,0,0-.408.991l-1.732.324a.373.373,0,0,0-.292.352v1.748a.373.373,0,0,0,.292.352l1.731.324a5.357,5.357,0,0,0,.417,1.011l-.985,1.44a.372.372,0,0,0,.043.456L10.558,20.7a.372.372,0,0,0,.456.043l1.439-.985a5.378,5.378,0,0,0,.981.409l.326,1.74a.373.373,0,0,0,.352.292H15.86a.373.373,0,0,0,.352-.292l.323-1.724a5.4,5.4,0,0,0,1.022-.417l1.458,1a.372.372,0,0,0,.456-.043l1.236-1.235a.372.372,0,0,0,.043-.456l-.992-1.449a5.357,5.357,0,0,0,.423-1.023l1.73-.324a.373.373,0,0,0,.292-.352V14.137A.373.373,0,0,0,21.911,13.785Zm-6.9,4.227a3,3,0,1,1,3-3A3,3,0,0,1,15.014,18.012Z" transform="translate(0)"/></g></svg>';

        editButton.addEventListener("click", (event) =>
            filterEdit(event, node)
        );
        thisNodeTarget.closest(".react-flow__node").appendChild(editButton);

        deleteButton.classList.add(
          "btn",
          "btnDeleteNode",
          thisNodeType.toLowerCase() + "-Deletebtn"
        );
        deleteButton.addEventListener("click", (event) =>
            deleteNode(event, node)
        );
        thisNodeTarget.closest(".react-flow__node-filter").appendChild(deleteButton);
        break;

      case "Action":
        editButton.classList.add(
            "btn",
            "btnEditNode",
            thisNodeType.toLowerCase() + "-Editbtn"
        );
        editButton.style.cssText = `
          background:#fff;border:1px solid #434345;padding:3.5px;width:24px;height:24px;border-radius:50%;position:absolute;top:-10px;right:-10px;transition:all cubic-bezier(.215,.61,.355,1) .4s;-webkit-transition:all cubic-bezier(.215,.61,.355,1) .4s;-moz-transition:all cubic-bezier(.215,.61,.355,1) .4s;-ms-transition:all cubic-bezier(.215,.61,.355,1) .4s;-o-transition:all cubic-bezier(.215,.61,.355,1) .4s
        `;
        editButton.innerHTML =
            '<svg style="fill:#434345;-webkit-appearance:none;backface-visibility:hidden;-webkit-backface-visibility:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.377 14.378" className="automationCog"><g transform="translate(-7.826 -7.824)"><circle className="a" cx="1.239" cy="1.239" r="1.239" transform="translate(13.775 13.774)"/><path className="a" d="M21.911,13.785l-1.732-.325a5.346,5.346,0,0,0-.414-1l1-1.465a.372.372,0,0,0-.043-.456L19.489,9.3a.372.372,0,0,0-.456-.043l-1.465,1a5.359,5.359,0,0,0-1.033-.422l-.323-1.723a.373.373,0,0,0-.352-.292H14.112a.372.372,0,0,0-.352.292l-.326,1.74a5.341,5.341,0,0,0-.991.414L11,9.28a.372.372,0,0,0-.456.043L9.3,10.559a.372.372,0,0,0-.043.456l1,1.456a5.369,5.369,0,0,0-.408.991l-1.732.324a.373.373,0,0,0-.292.352v1.748a.373.373,0,0,0,.292.352l1.731.324a5.357,5.357,0,0,0,.417,1.011l-.985,1.44a.372.372,0,0,0,.043.456L10.558,20.7a.372.372,0,0,0,.456.043l1.439-.985a5.378,5.378,0,0,0,.981.409l.326,1.74a.373.373,0,0,0,.352.292H15.86a.373.373,0,0,0,.352-.292l.323-1.724a5.4,5.4,0,0,0,1.022-.417l1.458,1a.372.372,0,0,0,.456-.043l1.236-1.235a.372.372,0,0,0,.043-.456l-.992-1.449a5.357,5.357,0,0,0,.423-1.023l1.73-.324a.373.373,0,0,0,.292-.352V14.137A.373.373,0,0,0,21.911,13.785Zm-6.9,4.227a3,3,0,1,1,3-3A3,3,0,0,1,15.014,18.012Z" transform="translate(0)"/></g></svg>';

        editButton.addEventListener("click", (event) =>
            actionEdit(event, node)
        );
        thisNodeTarget.closest(".react-flow__node").appendChild(editButton);

        deleteButton.classList.add(
            "btn",
            "btnDeleteNode",
            thisNodeType.toLowerCase() + "-Deletebtn"
        );
        deleteButton.addEventListener("click", (event) =>
            deleteNode(event, node)
        );
        thisNodeTarget.closest(".react-flow__node-action").appendChild(deleteButton);
        break;

      case "ActionMessage":
        editButton.classList.add(
            "btn",
            "btnEditNode",
            thisNodeType.toLowerCase() + "-Editbtn"
        );
        editButton.style.cssText = `
          background:#fff;border:1px solid #434345;padding:3.5px;width:24px;height:24px;border-radius:50%;position:absolute;top:-10px;right:-10px;transition:all cubic-bezier(.215,.61,.355,1) .4s;-webkit-transition:all cubic-bezier(.215,.61,.355,1) .4s;-moz-transition:all cubic-bezier(.215,.61,.355,1) .4s;-ms-transition:all cubic-bezier(.215,.61,.355,1) .4s;-o-transition:all cubic-bezier(.215,.61,.355,1) .4s
        `;
        editButton.innerHTML =
            '<svg style="fill:#434345;-webkit-appearance:none;backface-visibility:hidden;-webkit-backface-visibility:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.377 14.378" className="automationCog"><g transform="translate(-7.826 -7.824)"><circle className="a" cx="1.239" cy="1.239" r="1.239" transform="translate(13.775 13.774)"/><path className="a" d="M21.911,13.785l-1.732-.325a5.346,5.346,0,0,0-.414-1l1-1.465a.372.372,0,0,0-.043-.456L19.489,9.3a.372.372,0,0,0-.456-.043l-1.465,1a5.359,5.359,0,0,0-1.033-.422l-.323-1.723a.373.373,0,0,0-.352-.292H14.112a.372.372,0,0,0-.352.292l-.326,1.74a5.341,5.341,0,0,0-.991.414L11,9.28a.372.372,0,0,0-.456.043L9.3,10.559a.372.372,0,0,0-.043.456l1,1.456a5.369,5.369,0,0,0-.408.991l-1.732.324a.373.373,0,0,0-.292.352v1.748a.373.373,0,0,0,.292.352l1.731.324a5.357,5.357,0,0,0,.417,1.011l-.985,1.44a.372.372,0,0,0,.043.456L10.558,20.7a.372.372,0,0,0,.456.043l1.439-.985a5.378,5.378,0,0,0,.981.409l.326,1.74a.373.373,0,0,0,.352.292H15.86a.373.373,0,0,0,.352-.292l.323-1.724a5.4,5.4,0,0,0,1.022-.417l1.458,1a.372.372,0,0,0,.456-.043l1.236-1.235a.372.372,0,0,0,.043-.456l-.992-1.449a5.357,5.357,0,0,0,.423-1.023l1.73-.324a.373.373,0,0,0,.292-.352V14.137A.373.373,0,0,0,21.911,13.785Zm-6.9,4.227a3,3,0,1,1,3-3A3,3,0,0,1,15.014,18.012Z" transform="translate(0)"/></g></svg>';

        editButton.addEventListener("click", (event) =>
            actionMessageEdit(event, node)
        );
        thisNodeTarget.closest(".react-flow__node").appendChild(editButton);

        deleteButton.classList.add(
          "btn",
          "btnDeleteNode",
          thisNodeType.toLowerCase() + "-Deletebtn"
        );
        deleteButton.addEventListener("click", (event) =>
            deleteNode(event, node)
        );
        thisNodeTarget.closest(".react-flow__node-actionMessage").appendChild(deleteButton);
        break;

      default:
        break;
    }
  };
  const getNodeId = (type) => {
    let number = Number(idNode) + 1;
    setIdNode(number);
    return type + `-${number}`;
  };
  const getEdgeId = () => {
    let number = Number(idEdge) + 1;
    setIdEdge(number)
    return `edge-${number}`;
  };
  const onNodeMouseLeave = (event, node) => {
    const thisNodeTarget = event.target;
    if (thisNodeTarget.parentNode.querySelector(".btnEditNode")) {
      thisNodeTarget.parentNode.querySelector(".btnEditNode").remove();
    }
    if (thisNodeTarget.parentNode.querySelector(".btnDeleteNode")) {
      thisNodeTarget.parentNode.querySelector(".btnDeleteNode").remove();
    }
  };

  const filterEdit = (e, n) => {
    setAutomationModal("filter");
  };

  const actionEdit = (e, n) => {
    setAutomationModal("action");
  };

  const actionMessageEdit = (e, n) => {
    setTo(n.data.to);
    setFrom(n.data.from);
    setBody(n.data.body);
    setNId(n.id);
    setAutomationModal("actionMessage");
  };

  const refreshWebhook = async (id) => {
    setWebhookData([]);
    if (id) {
      let payload = {'unique_id': id};
      setIsLoader(true);
      let fetchFields = await AutomationServices.fetchFields(JSON.stringify(payload));
      setIsLoader(false);
      if (fetchFields.data.success) {
        setWebhookData(fetchFields.data.data);
      } else {
        console.log("api error ! " + fetchFields.data.message);
      }
    }
  };

  const triggerEdit = async (e, n) => {
    setAutomationUrl(n.data.url);
    setAutomationUrlId(n.data.id);
    setAutomationModal("trigger");
    setWebhookData([]);
    if (n.data.id) {
      let payload = {'unique_id': n.data.id};
      setIsLoader(true);
      let fetchFields = await AutomationServices.fetchFields(JSON.stringify(payload));
      setIsLoader(false);
      if (fetchFields.data.success) {
        setWebhookData(fetchFields.data.data);
      } else {
        console.log("api error ! " + fetchFields.data.message);
      }
    }
  };

  const closeFilterModal = () => {
    setAutomationModal(null);
  };
  const handleNameChange = (event) => {
    event.preventDefault();
    setAutomationName(event.target.value);
  }
  const handleToChange = (event) => {
    event.preventDefault();
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (pattern.test(event.target.value)) {
      setTo(event.target.value);
    } else {
      setTo('');
      setToError('bounce');
      removeClass();
    }
  }
  const handleFromChange = (event) => {
    event.preventDefault();
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (pattern.test(event.target.value)) {
      setFrom(event.target.value);
    } else {
      setFrom('');
      setFromError('bounce');
      removeClass();
    }
  }
  const handleBodyChange = (event) => {
    event.preventDefault();
    setBody(event.target.value);
  }


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
  const deleteNode = async (e, elm) => {
    onElementsRemove([elm]);
    if (elm.type === 'trigger' && elm.data.id) {
      let payload = {'unique_id': elm.data.id};
      let deleteWebhook = await AutomationServices.deleteWebhookNode(JSON.stringify(payload));
      console.log(deleteWebhook);
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
    setElements([])
    setAutomationId(0);
    setAutomationName('');
    setElements((els) => removeElements(elements, els));
  };
  const saveMessage = async () => {
    let count = 0;
    if (!to) {
      setToError('bounce');
      count = count + 1;
    }
    if (!from) {
      setFromError('bounce');
      count = count + 1;
    }
    if (!body) {
      setBodyError('bounce');
      count = count + 1;
    }
    removeClass();
    if (count === 0) {
      setElements((elms) =>
          elms.map((el) => {
            if (el.id === nId) {
              el.data.to = to;
              el.data.from = from;
              el.data.body = body;
            }
            return { ...el };
          })
      );
      closeFilterModal();
    }
  };
  const saveAutomation = async () => {
    console.log(JSON.stringify(elements))
    if (!automationName) {
      setAutomationNameError('bounce');
      removeClass();
    } else {
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
        let payload = {name: automationName, id: automationId, nodeId: idNode, edgeId: idEdge, blueprint: elements};
        setIsLoader(true);
        let response = await AutomationServices.saveAutomation(JSON.stringify(payload));
        setIsLoader(false);
        if (response.data.success) {
          props.toggleCreateAutomation('automation-list')
        } else {
          console.log("api error ! " + response.data.message);
        }
      } else {
        alert("You have broken element. Make sure to connect all the nodes");
      }
    }
  };
  const removeClass = () => {
    setTimeout(() => {
      setAutomationNameError('');
      setToError('');
      setFromError('');
      setBodyError('');
    }, 1500);
  }
  const generateUrlOfWebhook = async (nodeId) => {
    let payload = {id: 0};
    let res = await AutomationServices.generateUrl(JSON.stringify(payload));
    if (res.data.success) {
      console.log("api success");
      setElements((elms) =>
          elms.map((el) => {
            if (el.id === nodeId) {
              el.data.url = res.data.url;
              el.data.id = res.data.id;
            }
            return { ...el };
          })
      );
    } else {
      console.log("api error ! " + res.data.message);
    }
  }
  const onDrop = async (event) => {
    event.preventDefault();
    const types = {
      trigger: "Trigger",
      action: "Action",
      filter: "Filter",
      actionMessage: "ActionMessage"
    };
    let newNode = {};
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    if (type === 'trigger') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: {next: [], previous: ""},
          url: '',
          id: ''
        },
      };
      setElements((es) => es.concat(newNode));
      generateUrlOfWebhook(newNode.id);
    } else if (type === 'actionMessage') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: {next: [], previous: ""},
          messageArn: 'arn:aws:lambda:us-east-1:670103364767:function:smsaction-dev-sendMessage',
          to: '',
          from: '',
          body: ''
        },
      };
      setElements((es) => es.concat(newNode));
    } else {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {label: `${types[type]}`, nodes: {next: [], previous: ""}},
      };
      setElements((es) => es.concat(newNode));
    }
  };
  const getConnectionDetails = (source, target) => {
    const sourcePosition = source.indexOf("-");
    let sourceType = source.substring(0, sourcePosition);
    const targetPosition = target.indexOf("-");
    let targetType = target.substring(0, targetPosition);
    if (sourceType === 'actionMessage') {
      sourceType = 'action';
    }
    if (targetType === 'actionMessage') {
      targetType = 'action';
    }
    let returnType = false;
    let connectedTrigger = false;
    let connectedAction = false;
    let connectedFilter = false;
    let duplicateConnection = false;
    let parallelFilter = false;
    let activeConnection = false;
    let multipleTrigger = false;
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
      if (sourceType === 'trigger' && el.source !== undefined) {
        const newSource = el.source;
        const newSourcePosition = newSource.indexOf("-");
        let sourceType = newSource.substring(0, newSourcePosition);
        if (sourceType === 'trigger') {
          multipleTrigger = true;
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
    if (duplicateConnection || activeConnection || parallelFilter || multipleTrigger) {
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
  const onClickCopy = (text) => {
    //window.navigator.clipboard.writeText(text);
    console.log(text);
  }
  useEffect(() => {
    if (Object.keys(props.automationElement).length) {
      setElements(props.automationElement.blueprint)
      setAutomationId(props.automationElement._id);
      setAutomationName(props.automationElement.name);
      setIdEdge(props.automationElement.nodeId);
      setIdEdge(props.automationElement.edgeId);
    }
  }, [props.automationElement]);
  return (
      <>
        {isLoader ? <Loader /> : ''}
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
                  onNodeMouseLeave={onNodeMouseLeave}
                  style={{ background: bgColor }}
                  onNodeDragStop={onNodeDragStop}
              >
                <Controls />
              </ReactFlow>
              <div className="automationTopLeft">
                <input type="text" className={`automationNameArea ${automationNameError}`} placeholder="Enter your automation name"  onChange={handleNameChange} value={automationName}/>
                <button className="automationSetting">
                  <img src={blueSettingIcon} alt="" />
                </button>
                <div className="automationPublish">
                  <button className="automationPublishBtn" onClick={saveAutomation}>
                    <img src={plus_icon} alt="" />
                    Save
                  </button>
                </div>
                <div className="autoInfo">
                  <span>?</span>
                  <div className="autoInfoBox">
                    Lorem ipsum dolor
                  </div>
                </div>
              </div>
              <div className="buttonArea">
                <button
                    type="button"
                    className="reserAutoBtn"
                    onClick={resetAutomation}
                >
                  <img src={resetIcon} alt="" />
                  Reset
                </button>
              </div>
            </div>
            {automationModal != null ? (automationModal === 'trigger' ?
                <div className="automationModal filterModal triggerSetting">
                  <div className="nodeSettingModal">
                    <div className="formHead">
                      <div className="heading">
                        <p>Trigger Settings</p>
                      </div>
                      <div className="closeButton">
                        <button onClick={closeFilterModal}>
                          <img src={closewhite24dp} alt="Close Filter Modal"/>
                        </button>
                      </div>
                    </div>
                    <div className="formBody">
                      <div className="formBodyContainer">
                        <div className="formFieldsArea">
                          <div className="inputField">
                            <label htmlFor="">webhook URL</label>
                            <input type="text" name="webhook-url" id="webhook-url" value={automationUrl} onClick={() => onClickCopy(automationUrl)} readOnly={true}/>
                          </div>
                          {Object.keys(webhookData).length ? (
                                Object.keys(webhookData).map((value, key) => (
                                    <div className="inputField">
                                      <label htmlFor="">{value}</label>
                                      <input type="text" name={"webhook-url"+key} id={"webhook-url-"+key} value={webhookData[value]} readOnly={true}/>
                                    </div>
                                ))
                              )
                             : ""
                          }
                          <div className="inputField">
                            <button className="refreshFieldsBtn" onClick={() => refreshWebhook(automationUrlId)}>Refresh Fields</button>
                          </div>
                        </div>
                        <div className="saveButton">
                          <button onClick={closeFilterModal}>Save <img src={chevron_right_white_24dp} alt=""/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : (automationModal === 'actionMessage' ?
                    <div className="automationModal filterModal">
                      <div className="nodeSettingModal">
                        <div className="formHead">
                          <div className="heading">
                            <p>Message Settings</p>
                          </div>
                          <div className="closeButton">
                            <button onClick={closeFilterModal}>
                              <img src={closewhite24dp} alt="Close Filter Modal"/>
                            </button>
                          </div>
                        </div>
                        <div className="formBody">
                          <div className="formBodyContainer">
                            <div className="emailDetails">
                              <div className="inputField">
                                <label htmlFor="">To</label>
                                <input className={`icon ${toError}`} type="text" name="" id="" value={to} onChange={handleToChange}/>
                              </div>
                              <div className="inputField">
                                <label htmlFor="">From</label>
                                <input className={`icon ${fromError}`} type="text" name="" id="" value={from} onChange={handleFromChange}/>
                              </div>
                              <div className="inputField">
                                <label htmlFor="">Body</label>
                                <textarea className={`${bodyError}`} name="body" onChange={handleBodyChange}>{body}</textarea>
                              </div>
                            </div>

                            <div className="saveButton">
                              <button onClick={saveMessage}>Save <img src={chevron_right_white_24dp} alt=""/></button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    : "")) : ""}
          </ReactFlowProvider>
        </div>
      </>
  );
};

export default AutomationBuilder;
