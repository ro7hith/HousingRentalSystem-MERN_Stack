const mongoose = require("mongoose")
const url = process.env.DATABASE_URL;
  
mongoose.connect(url).then(() => {
  console.log("Connected to database successfilly")
}).catch((err) => {
  console.log("ERROR:", err);
});