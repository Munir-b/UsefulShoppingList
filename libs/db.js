var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/shoppingList');
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('Connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

var Schema = mongoose.Schema;


var Item = new Schema({
    name: {type: String, required: true},
    have: {type: Boolean, default: false}
});

var Category = new Schema({
    name: {type: String, required: true},
    items: [Item]
});

var ShoppingList = new Schema({
    categories: [Category]
});


var ShoppingListModel = mongoose.model('ShoppingList', ShoppingList);


module.exports = ShoppingListModel;