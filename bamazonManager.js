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
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          productSearch();
          break;

        case "View Low Inventory":
          lowSearch();
          break;

        case "Add to Inventory":
          inventorySearch();
          break;

        case "Add New Product":
          newSearch();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function productSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What product would you like to search for?"
    })
    .then(function (answer) {
      let query = "SELECT position, song, year FROM products WHERE ?";
      connection.query(query, {
        artist: answer.artist
      }, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function lowSearch() {
  let query = "SELECT artist FROM products GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function inventorySearch() {
  inquirer
    .prompt([{
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      let query = "SELECT position,song,artist,year FROM products WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
            res[i].position +
            " || Song: " +
            res[i].song +
            " || Artist: " +
            res[i].artist +
            " || Year: " +
            res[i].year
          );
        }
        runSearch();
      });
    });
}

function newSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function (answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM products WHERE ?", {
        song: answer.song
      }, function (err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
          res[0].position +
          " || Song: " +
          res[0].song +
          " || Artist: " +
          res[0].artist +
          " || Year: " +
          res[0].year
        );
        runSearch();
      });
    });
}