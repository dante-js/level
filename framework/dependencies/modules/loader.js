import * as routing from "../../runtime/routing.js"
import * as resolve from "../helpers/resolve.js"

export class addModule {
    ANIMATION = null
    HELPER = null
    RESOLVE = resolve
    ROUTE = routing.init()

    async #importStatics(imports) {
        return Promise.all(imports.map(item => import(item)))
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
        this.RESOLVE.object(optional)
/*         const [dependencies_map, registerModule = null] = await this.#importStatics(optional)
 */
        /* animations */
/*         animations && (this.ANIMATION = await dependencies_map.require("animation", animations))
 */
        /* helpers */
/*         !(helpers.includes("resolve")) && helpers.push("resolve")
        fonts.length !== 0 && helpers.push("font")

        this.HELPER = await dependencies_map.require("helper", helpers)
 */
        /* fonts */
/*         fonts.map(item => this.HELPER.font.add(item, name))
 */    }
}