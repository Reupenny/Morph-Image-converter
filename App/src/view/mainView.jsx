import { useState, useEffect } from 'react'
import { blobToURL } from 'image-resize-compress';
import { imageConverter } from '../model/imageConverter';
import FileUploader from '../model/fileUpload';

function MainView({ controller }) {
    const [files, setFiles] = useState([])
    const [url, seturl] = useState()
    const [quality, setQuality] = useState(100)
    const [width, setWidth] = useState('auto')
    const [height, setHeight] = useState('auto')
    const [format, setFormat] = useState('webp')
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);


    useEffect(() => {
        async function processFiles() {
            if (files) {
                for (const file of files) {
                    try {
                        const resizedBlob = await imageConverter(file, quality, width, height, format)
                        controller.createPreset(format, quality, width, height)
                        const url = await blobToURL(resizedBlob);
                        seturl(url);
                    } catch (error) {
                        console.error("Error processing image:", error);
                    }
                }
            }
        }

        processFiles();
    }, [files, quality, width, height, format])
    const handleChange = (e) => {
        const { id, value } = e.target
        switch (id) {
            case 'newQuality':
                setQuality(value)
                break
            case 'newType':
                setFormat(value)
                break
            case 'newWidth':
                setWidth(value)
                break
            case 'newHeight':
                setHeight(value)
                break
            default:
                break
        }
    }


    return (
        <div onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}>
            <div>
                <form action="">
                    <select id="newType" name="newType" onChange={handleChange}>
                        <option value="" disabled>File Type</option>
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="webp">WEBP</option>
                    </select>
                    <input type="number" id="newQuality" name="newQuality" value={quality} onChange={handleChange} max={100} min={1} />
                    <input type="string" id="newWidth" name="newWidth" value={width} onChange={handleChange} max={100} min={1} />
                    <input type="string" id="newHeight" name="newHeight" value={height} onChange={handleChange} max={100} min={1} />
                </form>
            </div>
            <FileUploader uploadedFiles={setFiles} setDragging={setIsDragging} isDragging={isDragging} />
            {url && <img src={url} alt="Resized image" />}
        </div>
    )
}

export default MainView
