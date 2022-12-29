import React, {Fragment, useEffect, useRef, useState} from 'react'
import ReactFlow, {
    ReactFlowProvider
} from "react-flow-renderer";
import "./../automationcanvas/automation.css";
import Loader from "../../shared/Loader";
import {
    FilterNode,
    TriggerNode,
    ActionEmail,
    ActionMessage,
    ActionDelay,
    FieldActionTrigger,
    ActionStatusPhaseUpdate,
    AppointmentTrigger, AttendanceTrigger, TransactionTrigger, ActionApplyTag, ActionRemoveTag, AutomationTag, TagTrigger, NotificationTag
} from "./../automationcanvas/nodes";
import { AutomationServices } from "../../../services/automation/AutomationServices";

export default function AutomationOverview(props) {
    const reactFlowWrapper = useRef(null);
    const [elements, setElements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const edgeTypes = "straight";
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
       // notificationGroupTag: NotificationGroupTag,
        filter: FilterNode,
        actionEmail: ActionEmail,
        actionMessage: ActionMessage,
        actionDelay: ActionDelay,
        fieldActionTrigger: FieldActionTrigger,
        actionStatusPhaseUpdate: ActionStatusPhaseUpdate,
    };
    const [nodeMetrics, setNodeMetrics] = useState({})
    const onLoad = async (_reactFlowInstance) => {
        await fetchAllHistory();
        setTimeout(() => {
           _reactFlowInstance.fitView();    
        });
    }

    const fetchAllHistory = async () => {
        let automationHistory = await AutomationServices.fetchHistory(props.automationId, "all");
        for (let history of automationHistory.data) {
            if (history.completedEvents) {
                // console.log("history", history)
                for (let completedEvent of history.completedEvents) {
                    if (!nodeMetrics[completedEvent]) {
                        nodeMetrics[completedEvent] = {
                            success: 0,
                            failed: 0
                        }
                    }
                    nodeMetrics[completedEvent].success++;
                }
                setNodeMetrics(nodeMetrics);
            }
            props.payload.map((el, i) => {
                if (nodeMetrics[el.id]) {
                    el.data.metrics = nodeMetrics[el.id];
                } else if (!i) {
                    el.data.metrics = { success: automationHistory.pagination.count, failed: 0 }
                }
            })            
        }
        setElements(props.payload)
        setIsLoading(false);
        console.log("nodeMetrics", nodeMetrics)
    }
    
    const getZoom =  (z) => {
        console.log("zoom l", z)
    }
    return (
        <>
            <div className="automationDnD" style={{ height: 650 }}>
                {isLoading ? <Loader /> : ''}
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            elements={elements}
                            onLoad={onLoad}
                            nodeTypes={nodeTypes}
                            data={elements}
                            selectNodesOnDrag={false}
                            edgeTypes={edgeTypes}
                            fitview="true"
                            getZoom={getZoom}
                            attributionPosition={"top-center"}
                            style={{ background: "#140ac2" }}
                            >
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </>
    )
}
