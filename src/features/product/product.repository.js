import { ObjectId } from "mongodb";
import { getDatabase } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
  constructor() {
    this.db_collection = "products";
  }
  async add(newProduct) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async getAll() {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      const products = await collection.find().toArray();
      //   console.log(products);
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async getProductById(id) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      console.log(filterExpression);
      return await collection.find(filterExpression).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rate(userId, productId, rating) {
    try {
      const database = getDatabase();
      const collection = database.collection(this.db_collection);
      collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: {
            rating: {
              userId: new ObjectId(userId),
              rating,
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;
