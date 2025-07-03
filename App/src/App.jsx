import { useState, useEffect } from 'react'
import './styles/styles.css'
import './styles/icons.css'
import MainView from './view/mainView'
import MorphController from './controller';
import { SavedPresets, Preset } from './model/presets';

function App() {
  const [controller, setController] = useState(null);

  useEffect(() => {
    const savedPresets = new SavedPresets()
    const morphController = new MorphController(savedPresets, Preset)
    setController(morphController)
  }, []);


  return (
    <>
      <MainView controller={controller} />
    </>
  )
}

export default App
