var express = require('express');
var router = express.Router();
var db =  require("../libs/db");



router.get('/', function(req, res, next) {

    res.send({
        "categories" : [
            {name: "Еда", items: [
                {name: "Бэби муцарела", have: false},
                {name: "Рикота 1 шт", have: false},
                {name: "Сливки - 36% или 38%", have: true},
                {name: "Нью Йорк лайт или обычный", have: true},
                {name: "филадельфия", have: true}
            ]},
            {name:"Мясное", items: []},
            {name:"Прочее", items: []},
            {name:"Уборка", items: []}
        ]
    });

    /*
    return db.find(function(err, shoppingList) {
        if (err) {
            console.error("Got error", err);
        }
        else {
            console.log("Sending", shoppingList);
            res.send(shoppingList);
        }
    });
    */
});

router.post('/', function(req, res) {
    console.log("Got ", req.body);

    db.find(function getShoppingList(err, shoppingList) {
        if (err) {
            console.log(err);
        }
        else {
            if (shoppingList.length == 0) {
                shoppingList = new ShoppingList({categories: req.body});
            }
            else {
                shoppingList = shoppingList[0];
            }

            shoppingList.save(function saveShoppingList(err, shoppingList) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(shoppingList);
                }
            });
        }
    });
});

module.exports = router;