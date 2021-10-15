const axios = require('axios');

const GetItems = async () => {
    const item = await axios.default.get(`http://localhost:3000/items`)

    return item.data
}

module.exports = GetItems;
