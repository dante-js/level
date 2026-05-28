const serverPath = "level"

export const addGlobal = async () => {
    const level = {}
    /* route */
    const route = window.location.pathname.split("/")[1] === serverPath ? `/${serverPath}` : ""
    level.route = route
    /* add global */
    globalThis.level = level
}