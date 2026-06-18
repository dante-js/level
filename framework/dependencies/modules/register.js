class moduleReg {
    state = true
    events = {} /* abortControllers */
    timers = new WeakMap()
    fonts = {}

    #checkID(element) {
        if (!element.id) {
            console.error(this, element, "no ID ELEMENT")
            return null
        } else return element.id
    }

    #checkHandler(handler) {
        if (!handler.name || handler.name === "anonymous") {
            console.error(this, "function cant be anonymous")
        } else return handler
    }

    #checkTimer(timer) {

    }

    /* listeners */
    addEvent(element, event, handler) {
        if (!this.state) return console.error(this, "previously cleaned")

        const id = this.#checkID(element)
        const validHandler = this.#checkHandler(handler)

        if (id && validHandler) {
            const reg = this.events[id] ||= {}
            reg[event] ||= []
            const newEvent = {
                'handler': handler,
                'signal': new AbortController()
            }

            reg[event].push(newEvent)
            element.addEventListener(event, handler, { signal: newEvent.signal.signal })
        }
    }

    removeEvent(element, event, handler) {
        if (this.state) {
            const id = this.#checkID(element)
            const elementInReg = this.events[id] || null
            const eventInElement = elementInReg?.[event] || null
            const handlerIndex = eventInElement?.findIndex(obj => obj.handler === handler)

            if (!eventInElement) return console.error(this, "no event", event, "in element")
            if (handlerIndex < 0) return console.error(this, "not found hander in event")

            eventInElement[handlerIndex].signal.abort()
            eventInElement.splice(handlerIndex, 1)
            eventInElement.length === 0 && delete elementInReg[event]
            Object.keys(this.events[id]).length === 0 && delete this.events[id]
        }
    }

    #removeAllEvents() {
        Object.values(this.events).forEach(elementInReg => {
            Object.values(elementInReg).forEach(event => {
                event.forEach(obj => obj.signal.abort())
            })
        })
        this.events = {}
    }

    /* timers */
    addTimer(id, type, value) {

    }

    /* observers */



    /* clean */
    cleanModule() {
        if (this.state !== null) {
            this.#removeAllEvents()

            this.state = null
        } else {
            console.error(this, "previously cleaned")
        }
    }

    /* info */
    getState() {
        return {
            state: this.state,
            reg: {
                'events': { ...this.events }
            }
        }
    }
}

export default moduleReg