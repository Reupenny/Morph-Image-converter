class MorphController {
    constructor(savedPresets, Preset) {
        this.savedPresets = savedPresets
        this.preset = Preset
    }

    async createPreset(name, format, quality, width, height) {
        const newPreset = new this.preset(name, format, quality, width, height)
        await this.savedPresets.savePreset(newPreset)
    }
}
export default MorphController