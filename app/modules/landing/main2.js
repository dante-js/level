export const init = async () => {
    console.log("landing start")

    /* module instance */
    const module_class = await import("../../../framework/dependencies/modules/loader.js")
    const module = new module_class.module()

    /* module declarations */
    const helper = ["dom"]
    const animation = []
    const ROUTE = module.ROUTE

    const landing = {
        render: `${ROUTE}/app/runtime/landing/render1.js`,
        logic: `${ROUTE}/app/runtime/landing/logic1.js`,
    }

    const fonts = [

    ]

    module.hel

    /* module init */
    await module.add({
        name: "landing",
        register: false,
        helpers: helper,
        fonts: fonts
    })

/*     landing.render.init()
 */}