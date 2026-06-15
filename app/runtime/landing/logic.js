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

export const updateInfo = (HELPER) => {
    const counterFuntions = (module) => {
        return (Object.values(module).filter(item => typeof (item) === "function")).length
    }

    const infoHelper = document.querySelector("#infoHelper")
    const totalHelpers = Object.values(HELPER).reduce((total, mod) => { return total + counterFuntions(mod) }, 0)
    HELPER.number.counter({
        'min': 0,
        'max': totalHelpers,
        'delay': 100,
        'box': document.querySelector("#infoHelpers")
    })
}

export const textBarStyle = `
    .animationBox {
        --time: 800ms ease-in-out;

        .charBox {
            font-size: 13px;
            font-family: "ronduit";
            color: rgb(170, 170, 170);
            letter-spacing: 2px;
            font-weight: bolder;
            transition: var(--time);
        }

        .spaceBox {width: 10px;}
    } 

    .max {width: 100%; height: 100%;}
    .row_V_center {display: flex; align-items: center;}
`
