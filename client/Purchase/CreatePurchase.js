const axios = require('axios');

const CreatePurchase = async ({ purchase }) => {
    const item = await axios.default.post(`http://localhost:4000/purchase`, { purchase })

    return item.data
}

module.exports = CreatePurchase;