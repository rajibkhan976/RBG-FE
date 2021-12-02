import react from 'react';


const SuccessAlert = (props) => {
    return(
        <div className={props.extraClass ? "popupMessage success " + props.extraClass + "" : "popupMessage success"}>
            <p>{props.message}</p>
        </div>
    )
}

export default SuccessAlert; 