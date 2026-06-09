const serverPath = "level"

export const add = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route

    /* helpers */
    level.helper = {}
    const [css, dom, fonts, resolve, number, timer] = await Promise.all([
        import(`${route}/framework/dependencies/helpers/css.js`),
        import(`${route}/framework/dependencies/helpers/dom.js`),
        import(`${route}/framework/dependencies/helpers/fonts.js`),
        import(`${route}/framework/dependencies/helpers/resolve.js`),
        import(`${route}/framework/dependencies/helpers/number.js`),
        import(`${route}/framework/dependencies/helpers/timer.js`)
    ])
    level.helper.css = css
    level.helper.dom = dom
    level.helper.fonts = fonts
    level.helper.resolve = resolve
    level.helper.number = number
    level.helper.timer = timer

    /* animations */
    level.animation = {}
    const textBar_mod = `${route}/framework/dependencies/animations/bars/textBar.js`

    const [textBar, textBar2] = await Promise.all([
        import(textBar_mod)
    ])

    level.animation.bar = {
        textBar: textBar
    }

    /* add global */
    globalThis.level = level
    console.log(level)
}