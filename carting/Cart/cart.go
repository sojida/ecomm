package Cart

import (
	"main/CartItem"
	"main/utils"
)


type Cart struct {
	Id string
	TotalPrice int
	CartItems []CartItem.CartItem
}


func New() Cart{
	cart := Cart{Id: utils.RandStringRunes(10), TotalPrice: 0, CartItems: make([]CartItem.CartItem, 0)}
	return cart
}

func (cart Cart) AddItem(item_id string, name string, price int) Cart {
	cartItem := CartItem.New(item_id, name, price)
	isNotInCart := true

	for i := 0; i < len(cart.CartItems); i++ {
		if cart.CartItems[i].Id == cartItem.Id {
			isNotInCart = false
			cart.CartItems[i] = cart.CartItems[i].IncreaseQuantity()
		}
	}


	if isNotInCart {
		cart.CartItems = append(cart.CartItems, cartItem)
	}

	cart.TotalPrice = calculateTotal(cart.CartItems)

	return cart
}

func (cart Cart) RemoveItem(itemId string) Cart {
	for i := 0; i < len(cart.CartItems); i++ {
		if cart.CartItems[i].Id == itemId {
			cart.CartItems[i] = cart.CartItems[i].DecreaseQuantity()
			if cart.CartItems[i].Quantity == 0 {
				// removes the cart item from the list
				cart.CartItems = append(cart.CartItems[:i], cart.CartItems[i+1:]...)
			}
		}
	}

	cart.TotalPrice = calculateTotal(cart.CartItems)
	return cart
}

func (cart Cart) DeleteItem(itemId string) Cart {
	for i := 0; i < len(cart.CartItems); i++ {
		if cart.CartItems[i].Id == itemId {
			// removes the cart item from the list
			cart.CartItems = append(cart.CartItems[:i], cart.CartItems[i+1:]...)
		}
	}

	cart.TotalPrice = calculateTotal(cart.CartItems)
	return cart
}


func calculateTotal(cartItems []CartItem.CartItem) int {
	var total = 0
	for i := 0; i < len(cartItems); i++ {
		total += cartItems[i].TotalPrice
	}

	return total
}





