//Requirements
var mysql    = require('mysql');
var inquirer = require('inquirer');

//Connect to Bamazon
var connection = mysql.createConnection({ host: 'localhost', port: 3306, user: 'root', password: '8283263ka', database: 'bamazon' });

//Log all data from products table
connection.connect(connected);

//connected(err): runs a query that selects all data from products table, loops through the res array and logs each object's properties to the console
function connected(err) {
    if (err) throw err;

    connection.query("SELECT * from products", (err, res) => {
        if (err) throw err;

        console.log("------------------------BAMAZON!------------------------");
        console.log("ID" + "\t" + "Product" + "\t\t" + "Price" + "\t" + "Department" + "\t" + "Stock", "\n");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ID + "\t" + res[i].Product + "\t" + res[i].Price + "\t" + res[i].Department + "\t" + res[i].Stock);
        }
        console.log("--------------------------------------------------------");

        //Prompt the user after logging the products
        checkout(res);
    });
}

//Prompt
function checkout(res) {
    inquirer.prompt([
        { type: 'input', message: 'Product ID?', name: 'id'},
        { type: 'input', message: 'Desired quantity?', name: 'qty'}
    ]).then(response => {
        //Parse the integers from the user input
        var newID = parseInt(response.id);
        var newQty = parseInt(response.qty);

        //Verify that the user entered a valid product ID and quantity
        if (newID > 0 && newQty > 0) {

            //Select all data for that product
            var query = 'SELECT * FROM products WHERE ID = ?';
            connection.query(query, [newID], (err, res) => {

                //If there is enough of the product in stock for this order...
                if(newQty <= res[0].Stock) {
                    //Update the database with the requested quantity subtracted, the order is approved
                    var newStock = res[0].Stock - newQty;
                    updateStock(res[0].ID, newStock);
                    //Log the order details and total price
                    console.log(newQty, res[0].Product + '(s)', 'successfully ordered! Your total is ' + '$' + (newQty * res[0].Price).toFixed(2));
                }
                else console.log('Insufficient quantity.');
            });
        }
        else console.log('Invalid ID.');
    });
}

//updateStock(): Updates the specified product ID's stock in the database
function updateStock(id, stock) {
    var query = 'UPDATE products SET ? WHERE ID =' + id;
    connection.query(query, [{Stock: stock}], (err, results) => {
        if (err) throw err;
    });
}