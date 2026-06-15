export let fontReg = { 'register': null }

const validateFont = (font, fontStyle) => {
    const previousCSS = fontStyle.textContent.includes(`url("${font.src}")`) || null
    const previousREG = fontReg.register ? Object.entries(fontReg.register).find(([name, data]) => data.src === font.src) : null

    if (previousCSS) {
        console.error(`SRC ${font.src} DUPLICATED in CSS please use last name`)
    }
    if (previousREG) {
        font.name = previousREG[0]
        console.error(`SRC ${font.src} DUPLICATED in REG using previous name ${font.name}`)
    }
    if (font.usedBy === null && fontReg.register) {
        console.error(`${font.name} no element using, ERROR, REGISTER is active `)
        return { valid: null, previousCSS }
    }
    return { valid: true, previousCSS }
}

const register = (font) => {
    if (fontReg.register) {
        if (!fontReg.register[font.name]) {
            const newFont = fontReg.register[font.name] = {}
            newFont["src"] = font.src
            newFont["usedBy"] = font.usedBy
        } else {
            fontReg.register[font.name].usedBy.push(font.usedBy)
        }
    }
}

export const add = (font) => {
    let fontStyle = document.head.querySelector(".dynamicStyle_fonts")
    if (!fontStyle) {
        fontStyle = document.createElement("style")
        fontStyle.classList.add("dynamicStyle_fonts")
        document.head.appendChild(fontStyle);
    }
    const formatMap = {
        woff2: "woff2",
        woff: "woff",
        ttf: "truetype",
        otf: "opentype",
        eot: "embedded-opentype",
        svg: "svg"
    }

    /* validate */
    const validate = validateFont(font, fontStyle)
    if (validate.valid === null) return

    /* add font */
    if (!validate.previousCSS) {
        const ext = font.src.split(".").pop()
        const format = formatMap[ext] || ext

        fontStyle.textContent += `
            @font-face {
                font-family: "${font.name}";
                src: url("${font.src}") format("${format}");
            }
        `
    }

    /* if register exists */
    register(font)
}