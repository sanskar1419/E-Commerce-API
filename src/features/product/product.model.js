export default class ProductModel {
  constructor(ID, name, description, imageURL, category, price, sizes) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.imageURL = imageURL;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static GetAll() {
    return products;
  }

  static getProductById(id) {
    const product = products.find((p) => p.ID == id);
    console.log(product);
    return product;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static filter(minPrice, maxPrice, Category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!Category || product.category == Category)
      );
    });

    return result;
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category 1",
    19.99
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category 2",
    29.99,
    ["M", "XL", "L"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category 3",
    39.99,
    ["M", "XL", "L", "XLL"]
  ),
];
