
class Client {
    constructor() {
        this.id = Math.round(Math.random() * 10000)
        this.wallet = null;
        this.cart = null;
    }

    setWallet(wallet) {
        this.wallet = wallet;
    }

    setCart(cart) {
        this.cart = cart;
    }
}

module.exports = Client;