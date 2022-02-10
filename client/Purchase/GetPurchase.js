const axios = require('axios');
const SD = require('../ServiceRegistrar');

const GetPurchase = async ({ client_id }) => {
    const item = await axios.default.get(`${SD.Services.purchase}/purchase/${client_id}`)

    return item.data
}

module.exports = GetPurchase;
