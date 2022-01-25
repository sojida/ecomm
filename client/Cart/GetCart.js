const axios = require('axios');
const SD = require('../ServiceRegistrar');


const GetCart = async ({ cart_id }) => {
    const cart = await axios.default.get(`${SD.Services.carting}/cart/${cart_id}`)

    return cart.data
}

module.exports = GetCart;