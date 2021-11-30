import React, { useEffect, useState } from "react";


const InputFile = (props) => {

    const fileTypes = {
        mp3: "audio/mpeg",
        png: "image/png"
    }

    const fileTypesName = {
        mp3: ".mp3",
        png: ".png"
    }

    const [inputFileChosed, setInputFileChosed] = useState(false);
    const [inputFileName, setInputFileName] = useState("No file chosen");
    const [chosedFileError, setChosedFileError] = useState(false);

    const useInputFile = (e) => {
        if(e.target.files.length > 0) {
            if(e.target.files[0].type === fileTypes[props.fileType]) {
                setInputFileChosed(true);
                setInputFileName(e.target.files[0].name);
            } else {
                setChosedFileError(true);
            }
        }
        console.log(e);
    };

    useEffect(() => {
        setTimeout(() => {
            setChosedFileError(false);
        }, 5000);
    }, [chosedFileError]);

    return (
        <React.Fragment>
            <div className={chosedFileError ? "cmnInputFile error" : "cmnInputFile"}>
                <input type="file" onChange={useInputFile} accept={fileTypes[props.fileType]} />
                <div className="choseFile">Choose File</div>
                <span className={inputFileChosed ? "fileName fileChosed" : "fileName"}>{inputFileName}</span>
            </div>
            {chosedFileError ? 
                <span className="errorMsg">Please chose <strong>{fileTypesName[props.fileType]}</strong> file</span>
            : "" }
        </React.Fragment>
    );
}


export default InputFile;