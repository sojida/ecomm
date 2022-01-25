const axios = require('axios');
const SD = require('../ServiceRegistrar');

const CreatePurchase = async ({ purchase }) => {
    const item = await axios.default.post(`${SD.Services.purchase}/purchase`, { purchase })

    return item.data
}

module.exports = CreatePurchase;