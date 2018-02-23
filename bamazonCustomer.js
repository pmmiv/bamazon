var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  customer();
});

function customer () {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item === answer.choice) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.quantity > answer.quantity) {        
  	      connection.query("UPDATE products SET ? WHERE ?",
  	        [
  	          {
  	            quantity: chosenItem.quantity - answer.quantity
  	          },
  	          {
  	            id: chosenItem.id
  	          }
  	        ],
  	        function(error) {
              var totalCost = chosenItem.price * answer.quantity;
  	          if (error) throw err;
  	          console.log(answer.quantity+" "+chosenItem.item+"(s) costs "+Number(Math.round(totalCost+'e2')+'e-2')+"\r\n Thank you for your purchase!\r\n");
  	        }
          );
        } else {
          console.log("I'm sorry, we do not have enough in stock.\r\n")
        }
        customer();
      });
  })
};