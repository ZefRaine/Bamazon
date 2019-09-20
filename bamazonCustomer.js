{
  const mysql = require("mysql");
  const inquirer = require("inquirer");

  const connection = mysql.createConnection({
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
    if (err) throw err;
    productSearch(connection);
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
      }
    ]).then(function (answers) {

      const id = parseInt(answers.item_id);
      const item = results.find(function (result) {
        return result.item_id === id;
      });
      soulSearch(id, connection);
      const stock = parseInt(answers.stock_quantity)
      if (item.stock_quantity <= stock)
        console.log("Not enough in stock");
      else {
        const cost = item.price
        var total = item.stock_quantity - stock;
        console.log("-----------------\n" + total + " left in stock\n" + "That will cost $" + cost + " each" +
          "\n-----------------");
      }
      stockChange(item.item_id, total, connection)
      productSearch(connection)
    })
  }
}

function productSearch(connection) {
  connection.query('SELECT item_id, product_name, stock_quantity, price FROM products', function (error, results) {
    if (error) throw error;
    console.table(results)
    runSearch(results);
  })
}

function soulSearch(id, connection) {
  connection.query('SELECT * FROM products WHERE item_id = ?', {
    item_id: id
  }, function (error, results) {
    if (error) throw error;
  })
}

function stockChange(id, stock, connection) {
  connection.query(`UPDATE products SET stock_quantity = "${stock}" WHERE item_id = "${id}"`, function (error, results) {
    if (error) throw error;
  })
}
// how to run a inquirer again after I finished the bamazonCustomer.js first purchaseth
//display how much the product costs is when I buy #stock 
//how to display updates MySQL quantity amount after purchase before returning to main menue