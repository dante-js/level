const serverPath = "level"

export const add = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route
    /* helper */
    level.helper = {}
    const [css, dom, fonts, number, timer] = await Promise.all([
        import(`${route}/framework/dependencies/helpers/css.js`),
        import(`${route}/framework/dependencies/helpers/dom.js`),
        import(`${route}/framework/dependencies/helpers/fonts.js`),
        import(`${route}/framework/dependencies/helpers/number.js`),
        import(`${route}/framework/dependencies/helpers/timer.js`)
    ])
    level.helper.css = css
    level.helper.dom = dom
    level.helper.fonts = fonts
    level.helper.number = number
    level.helper.timer = timer
    /* add global */
    globalThis.level = level
}