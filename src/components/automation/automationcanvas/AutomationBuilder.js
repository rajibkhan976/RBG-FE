import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  updateEdge,
  Controls,
} from "react-flow-renderer";
import { useDispatch } from "react-redux";
import "./automation.css";
import { FilterNode, TriggerNode, ActionEmail, ActionMessage, ActionDelay, FieldActionTrigger, ActionStatusPhaseUpdate } from "./nodes";
import { CustomEdge } from './edges';
import { Filter } from "./modals/filter";
import closewhite24dp from "../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../assets/images/chevron_right_white_24dp.svg";
import resetIcon from "../../../assets/images/resetIcon.svg";
import blueSettingIcon from "../../../assets/images/blueSettingIcon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import Loader from "../../shared/Loader";
import { AutomationServices } from "../../../services/automation/AutomationServices";
import edit_grey from "../../../assets/images/edit_grey.svg";
import trashIcon from "../../../assets/images/iconfinder_trash-2_2561228.svg";
import whiteAddIcon from "../../../assets/images/add_white_24dp.svg";
import whiteSlash from "../../../assets/images/remove_white_24dp.svg";
import * as actionTypes from "../../../actions/types";
import WebhookTrigger from "./modals/WebhookTrigger";
import FieldTrigger from "./modals/FieldTrigger";
import ActionStatusPhaseModal from "./modals/ActionStatusPhase"
import cressIcon from "../../../assets/images/white_cross_roundedCorner.svg";

