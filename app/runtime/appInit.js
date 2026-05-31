const addStyles = (styles) => {
    const promises = Object.entries(styles).map(([name, url]) => {
        return new Promise((resolve, reject) => {
            const newLink = document.createElement("link")
            newLink.setAttribute("data-name", name)
            newLink.href = level.route + url
            newLink.rel = "stylesheet"

            newLink.onload = () => resolve()
            newLink.onerror = () => reject(new Error(`Error CSS: ${url}`))

            document.head.appendChild(newLink)
        })
    })
    Promise.all(promises)
}

const addContainers = () => {
    const landing = level.helper.dom.add(document.body, "div", "landingSection max center")
    landing.innerHTML = `
        <div class="landingBox relative">
            <div class="titles column">
                <ul class="title levelBox">
                    <li class="char">L</li>
                    <li class="char">e</li>
                    <li class="char">v</li>
                    <li class="char">e</li>
                    <li class="char">l</li>
                </ul>
                <span class="title frame relative">Modular Framework</span>
            </div>
            <div class="entry center">Go</div>
        </div>
    `
    return {
        'landingSection': landing,
        'landingBox': document.querySelector(".landingBox"),
        'level': document.querySelector(".level")
    }
}

const animateIntro = async (containers) => {
    console.log(containers)
    const timming = level.helper.timer.getTransition(containers.landingSection)
    /* landingSection */
    containers.landingSection.style.opacity = 1
    await level.helper.timer.sleep(timming)
    /* landingBox */
    containers.landingBox.style.opacity = 1
}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        main: `${level.route}/app/styles/main.css`,
        config: `${level.route}/app/styles/config.css`
    }

    const fonts = [
        { name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf` },
        { name: "ronduit", src: `${level.route}/app/src/fonts/ronduitCapitals-light.woff` },
        {name: "xolonium", src: `${level.route}/app/src/fonts/Xolonium-Regular.otf`},
        {name: "digi", src: `${level.route}/app/src/fonts/ds-digi.ttf`},
        {name: "matrix", src: `${level.route}/app/src/fonts/whitrabt-webfont.woff`}
    ]

    const [containers] = await Promise.all([
        addContainers(),
        addStyles(styles),
        fonts.forEach(font => level.helper.fonts.add(font))
    ])

    await level.helper.timer.sleep(50)

    animateIntro(containers)
}
init()