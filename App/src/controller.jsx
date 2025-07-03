class MorphController {
    constructor(savedPresets, Preset) {
        this.savedPresets = savedPresets
        this.preset = Preset
    }

    async createPreset(format, quality, width, height) {
        const presetNumber = this.savedPresets.newPresetNumber()
        const newPreset = new this.preset(presetNumber, format, quality, width, height)
        await this.savedPresets.savePreset(newPreset)
    }
}
export default MorphController