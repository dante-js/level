import * as routing from "../../runtime/routing.js"
import * as resolve from "../helpers/resolve.js"
import * as dependencies_map from "../../runtime/dependencies_map.js"

export class addModule {
    ANIMATION = null
    HELPER = null
    OPTIONAL = null
    RESOLVE = resolve.object
    ROUTE = routing.init()

    async #importStatics(imports) {
        return this.RESOLVE.object(imports)
    }

    async add({
        name = null,
        register = null,
        animations = null,
        helpers = [],
        modules = null,
        fonts = [],
    }) {

        if (!name) {
            console.error(this, "module name lost")
            return
        }

        /* optional dependencies */
        const optional = [
            { register: null }
        ]

        register && (optional.register = `${this.ROUTE}/framework/runtime/register.js`)
        this.RESOLVE(optional)
        this.OPTIONAL = optional

        /* helpers */
        fonts.length !== 0 && helpers.push("font")


        helpers.length !== 0 && dependencies_map.require("helper", helpers)
        this.HELPER = helpers



        /* animations */
        /*         animations && (this.ANIMATION = await dependencies_map.require("animation", animations))
         */


        /* fonts */
        /*         fonts.map(item => this.HELPER.font.add(item, name))
         */

        console.log(this.ROUTE, this.OPTIONAL, this.HELPER)
    }
}