class module {
    #reg = {
        events: new AbortController(),
        timers: new WeakMap()
    }

    #state = true
    #eventsSaved = {}
    #timersSaved = {}

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
        if (this.#state) {
            const id = this.#checkID(element)
            const validHandler = this.#checkHandler(handler)

            if (id && validHandler) {
                element.addEventListener(event, handler, { signal: this.#reg.events.signal })
                !this.#eventsSaved[id] && (this.#eventsSaved[id] = [])
                this.#eventsSaved[id].push({ 'event': event, 'handler': validHandler })
            }

        } else {
            return console.error(this, "previously cleaned")
        }
    }

    removeEvent(element, event, handler) {
        if (this.#state) {
            const id = this.#checkID(element)
            const elementInReg = this.#eventsSaved[id]?.find(object => object.event === event && object.handler === handler) || null

            if (elementInReg) {
                element.removeEventListener(event, handler)
                this.#eventsSaved[id] = this.#eventsSaved[id].filter(object => object !== elementInReg)
                !this.#eventsSaved[id].length && delete this.#eventsSaved[id]
            }
        }
    }

    #removeAllEvents() {
        this.#reg.events.abort()
    }

    /* timers */
    addTimer(id, type, value) {
        
    }

    /* observers */



    /* clean */
    cleanModule() {
        if (this.#state !== null) {
            this.#removeAllEvents()

            this.#state = null
        } else {
            console.error(this, "previously cleaned")
        }
    }

    /* info */
    getState() {
        return {
            state: this.#state,
            reg: {
                'events': { ...this.#eventsSaved }
            }
        }
    }
}

export default module