const serverPath = "level"

export const addGlobal = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route
    /* helper */
    level.helper = {}
    const [dom, timer] = await Promise.all([
        import(`${route}/framework/dependencies/helpers/dom.js`),
        import(`${route}/framework/dependencies/helpers/timer.js`)
    ])
    level.helper.dom = dom
    level.helper.timer = timer
    /* add global */
    globalThis.level = level
}