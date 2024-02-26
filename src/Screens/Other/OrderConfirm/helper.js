export const transportFee = (expressShip, distance) => {
    let cost
    if (!expressShip) {
        cost = 5500
    } else {
        cost = 7500
    }
    return distance * cost
}