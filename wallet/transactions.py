from datetime import datetime
import string
import random

class Transaction:
    def __init__(self, amount, description, wallet_id):
        self.id = ''.join(random.choice(string.ascii_letters) for i in range(10))
        self.amount = amount
        self.wallet_id = wallet_id
        self.description = description
        self.created_at = datetime.now()

class Transactions:
    def __init__(self):
        self.transactions = []

    def createTransaction(self, amount, description, wallet_id):
        transaction = Transaction(amount, description, wallet_id)
        self.transactions.append(transaction)

    def getTransactions(self, wallet_id):
        transactions = filter(lambda trx: trx.wallet_id == wallet_id, self.transactions)
        return list(transactions)

transactions = Transactions()