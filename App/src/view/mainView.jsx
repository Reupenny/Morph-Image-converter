import { useState, useEffect } from 'react'
import { blobToURL } from 'image-resize-compress';
import { imageConverter } from '../model/imageConverter';
import FileUploader from './fileUpload';

function MainView({ controller }) {
    const [files, setFiles] = useState([])
    const [url, seturl] = useState()
    const [presetName, setPresetName] = useState('')
    const [quality, setQuality] = useState(100)
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
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
            case 'newName':
                setPresetName(value)
                break
            default:
                break
        }
    }
    const handleClick = (e) => {
        controller.createPreset(presetName, format, quality, width, height)
    }


    return (
        <div onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}>
            <div className='settings'>
                <form>
                    <div className='row'>
                        <div className="input-container">
                            <select id="newType" name="newType" onChange={handleChange}>
                                <option value="" disabled>Format</option>
                                <option value="png">PNG</option>
                                <option value="jpg">JPG</option>
                                <option value="webp">WEBP</option>
                            </select>
                            <label htmlFor="newType" className={`floating-label ${format ? 'active' : ''}`}>
                                Format
                            </label>
                        </div>
                        <div className="input-container">
                            <input type="number" id="newQuality" name="newQuality" value={quality} onChange={handleChange} max={100} min={1} />
                            <label htmlFor="newQuality" className={`floating-label ${quality ? 'active' : ''}`}>
                                Quality
                            </label>
                        </div>
                    </div><div className='row'>
                        <div className="input-container">
                            <input type="number" id="newWidth" name="newWidth" value={width} onChange={handleChange} max={100} min={0} />
                            <label htmlFor="newWidth" className={`floating-label ${width ? 'active' : ''}`}>
                                Width (px)
                            </label>
                        </div>
                        <div className="input-container">
                            <input type="number" id="newHeight" name="newHeight" value={height} onChange={handleChange} max={100} min={0} />
                            <label htmlFor="newHeight" className={`floating-label ${height ? 'active' : ''}`}>
                                Height (px)
                            </label>
                        </div>
                    </div><div className='row'>
                        <div className="input-container">
                            <input type="text" id="newName" name="newName" value={presetName} onChange={handleChange} />
                            <label htmlFor="newName" className={`floating-label ${presetName ? 'active' : ''}`}>
                                Preset Name
                            </label>
                        </div>
                        <button onClick={handleClick}>Save</button>
                    </div>
                    <p>Presets coming soon.</p>
                </form>
            </div>
            <FileUploader uploadedFiles={setFiles} setDragging={setIsDragging} isDragging={isDragging} />
            {url && <img src={url} alt="Resized image" />}
        </div>
    )
}

export default MainView
