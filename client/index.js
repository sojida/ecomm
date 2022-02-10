const express = require('express');
const Wallet = require('./Wallet');
const Cart = require('./Cart');
const Catalog = require('./Catalog');
const Purchase = require('./Purchase');
const Sentry = require('./Sentry');
const Client = require('./Models/Client');

const app = express();
const port = process.env.PORT || 3333

app.use(express.json());

const clients = {}


app.get('/', async (req, res) => {
    return res.status(200).send('Service client api');
})

app.get('/health', async (req, res) => {
    return res.status(200).json({ status: 'UP' });
})

app.post('/client', async (req, res) => {
    try {
        const client = new Client()
        const new_wallet = await Wallet.CreateWallet({ client_id: client.id });
        const cart = await Cart.CreateCart();

        await Wallet.CreateTransaction({ wallet_id: new_wallet.id, amount: 5000, description: 'firt timer' })
        const wallet = await Wallet.GetWallet({ wallet_id: new_wallet.id });

        client.setWallet(wallet);
        client.setCart(cart);

        await Catalog.CreateItems();
        clients[client.id] = client;
        res.status(201).json({ client });
    } catch (error) {
        Sentry.captureException(error);
    }

})

app.get('/client/:client_id', async (req, res) => {
    try {
        const { client_id } = req.params;

        const client = clients[client_id]

        if (!client) {
            return res.status(404).json({
                message: 'Client not found'
            })
        }

        const wallet = await Wallet.GetWallet({ wallet_id: client.wallet.id });
        client.setWallet(wallet)

        return res.status(200).json({ client });
    } catch (error) {
        Sentry.captureException(error);
    }

})

app.get('/catalogs', async (req, res) => {
    try {
        const catalog = await Catalog.GetItems()
        return res.status(200).json({ catalog });
    } catch (error) {
        Sentry.captureException(error)
    }

})

app.post('/client/:client_id/cart/:product_id', async (req, res) => {
    try {
        const { product_id, client_id } = req.params;

        const client = clients[client_id];

        if (!client) {
            return res.status(404).json({
                message: 'Client not found'
            })
        }

        const { product } = await Catalog.GetItem(product_id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        await Cart.AddItem(client.cart.Id, `${product.id}`, product.name, product.price)

        const cart = await Cart.GetCart({ cart_id: client.cart.Id })

        return res.status(200).json({ cart })
    } catch (error) {
        Sentry.captureException(error);
    }

})

app.get('/purchase/:client_id', async (req, res) => {
    try {
        const { client_id } = req.params;

        const purchases = await Purchase.GetPurchase({ client_id });

        return res.status(200).json(purchases)
    } catch (error) {
        Sentry.captureException(error);
    }

})

app.post('/purchase/:client_id', async (req, res) => {
    try {
        const { client_id } = req.params;

        const client = clients[client_id]

        if (!client) {
            return res.status(404).json({ message: 'client not found' });
        }
        // Get Cart
        const cart = await Cart.GetCart({ cart_id: client.cart.Id });

        // Get Wallet
        const wallet = await Wallet.GetWallet({ wallet_id: client.wallet.id });

        if (cart.TotalPrice <= 0) {
            return res.status(400).json({ message: 'Nothing to purchase here, add some items to your cart' });
        }

        // check wallet can pay items in cart
        if (wallet.balance < cart.TotalPrice) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }


        // check items in cart items is in the catalog
        const catalog = await Catalog.GetItems();


        for (let i = 0; i < cart.CartItems.length; i++) {
            let currentCartItem = cart.CartItems[i];

            const itemInCatalog = catalog.products.find(product => String(product.id) === String(currentCartItem.Id))
            if (!itemInCatalog) {
                return res.status(400).json({ status: false, cart, message: `${currentCartItem.Name} is out of stock` });
            }

            if (itemInCatalog.quantity < currentCartItem.Quantity) {
                return res.status(400).json({ status: false, cart, message: `${currentCartItem.Name} is out of stock` });
            }
        }

        // remove items in catalog
        for (const item of cart.CartItems) {
            await Catalog.RemoveItem({ item_id: item.Id, quantity: item.Quantity })
        }

        // perform transaction on wallet
        await Wallet.CreateTransaction({ wallet_id: client.wallet.id, amount: -cart.TotalPrice, description: 'purchase order' })

        // create purchase
        const purchase = {
            cart,
            client_id: client.id,
            id: Math.round(Math.random() * 10000)
        }

        await Purchase.CreatePurchase({ purchase })

        const new_cart = await Cart.CreateCart();
        client.setCart(new_cart)

        return res.status(200).json({ message: 'purchase created successfully', purchase });
    } catch (error) {
        Sentry.captureException(error)
    }
})


app.listen(port, () => console.log('listening on port ', port))
