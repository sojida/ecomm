const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const db = []

app.get('/health', async (req, res) => {
    res.status(200).json({ status: 'UP' });
})

app.post('/purchase', (req, res) => {
    const purchase = req.body;
    

    db.push(purchase);
    res.status(200).json({purchases: db});
})

app.get('/purchase/:client_id', (req, res) => {
    const client_id = req.params;
    let purchases = db.filter(purchase => purchase.client_id !== client_id);
    res.status(200).json({purchases});
})

app.listen(port, () => console.log('App is listening on port ', port))

