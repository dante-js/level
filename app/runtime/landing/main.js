const init = async () => {
    console.log("Starting app-landing")

    /* dependencies */
    const dependencies_map = await import("../../../framework/runtime/dependencies_map.js")
    const resolve = await dependencies_map.require("helper", "resolve")
    const ROUTE = dependencies_map.route

    const module_class = await import(`${ROUTE}/framework/dependencies/modules/loader.js`)
    const module = new module_class.module()

    /* declarations */
    const helper = ["css", "dom", "font", "number"]
    const animation = ["textProgressBar"]

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
    ]


    /*     const HELPER = helper
        const ANIMATION = animation
     */
    /* module */


/*     const [modules] = await Promise.all([
        HELPER.resolve.object(landing),
        HELPER.css.addStyles(styles, document.head),
    ])
 */
    /* module inyection */
    module.add({
        register: true,
        helpers: ["font"],
        fonts: fonts,
    })

    /* register */
    /*     const moduleReg = new landing.register()
        fonts.map(font => HELPER.font.add(font, moduleReg))
        console.log(moduleReg)
     */

    /* landing */
    const containers = modules.render.addContainers(HELPER)
    modules.logic.addListeners(containers)

    const animationHelpers = await dependencies_map.require("helper", ANIMATION.textProgressBar.dependencies)
    ANIMATION.textProgressBar.add({
        box: containers.frame,
        text: "Modular Framework",
        className: "landing_textBar",
        style: landing.logic.textBarStyle,
        hoverBox: containers.leftBox,
        alert: true,
        eventDom: null,
        HELPER: animationHelpers
    })

    /* reactive */
    modules.logic.updateInfo(HELPER)
}
init()