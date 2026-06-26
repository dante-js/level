/* import * as level_config from "../config.js"
 */
export const init = () => {
    console.log(window.location.pathname)
    const route = window.location.pathname === "/"
        ? ""
        : window.location.pathname
    return route
}