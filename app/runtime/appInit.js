const addStyles = (styles) => {
    const promises = Object.entries(styles).map(([name, url]) => {
        return new Promise((resolve, reject) => {
            const newLink = document.createElement("link")
            newLink.setAttribute("data-name", name)
            newLink.href = level.route + url
            newLink.rel = "stylesheet"

            newLink.onload = () => resolve()
            newLink.onerror = () => reject(new Error(`Error CSS: ${url}`))

            document.head.appendChild(newLink)
        })
    })
    return Promise.all(promises)
}

const addContainers = () => {
    const landing = level.helper.dom.add(document.body, "div", "landingSection max center")
    landing.innerHTML = `
        <div class="landingBox row_spaceBetween v_center">
            <div class="leftBox column_spaceBetween leftBoxHover">
                    <div class="title level v_center">Level</div>
                    <hr>
                    <span class="title frame v_bottom"></span>

                <ul class="frameInfo row_spaceBetween">
                    <li class="infoBox v_center">Components<span id="infoComponents" class="infoNum relative">0</span></li>
                    <li class="infoBox v_center">Animations<span id="infoAnimations" class="infoNum relative">0</span></li>
                    <li class="infoBox v_center">Helpers<span id="infoHelpers" class="infoNum relative">0</span></li>
                </ul>
            </div>
            <div class="accessBox center relative">
                <div class="progress max"></div>
                <span class="go absolute center">Go</div>
            </div>
        </div>
    `
    return {
        'landingSection': landing,
        'landingBox': document.querySelector(".landingBox"),
        'leftBox': document.querySelector(".leftBox"),
        'frame': document.querySelector(".frame"),
        'accessBox': document.querySelector(".accessBox"),
        'progress': document.querySelector(".progress"),
        'go': document.querySelector(".go")
    }
}

const animateTextStyle = `
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

const addListeners = (containers) => {
    const progress = containers.progress
    const go = containers.go

    document.addEventListener("levelAnimation", (e) => {
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

const updateInfo = () => {
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

const init = async () => {
    console.log("Starting app")

    const framework = await import(`../../framework/runtime/levelInit.js`)
    await framework.init()

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        config: `${level.route}/app/styles/config.css`,
        main: `${level.route}/app/styles/main.css`,
        landing: `${level.route}/app/styles/landing.css`
    }

    const fonts = [
        { name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf`, usedBy: "landing" },
        { name: "ronduit", src: `${level.route}/app/src/fonts/ronduitCapitals-light.woff`, usedBy: "landing" },
        { name: "matrix", src: `${level.route}/app/src/fonts/whitrabt-webfont.woff`, usedBy: "landing" },
        { name: "nasa", src: `${level.route}/app/src/fonts/Nasalization Rg.otf`, usedBy: "landing" },
    ]

    const [containers] = await Promise.all([
        addContainers(),
        addStyles(styles),
        fonts.map(font => level.helper.fonts.add(font))
    ])

    addListeners(containers)
    addTextBar({
        box: containers.frame,
        text: "Modular Framework",
        className: "levelAnimation",
        style: animateTextStyle,
        hoverBox: containers.leftBox,
        alert: true
    })

    updateInfo()
}
init()