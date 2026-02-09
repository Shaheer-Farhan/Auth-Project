import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.setup.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Express app error", err);
    });
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("HHAHA")
    console.error("MongoDB connection error", err);
    // process.exit(1);
  });
