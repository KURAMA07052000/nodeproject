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
    //initialise database with data
    init() {
        this.db.insert({
            meal: 'Pizza',
            Ingredients: 'mozerella, flour, salt, tomatoe, peperoni',
            price: '18.50',
            description: 'testing'
        });

        console.log('db meal enntry 1');

        this.db.insert({
            meal: 'French Fries',
            Ingredients: 'potatoes, salt, oil, paprika',
            price: '12',
            description: 'A flavourful explosion'
        });

        console.log('db meal entry 2');
    }

    //gets all the data for menu 
    getAllEntries() {

        return new Promise((resolve, reject) => {

            this.db.find({}, function (err, entries) {

                if (err) {
                    reject(err);

                } else {
                    resolve(entries);

                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    //adds new entry in to the menu database
    addEntry(meal, Ingredients, description, price) {
        var entry = {
            meal: meal,
            Ingredients: Ingredients,
            description: description,
            price: price,
            published: new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }


    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }

    //update entries within the menu database
    updateMealData(meal, Ingredients, description, price) {
        var entry = {
            meal: meal,
            Ingredients: Ingredients,
            description: description,
            price: price
        }

        this.db.update({ _id: _id },
            {
                $set: {
                    meal: meal,
                    Ingredients: Ingredients,
                    description: description,
                    price: price
                }
            },
            {},
            function (err, mealReplaced) {
                console.log(mealReplaced + "updated");

            });
        this.db.find({}).exec(function (err, docs) { console.log(docs); });
    }


    //delete one meals 4 paramaets of data in the database
    deleteMeal(_id) {
        this.db.remove({ _id: _id }, {}, function (err, mealRemoved) {
            if (err) {
                console.log(err);
            } else {
                console.log(mealRemoved + "deleted");
            }
        })
    }



}



//allows for the ise of this module elsewhere
module.exports = webMenu;