const consul = require('consul')();

const Services = {}

const RegisterServices = async () => {
   consul.catalog.node.services('machine',(err, result) => {
        if (err) {
            console.log(err)
        }

        for (const service in result.Services) {
            const currentService = result.Services[service];
            if (!Services[service] && service !== 'consul') {
                Services[service] = currentService.Address
            }
        }
    })
}

setInterval(() => {
    RegisterServices()
}, 60000)

RegisterServices()

module.exports = { Services};
