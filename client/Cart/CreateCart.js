const axios = require('axios');

const CreateCart = async () => {
    const cart = await axios.default.post('http://localhost:3030/cart')

    return cart.data
}

module.exports = CreateCart;