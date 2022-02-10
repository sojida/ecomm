const axios = require('axios');
const SD = require('../ServiceRegistrar');

const AddItem = async (cartId, item_id, name, price) => {
    const cart = await axios.default.post(`${SD.Services.carting}/cart/${cartId}/item`, {
        item_id, name, price
    })

    return cart.data
}

module.exports = AddItem;