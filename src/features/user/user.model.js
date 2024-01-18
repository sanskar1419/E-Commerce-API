export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    ID: 1,
    name: "Seller User",
    email: "seller@gmail.com",
    password: "Seller123@",
    type: "seller",
  },
  {
    ID: 2,
    name: "Customer User",
    email: "customer@gmail.com",
    password: "customer@",
    type: "customer",
  },
];
