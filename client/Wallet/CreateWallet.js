const axios = require('axios');

const CreateWallet = async ({ client_id }) => {
    const wallet = await axios.default.post('http://localhost:8000/wallet', { client_id })

    return wallet.data.wallet
}

module.exports = CreateWallet;