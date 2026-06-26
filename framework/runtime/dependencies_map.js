const dependencies = {
    helper: {
        css: "/framework/dependencies/helpers/css.js",
        dom: "/framework/dependencies/helpers/dom.js",
        font: "/framework/dependencies/helpers/font.js",
        resolve: "/framework/dependencies/helpers/resolve.js",
        number: "/framework/dependencies/helpers/number.js",
        timer: "/framework/dependencies/helpers/timer.js"
    },
    animation: {
        textProgressBar: "/framework/dependencies/animations/bars/textBar.js"
    }
}

const resolveAll = async (group) => {
    await Promise.all(Object.entries(group).map(async ([name, url]) => {
        if (typeof url === "string") {
            try {
                group[name] = await import(url)
            } catch (error) {
                console.error(`REQUIRE: Failed to load ${name}`, error)
                group[name] = null
            }
        }
    }))
}

const resolveSelected = async (group, modules) => {
    await Promise.all(modules.map(async (module) => {
        if (typeof group[module] === "string") {
            try {
                group[module] = await import(group[module])
            } catch (error) {
                console.error(`REQUIRE: Failed to load ${module}`, error)
                group[module] = null
            }
        }
    }))
}

export const require = async (group, modulesName = null) => {
    if (!dependencies[group]) {
        console.error(`REQUIRE: ${[group]} not found`)
        return
    }

    if (modulesName === null) return null

    if (!modulesName) {
        await resolveAll(dependencies[group])
        return dependencies[group]
    }

    if (modulesName) {
        const selectedModules = Array.isArray(modulesName) ? modulesName : [modulesName]
        await resolveSelected(dependencies[group], selectedModules)
        let resolvedModules = {}
        selectedModules.forEach(name => resolvedModules[name] = dependencies[group][name])
        return resolvedModules
    }
}


