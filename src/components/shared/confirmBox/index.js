// import { directive } from '@babel/types';
import react from 'react';

const ConfirmBox = (props) => {
    const confirmed = (isConfirmed) => {
        props.callback(isConfirmed);
    }
    return (
        <div className="customAlert">
            <div className="alertBackscreen"></div>
            <div className="alertBox">
                <div className="alertBoxHead">
                    <button className="btn btn-closeSideMenu" onClick={() => confirmed("cancel")}><span></span><span></span></button>
                </div>
                <div className="alertBoxBody">
                    <p>Are you sure, you want to delete the list ?</p>
                </div>
                <div className="alertBoxFooter">
                    <button className="saveNnewBtn" onClick={() => confirmed("yes")}>
                        <span>Yes</span>
                    </button>
                    <button className="btn-link" onClick={() => confirmed("cancel")}>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmBox;