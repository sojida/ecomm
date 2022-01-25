const axios = require('axios');
const SD = require('../ServiceRegistrar');

const CreateWallet = async ({ client_id }) => {
    const wallet = await axios.default.post(`${SD.Services.wallet}/wallet`, { client_id })

    return wallet.data.wallet
}

module.exports = CreateWallet;