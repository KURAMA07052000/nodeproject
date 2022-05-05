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
            description: 'testing',
            meal_time: 'dinner',
            availability: 'available'
        });

        console.log('db meal enntry 1');

        this.db.insert({
            meal: 'French Fries',
            Ingredients: 'potatoes, salt, oil, paprika',
            price: '12',
            description: 'A flavourful explosion',
            meal_time: 'lunch',
            availability: 'available'
        });

        console.log('db meal entry 2');

        this.db.insert({
            meal: 'Pasta',
            Ingredients: 'Tomatoes, garlic, salt, pepper, paprika, pasta',
            price: '9.50',
            description: 'A flavourful explosion',
            meal_time: 'lunch',
            availability: 'available'
        });

        console.log('db meal entry 3');

        this.db.insert({
            meal: 'Spaghetti',
            Ingredients: 'Tomatoes, garlic, salt, pepper, paprika, spaghetti',
            price: '10',
            description: 'A flavourful explosion',
            meal_time: 'dinner',
            availability: 'available'
        });

        console.log('db meal entry 4');
    
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

    //gets all the data for lunch menu 
    getAllLunchEntries() {

        return new Promise((resolve, reject) => {

            this.db.find({ meal_time: 'lunch' }, function (err, entries) {

                if (err) {
                    reject(err);

                } 
                
                else {
                    resolve(entries);

                    console.log('function all lunch() returns: ', entries);
                }
            })
        })
    }

    //gets all the data for the dinner menu 
    getAllDinnerEntries() {

        return new Promise((resolve, reject) => {

            this.db.find({ meal_time: 'dinner' }, function (err, entries) {

                if (err) {
                    reject(err);

                } 
                
                else {
                    resolve(entries);

                    console.log('function all dinner () returns: ', entries);
                }
            })
        })
    }

    //adds new entry in to the menu database
    addEntry(meal, Ingredients, description, price, meal_time, availability) {
        var entry = {
            meal: meal,
            Ingredients: Ingredients,
            description: description,
            price: price,
            meal_time: meal_time,
            availability: availability,
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

    

    //gets one entry
    getOneEntries(_id, err) {

        return new Promise((resolve, reject) => {

            this.db.find({_id: _id}, function (err, entries) {

                if (err) {
                    reject(err);

                } else {
                    
                    resolve(entries);

                    console.log('function one entry() returns: ', entries);
                }
            })
        })
    }

    //update entries within the menu database
    updateMealData(_id, meal, Ingredients, description, price, meal_time, availability, callback) {
       
        this.db.update({ _id: _id },
            {
                $set: {
                    meal: meal,
                    Ingredients: Ingredients,
                    description: description,
                    price: price,
                    meal_time: meal_time,
                    availability: availability
                }
            },
            {},
            function (err, newMeal) {
                console.log(newMeal + "updated");

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