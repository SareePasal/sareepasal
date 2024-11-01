function convertToCents (amount, factor=100) {
    console.log(amount * factor,amount ,factor)
    return Math.round(amount  * factor)
}

export default convertToCents