const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(
    process.env.MONGODB_URI
)
    .then(() => console.log("MongoDB Connected 📁"))
.catch((e) => console.log(e));