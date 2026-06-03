export const init = async () => {
    /* global level */
    const global = await import("./global.js")
    await global.add()
}