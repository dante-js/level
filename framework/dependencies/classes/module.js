class module {
    #reg = {
        events: new AbortController()

    }
    #state = "ready"
    #eventsSaved = {}

    /* listeners */
    addEvent(element, event, handler) {
        element.addEventListener(event, handler, { signal: this.#reg.events.signal })
        !this.#eventsSaved[element.id] && (this.#eventsSaved[element.id] = [])
        this.#eventsSaved[element.id].push({ 'event': event, 'handler': handler })
    }

    removeEvent(element, event, handler) {
        const item = this.#eventsSaved[element.id] || null
        const itemMatch = item?.find(object => object.event === event && object.handler === handler) || null

        if (itemMatch) {
            element.removeEventListener(event, handler)
            this.#eventsSaved[element.id] = item.filter(object => object !== itemMatch)
            !this.#eventsSaved[element.id].length && delete this.#eventsSaved[element.id]
        }
    }

    #removeAllEvents() {
        this.#reg.events.abort()
    }


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
            reg: { ...this.#eventsSaved }
        }
    }
}

export default new module()