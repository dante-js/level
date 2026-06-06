const init = async () => {
    console.log("Starting app")

    /* level global */
    const framework = await import(`../../framework/runtime/levelInit.js`)
    await framework.init()
    console.log(level)

    /* modules */
    const landing = {
        render: `${level.route}/app/runtime/landing/render.js`,
        logic: `${level.route}/app/runtime/landing/logic.js`
    }

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        config: `${level.route}/app/styles/config.css`,
        main: `${level.route}/app/styles/main.css`,
        landing: `${level.route}/app/styles/landing.css`
    }

    const fonts = [
        { name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf`, usedBy: "landing" },
        { name: "ronduit", src: `${level.route}/app/src/fonts/ronduitCapitals-light.woff`, usedBy: "landing" },
        { name: "matrix", src: `${level.route}/app/src/fonts/whitrabt-webfont.woff`, usedBy: "landing" },
        { name: "nasa", src: `${level.route}/app/src/fonts/Nasalization Rg.otf`, usedBy: "landing" },
    ]


    const [modules] = await Promise.all([
        level.helper.resolve.object(landing),
        level.helper.css.addStyles(styles, document.head),
        fonts.map(font => level.helper.fonts.add(font))
    ])

    const containers = modules.render.addContainers()
    console.log(containers)

    modules.logic.addListeners(containers)

    /* animation textBar */
    const textBar = `
        .animationBox {
            --time: 800ms ease-in-out;

            .charBox {
                font-size: 13px;
                font-family: "ronduit";
                color: rgb(170, 170, 170);
                letter-spacing: 2px;
                font-weight: bolder;
                transition: var(--time);
            }

            .spaceBox {width: 10px;}
        } 

        .max {width: 100%; height: 100%;}
        .row_V_center {display: flex; align-items: center;}
    `
    level.animation.bar.textBar.add({
        box: containers.frame,
        text: "Modular Framework",
        className: "landing_textBar",
        style: textBar,
        hoverBox: containers.leftBox,
        alert: true
    })

    /* reactive */
    modules.logic.updateInfo()
}
init()