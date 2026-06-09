const init = async () => {
    console.log("Starting app")

    /* level global */
    const framework = await import(`../../framework/runtime/levelInit.js`)
    await framework.init()

    /* modules */
    const landing = {
        render: `${level.route}/app/runtime/landing/render.js`,
        logic: `${level.route}/app/runtime/landing/logic.js`,
        dependency: `${level.route}/framework/dependencies/classes/module.js`
    }

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        config: `${level.route}/app/styles/config.css`,
        main: `${level.route}/app/styles/main.css`,
        landing: `${level.route}/app/styles/landing.css`
    }

    const fonts = [
        { name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf`, usedBy: "landing" },
        { name: "ronduit", src: `${level.route}/app/src/fonts/ronduitCapitals_Light.woff`, usedBy: "landing" },
        { name: "matrix", src: `${level.route}/app/src/fonts/whitrabt_webfont.woff`, usedBy: "landing" },
        { name: "nasa", src: `${level.route}/app/src/fonts/Nasalization_Rg.otf`, usedBy: "landing" },
    ]


    const [modules] = await Promise.all([
        level.helper.resolve.object(landing),
        level.helper.css.addStyles(styles, document.head),
        fonts.map(font => level.helper.fonts.add(font))
    ])

    console.log(landing)
    const containers = modules.render.addContainers()
    modules.logic.addListeners(containers)

    /* animation textBar */
    level.animation.bar.textBar.add({
        box: containers.frame,
        text: "Modular Framework",
        className: "landing_textBar",
        style: landing.logic.textBarStyle,
        hoverBox: containers.leftBox,
        alert: true
    })

    /* reactive */
    modules.logic.updateInfo()
}
init()