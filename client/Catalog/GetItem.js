const axios = require('axios');
const SD = require('../ServiceRegistrar');

const GetItem = async (productId) => {
    const item = await axios.default.get(`${SD.Services.catalog}/items/${productId}`)

    return item.data
}

module.exports = GetItem;
