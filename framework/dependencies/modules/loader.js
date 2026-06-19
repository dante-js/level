export class module {
    HELPER = null

    async add({
        register = null,
        helpers = [],
        modules = null,
        fonts = null
    }) {

        /* class static dependencies */
        const [module_reg, dependencies_map] = await Promise.all([
            register ? await import("./register.js") : null,
            await import("../../runtime/dependencies_map.js")
        ])

        !(helpers.includes("resolve")) && helpers.push("resolve")
        this.HELPER = await dependencies_map.require("helper", helpers)
        console.log(this.HELPER)
    }
}