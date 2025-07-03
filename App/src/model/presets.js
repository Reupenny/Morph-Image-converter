class SavedPresets {
    constructor() {
        this.presets = this.loadPresetsFromStorage()
        this.currentPresetNumber = this.presetNumLocal()
    }
    savePreset(newPreset) {
        this.presets.push(newPreset)
        this.savePresetsToStorage()
        console.log('save')
    }
    newPresetNumber() {
        const number = this.currentPresetNumber
        const newNumber = number + 1
        localStorage.setItem('currentPresetNumber', newNumber)
        console.log('Preset Number: ' + newNumber)
        return newNumber
    }

    // Local Storage
    loadPresetsFromStorage() {
        const presetsJSON = localStorage.getItem('presets')
        const presets = presetsJSON ? JSON.parse(presetsJSON) : []
        return presets
    }

    savePresetsToStorage() {
        localStorage.setItem('presets', JSON.stringify(this.presets))
    }
    presetNumLocal() {
        const number = localStorage.getItem('currentPresetNumber')
        const currentNumber = number ? number : 0
        return currentNumber
    }
}

class Preset {
    constructor(presetNumber, format, quality, width, height) {
        this.presetNumber = presetNumber
        this.format = format
        this.quality = quality
        this.width = width
        this.height = height
    }
}
export { SavedPresets, Preset }