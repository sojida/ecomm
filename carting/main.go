package main

import (
	"main/CartApi"
	"net/http"

	"github.com/gin-gonic/gin"
)



func main() {
	registerRouter()
}

func health(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, gin.H{"code": http.StatusAccepted, "status": "UP"})
}

func registerRouter() {
	router := gin.Default()

	router.GET("/health", health)
	router.GET("/cart/:cart_id", Cartapi.GetCart)
	router.POST("/cart", Cartapi.CreateCart)
	router.POST("/cart/:cart_id/item", Cartapi.AddProduct)
	router.PATCH("/cart/:cart_id/item", Cartapi.RemoveProduct)
	router.DELETE("/cart/:cart_id/item", Cartapi.DeleteProduct)

	router.Run(":3030")
}
