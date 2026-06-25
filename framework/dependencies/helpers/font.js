const validateFont = (font, fontStyle, reg) => {
    const previousCSS = fontStyle.textContent.includes(`url("${font.src}")`) || null
    /*     const previousREG = reg.font ? Object.entries(reg.font).find(([name, data]) => data.src === font.src) : null
     */
    if (previousCSS) {
        console.error(`SRC ${font.src} DUPLICATED in module style please use: [${font.name}]`)
        return { valid: false, previousCSS }
    }
/*     if (previousREG) {
        font.name = previousREG[0]
        console.error(`SRC ${font.src} DUPLICATED in REG using previous name ${font.name}`)
    }
    if (font.usedBy === null && reg.font) {
        console.error(`${font.name} no element using, ERROR, REGISTER is active `)
        return { valid: null, previousCSS }
    }
 */    return { valid: true, previousCSS }
}

const register = (font, reg) => {

    console.log(reg)
    console.log(reg.fonts)

    if (reg) {
        if (!reg.fonts[font.name]) {
            const newFont = reg.fonts[font.name] = {}
            newFont["src"] = font.src
            newFont["usedBy"] = font.usedBy
        } else {
            reg.fonts[font.name].usedBy.push(font.usedBy)
        }
    }
}

const createStyle = (styleID) => {
    const fontStyle = document.createElement("style")
    fontStyle.id = styleID
    document.head.appendChild(fontStyle)
    return fontStyle
}

export const add = (font, module = null, reg = null) => {
    const styleID = module + "_fonts" || "imported_fonts"
    let fontStyle = document.head.querySelector(`#${styleID}`) || null
    !fontStyle && (fontStyle = createStyle(styleID))
    
    const formatMap = {
        woff2: "woff2",
        woff: "woff",
        ttf: "truetype",
        otf: "opentype",
        eot: "embedded-opentype",
        svg: "svg"
    }

    /* validate */
    const validate = validateFont(font, fontStyle, reg)
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


/*     register(font, reg)
 */}