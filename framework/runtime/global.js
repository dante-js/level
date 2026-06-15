const serverPath = "/level"

export const add = async () => {
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? serverPath : ""

    /* helpers */
    const helper = {}
    const [css, dom, fonts, resolve, number, timer] = await Promise.all([
        import(`${route}/framework/dependencies/helpers/css.js`),
        import(`${route}/framework/dependencies/helpers/dom.js`),
        import(`${route}/framework/dependencies/helpers/fonts.js`),
        import(`${route}/framework/dependencies/helpers/resolve.js`),
        import(`${route}/framework/dependencies/helpers/number.js`),
        import(`${route}/framework/dependencies/helpers/timer.js`)
    ])

    helper.css = css
    helper.dom = dom
    helper.fonts = fonts
    helper.resolve = resolve
    helper.number = number
    helper.timer = timer

    /* animations */
    const animation = {}
    const textBar_mod = `${route}/framework/dependencies/animations/bars/textBar.js`

    const [textBar] = await Promise.all([
        import(textBar_mod)
    ])

    animation.bar = {}
    animation.bar.textBar = textBar

    /* injection */
    return({'route': route, 'helper': helper, 'animation': animation})
}