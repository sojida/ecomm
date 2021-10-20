const axios = require('axios');
const SD = require('../ServiceRegistrar');

const GetItems = async () => {
    const item = await axios.default.get(`${SD.Services.catalog}/items`)

    return item.data
}

module.exports = GetItems;
