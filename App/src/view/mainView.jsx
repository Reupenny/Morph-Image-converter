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
    const [auto, setAuto] = useState(true);

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
        if (auto) {
            processFiles();
        }
    }, [files, quality, width, height, format, auto])
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
            case 'newAuto':
                setAuto(value)
                break
            default:
                break
        }
    }
    const handleSave = (e) => {
        controller.createPreset(presetName, format, quality, width, height)
    }
    const handleClick = (e) => {
        // to handle the saved menu pop-out.
    }
    const handleConvert = (e) => {
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
    }


    return (
        <>  <div id="custom-titlebar">
            <img className='logo' src="./images/logo.webp" width='200px' alt="Morph Logo" />
        </div>
            <div className='presets'>
                <h2>Saved</h2>
                <div></div>
            </div>
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
                        </div>
                        <div className='row'>
                            <div className="input-container">
                                <input type="number" id="newWidth" name="newWidth" value={width} onChange={handleChange} min={0} />
                                <label htmlFor="newWidth" className={`floating-label ${width ? 'active' : ''}`}>
                                    Width (px)
                                </label>
                            </div>
                            <div className="input-container">
                                <input type="number" id="newHeight" name="newHeight" value={height} onChange={handleChange} min={0} />
                                <label htmlFor="newHeight" className={`floating-label ${height ? 'active' : ''}`}>
                                    Height (px)
                                </label>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="input-container">
                                <input type="checkbox" id="newAuto" name="newAuto" value={auto} onChange={handleChange} />
                                <label htmlFor="newAuto"> Auto convert</label>
                            </div>
                            <div className="input-container">
                                <input type="checkbox" id="newAuto" name="newAuto" value={auto} onChange={handleChange} disabled />
                                <label htmlFor="newAuto"> Auto download</label>
                            </div>
                            <div className="input-container">
                                <button onClick={handleConvert}>Convert</button>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="input-container">
                                <input type="text" id="newName" name="newName" value={presetName} onChange={handleChange} />
                                <label htmlFor="newName" className={`floating-label ${presetName ? 'active' : ''}`}>
                                    Preset Name
                                </label>
                            </div>
                            <button onClick={handleSave}>Save</button>
                        </div>

                        <p>Presets coming soon.</p>
                        <button onClick={handleClick}>View saved</button>
                    </form>
                </div>
                <FileUploader uploadedFiles={setFiles} setDragging={setIsDragging} isDragging={isDragging} />
                {url && <img src={url} alt="Resized image" />}
            </div>
        </>
    )
}

export default MainView
