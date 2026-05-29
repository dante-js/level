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
    const landing = level.helper.dom.add(document.body, "div", "landing max")
    console.log(landing)
}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()
    console.log(level)

    const styles = {
        main: "/app/styles/main.css",
        clases: "/app/styles/classes.css"
    }

    addStyles(styles)
    addContainers()

}
init()