export const counter = async ({min, max, delay, box, symbol = null}) => {
    for (let i = min; i <= max; i++) {
        box.textContent = symbol 
            ? `${i}${symbol}`
            : Number(i)
        await new Promise(resolve => setTimeout(resolve, delay))
    }
}