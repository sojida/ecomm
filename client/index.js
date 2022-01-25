const express = require('express');
const Wallet = require('./Wallet');
const Cart = require('./Cart');
const Catalog = require('./Catalog');
const Purchase = require('./Purchase');
const Client = require('./Models/Client');

const app = express();
const port = process.env.PORT || 3333

app.use(express.json());

const clients = {}


app.get('/health', async (req, res) => {
    return res.status(200).json({ status: 'UP' });
})

app.post('/client', async (req, res) => {
    const client = new Client()
    const wallet = await Wallet.CreateWallet({ client_id: client.id });
    const cart = await Cart.CreateCart();

    client.setWallet(wallet);
    client.setCart(cart);

    clients[client.id] = client;
    res.status(201).json({ client });
})

app.get('/client/:client_id', async (req, res) => {
    const {client_id} = req.params;

    const client = clients[client_id]
    return res.status(200).json({ client });
})

app.post('/purchase/:client_id', async (req, res) => {
    const {client_id} = req.params;

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
    await Wallet.CreateTransaction({ wallet_id: client.wallet.id, amount: -cart.TotalPrice, description: 'purchase order'})

    // create purchase
    const purchase = {
       cart,
       client_id: client.id,
       id:  Math.round(Math.random() * 10000)
    }

    await Purchase.CreatePurchase({ purchase })

    return res.status(200).json({ message: 'purchase created successfully' ,purchase });
})


app.listen(port, () => console.log('listening on port ', port))
