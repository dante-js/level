export const addListeners = (containers) => {
    const progress = containers.progress
    const go = containers.go

    document.addEventListener("landing_textBar", (e) => {
        const detailProgress = 100 - e.detail.progress
        progress.style.clipPath = `polygon(0 ${detailProgress}%, 100% ${detailProgress}%, 100% 100%, 0% 100%)`
        if (e.detail.progress === 100) {
            containers.accessBox.classList.add("accessBox100")
            containers.go.classList.add("goHover")
            containers.leftBox.classList.remove("leftBoxHover")
            containers.landingBox.classList.add("landingBoxActive")
        }
    })
}

export const updateInfo = () => {
    const counterFuntions = (module) => {
        return (Object.values(module).filter(item => typeof (item) === "function")).length
    }

    const infoHelper = document.querySelector("#infoHelper")
    const totalHelpers = Object.values(level.helper).reduce((total, mod) => { return total + counterFuntions(mod) }, 0)
    console.log(level.helper)
    level.helper.number.counter({
        'min': 0,
        'max': totalHelpers,
        'delay': 100,
        'box': document.querySelector("#infoHelpers")
    })
}
