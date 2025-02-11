const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/olympic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is established");
  })
  .catch((error) => {
    console.error("Something is wrong in Connection:", error.message);
  });
