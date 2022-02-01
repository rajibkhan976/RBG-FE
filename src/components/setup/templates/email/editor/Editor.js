import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorComponent = (props) => {
  let initialValue = "<p>This is dummy initial value</p>";
  const [value, setValue] = useState(initialValue ?? "");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  console.log("value", value);

  useEffect(()=>{}, [value])

  return (
    <>
      <form
        style={{
          position: "relative",
        }}
        className="h-100"
        method="post"
        id="formEditor"
      >
        <Editor
        //   apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={initialValue}
          theme="advanced"
          onEditorChange={(newText) => setValue(newText)}
          init={{
            height: "100%",
            menubar: false,
            plugins: [
              "advlist autolink lists link image imagetools charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount save autosave",
            ],
            relative_urls: false,
            toolbar: [
              "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
              "undo redo save | help",
            ],
            autosave_interval: "10s",
            save_enablewhendirty: true,
          }}
        />
      </form>
    </>
  );
};

export default EditorComponent;
