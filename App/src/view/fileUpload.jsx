import React, { useState } from "react";

function FileUploader({ uploadedFiles, setDragging, isDragging }) {
    const [files, setFiles] = useState([])

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles)
        uploadedFiles(droppedFiles)
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`uploader ${isDragging ? "glow" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        // onDragEnter={() => setDragging(true)}
        // onDragLeave={() => setDragging(false)}
        ><i className="morphIcons icon-Add-file"></i>
            <p>Drag and drop images here</p>
            <div>
                {files.map((file, index) => (
                    <p key={index}>{file.name}</p>
                ))}
            </div>
        </div>
    );
}

export default FileUploader;
