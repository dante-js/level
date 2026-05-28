console.log("Starting app")

const level = await import("/framework/runtime/level.js")
level.addGlobal()