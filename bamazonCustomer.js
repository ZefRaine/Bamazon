{
  const mysql = require("mysql");
  const inquirer = require("inquirer");

  let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
  });

  connection.connect(function (err) {
    if (err) throw err; {
      productSearch();
    }
  });

  function runSearch(results) {
    inquirer.prompt([{
        name: "item_id",
        message: "What product ID are you looking for?\n",
        validate: function (name) {
          return name !== "";
        }
      },
      {
        name: "stock_quantity",
        message: "How many would like to buy?\n",
        validate: function (name) {
          return name !== "";
        }
      }, {
        name: "exit",
        message: "Would you like to exit (Y/N) \n",
        validate: function (name) {
          return name.toLowerCase() === "y" || name.toLowerCase() === "n"
        }
      }

    ]).then(function (answers) {

      const id = parseInt(answers.item_id);
      const item = results.find(function (result) {
        return result.item_id === id;
      });
      soulSearch(id);
      const stock = parseInt(answers.stock_quantity)
      if (item.stock_quantity <= stock)
        console.log("Not enough in stock");
      else {
        var total = item.stock_quantity - stock;
        console.log(total + " left in stock\n" +
          "-----------------");
      }
      console.log("Looking for anything else?")
      runSearch(results);
      if (answers.exit === "y")
        leaveMe();
      else(answers.exit === "n"); {
        leaveMe();
      }
    })
  }
}

function leaveMe() {
  connection.end();
  process.exit(0);
}

function productSearch() {
  connection.query('SELECT item_id, product_name, stock_quantity FROM products', function (error, results) {
    if (error) throw error;
    console.table(results)
    runSearch(results);
  })
}

function soulSearch(id) {
  connection.query('SELECT * FROM products WHERE item_id = ?', {
    item_id: id
  }, function (error, results) {
    if (error) throw error;
  })
}

function stockChange(id, stock) {
  console.log(stock, id);
  connection.query(`UPDATE products SET stock_quantity - ${stock} WHERE item_id = "${id}"`, function (error, results) {
    if (error) throw error;
  })
}
// how to run a inquirer again after I finished the bamazonCustomer.js first purchaseth
//display how much the product costs is when I buy #stock 
//how to display updates MySQL quantity amount after purchase before returning to main menue