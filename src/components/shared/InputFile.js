import React, { useState } from "react";


const InputFile = (props) => {

    const [inputFileChosed, setInputFileChosed] = useState(false);
    const [inputFileName, setInputFileName] = useState("No file chosen");

    const useInputFile = (e) => {
        if(e.target.files.length > 0) {
            setInputFileChosed(true);
            setInputFileName(e.target.files[0].name); 
        }
        
        console.log(e);
    };

    return (
        <div className="cmnInputFile">
            <input type="file" onChange={useInputFile} />
            <div className="choseFile">Choose File</div>
            <span className={inputFileChosed ? "fileName fileChosed" : "fileName"}>{inputFileName}</span>
        </div>
    );
}


export default InputFile;