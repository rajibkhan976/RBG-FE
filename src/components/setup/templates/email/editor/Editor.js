import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorComponent = (props) => {
  const [dirty, setDirty] = useState(false)
  const [emailHeader, setEmailHeader] = useState("")

  let initialValue = (props.initialData ? props.initialData.message : "Type here...");
  const [value, setValue] = useState("");
  const editorRef = useRef(null);
  const editorCreateRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const editedEmail = (mailValue) => {
    setValue(mailValue)
  }

  useEffect(()=>{}, [value])

  const saveTemplate = () => {
    let headerInput = document.getElementById("editTemplateHeader").value;

    props.editedEmailTemplate(value.trim() !== "" ? value : props.initialData.message, headerInput.trim() !== "" ? headerInput : props.initialData.header)
    editorRef.current.setDirty(false);
    setDirty(false)
    props.setActiveEmail(null)
  }

  console.log("createNew", props.createNew);

  useEffect(()=>{
    setEmailHeader(props.initialData.header)
  }, [props.initialData.header])

  return (
    <>{props.createNew ? <>
        <Editor
            apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
            onInit={(evt, editor) => (editorCreateRef.current = editor)}
            onDirty={() => setDirty(true)}
            theme="advanced"
            init={{
              height: "100%",
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount save autosave",
              ],
              relative_urls: false,
              toolbar: [
                "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                "undo redo | help",
              ],
              autosave_interval: "10s",
              save_enablewhendirty: true,
            }}
        />
      </> :
      <form
        style={{
          position: "relative",
        }}
        className="h-100"
        method="post"
        id="formEditor"
      >
        {console.log("props.initialData.header", props.initialData.header)}
        <input className="headerEmail" defaultValue={props.initialData.header === emailHeader ? props.initialData.header : emailHeader} id="editTemplateHeader" />
        <Editor
          apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
          onInit={(evt, editor) => (editorRef.current = editor)}
          onDirty={() => setDirty(true)}
          theme="advanced"
          initialValue={initialValue}
          onEditorChange={(newText) => editedEmail(newText)}
          init={{
            height: "100%",
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount save autosave",
            ],
            relative_urls: false,
            toolbar: [
              "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
              "undo redo | help",
            ],
            autosave_interval: "10s",
            save_enablewhendirty: true,
          }}
        />

        <button 
          className="btn btnSave"
          onClick={saveTemplate}
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 16H1.5C1.36739 16 1.24021 15.9473 1.14645 15.8536C1.05268 15.7598 1 15.6326 1 15.5V1.50001C1 1.3674 1.05268 1.24022 1.14645 1.14645C1.24021 1.05269 1.36739 1.00001 1.5 1.00001H11.5C11.5658 0.999628 11.631 1.01224 11.692 1.03712C11.7529 1.06201 11.8083 1.09867 11.855 1.14501L14.855 4.14501C14.9013 4.19173 14.938 4.24714 14.9629 4.30806C14.9878 4.36897 15.0004 4.43421 15 4.50001V15.5C15 15.6326 14.9473 15.7598 14.8536 15.8536C14.7598 15.9473 14.6326 16 14.5 16ZM2 15H14V4.70001L11.3 2.00001H2V15Z"
              fill="#305671"
              stroke="#305671"
              strokeWidth="0.5"
            />
            <path
              d="M10.1521 4.84172H4.88806C4.8219 4.84521 4.7557 4.83552 4.69331 4.81321C4.63092 4.7909 4.57359 4.75641 4.52465 4.71175C4.47571 4.66709 4.43613 4.61314 4.40822 4.55305C4.38031 4.49296 4.36462 4.42793 4.36206 4.36172V1.47972C4.36462 1.41351 4.38031 1.34847 4.40822 1.28838C4.43613 1.22829 4.47571 1.17435 4.52465 1.12969C4.57359 1.08503 4.63092 1.05054 4.69331 1.02823C4.7557 1.00591 4.8219 0.996225 4.88806 0.999719H10.1521C10.2182 0.996225 10.2844 1.00591 10.3468 1.02823C10.4092 1.05054 10.4665 1.08503 10.5155 1.12969C10.5644 1.17435 10.604 1.22829 10.6319 1.28838C10.6598 1.34847 10.6755 1.41351 10.6781 1.47972V4.36172C10.6755 4.42793 10.6598 4.49296 10.6319 4.55305C10.604 4.61314 10.5644 4.66709 10.5155 4.71175C10.4665 4.75641 10.4092 4.7909 10.3468 4.81321C10.2844 4.83552 10.2182 4.84521 10.1521 4.84172ZM5.41506 3.88172H9.62606V1.95972H5.41506V3.88172Z"
              fill="#305671"
              stroke="#305671"
              strokeWidth="0.5"
            />
            <path
              d="M11.6031 12.9205H4.3961C4.26415 12.9245 4.13595 12.8762 4.03947 12.7861C3.94299 12.696 3.88606 12.5714 3.8811 12.4395V7.63946C3.8858 7.50736 3.94261 7.3825 4.03912 7.29217C4.13563 7.20185 4.26398 7.15341 4.3961 7.15746H11.6041C11.7359 7.15341 11.8639 7.20157 11.9604 7.29146C12.0569 7.38136 12.1139 7.50572 12.1191 7.63746V12.4375C12.1147 12.5699 12.0578 12.6952 11.9611 12.7858C11.8643 12.8763 11.7356 12.9248 11.6031 12.9205ZM4.9111 11.9575H11.0891V8.11746H4.9111V11.9575Z"
              fill="#305671"
              stroke="#305671"
              strokeWidth="0.5"
            />
          </svg>
        </button>
      </form>}
    </>
  );
};

export default EditorComponent;
