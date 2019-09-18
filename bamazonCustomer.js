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
  if (err) throw err;
  productSearch();
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
    runSearch();
  })
}

function productSearch() {
  connection.query('SELECT item_id, product_name, stock_quantity FROM products', function (error, results) {
    if (error) throw error;
    console.log(results);
    runSearch(results);
  });
}

function soulSearch(id) {
  connection.query('SELECT * FROM products WHERE item_id = ?', {
    item_id: id
  }, function (error, results) {
    if (error) throw error;
  })
};

function stockChange(id, stock) {
  console.log(stock, id);
  connection.query(`UPDATE products SET stock_quantity = ${stock} WHERE item_id = "${id}"`, function (error, results) {
    if (error) throw error;
    console.log(results);
  })
};