class ItemsController < ActionController::API
    include Productsmanager

    def index
        render :json => {"status": true, "products": Productsmanager.products }
    end

    def show
        id = params[:id]
        product = Productsmanager.product(id.to_i)
        if product
            return render :json => {"status": true, "product": product }
        else
            return render :json => {"status": false, "message": "Not Found" }, status: 404
        end
    end

    def create
        # Restock inventory
        product1 = Productsmanager::Product.new(1, 'Apple Tv', 200.00, 'Electronics', 10)
        product2 = Productsmanager::Product.new(2, 'Air Jordans', 100.00, 'Shoes', 15)
        product3 = Productsmanager::Product.new(3, 'Tag Heuer Watch', 50.00, 'Watch', 4)
        product4 = Productsmanager::Product.new(4, 'Mac book pro', 850.00, 'Electronics', 5)
        product5 = Productsmanager::Product.new(5, '12 Rules for Life', 200.00, 'Book', 2)
        Productsmanager.add(product1)
        Productsmanager.add(product2)
        Productsmanager.add(product3)
        Productsmanager.add(product4)
        Productsmanager.add(product5)
        render :json => {"status": true, "products": Productsmanager.products }
    end

    def destroy
        val = params.require(:item).permit(:quantity)
        id = params[:id]
        if val['quantity'] 
            removed = Productsmanager.remove(id.to_i, val['quantity'].to_i)
            puts removed
            if removed
                return render :json => {"status": true, "products": Productsmanager.products }
            else
                return render :json => {"status": false, "message": "Error updating inventory" }, status: 422
            end
        end
        return render :json => {"status": false, "message": "Error updating inventory" }, status: 422
    end
end