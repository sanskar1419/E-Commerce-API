import app from "./index.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

const port = 9000;

app.listen(port, () => {
  console.log(`Server is listening to port :: ${port}`);
  connectToMongoDB();
});
