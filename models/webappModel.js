const nedb = require('nedb');
class webMenu {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            meal: 'Pizza',
            Ingredients: 'mozerella, flour, salt, tomatoe, peperoni',
            price: '18.50',
            description: 'testing'
        });
        //for later debugging
        console.log('db meal enntry 1');

        this.db.insert({
            meal: 'French Fries',
            Ingredients: 'potatoes, salt, oil, paprika',
            price: '12',
            description: 'A flavourful explosion'
        });
        //for later debugging
        console.log('db meal entry 2');
    }

    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }
}
module.exports = webMenu;