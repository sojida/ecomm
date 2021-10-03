module Productsmanager
  class Product
    def initialize(id, name, price, category, quantity)
      @id = id
      @name = name
      @price = price
      @category = category
      @quantity = quantity
    end

    attr_accessor :quantity
    attr_reader :id, :name, :price, :category
  end

  class Products
    def initialize
      @products = []
    end

    def get(id)
        @products.each do |p|
            next unless p.id == id
            return p
        end
        false
    end

    def add(product)
      isNotList = true
      @products.each do |p|
        next unless p.name == product.name

        p.quantity += product.quantity
        isNotList = false
        break
      end

      @products.push(product) if isNotList
    end

    attr_reader :products

    def removeProduct(id, quantity)
      @products.each do |p|
        next unless p.id == id

        remaining_quantity = p.quantity - quantity
        if remaining_quantity < 0
          return false
        else
          p.quantity = remaining_quantity
          return true
        end
      end

      false
    end
  end

  @products = Products.new

  def self.products
    @products.products
  end

  def self.add(product)
    @products.add(product)
  end

  def self.remove(id, quantity)
    @products.removeProduct(id, quantity)
  end

  def self.product(id)
    @products.get(id)
  end
end
