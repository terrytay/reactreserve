function calculateCartTotal(products) {
    const total = products.reduce((acc, el) => {
        acc += el.product.price * el.quantity
        return acc
    }, 0)

    const cartTotal = ((total * 100) / 100).toFixed(2) // 2dp round off js style
    const stripeTotal = Number((total * 100 ).toFixed(2)) // convert to cents


    return { cartTotal, stripeTotal }
}

export default calculateCartTotal