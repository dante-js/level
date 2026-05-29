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
    const landing = level.helper.dom.add(document.body, "div", "landing max center transparent time1000")
    landing.innerHTML = `
        <ul class="wellcomeBox column center">
            <li>Level</li>
            <li>Modular Framework</li>
            <li class="landingBarBox"></li>
        </ul>
    `
    return {
        'landing': landing,
        'wellcomeBox': document.querySelector(".wellcomeBox")
    }
}

const animate = async () => {

}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()
    console.log(level)

    const styles = {
        clases: "/app/styles/classes.css",
        main: "/app/styles/main.css",
    }

    addStyles(styles)
    await level.helper.timer.sleep(50)
    const containers = addContainers()
    await level.helper.timer.sleep(50)

    const time = level.helper.timer.getTransition(containers.landing)
    await level.helper.timer.sleep(time)
    containers.landing.classList.remove("transparent")
    await level.helper.timer.sleep(time)

}
init()