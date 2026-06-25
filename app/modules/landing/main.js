const init = async () => {
    console.log("Starting app-landing")

    /* dependencies */
    const module_class = await import("../../../framework/dependencies/modules/loader.js")
    const module = new module_class.module()

    /* declarations */
    const helper = ["css", "dom", "number", "timer"]
    const animation = ["textProgressBar"]
    const ROUTE = module.ROUTE

    const landing = {
        render: `${ROUTE}/app/runtime/landing/render.js`,
        logic: `${ROUTE}/app/runtime/landing/logic.js`,
    }

    const styles = {
        clases: `${ROUTE}/app/styles/classes.css`,
        config: `${ROUTE}/app/styles/config.css`,
        main: `${ROUTE}/app/styles/main.css`,
        landing: `${ROUTE}/app/styles/landing.css`
    }

    const fonts = [
        { name: "neuropol", src: `${ROUTE}/app/src/fonts/neuropol.otf`, usedBy: "landing" },
        { name: "ronduit", src: `${ROUTE}/app/src/fonts/ronduitCapitals_Light.woff`, usedBy: "landing" },
        { name: "matrix", src: `${ROUTE}/app/src/fonts/whitrabt_webfont.woff`, usedBy: "landing" },
        { name: "nasa", src: `${ROUTE}/app/src/fonts/Nasalization_Rg.otf`, usedBy: "landing" },
        { name: "nasa", src: `${ROUTE}/app/src/fonts/Nasalization_Rg.otf`, usedBy: "landing" },
    ]

    /* module */
    await module.add({
        name: "landing",
        register: true,
        animations: animation,
        helpers: helper,
        fonts: fonts
    })

    const ANIMATION = module.ANIMATION
    const HELPER = module.HELPER



    /* module inyection */

    /* register */
    /*     const moduleReg = new landing.register()
        fonts.map(font => HELPER.font.add(font, moduleReg))
        console.log(moduleReg)
     */

    /* landing */
    await Promise.all([
        HELPER.resolve.object(landing),
        HELPER.css.addStyles(styles, document.head),
    ])

    const containers = landing.render.addContainers(HELPER)
    landing.logic.addListeners(containers)

    ANIMATION.textProgressBar.add({
        box: containers.frame,
        text: "Modular Framework",
        className: "landing_textBar",
        style: landing.logic.textBarStyle,
        hoverBox: containers.leftBox,
        alert: true,
        eventDom: null,
        HELPER: HELPER
    })

    /* reactive */
    landing.logic.updateInfo(HELPER)
}
init()