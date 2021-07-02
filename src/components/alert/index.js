import { directive } from '@babel/types';
import react from 'react';


const CustomAlert = (props) => {
    const confirmed = (isConfirmed) => {
        props.callback(isConfirmed);
    }
    return (
        <div className="customAlert">
            <div className="alertBackscreen"></div>
            <div className="alertBox">
                <div className="alertBoxHead">
                    <button class="btn btn-closeSideMenu" onClick={() => confirmed("cancel")}><span></span><span></span></button>
                </div>
                <div className="alertBoxBody">
                    <p>Are you sure, you want to delete the list ?</p>
                </div>
                <div className="alertBoxFooter">
                    <button class="saveNnewBtn" onClick={() => confirmed("yes")}>
                        <span>Yes</span>
                    </button>
                    <button class="btn-link" onClick={() => confirmed("cancel")}>Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default CustomAlert;