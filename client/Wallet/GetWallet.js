const axios = require('axios');

const GetWallet = async ({ wallet_id }) => {
    const wallet = await axios.default.get(`http://localhost:8000/wallets/${wallet_id}`)

    return wallet.data
}

module.exports = GetWallet;