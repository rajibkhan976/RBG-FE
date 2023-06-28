import React, {useState, useRef, useEffect} from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls, isEdge,
} from "react-flow-renderer";
import {useDispatch} from "react-redux";
import "./automation.css";
import {
    FilterNode,
    TriggerNode,
    ActionEmail,
    ActionMessage,
    ActionDelay,
    FieldActionTrigger,
    ActionStatusPhaseUpdate,
    AppointmentTrigger,
    AttendanceTrigger,
    TransactionTrigger,
    ActionRemoveTag,
    ActionApplyTag,
    TagTrigger,
    AutomationTag,
    NotificationTag
} from "./nodes";
import {CustomEdge} from './edges';
import resetIcon from "../../../assets/images/resetIcon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import Loader from "../../shared/Loader";
import {AutomationServices} from "../../../services/automation/AutomationServices";
import * as actionTypes from "../../../actions/types";
import Message from "./modals/message";
import Email from "./modals/email";
import Delay from "./modals/delay";
import Filter from "./modals/filter";
import WebhookTrigger from "./modals/WebhookTrigger";
import FieldTrigger from "./modals/FieldTrigger";
import ActionStatusPhaseModal from "./modals/ActionStatusPhase"
import AttendanceTriggerSetting from "./modals/AttendanceTriggerSetting"
import TagModal from "./modals/TagModal";
import RemoveTagModal from "./modals/RemoveTagModal";
import AutomationModal from "./modals/AutomationModal";
import NotificationModal from "./modals/NotificationModal";
import AppointmentTriggerSetting from "./modals/AppointmentTriggerSetting"
import TransactionTriggerSetting from "./modals/TransactionTriggerSetting"
import TagTriggerSetting from "./modals/TagTriggerSetting"
import NotificationGroupModal from "./modals/NotificationGroupModal";
import {ContactService} from "../../../services/contact/ContactServices";
import {SMSServices} from "../../../services/template/SMSServices";
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
    const [body, setBody] = useState('');
    const [bodyError, setBodyError] = useState(false);
    const [nId, setNId] = useState(false);
    const [webhookData, setWebhookData] = useState([]);
    const [messageData, setMessageData] = useState([]);
    const [messageBody, setMessageBody] = useState("");
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
    const [emailTemplateId, setEmailTemplateId] = useState('');
    const [bodyEmailError, setBodyEmailError] = useState(false);
    const [nodeEmailId, setNodeEmailId] = useState(false);
    const [triggerNodeId, setTriggerNodeId] = useState(0);
    const [fieldTriggerNodeId, setFieldTriggerNodeId] = useState(0);
    const [tagNodeId, setTagNodeId] = useState(0);
    const [cursorElement, setCursorElement] = useState(false);
    const [filterConditions, setFilterConditions] = useState([]);
    const [filterAnd, setFilterAnd] = useState(0);
    const [filterOr, setFilterOr] = useState(0);
    const [filterId, setFilterId] = useState(0);
    const [status, setStatus] = useState("");
    const [phase, setPhase] = useState("");
    const [statusPhaseNodeId, setStatusPhaseNodeId] = useState(0);
    const [tags, setTags] = useState([]);
    const [notificationData, setNotificationData] = useState({});
    const [statusList, setStatusList] = useState([]);
    const [phaseList, setPhaseList] = useState([]);
    const [statusPhaseData, setStatusPhaseData] = useState([]);
    const [module, setModule] = useState('contact');
    const [event, setEvent] = useState({
        create: false,
        update: false,
        delete: false
    });
    const [automationActionId, setAutomationActionId] = useState("");
    const [mergeFields, setMergeFields] = useState({});
    const [automationEvents, setAutomationEvents] = useState({
        addAutomation: false,
        removeAutomation: false
    });
    const dispatch = useDispatch();
    const edgeTypes = {
        buttonedge: CustomEdge,
    };
    const edgeType = 'buttonedge';
    const nodeTypes = {
        trigger: TriggerNode,
        appointmentTrigger: AppointmentTrigger,
        attendanceTrigger: AttendanceTrigger,
        transactionTrigger: TransactionTrigger,
        tagTrigger: TagTrigger,
        actionApplyTag: ActionApplyTag,
        actionRemoveTag: ActionRemoveTag,
        automationTag: AutomationTag,
        notificationTag: NotificationTag,
        filter: FilterNode,
        actionEmail: ActionEmail,
        actionMessage: ActionMessage,
        actionDelay: ActionDelay,
        fieldActionTrigger: FieldActionTrigger,
        actionStatusPhaseUpdate: ActionStatusPhaseUpdate,
    };
    const onNodeMouseEnter = (event, node) => {
        const thisNodeTarget = event.target;
        const thisNodeType = node.data.label;
        if (
            document.querySelector(".btnEditNode") !== null &&
            document.querySelectorAll(".btnEditNode").length > -1
        ) {
            for (
                let i = 0;
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
                let i = 0;
                i < document.querySelectorAll(".btnDeleteNode").length;
                i++
            ) {
                document.querySelectorAll(".btnDeleteNode")[i].remove();
            }
        }

        const editButton = document.createElement("button");
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
        const deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "btn",
            "btnDeleteNode",
            thisNodeType.toLowerCase() + "-Deletebtn"
        );
        deleteButton.addEventListener("click", (event) =>
            deleteNode(event, node)
        );
        switch (thisNodeType) {
            case "Trigger":
                editButton.addEventListener("click", (event) =>
                    webhookTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "FieldActionTrigger":
                editButton.addEventListener("click", (event) =>
                    fieldTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "AppointmentTrigger":
                editButton.addEventListener("click", (event) =>
                    appointmentTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "AttendanceTrigger":
                editButton.addEventListener("click", (event) =>
                    attendanceTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "TransactionTrigger":
                editButton.addEventListener("click", (event) =>
                    transactionTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "TagTrigger":
                editButton.addEventListener("click", (event) =>
                    tagTriggerSetting(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                /*thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);*/
                break;
            case "Filter":
                editButton.addEventListener("click", (event) =>
                    filterEdit(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;

            case "ActionEmail":
                editButton.addEventListener("click", (event) =>
                    actionEdit(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node-actionEmail").appendChild(deleteButton);
                break;

            case "ActionMessage":
                editButton.addEventListener("click", (event) =>
                    actionMessageEdit(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node-actionMessage").appendChild(deleteButton);
                break;
            case "ActionStatusPhaseUpdate":
                editButton.addEventListener("click", (event) =>
                    actionStatusPhaseEdit(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;
            case "ActionDelay":
                editButton.addEventListener("click", (event) =>
                    actionDelayEdit(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;
            case "ActionRemoveTag":
                editButton.addEventListener("click", (event) =>
                    actionRemoveTag(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;
            case "AutomationTag":
                editButton.addEventListener("click", (event) =>
                    automationTag(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;
            case "NotificationTag":
                editButton.addEventListener("click", (event) =>
                    notificationTag(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
                thisNodeTarget.closest(".react-flow__node").appendChild(deleteButton);
                break;
            case "ActionApplyTag":
                editButton.addEventListener("click", (event) =>
                    actionApplyTag(event, node)
                );
                thisNodeTarget.closest(".react-flow__node").appendChild(editButton);
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
        setSubject(n.data.subject);
        setBodyEmail(n.data.body);
        setEmailTemplateId(n.data.template);
        setNodeEmailId(n.id);
        if (n.data.data !== undefined) {
            setEmailData(n.data.data);
        } else {
            setEmailData([]);
        }
        setAutomationModal("actionEmail");
    };
    const actionMessageEdit = (e, n) => {
        setBody(n.data.body);
        setNId(n.id);
        if (n.data.data !== undefined) {
            setMessageBody(n.data.data);
        } else {
            setMessageBody([]);
        }
        setAutomationModal("actionMessage");
    };
    const actionStatusPhaseEdit = (e, n) => {
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
    const actionApplyTag = (e, n) => {
        setTagNodeId(n);
        setAutomationModal("actionApplyTag");
    };
    const actionRemoveTag = (e, n) => {
        setTagNodeId(n);
        setAutomationModal("actionRemoveTag");
    };
    const automationTag = (e, n) => {
        setTagNodeId(n);
        setAutomationActionId(n.data.automationId);
        setAutomationEvents(n.data.events);
        setAutomationModal("automationTag");
    };
    const notificationTag = (e, n) => {
        setTagNodeId(n);
        if (n.data !== undefined) {
            setNotificationData(n.data);
        } else {
            setNotificationData([]);
        }
        setAutomationModal("notificationTag");

    };
    const refreshWebhook = async (id, nodeI) => {
        setWebhookData([]);
        if (id) {
            let payload = {'unique_id': id};
            setIsLoader(true);
            let fetchFields = await AutomationServices.fetchFields(JSON.stringify(payload));
            setIsLoader(false);
            if (fetchFields.data.success) {
                setWebhookData(fetchFields.data.data);
                setElements((elms) =>
                    elms.map((el) => {
                        if (el.id === nodeI) {
                            el.data.data = fetchFields.data.data;
                        } else {
                            el.data.data = fetchFields.data.data;
                        }
                        return {...el};
                    })
                );
            } else {
                console.log("api error ! " + fetchFields.data.message);
            }
        }
    };
    const fieldTriggerSetting = async (e, n) => {
        setModule(n.data.module);
        setEvent(n.data.event);
        setFieldTriggerNodeId(n.id);
        setAutomationModal("fieldTrigger");
    };
    const appointmentTriggerSetting = async (e, n) => {
        setModule(n.data.module);
        setEvent(n.data.event);
        setFieldTriggerNodeId(n.id);
        setAutomationModal("appointmentTrigger");
    };
    const attendanceTriggerSetting = async (e, n) => {
        setModule(n.data.module);
        setEvent(n.data.event);
        setFieldTriggerNodeId(n.id);
        setAutomationModal("attendanceTrigger");
    };
    const transactionTriggerSetting = async (e, n) => {
        setModule(n.data.module);
        setEvent(n.data.event);
        setFieldTriggerNodeId(n.id);
        setAutomationModal("transactionTrigger");
    };
    const tagTriggerSetting = async (e, n) => {
        setModule(n.data.module);
        setEvent(n.data.event);
        setFieldTriggerNodeId(n.id);
        setAutomationModal("tagTrigger");
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
                } else {
                    el.data.data = fields;
                }
                return {...el};
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
    const handleDelayChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        if (isNaN(value) || value < 0) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "Only numeric value allowed.",
                typeMessage: 'error'
            });
        } else {
            setDelayTime(event.target.value);
        }
    }
    const handleDelayTypeChange = (event) => {
        event.preventDefault();
        setDelayType(event.target.value);
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
                return {...el};
            })
        );
    };
    const onConnect = async (params) => {
        let validate = getConnectionDetails(params.source, params.target);
        if (validate) {
            const edge = getEdgeId();
            await setElements((els) =>
                addEdge(
                    {...params, id: edge, type: edgeType, animated: true, data: {onRemove: onEdgeClick, source: params.source, target: params.target}},
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
                    {...params, id: id, type: "smoothstep", style: {stroke: "red"}},
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
                                style: {stroke: "red"},
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
            let elementId = elementsToRemove[0].id;
            let updatedElem = [...elements];
            let deletedIds = [];
            deletedIds.push(elementId);
            updatedElem.map(el => {
                if (el.type === "buttonedge" && (el.source === elementId || el.target === elementId)) {
                    deletedIds.push(el.id)
                }
            });
            updatedElem = updatedElem.filter(el => !deletedIds.includes(el.id));
            updatedElem.map(elem => {
                if (elem && elem.data && elem.data.nodes && elem.data.nodes && elem.data.nodes.previous && elem.data.nodes.previous.includes(elementId)) {
                    elem.data.nodes.previous = "";
                }
                if (elem && elem.data && elem.data.nodes && elem.data.nodes && elem.data.nodes.next && elem.data.nodes.next.includes(elementId)) {
                    let value2 = elem.data.nodes.next;
                    elem.data.nodes.next = value2.filter(fil => fil !== elementId);
                }
            });
            setElements(updatedElem);
        }
    };
    const deleteNode = async (e, elm) => {
        onElementsRemove([elm]);
        if (elm.type === 'trigger' && elm.data.id) {
            let payload = {'unique_id': elm.data.id};
            await AutomationServices.deleteWebhookNode(JSON.stringify(payload));
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
                return {...el};
            })
        );
    };
    const resetAutomation = () => {
        setElements(originalElements);
        setIdNode(idOriginalNode);
        setIdEdge(idOriginalEdge);
    };
    const saveMessage = async (body, nId) => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.id === nId) {
                    el.data.body = body;
                }
                return {...el};
            })
        );
        closeFilterModal();
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
                    return {...el};
                })
            );
            closeFilterModal();
        }
    };
    const saveTag = (id, selected) => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.id === id) {
                    el.data.tag = selected;
                }
                return {...el};
            })
        );
        closeFilterModal();
    };

    const saveAutomationAction = (nodeId, events, automationId) => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.id === nodeId) {
                    el.data.events = events;
                    el.data.automationId = automationId;
                }
                return {...el};
            })
        );
        closeFilterModal();
    };
    const saveNotification = (nodeId, searchResult, isSendEmail, isSendSMS, emailData, changedTemplate, smsData) => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.id === nodeId) {
                    console.log("el", el)
                    el.data.recipents = searchResult;
                    el.data.isSendEmail = isSendEmail;
                    el.data.isSendSMS = isSendSMS;
                    el.data.subject = emailData.subject;
                    el.data.emailBody = changedTemplate;
                    el.data.smsBody = smsData;
                    el.data.emailData = emailData;
                }
                return {...el};
            })
        );
        closeFilterModal();
    }
    const saveStatusPhase = (nodeId, status, phase) => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.id === nodeId) {
                    el.data.status = status;
                    el.data.phase = phase;
                }
                return {...el};
            })
        );
        closeFilterModal();
    }
    const saveEmail = async (template, subject, templateId) => {
        let count = 0;
        if (!subject) {
            setSubjectError('bounce');
            count = count + 1;
        }
        if (!template) {
            setBodyEmailError('bounce');
            count = count + 1;
        }
        removeClass();
        if (count === 0) {
            setElements((elms) =>
                elms.map((el) => {
                    if (el.id === nodeEmailId) {
                        el.data.subject = subject;
                        el.data.body = template;
                        el.data.template = templateId;
                    }
                    return {...el};
                })
            );
            closeFilterModal();
        }
    };
    const saveAutomation = async () => {
        try {
            if (!automationName.trim()) {
                setAutomationNameError('bounce');
                removeClass();
            } else {
                const bluePrintElem = elements.filter(
                    (el) => typeof el.source == "undefined"
                );
                const brokenElem = bluePrintElem.find((el) => {
                    if (
                        ((el.type !== "fieldActionTrigger" && el.data.nodes.previous === "") && (el.type !== "trigger" && el.data.nodes.previous === ""))
                        && (el.type !== "attendanceTrigger" && el.data.nodes.previous === "")
                        && (el.type !== "appointmentTrigger" && el.data.nodes.previous === "")
                        && (el.type !== "transactionTrigger" && el.data.nodes.previous === "")
                        && (el.type !== "tagTrigger" && el.data.nodes.previous === "")
                        ||
                        (
                            (el.type === "fieldActionTrigger" && el.data.nodes.next.length === 0)
                            && (el.type === "trigger" && el.data.nodes.next.length === 0)
                            && (el.type === "attendanceTrigger" && el.data.nodes.next.length === 0)
                            && (el.type === "appointmentTrigger" && el.data.nodes.next.length === 0)
                            && (el.type === "transactionTrigger" && el.data.nodes.next.length === 0)
                            && (el.type === "tagTrigger" && el.data.nodes.next.length === 0)
                        )

                    ) {
                        return el;
                    }
                });
                console.log("broken elem", brokenElem)
                if (typeof brokenElem == "undefined") {
                    let payload = {
                        name: automationName,
                        id: automationId,
                        nodeId: idNode,
                        edgeId: idEdge,
                        blueprint: elements
                    };
                    setIsLoader(true);
                    try {
                        if (automationId) {
                            let payloadArn = {id: automationId};
                            await AutomationServices.deleteArn(
                                JSON.stringify(payloadArn)
                            );
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    await AutomationServices.saveAutomation(JSON.stringify(payload));
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
            setBodyError('');
            setToEmailError('');
            setSubjectError('');
            setBodyEmailError('');
            setDelayDataError('');
        }, 1500);
    };
    const generateUrlOfWebhook = async (nodeId) => {
        let payload = {"id": 0};
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
                    return {...el};
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
            appointmentTrigger: "AppointmentTrigger",
            attendanceTrigger: "AttendanceTrigger",
            transactionTrigger: "TransactionTrigger",
            tagTrigger: "TagTrigger",
            actionEmail: "ActionEmail",
            filter: "Filter",
            actionMessage: "ActionMessage",
            actionDelay: "ActionDelay",
            fieldActionTrigger: "FieldActionTrigger",
            actionStatusPhaseUpdate: "ActionStatusPhaseUpdate",
            actionApplyTag: "ActionApplyTag",
            actionRemoveTag: "ActionRemoveTag",
            automationTag: "AutomationTag",
            notificationTag: "NotificationTag",

        };
        let newNode = {};
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        let filteredElements = elements.filter(el => (el.type === 'trigger' || el.type === 'fieldActionTrigger' || el.type === 'appointmentTrigger' ||
            el.type === 'attendanceTrigger' || el.type === 'transactionTrigger' || el.type === 'tagTrigger'));
        if (filteredElements.length) {
            if (type === 'trigger' || type === 'fieldActionTrigger' || type === 'appointmentTrigger' ||
                type === 'attendanceTrigger' || type === 'transactionTrigger' || type === 'tagTrigger') {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "One automation can have only one trigger.",
                    typeMessage: 'error'
                });
                return false;
            }
        } else {
            if (type === 'actionDelay' || type === 'actionStatusPhaseUpdate' || type === 'filter' || type === 'actionApplyTag'
                || type === 'actionRemoveTag' || type === 'actionMessage' || type === 'actionEmail' || type === 'notificationTag' || type === 'automationTag') {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "Please pull a trigger first.",
                    typeMessage: 'error'
                });
                return false;
            }
        }
        if (type === 'trigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    url: '',
                    id: '',
                    data: {}
                },
            };
            setElements((es) => es.concat(newNode));
            generateUrlOfWebhook(newNode.id);
        } else if (type === 'fieldActionTrigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
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
        } else if (type === 'attendanceTrigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    module: 'attendance',
                    event: {
                        checkIn: false,
                        lastAttended: false,
                        day: "0"
                    },
                    data: {}
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'appointmentTrigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    module: 'appointment',
                    event: {
                        appointmentCanceled: false,
                        appointmentCompleted: false,
                        appointmentRescheduled: false,
                        appointmentCreate: false,
                        day: "0"
                    },
                    data: {}
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'transactionTrigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    module: 'transaction',
                    event: {
                        transactionSuccess: false,
                        transactionFailed: false,
                        transactionBefore: false,
                        day: "0"
                    },
                    data: {}
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'tagTrigger') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    module: 'tag',
                    event: {
                        addTags: true,
                        removeTags: false,
                        selectedTag: {value: '', label: 'Please select a tag.'}
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
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
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
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_EMAIL,
                    template: '',
                    subject: '',
                    body: '',
                    to: ''
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'actionDelay') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
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
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_STATUS_PHASE,
                    status: '',
                    phase: ''
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'actionApplyTag') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_APPLY_TAG,
                    tag: ""
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'actionRemoveTag') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_REMOVE_TAG,
                    tag: ""
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'automationTag') {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_AUTOMATION,
                    action: "addToAutomation",
                    automationId: "",
                    events: {
                        addAutomation: false,
                        removeAutomation: false
                    }
                },
            };
            setElements((es) => es.concat(newNode));
        } else if (type === 'notificationTag') {

            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
                    arn: process.env.REACT_APP_ACTION_NOTIFICATION,
                    tag: "",
                    recipents: [],
                    isSendEmail: true,
                    isSendSMS: true,
                    subject: "",
                    emailBody: "",
                    emailData: {
                        "_id": "",
                        "email": "",
                        "subject": "",
                        "template": ""
                    },
                    smsBody: ""
                },
            };
            setElements((es) => es.concat(newNode));
        } else {
            newNode = {
                id: getNodeId(type),
                type,
                position,
                data: {
                    data: mergeFields,
                    label: `${types[type]}`,
                    nodes: {next: [], previous: ""},
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
        if (sourceType === 'fieldActionTrigger'
            || sourceType === 'attendanceTrigger'
            || sourceType === 'transactionTrigger'
            || sourceType === 'tagTrigger'
            || sourceType === 'appointmentTrigger') {
            sourceType = 'trigger';
        }
        if (sourceType === 'actionMessage' || sourceType === 'actionEmail' || sourceType === 'actionDelay' ||
            sourceType === 'actionStatusPhaseUpdate' || sourceType === 'actionApplyTag' || sourceType === 'actionRemoveTag' ||
            sourceType === 'notificationTag' || sourceType === 'automationTag') {
            sourceType = 'action';
        }
        if (targetType === 'actionMessage' || targetType === 'actionEmail' || targetType === 'actionDelay' ||
            targetType === 'actionStatusPhaseUpdate' || targetType === 'actionApplyTag' || targetType === 'actionRemoveTag' ||
            targetType === 'notificationTag' || targetType === 'automationTag') {
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
                return {...el};
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
                    return {...el};
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
                                    con.value = "";
                                    con.condition = "";
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
                        return {...con};
                    })
                }
                return {...el};
            })
        );
    }
    const onEdgeClick = (id, data) => {
        if (id && data.source && data.target) {
            console.log(id, data)
            let updatedElem = [...elements];
            updatedElem = updatedElem.filter(el => el.id !== id);
            updatedElem.map(elem => {
                if (elem && elem.data && elem.data.nodes && elem.data.nodes && elem.data.nodes.next && elem.data.nodes.next.includes(data.source)) {
                    let value2 = elem.data.nodes.next;
                    elem.data.nodes.next = value2.filter(fil => fil !== data.source);
                }
                if (elem && elem.data && elem.data.nodes && elem.data.nodes && elem.data.nodes.previous && elem.data.nodes.previous === data.target) {
                    elem.data.nodes.previous = "";
                }
            });
            setElements(updatedElem);
        } else {
            console.log('Not possible as this is an old automation.')
        }
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
    const fetchMergeFieldData = async () => {
        try {
            let fieldsApiResponse = await ContactService.fetchFields();
            setMergeFields(fieldsApiResponse.fields)
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
            setElements((elms) =>
                elms.map((el) => {
                    if (isEdge(el)) {
                        el.data = {onRemove: onEdgeClick}
                    }
                    if (el.id === filterId) {
                        el.data.and = filterAnd;
                    }
                    return {...el};
                })
            );
        }
        fetchTagStatusPhase();
        fetchMergeFieldData();
    }, [props.automationElement]);
    return (
        <>
            {isLoader ? <Loader/> : ''}
            <div className="automationDnD">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <div className="automationRow">
                            <div className="automationTopLeft">
                                <input type="text" className={`automationNameArea ${automationNameError}`}
                                       placeholder="Enter your automation name" onChange={handleNameChange}
                                       value={automationName}/>
                                <div className="automationPublish">
                                    <button className="automationPublishBtn" onClick={saveAutomation}>
                                        <img src={plus_icon} alt=""/>
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
                                    <img src={resetIcon} alt=""/>
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
                            style={{background: bgColor}}
                            onNodeDragStop={onNodeDragStop}
                        >
                            <Controls/>
                        </ReactFlow>
                    </div>
                    {(() => {
                        switch (automationModal) {
                            case 'actionStatusPhase':
                                return <ActionStatusPhaseModal closeFilterModal={closeFilterModal}
                                                               nodeId={statusPhaseNodeId}
                                                               status={status} phase={phase}
                                                               saveStatusPhase={saveStatusPhase}/>
                            case 'fieldTrigger':
                                return <FieldTrigger closeFilterModal={closeFilterModal} nodeId={fieldTriggerNodeId}
                                                     module={module}
                                                     event={event} saveFieldtrigger={saveFieldtrigger}/>
                            case 'attendanceTrigger':
                                return <AttendanceTriggerSetting
                                    closeFilterModal={closeFilterModal}
                                    nodeId={fieldTriggerNodeId}
                                    module={module}
                                    event={event}
                                    saveFieldtrigger={saveFieldtrigger}
                                />
                            case 'appointmentTrigger':
                                return <AppointmentTriggerSetting
                                    closeFilterModal={closeFilterModal}
                                    nodeId={fieldTriggerNodeId}
                                    module={module}
                                    event={event}
                                    saveFieldtrigger={saveFieldtrigger}
                                />
                            case 'transactionTrigger':
                                return <TransactionTriggerSetting
                                    closeFilterModal={closeFilterModal}
                                    nodeId={fieldTriggerNodeId}
                                    module={module}
                                    event={event}
                                    saveFieldtrigger={saveFieldtrigger}
                                />
                            case 'tagTrigger':
                                return <TagTriggerSetting
                                    closeFilterModal={closeFilterModal}
                                    nodeId={fieldTriggerNodeId}
                                    module={module}
                                    event={event}
                                    saveFieldtrigger={saveFieldtrigger}
                                />
                            case 'webhookTrigger':
                                return <WebhookTrigger closeFilterModal={closeFilterModal} automationUrl={automationUrl}
                                                       onClickCopy={onClickCopy} refreshWebhook={refreshWebhook}
                                                       webhookData={webhookData} automationUrlId={automationUrlId}
                                                       triggerNodeId={triggerNodeId}/>
                            case 'actionMessage':
                                return <Message closeFilterModal={closeFilterModal} body={body} triggerNodeId={nId}
                                                saveMessage={saveMessage}/>
                            case 'actionEmail':
                                return <Email closeFilterModal={closeFilterModal} triggerNodeId={triggerNodeId}
                                              saveEmail={saveEmail} subject={subject} body={bodyEmail} selectedTemplate={emailTemplateId}/>
                            case 'actionDelay':
                                return <Delay closeFilterModal={closeFilterModal} triggerNodeId={triggerNodeId}
                                              saveDelay={saveDelay}
                                              handleDelayTypeChange={handleDelayTypeChange} delayType={delayType}
                                              handleDelayChange={handleDelayChange} delayTime={delayTime}
                                              delayDataError={delayDataError}/>
                            case 'filter':
                                return <Filter closeFilterModal={closeFilterModal} triggerNodeId={triggerNodeId}
                                               filterConditions={filterConditions}
                                               handelFilterFieldChange={handelFilterFieldChange}
                                               filterData={filterData} tags={tags} statusList={statusList}
                                               phaseList={phaseList}
                                               deleteNodeFiler={deleteNodeFiler} addAnd={addAnd} addOr={addOr}
                                               updateFilterData={updateFilterData}/>
                            case 'actionApplyTag':
                                return <TagModal tagModalType="Apply" closeFilterModal={closeFilterModal}
                                                 saveTag={saveTag} elem={tagNodeId}/>
                            case 'actionRemoveTag':
                                return <RemoveTagModal tagModalType="Remove" closeFilterModal={closeFilterModal}
                                                       saveTag={saveTag} elem={tagNodeId}/>
                            case 'automationTag':
                                return <AutomationModal closeFilterModal={closeFilterModal}
                                                        saveAutomation={saveAutomationAction}
                                                        elem={tagNodeId} automationId={automationActionId}
                                                        events={automationEvents}/>
                            case 'notificationTag':
                                return <NotificationModal closeFilterModal={closeFilterModal} notificationData={notificationData}  elem={tagNodeId} saveNotification={saveNotification}/>
                            default:
                                return ""
                        }
                    })()}
                </ReactFlowProvider>
            </div>
        </>
    );
};

export default AutomationBuilder;
