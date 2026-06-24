const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});

app.use(express.static(
    path.join(__dirname, "public")
));

app.use("/api/users",
    require("./routes/userRoutes")
);

app.listen(process.env.PORT, () => {
    console.log(
        `Server Running on Port ${process.env.PORT}`
    );
});
