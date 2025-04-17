const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const authMiddleware = require("./utils/auth");
const rootRouter = require("./routes/root.routes");

require("dotenv").config();
require("./utils/connection");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authMiddleware);
app.use("/", rootRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});