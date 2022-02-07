import react from 'react';


const WarningAlert = (props) => {
    return(
        <div className={props.extraClass ? "popupMessage warning " + props.extraClass + "" : "popupMessage warning"}>
            <p>{props.message}</p>
        </div>
    )
}

export default WarningAlert;