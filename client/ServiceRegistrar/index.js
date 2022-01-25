const axios = require('axios');

const Services = {}

const RegisterServices = async () => {
    const { data: Services } = await axios.default.get('http://consul:8500/v1/agent/services');

    for (const service in Services) {
        const currentService = Services[service];
        if (!Services[service] && service !== 'consul') {
            Services[service] = currentService.Address
        }
    }

}

setInterval(() => {
    RegisterServices()
}, 60000)

RegisterServices()

module.exports = { Services};
