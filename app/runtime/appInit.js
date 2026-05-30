const addStyles = (styles) => {
    Object.entries(styles).forEach(([name, url]) => {
        const newLink = document.createElement("link")
        newLink.setAttribute("data-name", name)
        newLink.href = level.route + url
        newLink.rel = "stylesheet"
        document.head.appendChild(newLink)
    })
}

const addContainers = () => {
    const landing = level.helper.dom.add(document.body, "div", "landing max center")
    landing.innerHTML = `
        <div class="wellcomeBox">
            <div class="wellcomeTitles column">
                <span class="title level">Level</span>
                <span class="title frame">Modular Framework</span>
                <div class="landingBarBox"></div>
            </div>
        </div>
    `
    return {
        'landing': landing,
        'wellcomeBox': document.querySelector(".wellcomeBox"),
        'level': document.querySelector(".level")
    }
}

const animateIntro = async (containers) => {
}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()
    console.log(level)

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        main: `${level.route}/app/styles/main.css`,
        config: `${level.route}/app/styles/config.css`
    }

    addStyles(styles)
    const containers = addContainers()
    level.helper.fonts.add({name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf`})
    await level.helper.timer.sleep(50)

    animateIntro(containers)
}
init()