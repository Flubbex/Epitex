class Emitter {
    constructor() {
        this._events = Object.create(null)
    }

    /**
     * Subscribe to an event.
     * Duplicate function references for the same event are ignored.
     * Returns an unsubscribe function.
     */
    on(event, fn) {
        if (typeof fn !== "function")
            throw new TypeError("Emitter.on: listener must be a function")

        let list = this._events[event]
        if (!list) {
            list = this._events[event] = []
        } else if (list.includes(fn)) {
            return () => this.off(event, fn)
        }

        list.push(fn)
        return () => this.off(event, fn)
    }

    /**
     * Subscribe to an event once. Automatically removes the listener after the first emit.
     */
    once(event, fn) {
        const wrapper = (...args) => {
            this.off(event, wrapper)
            fn(...args)
        }
        // Preserve original reference for manual off if needed
        wrapper._original = fn
        return this.on(event, wrapper)
    }

    /**
     * Remove a listener.
     * If fn is omitted, all listeners for the event are removed.
     * Also removes once-wrappers that wrap the given fn.
     */
    off(event, fn) {
        const list = this._events[event]
        if (!list) return this

        if (!fn) {
            delete this._events[event]
            return this
        }

        this._events[event] = list.filter(f => f !== fn && f._original !== fn)
        if (this._events[event].length === 0)
            delete this._events[event]

        return this
    }

    /**
     * Emit an event.
     * - "*" listeners receive (eventName, ...args)
     * - Specific listeners receive (...args)
     * - List is copied before iteration so on/off during emit is safe
     * - Errors in listeners are caught and do not stop other listeners
     */
    emit(event, ...args) {
        const run = (list, passEvent) => {
            if (!list || list.length === 0) return
            // Copy so listeners can on/off during emit
            for (const fn of list.slice()) {
                try {
                    if (passEvent)
                        fn(event, ...args)
                    else
                        fn(...args)
                } catch (err) {
                    console.error(`Emitter: error in "${event}" listener`, err)
                }
            }
        }

        run(this._events["*"], true)
        if (event !== "*")
            run(this._events[event], false)

        return this
    }

    /**
     * Remove all listeners, or all listeners for a specific event.
     */
    removeAllListeners(event) {
        if (event) {
            delete this._events[event]
        } else {
            this._events = Object.create(null)
        }
        return this
    }

    /**
     * Number of listeners for an event (or total if no event given).
     */
    listenerCount(event) {
        if (event)
            return this._events[event]?.length ?? 0

        let n = 0
        for (const key in this._events)
            n += this._events[key].length
        return n
    }

    /**
     * Listeners must never be serialized.
     */
    toJSON() {
        return null
    }
}

export default Emitter