import React, {useState} from "react";
import {useDropzone} from 'react-dropzone'
import {ThumbsDefault} from "./ThumbsDefault";

export function DragAndDrop({onFileChange = null}) {
    const [files, setFiles] = useState([]);

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            }));
            if (onFileChange) {
                onFileChange(acceptedFiles)
            }
        },
    });

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps({multiple: false})} />
                <ThumbsDefault files={files}/>
            </div>

        </section>
    );
}
