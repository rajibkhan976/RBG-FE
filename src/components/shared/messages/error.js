import react from 'react';


const ErrorAlert = (props) => {
    return(
        <div className="popupMessage error">
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorAlert;