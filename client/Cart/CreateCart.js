const axios = require('axios');
const SD = require('../ServiceRegistrar');

const CreateCart = async () => {
    const cart = await axios.default.post(`${SD.Services.carting}/cart`)

    return cart.data
}

module.exports = CreateCart;