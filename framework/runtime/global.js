const serverPath = "level"

export const add = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route

    /* helpers */
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

    /* animations */
    level.animation = {}
    const textBar = `${route}/framework/dependencies/animations/bars/textBar.js`

    const bars = await Promise.all([
        import(textBar)
    ])

    level.animation.bar = bars

    /* add global */
    globalThis.level = level
    console.log(level)
}