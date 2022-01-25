const axios = require('axios');
const SD = require('../ServiceRegistrar');

const CreateTransaction = async ({ wallet_id, amount, description }) => {
    const transaction = await axios.default.post(`${SD.Services.wallet}/transactions/${wallet_id}`, { amount, description })

    return transaction.data
}

module.exports = CreateTransaction;