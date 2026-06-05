
export const init = async () => {

    const [levelConf, register, fontInjector, global] = await Promise.all([
        import("../levelConf.js"),
        import("./registers.js"),
        import("../dependencies/helpers/fonts.js"),

        import("./global.js")
    ])

    /* registers */
    if (levelConf.activeFontRegister) {
        const fontReg = register.initFontRegister()
        fontInjector.fontReg.register = fontReg
    }

    /* global level */
    await global.add()

}