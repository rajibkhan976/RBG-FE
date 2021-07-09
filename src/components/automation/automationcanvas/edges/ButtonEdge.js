import React from 'react';
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from 'react-flow-renderer';

import './ButtonEdge.css';

export default function CustomEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       data,
                                       arrowHeadType,
                                       markerEndId,
                                   }, props) {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    const foreignObjectSize = 40;

    const onEdgeClick = (id) => {
        data.onRemove(id)
    };
    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                <button
                    className="edgebutton"
                    onClick={() => onEdgeClick(id)}
                >
                    ×
                </button>
                </body>
            </foreignObject>
        </>
    );
}