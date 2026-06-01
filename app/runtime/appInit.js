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
    Promise.all(promises)
}

const addContainers = () => {
    const landing = level.helper.dom.add(document.body, "div", "landingSection max center")
    landing.innerHTML = `
        <div class="landingBox">
            <div class="titles column_spacing">
                <div class="title levelBox">Level</div>
                <span class="title frame"></span>
            </div>
            <div class="entry center">Go</div>
        </div>
    `
    return {
        'landingSection': landing,
        'landingBox': document.querySelector(".landingBox"),
        'frame': document.querySelector(".frame")
    }
}
const animateTextStyle = `
        .animationBox {
            border: 1px solid red;
            --time: 800ms ease-in-out;

            .charBox {
                font-size: 16px;
                font-family: "ronduit";
                color: rgb(170, 170, 170);
                font-weight: bolder;
                letter-spacing: 2px;
            }

            .spaceBox {width: 10px;}
        } 

        .max {width: 100%; height: 100%;}
        .row_V_center {display: flex; align-items: center;}
    `

const addAnimateText = async (box, text, className, style, hoverBox = null) => {
    const chars = Array.from(text)

    /* style */
    const animationStyle = level.helper.dom.add(document.head, "style", `animation_${className}`)
    animationStyle.textContent = style

    /* draw */
    const animationBox = level.helper.dom.add(box, "ul", "animationBox relative max row_V_center")
    chars.forEach((item, index) => {
        const charBox = level.helper.dom.add(animationBox, "li", "charBox")
        item === " " && charBox.classList.replace("charBox", "spaceBox")
        charBox.textContent = item
    })
    
    /* events */
    await level.helper.timer.sleep(50)
    if (hoverBox) {
        const letters = Array.from(box.querySelectorAll(".char"))
        const time = level.helper.timer.getTransition(letters[0])
        const initialLeft = letters.map(item => item.offsetLeft)
        letters.forEach((item, index) => { item.style.left = initialLeft[index] + "px"; item.classList.add("absolute") })
        let hover = false

        /*      const animateLeft = async (resolve) => {
                    let leftPos = 0
                    for (let index = 0; index < letters.length; index++) {
                        letters[index].style.left = `${leftPos}px`
                        leftPos = leftPos + letters[index].offsetWidth
                        await level.helper.timer.sleep(time / 6)
                    }
                    await level.helper.timer.sleep(time)
                    resolve(true)
                }
         */
        hoverBox.addEventListener("mouseenter", async () => {
            hover = true
            let notAnimated = letters.filter(item => !item.classList.contains("animated"))
            let animated = letters.filter(item => item.classList.contains("animated"))
            let initialRight = animated.length ? animated.reduce((total, item) => { return total + item.offsetWidth }, 0) : 0

            let rigthPos = animationBox.offsetWidth - initialRight

            for (let index = notAnimated.length - 1; index >= 0; index--) {
                if (hover) {
                    rigthPos = rigthPos - notAnimated[index].offsetWidth
                    notAnimated[index].style.left = `${rigthPos}px`
                    notAnimated[index].classList.add("animed")
                    await level.helper.timer.sleep(time / 5)
                }
            }
        })

        hoverBox.addEventListener("mouseleave", async () => {
            hover = false
        })
    }
}

const init = async () => {
    console.log("Starting app")

    const levelModule = await import("/framework/runtime/level.js")
    await levelModule.addGlobal()

    const styles = {
        clases: `${level.route}/app/styles/classes.css`,
        main: `${level.route}/app/styles/main.css`,
        config: `${level.route}/app/styles/config.css`
    }

    const fonts = [
        { name: "neuropol", src: `${level.route}/app/src/fonts/neuropol.otf` },
        { name: "ronduit", src: `${level.route}/app/src/fonts/ronduitCapitals-light.woff` },
        { name: "xolonium", src: `${level.route}/app/src/fonts/Xolonium-Regular.otf` },
        { name: "digi", src: `${level.route}/app/src/fonts/ds-digi.ttf` },
        { name: "matrix", src: `${level.route}/app/src/fonts/whitrabt-webfont.woff` }
    ]

    const [containers] = await Promise.all([
        addContainers(),
        addStyles(styles),
        fonts.forEach(font => level.helper.fonts.add(font))
    ])

    await level.helper.timer.sleep(50)

    addAnimateText(containers.frame, "Modular Framework", "levelAnimation", animateTextStyle, containers.landingBox)
}
init()