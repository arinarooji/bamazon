//Requirements
var mysql    = require('mysql');
var inquirer = require('inquirer');

//Connect to Bamazon
var connection = mysql.createConnection({ host: 'localhost', port: 3306, user: 'root', password: '8283263ka', database: 'bamazon' });

var questions = [{
    type: 'input',
    message: 'Please enter the ID of the product you would like to purchase.',
    name: 'id'
}, {
    type: 'input',
    message: 'Please enter the quantity of this product you would like to purchase.',
    name: 'qty'
}];

connection.connect(connected); //Connect to the specified database and invoke this function (connected())

//connected(err): runs a query that selects all data from products table. Invokes queryResults to log the results.
function connected(err) {
    if (err) throw err;
    connection.query("SELECT * from products", queryResults);
}

//queryResults(err, res): Logs the column names, then loops/logs through res array which holds each object in the products table.
function queryResults(err, res) {
    if (err) throw err;
    console.log("\n", "------------------------BAMAZON!------------------------", "\n");
    console.log("ID" + "\t" + "Product" + "\t\t" + "Price" + "\t" + "Department" + "\t" + "Stock", "\n");
    
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].ID + "\t" + res[i].Product + "\t" + res[i].Price + "\t" + res[i].Department + "\t" + res[i].Stock);
    }
    console.log("--------------------------------------------------------");
}

//Prompt
inquirer.prompt(questions).then(response => {
    //Query the product ID, related info from database
    if (response.id > 0) {
        var query = "SELECT * FROM products WHERE ID = ?";
        connection.query(query, [response.id], function(err, res) {
            if(response.qty > 0 && response.qty <= res[0].Stock) {
                console.log(response.qty, res[0].Product + '(s)', 'successfully purchased. Your total is', '$'+ (response.qty * res[0].Price));
                //Update database table
            }
            else console.log('Insufficient quantity.');
        });
    }
    else console.log('Invalid ID.');
});