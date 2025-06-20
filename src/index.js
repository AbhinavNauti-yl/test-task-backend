import app from "./app.js";
import {dbConnect} from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server live");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
