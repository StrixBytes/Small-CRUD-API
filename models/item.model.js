const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://newUser:newPassword@products-adq8j.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false });

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    available: Boolean,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Items", ItemSchema);