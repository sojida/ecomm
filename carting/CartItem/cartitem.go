package CartItem

type CartItem struct {
	Id string
	UnitPrice int
	Quantity int
	TotalPrice int
	Name string
}

func New(id string, name string, price int) CartItem {
	cartItem := CartItem{Id: id, Name: name, UnitPrice: price, TotalPrice: price, Quantity: 1}
	return cartItem
}

func (cartItem CartItem) IncreaseQuantity() CartItem {
	cartItem.Quantity += 1
	cartItem.TotalPrice = cartItem.UnitPrice * cartItem.Quantity
	return cartItem
}

func (cartItem CartItem) DecreaseQuantity() CartItem {
	cartItem.Quantity -= 1
	cartItem.TotalPrice = cartItem.UnitPrice * cartItem.Quantity
	return cartItem
}
