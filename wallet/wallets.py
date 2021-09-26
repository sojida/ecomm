import string
import random

class Wallet:
    def __init__(self, client_id):
        self.id = ''.join(random.choice(string.ascii_letters) for i in range(10))
        self.client_id = client_id
        self.balance = 0

    def update_balance(self, new_balance: int):
        self.balance += new_balance

    def __str__(self):
        return "%s(%r)" % (self.__class__, self.__dict__)

class Wallets:
    def __init__(self):
        self.list = []

    def add(self, wallet):
        self.list.append(wallet)

    def get_by_id(self, id):
        for wallet in self.list:
            if wallet.id == id:
                return wallet

wallets = Wallets()