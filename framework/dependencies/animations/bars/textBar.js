const addTextBar = async ({ box, text, className, style, hoverBox = null, alert = null, eventDom = null }) => {
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
    await level.helper.timer.sleep(100)

    /* events */
    if (hoverBox) {
        const letters = Array.from(box.querySelectorAll(".charBox"))
        const initialLeft = letters.map(item => item.offsetLeft)
        letters.forEach((item, index) => { item.style.left = initialLeft[index] + "px"; item.classList.add("absolute") })
        const time = level.helper.timer.getTransition(letters[0])
        const progressStep = 100 / letters.length
        let hover = false
        let progress = 0

        const getAnimationParams = () => {
            const notAnimated = letters.filter(item => !item.classList.contains("animated"))
            const animated = letters.filter(item => item.classList.contains("animated"))
            const initialPos = animated.length ? animated.reduce((total, item) => { return total + item.offsetWidth }, 0) : 0
            return { 'notAnimated': notAnimated, 'animated': animated, 'initialPos': initialPos }
        }

        const alertEvent = async () => {
            await level.helper.timer.sleep(time)
            progress = progress + progressStep
            const targetEventDom = eventDom || document
            targetEventDom.dispatchEvent(new CustomEvent(className, { detail: { 'progress': Math.round(progress) } }))
        }

        if (hoverBox) {
            hoverBox.addEventListener("mouseenter", async () => {
                hover = true
                const pars = getAnimationParams()
                let rigthPos = animationBox.offsetWidth - pars.initialPos

                for (let index = pars.notAnimated.length - 1; index >= 0; index--) {
                    if (hover) {
                        rigthPos = rigthPos - pars.notAnimated[index].offsetWidth
                        pars.notAnimated[index].style.left = `${rigthPos}px`
                        pars.notAnimated[index].classList.add("animated")
                        await level.helper.timer.sleep(time * 3 / letters.length)
                        alert && alertEvent()
                    }
                }
            })

            hoverBox.addEventListener("mouseleave", async () => { hover = false })
        }
    }
}
