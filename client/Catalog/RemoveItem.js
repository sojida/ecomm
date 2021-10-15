const axios = require('axios');

const RemoveItem = async ({ item_id, quantity }) => {
    const item = await axios.default.delete(`http://localhost:3000/items/${item_id}`, { data: { quantity }})

    return item.data
}

module.exports = RemoveItem;
