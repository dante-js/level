export const addStyles = (styles, dom = null) => {
    const promises = Object.entries(styles).map(([name, url]) => {
        return new Promise((resolve, reject) => {
            const newLink = document.createElement("link")
            newLink.setAttribute("data-name", name)
            newLink.href = level.route + url
            newLink.rel = "stylesheet"

            newLink.onload = () => resolve()
            newLink.onerror = () => reject(new Error(`Error CSS: ${url}`))

            const selectedDom = dom || document.head
            selectedDom.appendChild(newLink)
        })
    })
    return Promise.all(promises)
}

export const getVar = (prop, dom = null) => {
    const validDom = dom || document.documentElement
    const validProp = prop.includes("--") ? prop : `--${prop}`
    return getComputedStyle(validDom).getPropertyValue(validProp)
}