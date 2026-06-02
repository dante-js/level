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
        <div class="landingBox">
            <div class="titles column_spacing">
                <div class="title level">Level</div>
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
            --time: 800ms ease-in-out;

            .charBox {
                font-size: 18px;
                font-family: "ronduit";
                color: rgb(170, 170, 170);
                font-weight: bolder;
                letter-spacing: 2px;
                transition: var(--time);
            }

            .spaceBox {width: 10px;}
        } 

        .max {width: 100%; height: 100%;}
        .row_V_center {display: flex; align-items: center;}
    `

const addTextBar = async ({box, text, className, style, hoverBox = null, alert = null, eventDom = null}) => {
    console.log(alert)
    const chars = Array.from(text)

    /* style */
    const animationStyle = level.helper.dom.add(document.head, "style", `animation_${className}`)
    animationStyle.textContent = style

    /* draw */
    const animationBox = level.helper.dom.add(box, "ul", "animationBox relative max row_V_center")
    chars.forEach((item, index) => {
        const charBox = level.helper.dom.add(animationBox, "li", "charBox")
        item === " " && charBox.classList.add("spaceBox")
        charBox.textContent = item
    })
    await new Promise(requestAnimationFrame)

    /* events */
    if (hoverBox) {
        const letters = Array.from(box.querySelectorAll(".charBox"))
        const initialLeft = letters.map(item => item.offsetLeft)
        letters.forEach((item, index) => { item.style.left = initialLeft[index] + "px"; item.classList.add("absolute") })
        let hover = false
        let progress = 0

        const getAnimationParams = () => {
            const notAnimated = letters.filter(item => !item.classList.contains("animated"))
            const animated = letters.filter(item => item.classList.contains("animated"))
            const initialPos = animated.length ? animated.reduce((total, item) => { return total + item.offsetWidth }, 0) : 0
            return { 'notAnimated': notAnimated, 'animated': animated, 'initialPos': initialPos }
        }

        hoverBox.addEventListener("mouseenter", async () => {
            hover = true
            const pars = getAnimationParams()
            let rigthPos = animationBox.offsetWidth - pars.initialPos

            for (let index = pars.notAnimated.length - 1; index >= 0; index--) {
                if (hover) {
                    rigthPos = rigthPos - pars.notAnimated[index].offsetWidth
                    pars.notAnimated[index].style.left = `${rigthPos}px`
                    pars.notAnimated[index].classList.add("animated")
                    await level.helper.timer.sleep(level.helper.timer.getTransition(letters[0]) * 3 / letters.length)

                    if (alert) {
                        progress = progress + 100 / letters.length
                        const targetEventDom = eventDom || document
                        targetEventDom.dispatchEvent(new CustomEvent(className, { detail: { 'progress': Math.round(progress) } }))
                    }
                }
            }
        })

        hoverBox.addEventListener("mouseleave", async () => { hover = false })

        document.addEventListener(className, (e) => {
            console.log(e.detail.progress)
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
        fonts.map(font => level.helper.fonts.add(font))
    ])

/*     await level.helper.timer.sleep(50)
 */
    addTextBar({
        box: containers.frame,
        text: "Modular Framework",
        className: "levelAnimation",
        style: animateTextStyle,
        hoverBox: containers.landingBox,
        alert: true
    })
}
init()