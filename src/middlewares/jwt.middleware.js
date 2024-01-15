import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1. Read the token
  const token = req.headers["authorization"];
  console.log(token);

  // 2. If no token , return error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. check if token is valid or not
  try {
    const payload = jwt.verify(token, "gH8gK1MHLfh4VPwK2zt0HvnIYYzX8hnU");
    console.log(payload);
    req.userId = payload.userId;
  } catch (error) {
    // 4. return err
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
  // 5.call the next middleware
  next();
};

export default jwtAuth;
