const axios = require('axios');

const CreateTransaction = async ({ wallet_id, amount, description }) => {
    const transaction = await axios.default.post(`http://localhost:8000/transactions/${wallet_id}`, { amount, description })

    return transaction.data
}

module.exports = CreateTransaction;