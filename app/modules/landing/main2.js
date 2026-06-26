export const init = async () => {
    console.log("landing start")

    /* module instance */
    const module_class = await import("../../../framework/dependencies/modules/loader.js")
    const module = new module_class.addModule()

    /* module declarations */
    const landing = {
        render: `${module.ROUTE}/app/modules/landing/render2.js`,
        logic: `${module.ROUTE}/app/modules/landing/logic2.js`
    }

    const fonts = [

    ]

    await Promise.all([
        module.RESOLVE(landing),
        module.RESOLVE(fonts)

    ])

    const helper = ["dom"]
    const animation = []

    /* module init */
    await module.add({
        name: "landing",
        register: false,
        helpers: helper,
        fonts: fonts
    })

    /* sequence */
    landing.render.init()
}