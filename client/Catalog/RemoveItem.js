const axios = require('axios');
const SD = require('../ServiceRegistrar');

const RemoveItem = async ({ item_id, quantity }) => {
    const item = await axios.default.delete(`${SD.Services.catalog}/items/${item_id}`, { data: { quantity }})

    return item.data
}

module.exports = RemoveItem;
