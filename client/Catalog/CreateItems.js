const axios = require('axios');
const SD = require('../ServiceRegistrar');

const CreateItems = async () => {
    const item = await axios.default.post(`${SD.Services.catalog}/items`)

    return item.data
}

module.exports = CreateItems;
