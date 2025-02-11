const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/rankings").then( function(){
  console.log("connected");
}
    
).catch(function(){
    console.log("Some Issues in Connection");
});
