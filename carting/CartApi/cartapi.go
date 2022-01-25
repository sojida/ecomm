package Cartapi

import (
	"main/CartManager"
	"github.com/golang/protobuf/ptypes/any"
	"github.com/gin-gonic/gin"
	"net/http"
)

var cartMan = CartManager.New()

type Response struct {
	Status bool
	Message string
	Data any.Any
}

type AddProductForm struct {
	ItemId string `json:"item_id" binding:"required"`
	Name string `json:"name" binding:"required"`
	Price int `json:"price" binding:"required"`
}

type RemoveProductForm struct {
	ItemId string `json:"item_id" binding:"required"`
}

func GetCart(c *gin.Context) {
	cart_id := c.Param("cart_id")
	index := cartMan.CheckCart(cart_id)
	if index >= 0 {
		_, cart := cartMan.GetCart(index)
		c.IndentedJSON(http.StatusOK, cart)
		return
	}

	c.IndentedJSON(http.StatusNotFound, Response{Message: "Not Found", Status: false })
}


func CreateCart(c *gin.Context) {
	cartM, newCart := cartMan.CreateCart()
	cartMan = cartM
	c.JSON(http.StatusCreated, newCart)
}

func AddProduct(c *gin.Context) {
	var addProductForm AddProductForm

	if err := c.ShouldBindJSON(&addProductForm); err != nil {
		c.JSON(http.StatusBadRequest, Response{Status: false, Message: "Validation Error"})
		return
	}

	cart_id := c.Param("cart_id")
	index := cartMan.CheckCart(cart_id)
	if index < 0 {
		c.IndentedJSON(http.StatusNotFound, Response{Message: "Not Found", Status: false })
		return
	}

	cartMan = cartMan.AddItemToCart(index, addProductForm.ItemId, addProductForm.Name, addProductForm.Price)

	_, cart := cartMan.GetCart(index)

	c.IndentedJSON(http.StatusOK, cart)
}

func RemoveProduct(c *gin.Context) {
	var removeProductForm RemoveProductForm

	if err := c.ShouldBindJSON(&removeProductForm); err != nil {
		c.JSON(http.StatusBadRequest, Response{Status: false, Message: "Validation Error"})
		return
	}

	cart_id := c.Param("cart_id")
	index := cartMan.CheckCart(cart_id)
	if index < 0 {
		c.IndentedJSON(http.StatusNotFound, Response{Message: "Not Found", Status: false })
		return
	}

	cartMan = cartMan.RemoveItemFromCart(index, removeProductForm.ItemId)

	_, cart := cartMan.GetCart(index)


	c.IndentedJSON(http.StatusOK, cart)
}

func DeleteProduct(c *gin.Context) {
	var removeProductForm RemoveProductForm

	if err := c.ShouldBindJSON(&removeProductForm); err != nil {
		c.JSON(http.StatusBadRequest, Response{Status: false, Message: "Validation Error"})
		return
	}

	cart_id := c.Param("cart_id")
	index := cartMan.CheckCart(cart_id)
	if index < 0 {
		c.IndentedJSON(http.StatusNotFound, Response{Message: "Not Found", Status: false })
		return
	}

	cartMan = cartMan.DeleteItemFromCart(index, removeProductForm.ItemId)

	_, cart := cartMan.GetCart(index)


	c.IndentedJSON(http.StatusOK, cart)
}
