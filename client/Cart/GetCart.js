const axios = require('axios');

const GetCart = async ({ cart_id }) => {
    const cart = await axios.default.get(`http://localhost:3030/cart/${cart_id}`)

    return cart.data
}

module.exports = GetCart;