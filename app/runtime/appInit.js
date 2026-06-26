import * as routing from "../../framework/runtime/routing.js"
import * as CSS from "../../framework/dependencies/helpers/css.js"
import * as landing from "../modules/landing/main2.js"

const init = async () => {
    routing.init()

    /* app global styles */
    const styles = {
        clases: "/app/styles/classes.css",
        config: "/app/styles/config.css",
        main: "/app/styles/main.css"
    }

    /* start sequence */
    await CSS.addStyles(styles)
    landing.init()
}

init()