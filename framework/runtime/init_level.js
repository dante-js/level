
export const init = async () => {

    const [level_conf] = await Promise.all([
        import("../config.js"),
    ])


    /* registers */
/*     if (level_conf.activeFontRegister) {
        const fontReg = register.initFontRegister()
        fontInjector.fontReg.register = fontReg
    }
 */}