import * as routing from "../../framework/runtime/routing.js"
import * as CSS from "../../framework/dependencies/helpers/css.js"
import * as landing from "../modules/landing/main2.js"

const init = async () => {
    const ROUTE = routing.init()

    /* app global styles */
    const styles = {
        clases: `${ROUTE}/app/styles/classes.css`,
        config: `${ROUTE}/app/styles/config.css`,
        main: `${ROUTE}/app/styles/main.css`
    }

    /* start sequence */
    await CSS.addStyles(styles)
    landing.init()
}

init()