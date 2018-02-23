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
  manager();
});

function manager () {
  inquirer.prompt([
  {
    name: "menu",
    type: "list",
    message: "Hello, Sir. What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]      
  }]).then(function(answer) {
    switch (answer.menu) {
      case "View Products for Sale":
        viewAll();
        break;
      
      case "View Low Inventory":
        viewLow();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
        
    }
  });
}

function viewAll () {
  var query = "SELECT * FROM products"
  connection.query(query, function(err, res) {
    console.log("\r\nHere are the items we have in stock: ")
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item)
    }
    console.log("\r\n")
    manager();
  })
}

function viewLow () {
  var query = "SELECT item FROM products WHERE quantity < 5"
  connection.query(query, function(err, res) {
    console.log("\r\nHere are the items we're running low on: ")
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item)
    }
    console.log("\r\n")
    manager();
  })
}

function addInventory () {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt({
      name: "item",
      type: "rawlist",
      message: "What item would you like to restock?",
      choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item);
              }
              return choiceArray;
      }
    }).then(function(answer){
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item === answer.item) {
            chosenItem = results[i];
          }
        };
      console.log("\r\nWe have "+chosenItem.quantity+" "+chosenItem.item+"(s)");
      inquirer.prompt({
        name: "number",
        message: "How many should we order?"
      }).then(function(ans){
        var query = "UPDATE quantity set ? WHERE ?";
        connection.query(query {quantity: chosenItem.quantity + ans.number},{id: chosenItem.id})
      })
      console.log("Great work managing the inventory!");
      manager();
    });
  });
};

function addProduct () {
  console.log("add Product");
  manager();
}




//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item);
//             }
//             return choiceArray;
//           },
//           message: "What product would you like to buy?"
//         },
//         {
//           name: "quantity",
//           type: "input",
//           message: "How many would you like to buy?"
//         }
//       ]).then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item === answer.choice) {
//             chosenItem = results[i];
//           }
//         }
//         if (chosenItem.quantity > answer.quantity) {        
//   	      connection.query("UPDATE products SET ? WHERE ?",
//   	        [
//   	          {
//   	            quantity: chosenItem.quantity - answer.quantity
//   	          },
//   	          {
//   	            id: chosenItem.id
//   	          }
//   	        ],
//   	        function(error) {
//               var totalCost = chosenItem.price * answer.quantity;
//   	          if (error) throw err;
//   	          console.log(answer.quantity+" "+chosenItem.item+"(s) costs "+Number(Math.round(totalCost+'e2')+'e-2')+"\r\n Thank you for your purchase!\r\n");
//   	        }
//           );
//         } else {
//           console.log("I'm sorry, we do not have enough in stock.\r\n")
//         }
//         manager();
//       });
//   })
// };