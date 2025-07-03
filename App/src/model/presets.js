class SavedPresets {
    constructor() {
        this.presets = this.loadPresetsFromStorage()
    }
    savePreset(newPreset) {
        this.presets.push(newPreset)
        this.savePresetsToStorage()
        console.log('save')
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
}

class Preset {
    constructor(name, format, quality, width, height) {
        this.name = name
        this.format = format
        this.quality = quality
        this.width = width
        this.height = height
    }
}
export { SavedPresets, Preset }