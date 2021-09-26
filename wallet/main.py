from fastapi import FastAPI, Response
from wallets import Wallet, wallets
from transactions import transactions
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
async def root():
    return {message: "Wallet service"}


class RequestBodyModel(BaseModel):
    client_id: int


class CreateTransactionModel(BaseModel):
    amount: int
    description: str


@app.post('/wallet', status_code=201)
async def createWallet(body: RequestBodyModel):
    wallet = Wallet(body.client_id)
    wallets.add(wallet)
    return {"message": "Wallet created successfully", "wallet": wallet}


@app.get('/wallets/{wallet_id}', status_code=200)
async def getWallet(wallet_id, response: Response):
    wallet = wallets.get_by_id(wallet_id)

    if wallet:
        return wallet
    else:
        response.status_code = 404
        return {"message": "Wallet not found"}


@app.post('/transactions/{wallet_id}', status_code=201)
async def createTransaction(createTransactionModel: CreateTransactionModel, wallet_id, response: Response):
    wallet = wallets.get_by_id(wallet_id)
    if wallet:
        if wallet.balance + createTransactionModel.amount < 0:
            response.status_code = 400
            return {"message": "Insufficient balance"}

        ## update wallet
        wallet.update_balance(createTransactionModel.amount)

        ## add transaction to list
        transactions.createTransaction(createTransactionModel.amount, createTransactionModel.description, wallet_id)

        return wallet
    else:
        response.status_code = 404
        return {"message": "Wallet not found"}


@app.get('/transactions/{wallet_id}', status_code=200)
async def getTransctions(wallet_id):
    wallet_transactions = transactions.getTransactions(wallet_id)

    return {"transactions": wallet_transactions}
