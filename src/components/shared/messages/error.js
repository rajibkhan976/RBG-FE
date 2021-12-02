import react from 'react';


const ErrorAlert = (props) => {
    return(
        <div className={props.extraClass ? "popupMessage error " + props.extraClass + "" : "popupMessage error"}>
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorAlert;