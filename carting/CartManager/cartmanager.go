package CartManager

import (
	"main/Cart"
)

type CartManger struct {
	carts []Cart.Cart
}

func New() CartManger{
	newCart := CartManger{carts: make([]Cart.Cart, 0)}
	return newCart
}


func (cartManager CartManger) CreateCart() (CartManger, Cart.Cart) {
	cart := Cart.New()
	cartManager.carts = append(cartManager.carts, cart)
	return  cartManager, cart
}

func (cartManger CartManger) CheckCart(cart_id string) int {
	for i := 0; i < len(cartManger.carts); i++ {
		if cartManger.carts[i].Id == cart_id {
			return i
		}
	}

	return -1
}

func (cartManger CartManger) GetCart(index int) (CartManger, Cart.Cart) {
	return cartManger, cartManger.carts[index]
}

func (cartManger CartManger) AddItemToCart(index int, item_id string, name string, price int) (CartManger) {
	cartManger.carts[index] = cartManger.carts[index].AddItem(item_id, name, price);
	return cartManger
}

func (cartManger CartManger) RemoveItemFromCart(index int, item_id string) (CartManger) {
	cartManger.carts[index] = cartManger.carts[index].RemoveItem(item_id);
	return cartManger
}

func (cartManger CartManger) DeleteItemFromCart(index int, item_id string) (CartManger) {
	cartManger.carts[index] = cartManger.carts[index].DeleteItem(item_id);
	return cartManger
}