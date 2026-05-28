const addStyles = (styles) => {
    styles.forEach(item => {
        const newLink = document.createElement("link")
        newLink.href = item
        newLink.rel = "stylesheet"
        document.head.appendChild(newLink)
    })
}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()
    console.log(level)

    const styles = [
        `${level.route}/app/styles/main.css`
    ]
    addStyles(styles)

}
init()