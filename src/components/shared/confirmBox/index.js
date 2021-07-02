import { directive } from '@babel/types';
import react from 'react';


const ConfirmBox = () => {
    return (
        <div className="customAlert">
            <div className="alertBackscreen"></div>
            <div className="alertBox">
                <div className="alertBoxHead">
                    <button class="btn btn-closeSideMenu"><span></span><span></span></button>
                </div>
                <div className="alertBoxBody">
                    <p>Are you sure, you want to delete the list ?</p>
                </div>
                <div className="alertBoxFooter">
                    <button class="saveNnewBtn">
                        <span>Yes</span>
                    </button>
                    <button class="btn-link">Cancel</button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmBox;