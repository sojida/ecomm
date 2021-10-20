const axios = require('axios');
const SD = require('../ServiceRegistrar');


const GetWallet = async ({ wallet_id }) => {
    const wallet = await axios.default.get(`${SD.Services.wallet}/wallets/${wallet_id}`)

    return wallet.data
}

module.exports = GetWallet;