import app from "./app/app.js";
import connectDB from "./app/config/db.js";

await connectDB(); // Connect to MongoDB

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
