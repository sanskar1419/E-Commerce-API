export default class UserModel {
  constructor(ID, name, email, password, type) {
    this.ID = ID;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static signUp(name, email, password, type) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      type
    );
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
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
];
