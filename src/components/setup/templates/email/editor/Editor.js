import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = (props) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
        {/* Bold
        Italics
        Underline
        Alignment
        Ordered listing
        Unordered listing
        Case change
        Heading
        Color
        Image
        Hyperlink
        Table
        Code */}
            <Editor
                apiKey="91qkaw0vhg0xwousdvvdhjztavstam75oa7th9v5rkrbd31v"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: "100%",
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen',
                    //     'insertdatetime media table paste code help wordcount'
                    // ],
                    toolbar: [
                        'bold italic backcolor | alignleft aligncenter | alignright alignjustify | bullist numlist outdent indent | removeformat',
                        'undo redo | help'
                    ],
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    )
}

export default EditorComponent;