const AutomationBuilder = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [idNode, setIdNode] = useState(0);
  const [idOriginalNode, setIdOriginalNode] = useState(0);
  const [idEdge, setIdEdge] = useState(0);
  const [idOriginalEdge, setIdOriginalEdge] = useState(0);
  const [elements, setElements] = useState([]);
  const [originalElements, setOriginalElements] = useState([]);
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
  const [messageData, setMessageData] = useState([]);
  const [delayData, setDelayData] = useState([]);
  const [delayTime, setDelayTime] = useState(1);
  const [delayDataError, setDelayDataError] = useState('');
  const [delayType, setDelayType] = useState('minutes');
  const [delayNodeId, setDelayNodeId] = useState(0);
  const [emailData, setEmailData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [toEmail, setToEmail] = useState('');
  const [toEmailError, setToEmailError] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState(false);
  const [bodyEmail, setBodyEmail] = useState('');
  const [bodyEmailError, setBodyEmailError] = useState(false);
  const [nodeEmailId, setNodeEmailId] = useState(false);
  const [triggerNodeId, setTriggerNodeId] = useState(0);
  const [fieldTriggerNodeId, setFieldTriggerNodeId] = useState(0);
  const [cursorElement, setCursorElement] = useState(false);
  const [filterConditions, setFilterConditions] = useState([]);
  const [filterAnd, setFilterAnd] = useState(0);
  const [filterOr, setFilterOr] = useState(0);
  const [filterId, setFilterId] = useState(0);
  const [status, setStatus] = useState("");
  const [phase, setPhase] = useState("");
  const [statusPhaseNodeId, setStatusPhaseNodeId] = useState(0);
  const [tags, setTags] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [phaseList, setPhaseList] = useState([]);
  const [statusPhaseData, setStatusPhaseData] = useState([]);
  const [module, setModule] = useState('contact');
  const [event, setEvent] = useState({
    create: false,
    update: false,
    delete: false
  });
  const dispatch = useDispatch();
  const edgeTypes = {
    buttonedge: CustomEdge,
  };
  const edgeType = 'buttonedge';
  const nodeTypes = {
    trigger: TriggerNode,
    filter: FilterNode,
    actionEmail: ActionEmail,
    actionMessage: ActionMessage,
    actionDelay: ActionDelay,
    fieldActionTrigger: FieldActionTrigger,
    actionStatusPhaseUpdate: ActionStatusPhaseUpdate
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
          webhookTriggerSetting(event, node)
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
        thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
        break;
      case "FieldActionTrigger":
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
          fieldTriggerSetting(event, node)
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
        thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
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
        thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
        break;

      case "ActionEmail":
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
        thisNodeTarget.closest(".react-flow__node-actionEmail").appendChild(deleteButton);
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
      case "ActionStatusPhaseUpdate":
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
            actionStatusPhaseEdit(event, node)
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
        thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
        break;

      case "ActionDelay":
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
          actionDelayEdit(event, node)
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
        thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
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
    setFilterId(n.id);
    if (n.data.data !== undefined) {
      setFilterData(n.data.data);
    } else {
      setFilterData([]);
    }
    if (n.data.and !== undefined) {
      setFilterAnd(n.data.and);
    } else {
      setFilterAnd(1);
    }
    if (n.data.or !== undefined) {
      setFilterOr(n.data.or);
    } else {
      setFilterOr(0);
    }
    if (n.data.conditions !== undefined) {
      setFilterConditions(n.data.conditions);
    } else {
      setFilterConditions([]);
    }
    setAutomationModal("filter");
  };
  const actionEdit = (e, n) => {
    setToEmail(n.data.to);
    setSubject(n.data.subject);
    setBodyEmail(n.data.body);
    setNodeEmailId(n.id);
    if (n.data.data !== undefined) {
      setEmailData(n.data.data);
    } else {
      setEmailData([]);
    }
    setAutomationModal("actionEmail");
  };
  const actionMessageEdit = (e, n) => {
    setTo(n.data.to);
    setFrom(n.data.from);
    setBody(n.data.body);
    setNId(n.id);
    if (n.data.data !== undefined) {
      setMessageData(n.data.data);
    } else {
      setMessageData([]);
    }
    setAutomationModal("actionMessage");
  };
  const actionStatusPhaseEdit = (e, n) => {
    console.log(e, n)
    setStatus(n.data.status);
    setPhase(n.data.phase);
    setStatusPhaseNodeId(n.id);
    if (n.data.data !== undefined) {
      setStatusPhaseData(n.data.data);
    } else {
      setStatusPhaseData([]);
    }
    setAutomationModal("actionStatusPhase");
  }
  const actionDelayEdit = (e, n) => {
    setDelayTime(n.data.time);
    setDelayType(n.data.timeType);
    setDelayNodeId(n.id);
    if (n.data.data !== undefined) {
      setDelayData(n.data.data);
    } else {
      setDelayData([]);
    }
    setAutomationModal("actionDelay");
  };
  const refreshWebhook = async (id, nodeI) => {
    setWebhookData([]);
    if (id) {
      let payload = { 'unique_id': id };
      setIsLoader(true);
      let fetchFields = await AutomationServices.fetchFields(JSON.stringify(payload));
      setIsLoader(false);
      if (fetchFields.data.success) {
        setWebhookData(fetchFields.data.data);
        setElements((elms) =>
          elms.map((el) => {
            if (el.id === nodeI) {
              el.data.data = fetchFields.data.data;
            }
            return { ...el };
          })
        );
      } else {
        console.log("api error ! " + fetchFields.data.message);
      }
    }
  };
  const fieldTriggerSetting = async (e, n) => {
    console.log(n)
    setModule(n.data.module);
    setEvent(n.data.event);
    setFieldTriggerNodeId(n.id);
    setAutomationModal("fieldTrigger");
  };
  const webhookTriggerSetting = async (e, n) => {
    setAutomationUrl(n.data.url);
    setAutomationUrlId(n.data.id);
    setAutomationModal("webhookTrigger");
    if (n.data.data !== undefined) {
      setWebhookData(n.data.data);
    } else {
      setWebhookData([]);
    }
    setTriggerNodeId(n.id);
  }
  const saveFieldtrigger = (module, event, nodeId, fields) => {
    setElements((elms) =>
        elms.map((el) => {
          if (el.id === nodeId) {
            el.data.module = module;
            el.data.event = event;
            el.data.data = fields
          }
          return { ...el };
        })
    );
  }
  const closeFilterModal = () => {
    setAutomationModal(null);
  };
  const handleNameChange = (event) => {
    event.preventDefault();
    setAutomationName(event.target.value);
  }
  const handleToChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setTo(event.target.value);
  }
  const handleFromChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setFrom(event.target.value);
  }
  const handleBodyChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setBody(event.target.value);
  }
  const handleSubjectChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setSubject(event.target.value);
  }
  const handleToEmailChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setToEmail(event.target.value);
  }
  const handleDelayChange = (event) => {
    event.preventDefault();
    setDelayTime(event.target.value);
  }
  const handleDelayTypeChange = (event) => {
    event.preventDefault();
    setDelayType(event.target.value);
  }
  const handleBodyEmailChange = (event) => {
    event.preventDefault();
    setCursorElement(event);
    setBodyEmail(event.target.value);
  }
  const updateDataInTarget = (params) => {
    const updatedElem = [...elements];
    let data = {};
    updatedElem.forEach((el) => {
      if (params.source === el.id) {
        data = el.data.data;
      }
    });
    setElements((elms) =>
      elms.map((el) => {
        if (el.id === params.target) {
          el.data.data = data;
        }
        return { ...el };
      })
    );
  };
  const onConnect = async (params) => {
    let validate = getConnectionDetails(params.source, params.target);
    if (validate) {
      const edge = getEdgeId();
      await setElements((els) =>
        addEdge(
          { ...params, id: edge, type: edgeType, animated: true, data: { onRemove: onEdgeClick } },
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
      updateDataInTarget(params);
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
        elementsToRemove[0].data !== undefined && (
          elementsToRemove[0].data.nodes.previous === "" ||
          elementsToRemove[0].data.nodes.next.length === 0
        )) {
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
      let payload = { 'unique_id': elm.data.id };
      let deleteWebhook = await AutomationServices.deleteWebhookNode(JSON.stringify(payload));
    }
  };
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  }
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
    setElements(originalElements);
    setIdNode(idOriginalNode);
    setIdEdge(idOriginalEdge);
  };
  const saveMessage = async () => {
    let count = 0;
    if (!to) {
      setToError('bounce');
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
            el.data.body = body;
          }
          return { ...el };
        })
      );
      closeFilterModal();
    }
  };
  const saveDelay = async () => {
    let count = 0;
    if (!delayTime) {
      setDelayDataError('bounce');
      count = count + 1;
    }
    removeClass();
    if (count === 0) {
      let totalTime = 0;
      if (delayType === 'minutes') {
        totalTime = delayTime * 60;
      } else if (delayType === 'hours') {
        totalTime = delayTime * 3600;
      } else if (delayType === 'day') {
        totalTime = delayTime * 86400;
      }
      setElements((elms) =>
        elms.map((el) => {
          if (el.id === delayNodeId) {
            el.data.time = delayTime;
            el.data.timeType = delayType;
            el.data.timeInSecond = totalTime;
          }
          return { ...el };
        })
      );
      closeFilterModal();
    }
  };
  const saveStatusPhase = (nodeId, status, phase) => {
    console.log(nodeId, status, phase)
    setElements((elms) =>
        elms.map((el) => {
          if (el.id === nodeId) {
            el.data.status = status;
            el.data.phase = phase;
          }
          return { ...el };
        })
    );
    closeFilterModal();
  }
  const saveEmail = async () => {
    let count = 0;
    if (!toEmail) {
      setToEmailError('bounce');
      count = count + 1;
    }
    if (!subject) {
      setSubjectError('bounce');
      count = count + 1;
    }
    if (!bodyEmail) {
      setBodyEmailError('bounce');
      count = count + 1;
    }
    removeClass();
    if (count === 0) {
      setElements((elms) =>
        elms.map((el) => {
          if (el.id === nodeEmailId) {
            el.data.to = toEmail;
            el.data.subject = subject;
            el.data.body = bodyEmail;
          }
          return { ...el };
        })
      );
      closeFilterModal();
    }
  };
  const saveAutomation = async () => {
    try {
      if (!automationName) {
        setAutomationNameError('bounce');
        removeClass();
      } else {
        const bluePrintElem = elements.filter(
          (el) => typeof el.source == "undefined"
        );
        const brokenElem = bluePrintElem.find((el) => {
          if (
              ((el.type !== "fieldActionTrigger" && el.data.nodes.previous === "") && (el.type !== "trigger" && el.data.nodes.previous === "")) ||
              ((el.type === "fieldActionTrigger" && el.data.nodes.next.length === 0) && (el.type === "trigger" && el.data.nodes.next.length === 0))
          ) {
            return el;
          }
        });
        if (typeof brokenElem == "undefined") {
          let payload = { name: automationName, id: automationId, nodeId: idNode, edgeId: idEdge, blueprint: elements };
          setIsLoader(true);
          let response = await AutomationServices.saveAutomation(JSON.stringify(payload));
          setIsLoader(false);
          props.toggleCreateAutomation('automation-list');
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Automation saved successfully.",
            typeMessage: 'success'
          });
        } else {
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "You have broken element. Make sure to connect all the nodes",
            typeMessage: 'error'
          });
        }
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  };
  const removeClass = () => {
    setTimeout(() => {
      setAutomationNameError('');
      setToError('');
      setFromError('');
      setBodyError('');
      setToEmailError('');
      setSubjectError('');
      setBodyEmailError('');
      setDelayDataError('');
    }, 1500);
  };
  const generateUrlOfWebhook = async (nodeId) => {
    let payload = { "id": 0 };
    setIsLoader(true);
    let res = await AutomationServices.generateUrl(payload);
    setIsLoader(false);
    if (res.data.success) {
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
  };
  const onDrop = async (event) => {
    event.preventDefault();
    const types = {
      trigger: "Trigger",
      actionEmail: "ActionEmail",
      filter: "Filter",
      actionMessage: "ActionMessage",
      actionDelay: "ActionDelay",
      fieldActionTrigger: "FieldActionTrigger",
      actionStatusPhaseUpdate: "ActionStatusPhaseUpdate"
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
          nodes: { next: [], previous: "" },
          url: '',
          id: '',
          data: {}
        },
      };
      setElements((es) => es.concat(newNode));
      generateUrlOfWebhook(newNode.id);
    } else if (type === 'fieldActionTrigger') {
      console.log(`${types[type]}`)
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          module: 'contact',
          event: {
            create: false,
            update: false,
            delete: false
          },
          data: {}
        },
      };
      setElements((es) => es.concat(newNode));
    } else if (type === 'actionMessage') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          arn: process.env.REACT_APP_ACTION_MESSAGE,
          to: '',
          from: '',
          body: ''
        },
      };
      setElements((es) => es.concat(newNode));
    } else if (type === 'actionEmail') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          arn: process.env.REACT_APP_ACTION_EMAIL,
          to: '',
          subject: '',
          body: ''
        },
      };
      setElements((es) => es.concat(newNode));
    } else if (type === 'actionDelay') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          time: 1,
          timeType: 'minutes',
          timeInSecond: 60
        },
      };
      setElements((es) => es.concat(newNode));
    } else if (type === 'actionStatusPhaseUpdate') {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          arn: process.env.REACT_APP_ACTION_STATUS_PHASE,
          status: '',
          phase: ''
        },
      };
      setElements((es) => es.concat(newNode));
    } else {
      newNode = {
        id: getNodeId(type),
        type,
        position,
        data: {
          label: `${types[type]}`,
          nodes: { next: [], previous: "" },
          and: 1,
          or: 0,
          conditions: [{
            index: 0,
            conditions: [{
              and: 1,
              field: '',
              condition: '',
              value: ''
            }]
          }]
        },
      };
      setElements((es) => es.concat(newNode));
    }
  };
  const getConnectionDetails = (source, target) => {
    const sourcePosition = source.indexOf("-");
    let sourceType = source.substring(0, sourcePosition);
    const targetPosition = target.indexOf("-");
    let targetType = target.substring(0, targetPosition);
    if (sourceType === 'fieldActionTrigger') {
      sourceType = 'trigger';
    }
    if (sourceType === 'actionMessage') {
      sourceType = 'action';
    }
    if (targetType === 'actionMessage') {
      targetType = 'action';
    }
    if (sourceType === 'actionEmail') {
      sourceType = 'action';
    }
    if (targetType === 'actionEmail') {
      targetType = 'action';
    }
    if (sourceType === 'actionDelay') {
      sourceType = 'action';
    }
    if (targetType === 'actionDelay') {
      targetType = 'action';
    }
    if (sourceType === 'actionStatusPhaseUpdate') {
      sourceType = 'action';
    }
    if (targetType === 'actionStatusPhaseUpdate') {
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
      /*if (sourceType === 'trigger' && el.source !== undefined) {
        const newSource = el.source;
        const newSourcePosition = newSource.indexOf("-");
        let sourceTypeNew = newSource.substring(0, newSourcePosition);
        console.log(sourceTypeNew, sourceType)
        if (sourceType === 'trigger') {
          multipleTrigger = true;
        }
      }*/
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
    setTimeout(() => {
      window.navigator.clipboard.writeText(text);
    }, 100);
  };
  const copyTag = (text, field) => {
    let e = cursorElement;
    if (e.target && e.target.name === field) {
      let cursorPosition = e.target.selectionStart
      let textBeforeCursorPosition = e.target.value.substring(0, cursorPosition)
      let textAfterCursorPosition = e.target.value.substring(cursorPosition, e.target.value.length)
      e.target.value = textBeforeCursorPosition + " [" + text + "] " + textAfterCursorPosition
      switch (field) {
        case 'messageTo':
          setTo(e.target.value);
          break;
        case 'messageFrom':
          setFrom(e.target.value);
          break;
        case 'messageBody':
          setBody(e.target.value);
          break;
        case 'subject':
          setSubject(e.target.value);
          break;
        case 'toEmail':
          setToEmail(e.target.value);
          break;
        case 'bodyEmail':
          setBodyEmail(e.target.value);
          break;
      }
    } else {
      console.log('there', field, text);
      switch (field) {
        case 'messageTo':
          setTo(to + " [" + text + "] ");
          break;
        case 'messageFrom':
          setFrom(from + " [" + text + "] ");
          break;
        case 'messageBody':
          setBody(body + " [" + text + "] ");
          break;
        case 'subject':
          setSubject(subject + " [" + text + "] ");
          break;
        case 'toEmail':
          setToEmail(toEmail + " [" + text + "] ");
          break;
        case 'bodyEmail':
          setBodyEmail(bodyEmail + " [" + text + "] ");
          break;
      }
    }
  }
  const toggletoMail = (e) => {
    e.preventDefault();
    e.target.closest('.inputField').classList.toggle('active');
  }
  const addAnd = (value) => {
    let andNew = filterAnd + 1;
    setFilterAnd(andNew);
    setFilterConditions((elms) =>
      elms.map((el) => {
        if (el.index === value) {
          el.conditions.push({
            and: andNew,
            field: '',
            condition: '',
            value: ''
          })
        }
        return { ...el };
      })
    );
  }
  const addOr = () => {
    let orNew = filterOr + 1;
    setFilterOr(orNew);
    setFilterConditions((elms) =>
      elms.concat({
        index: orNew,
        conditions: [{
          and: 1,
          field: '',
          condition: '',
          value: ''
        }]
      })
    );
  }
  const deleteNodeFiler = (n, index) => {
    let updatedFilterConditions = [...filterConditions];
    let length = 0;
    updatedFilterConditions.forEach((fil) => {
      if (fil.index === index) {
        length = fil.conditions.length;
      }
    });
    if (length > 1) {
      let filters = filterConditions.map((fil) => {
        if (fil.index === index) {
          let conditions = fil.conditions;
          fil.conditions = conditions.filter((f) => f.and !== n.and);
        }
        return fil;
      });
      setFilterConditions(filters);
    } else {
      let filters = filterConditions.filter((fil) => fil.index !== index);
      setFilterConditions(filters);
    }

  }
  const updateFilterData = () => {
    let count = 0
    filterConditions.forEach((fil) => {
      fil.conditions.forEach((f) => {
        if (f.field === "" || f.condition === "" || f.value === "") {
          count++;
        }
      })
    });
    if (count) {
      alert('Please fil up all the input.')
    } else {
      setElements((elms) =>
        elms.map((el) => {
          if (el.id === filterId) {
            el.data.and = filterAnd;
            el.data.or = filterOr;
            el.data.conditions = filterConditions;
          }
          return { ...el };
        })
      );
      closeFilterModal();
    }
  }
  const handelFilterFieldChange = (name, index, and, event) => {
    setFilterConditions((elms) =>
      elms.map((el) => {
        if (el.index === index) {
          el.conditions.map((con) => {
            if (con.and === and) {
              switch (name) {
                case 'field':
                  con.field = event.target.value;
                  con.filedValue = event.target.options[event.target.selectedIndex].dataset.fieldtype
                  break;
                case 'condition':
                  con.condition = event.target.value
                  break;
                case 'value':
                  con.value = event.target.value
                  break;
              }
            }
            return { ...con };
          })
        }
        return { ...el };
      })
    );
  }
  const onEdgeClick = (id) => {
    let elems = [{
      id: id
    }];
    setElements((els) => removeElements(elems, elements));
  };
  const fetchTagStatusPhase = async () => {
    try {
      let resp = await AutomationServices.fetchTagStatusPhase();
      setTags(resp.tags);
      setStatusList(resp.status);
      setPhaseList(resp.phase);
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  }
  useEffect(() => {
    if (Object.keys(props.automationElement).length) {
      setElements(props.automationElement.blueprint);
      setOriginalElements(props.automationElement.blueprint);
      setAutomationId(props.automationElement._id);
      setAutomationName(props.automationElement.name);
      setIdNode(props.automationElement.nodeId);
      setIdOriginalNode(props.automationElement.nodeId);
      setIdEdge(props.automationElement.edgeId);
      setIdOriginalEdge(props.automationElement.edgeId);
    }
    fetchTagStatusPhase();
  }, [props.automationElement]);
  return (
    <>
      {isLoader ? <Loader /> : ''}
      <div className="automationDnD">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <div className="automationRow">
              <div className="automationTopLeft">
                <input type="text" className={`automationNameArea ${automationNameError}`} placeholder="Enter your automation name" onChange={handleNameChange} value={automationName} />
                <div className="automationPublish">
                  <button className="automationPublishBtn" onClick={saveAutomation}>
                    <img src={plus_icon} alt="" />
                    Save
                  </button>
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
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              nodeTypes={nodeTypes}
              data={elements}
              onDragOver={onDragOver}
              selectNodesOnDrag={false}
              edgeTypes={edgeTypes}
              onNodeMouseEnter={onNodeMouseEnter}
              onNodeMouseLeave={onNodeMouseLeave}
              style={{ background: bgColor }}
              onNodeDragStop={onNodeDragStop}
            >
              <Controls />
            </ReactFlow>
          </div>
          {automationModal != null ? (automationModal === 'actionStatusPhase' ?
              <ActionStatusPhaseModal closeFilterModal={closeFilterModal} nodeId={statusPhaseNodeId} status={status} phase={phase} saveStatusPhase={saveStatusPhase}/>
              : (automationModal === 'fieldTrigger' ?
            <FieldTrigger
              closeFilterModal={closeFilterModal} nodeId={fieldTriggerNodeId} module={module} event={event}
              saveFieldtrigger={saveFieldtrigger}
            />
            : (automationModal === 'webhookTrigger' ?
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
                                  <div className="inFormField d-flex">
                                    <input type="text" name="webhook-url" id="webhook-url" value={automationUrl} onClick={() => onClickCopy(automationUrl)} readOnly={true}/>
                                    <button className="refreshFieldsBtn" onClick={() => refreshWebhook(automationUrlId, triggerNodeId)}></button>
                                  </div>
                                </div>
                                {/* <div className="inputField">
                            <button className="refreshFieldsBtn" onClick={() => refreshWebhook(automationUrlId, triggerNodeId)}>Refresh Fields</button>
                          </div> */}
                                {Object.keys(webhookData).length ?
                                    <div className="webhookDataFields">
                                      <h5>
                                        <figure>
                                          <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/></svg>
                                        </figure>
                                        Request</h5>
                                      <div className="listpayloads">
                                        <ul>
                                          {Object.keys(webhookData).length ? (
                                              Object.keys(webhookData).map((value, key) => (
                                                  <li>
                                                    <p><span>{value}:</span><span>{webhookData[value]}</span>{key === 0 ? "" : " "}</p>
                                                  </li>
                                              ))
                                          ) : ""
                                          }
                                        </ul>
                                      </div>
                                    </div>
                                    : ""}
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
                        <img src={closewhite24dp} alt="Close Filter Modal" />
                      </button>
                    </div>
                  </div>
                  <div className="formBody">
                    <div className="formBodyContainer">
                      <div className="emailDetails">
                        <div className="inputField">
                          <label htmlFor="">To</label>
                          <div className="inFormField">
                            <input className={`icon ${toError}`} type="text" name="messageTo" id="" value={to} onChange={handleToChange} onClick={handleToChange} />
                            <button className="toggleTags" onClick={(e) => toggletoMail(e)}></button>
                          </div>
                          <div className="messageTagTo">
                            <h6>Select Option(s)</h6>
                            {Object.keys(messageData).length ? (
                              Object.keys(messageData).map((value, key) => (
                                <button onClick={() => copyTag(value, 'messageTo')}>{value}</button>
                              ))
                            ) : ""
                            }
                          </div>
                        </div>
                        <div className="inputField">
                          <label htmlFor="">Body</label>
                          <div className="inFormField">
                            <textarea className={`${bodyError}`} name="messageBody" onChange={handleBodyChange} onClick={handleBodyChange} value={body}>{body}</textarea>
                          </div>
                          <div className="messageTagBody">
                            {Object.keys(messageData).length ? (
                              Object.keys(messageData).map((value, key) => (
                                <button onClick={() => copyTag(value, 'messageBody')}>{value}</button>
                              ))
                            ) : ""
                            }
                          </div>
                        </div>
                      </div>
                      <div className="saveButton">
                        <button onClick={saveMessage}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              : (automationModal === 'actionEmail' ?
                <div className="automationModal filterModal">
                  <div className="nodeSettingModal">
                    <div className="formHead">
                      <div className="heading">
                        <p>Email Settings</p>
                      </div>
                      <div className="closeButton">
                        <button onClick={closeFilterModal}>
                          <img src={closewhite24dp} alt="Close Filter Modal" />
                        </button>
                      </div>
                    </div>
                    <div className="formBody">
                      <div className="formBodyContainer">
                        <div className="emailDetails">
                          <div className="inputField">
                            <label htmlFor="subject">Subject</label>
                            <div className="inFormField subjectField">
                              <input className={`icon ${subjectError}`} type="text" name="subject" id="subject" value={subject} onChange={handleSubjectChange} onClick={handleSubjectChange} />
                              <button className="toggleTags" onClick={(e) => toggletoMail(e)}></button>
                            </div>
                            <div className="emailTagSubject">
                              <h6>Select Option(s)</h6>
                              {Object.keys(emailData).length ? (
                                Object.keys(emailData).map((value, key) => (
                                  <button onClick={() => copyTag(value, 'subject')}>{value}</button>
                                ))
                              ) : ""
                              }
                            </div>
                          </div>
                          <div className="inputField">
                            <label htmlFor="toEmail">To</label>
                            <div className="inFormField">
                              <input className={`icon ${toEmailError}`} type="text" name="toEmail" id="toEmail" value={toEmail} onChange={handleToEmailChange} onClick={handleToEmailChange} />
                              <button className="toggleTags" onClick={(e) => toggletoMail(e)}></button>
                            </div>
                            <div className="emailTagToEmail">
                              <h6>Select Option(s)</h6>
                              {Object.keys(emailData).length ? (
                                Object.keys(emailData).map((value, key) => (
                                  <button onClick={() => copyTag(value, 'toEmail')}>{value}</button>
                                ))
                              ) : ""
                              }
                            </div>
                          </div>
                          <div className="inputField">
                            <label htmlFor="bodyEmail">Body</label>
                            <div className="inFormField">
                              <textarea className={`icon ${bodyEmailError}`} name="bodyEmail" id="bodyEmail" onChange={handleBodyEmailChange}
                                onClick={handleBodyEmailChange} value={bodyEmail}>{bodyEmail}</textarea>
                            </div>
                            <div className="emailTagEmailBody">
                              {Object.keys(emailData).length ? (
                                Object.keys(emailData).map((value, key) => (
                                  <button onClick={() => copyTag(value, 'bodyEmail')}>{value}</button>
                                ))
                              ) : ""
                              }
                            </div>
                          </div>
                        </div>
                        <div className="saveButton">
                          <button onClick={saveEmail}>Save <img src={chevron_right_white_24dp} alt="" /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                : (automationModal === 'actionDelay' ?
                  <div className="automationModal filterModal">
                    <div className="nodeSettingModal delaySettingModal">
                      <div className="formHead">
                        <div className="heading">
                          <p>Delay Settings</p>
                        </div>
                        <div className="closeButton">
                          <button onClick={closeFilterModal}>
                            <img src={closewhite24dp} alt="Close Filter Modal" />
                          </button>
                        </div>
                      </div>
                      <div className="formBody">
                        <div className="formBodyContainer">
                          <div className="emailDetails delayDetails">
                            <div className="inputField">
                              <label htmlFor="delayTm">Set Delay</label>
                              <div className="inFormField d-flex">
                                <input className={`formField ${delayDataError}`} type="number" name="delayTm" id="delayTm" value={delayTime} onChange={handleDelayChange} />
                                <select className="formField" value={delayType} onChange={handleDelayTypeChange}>
                                  <option value="day">Days</option>
                                  <option value="hours">Hours</option>
                                  <option value="minutes">Minutes</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="saveButton">
                            <button onClick={saveDelay}>Save <img src={chevron_right_white_24dp} alt="" /></button> {/*onClick={saveDelay}*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : (automationModal === 'filter' ?
                    <div className="automationModal filterModal">
                      <div className="nodeSettingModal filterSetting">
                        <div className="formHead">
                          <div className="heading">
                            <p>Filter Settings</p>
                          </div>
                          <div className="closeButton">
                            <button className="closeFilterModal" onClick={closeFilterModal}>
                              <img src={closewhite24dp} alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="formBody">
                          <div className="formBodyContainer">
                            <div className="nameArea">
                              <div className="editRules">
                                <p>Edit Rules</p>
                              </div>
                            </div>
                            <div className="formFieldsArea">
                              <label htmlFor="">Only continue if</label>
                              <div className="formFields">
                                {filterConditions.length ? (filterConditions.map((value, index) => {
                                  return (
                                    <>
                                      {index > 0 ?
                                        <div className="addFormFieldsButton orButton">
                                          <button>
                                            <span className="addFields"><img src={whiteSlash} alt="" /></span>
                                            or
                                          </button>
                                        </div>
                                        : ""}
                                      {
                                        value.conditions.length ? value.conditions.map((con) => {
                                          return (
                                            <>
                                              <div className={`formFields1`}>
                                                <div className={`inputField field_1`}>
                                                  <select name="" id="" value={con.field} onChange={(e) => handelFilterFieldChange('field', value.index, con.and, e)}>
                                                    <option value="">Please Select</option>
                                                    {Object.keys(filterData).length ? (
                                                      Object.keys(filterData).map((value, key) => (
                                                        <option value={value} data-fieldType={filterData[value]}>{value}</option>
                                                      ))
                                                    ) : ""
                                                    }
                                                  </select>
                                                </div>
                                                <div className="inputField field_2">
                                                  <select name="" id="" value={con.condition} onChange={(e) => handelFilterFieldChange('condition', value.index, con.and, e)}>
                                                    <option value="">Please Select</option>
                                                    <option value="StringEquals"> = (String)</option>
                                                    <option value="NumericEquals"> = (Numeric)</option>
                                                    {/*<option value="NumericGreaterThan"> > (Numeric)</option>
                                                    <option value="NumericGreaterThanEquals"> >= (Numeric)</option>
                                                    <option value="NumericLessThan"> &#60; (Numeric)</option>
                                                    <option value="NumericLessThanEquals"> &#60;= (Numeric)</option>*/}
                                                  </select>
                                                </div>
                                                <div className="inputField field_3">
                                                  {(() => {
                                                    if (con.field === "tags") {
                                                      return (
                                                          <select name="" id="" value={con.value} onChange={(e) => handelFilterFieldChange('value', value.index, con.and, e)} >
                                                            <option value="">Select tag</option>
                                                            {tags.map((item, index) => {
                                                              return (
                                                                  <option value={item._id}>{item.name}</option>
                                                              )})
                                                            }
                                                          </select>
                                                      )
                                                    } else if (con.field === "status") {
                                                      return (
                                                          <select name="" id="" value={con.value} onChange={(e) => handelFilterFieldChange('value', value.index, con.and, e)} >
                                                            <option value="">Select status</option>
                                                            {statusList.map((item, index) => {
                                                              return (
                                                                  <option value={item._id}>{item.name} ({item.phaseDetails.name})</option>
                                                              )})
                                                            }
                                                          </select>
                                                      )
                                                    } else if (con.field === "phase") {
                                                      return (
                                                          <select name="" id="" value={con.value} onChange={(e) => handelFilterFieldChange('value', value.index, con.and, e)} >
                                                            <option value="">Select phase</option>
                                                            {phaseList.map((item, index) => {
                                                              return (
                                                                  <option value={item._id}>{item.name}</option>
                                                              )})
                                                            }
                                                          </select>
                                                      )
                                                    } else if (con.field === "gender") {
                                                      return (
                                                          <select name="" id="" value={con.value} onChange={(e) => handelFilterFieldChange('value', value.index, con.and, e)} >
                                                            <option value="">Select gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="others">Others</option>
                                                          </select>
                                                      )
                                                    } else {
                                                      return (
                                                          <input type={con.filedValue ? con.filedValue : "text"} name="" id="" value={con.value} onChange={(e) => handelFilterFieldChange('value', value.index, con.and, e)} />
                                                      )
                                                    }
                                                  })()}
                                                </div>
                                                {
                                                  (con.and === 1 && value.index === 0) ?
                                                    "" :
                                                    <div className="deleteButton">
                                                      <button onClick={() => deleteNodeFiler(con, value.index)}><img src={trashIcon} alt="" /></button>
                                                    </div>
                                                }
                                              </div>
                                            </>
                                          )
                                        }) : ""
                                      }
                                      <div className="addFormFieldsButton">
                                        <button onClick={() => addAnd(index)}>
                                          <span className="addFields"><img src={whiteAddIcon} alt="" /></span>
                                          And
                                        </button>
                                      </div>
                                    </>
                                  )
                                })) : ""}
                                <div className="addOrButton">
                                  <div className="addFormFieldsButton orButton">
                                    <button onClick={() => addOr()}>
                                      <span className="addFields"><img src={whiteSlash} alt="" /></span>
                                      or
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="saveButton updateButton">
                              <button onClick={updateFilterData}>Update <img src={chevron_right_white_24dp} alt="" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    : ""))))))) : ""}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default AutomationBuilder;
