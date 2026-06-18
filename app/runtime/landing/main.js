const init = async () => {
    console.log("Starting app-landing")

    /* level map */
    const deps_map = await import("../../../framework/runtime/deps_map.js")
    const helper = await deps_map.require("helper", ["css", "dom", "font", "number", "resolve"])
    const animation = await deps_map.require("animation", ["textProgressBar"])

    const ROUTE = deps_map.route
    const HELPER = helper
    const ANIMATION = animation

    /* module */
    const landing = {
        render: `${ROUTE}/app/runtime/landing/render.js`,
        logic: `${ROUTE}/app/runtime/landing/logic.js`,
        register: `${ROUTE}/framework/dependencies/modules/register.js`
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

    const [modules] = await Promise.all([
        HELPER.resolve.object(landing),
        HELPER.css.addStyles(styles, document.head),
    ])

    /* register */
    const moduleReg = new landing.register()
    fonts.map(font => HELPER.font.add(font, moduleReg))
    console.log(moduleReg)


    /* landing */
    const containers = modules.render.addContainers(HELPER)
    modules.logic.addListeners(containers)

    const animationHelpers = await deps_map.require("helper", ANIMATION.textProgressBar.dependencies)
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