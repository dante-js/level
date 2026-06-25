import * as level_config from "../config.js"

export const init = () => {
    const route = window.location.pathname.split("/")[1] === level_config.serverPath
        ? level_config.serverPath
        : ""
    return route
}