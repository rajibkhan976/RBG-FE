import react from 'react';


const SuccessAlert = (props) => {
    return(
        <div className="popupMessage success">
            <p>{props.message}</p>
        </div>
    )
}

export default SuccessAlert; 