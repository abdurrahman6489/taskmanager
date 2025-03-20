const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/User");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5012;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_SERVER_URI);
};

connectDB()
  .then(() => {
    console.log("connection with MongoDB established");
  })
  .catch((error) => {
    console.error("connection with MongoDB was not established ", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
