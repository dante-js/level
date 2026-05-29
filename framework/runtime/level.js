const serverPath = "level"

export const addGlobal = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route
    /* helper */
    level.helper = {}
    const dom = await import(`${route}/framework/dependencies/helpers/dom.js`)
    level.helper.dom = dom
    /* add global */
    globalThis.level = level
}