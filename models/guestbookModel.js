const nedb = require('nedb');
class GuestBook {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }
    //a function to seed the database
    init() {
        this.db.insert({
          subject: "I liked the exhibition",
          contents: "Nice use of colour in some paintings",
          published: "2022-02-16",
          author: "Peter",
        });
        //for later debugging
        console.log("db entry Peter inserted");
    
        this.db.insert({
          subject: "Didn't like it",
          contents: "The style is not great",
          published: "2022-02-18",
          author: "Ann",
        });
        //for later debugging
        console.log("db entry Fred inserted");
        this.db.insert({
          subject: "Good exhibition",
          contents: "some good examples of early work",
          published: "2022-03-04",
          author: "Fred",
        });
        //for later debugging
        this.db.insert({
          subject: "Second visit",
          contents: "Still not convinced by the style",
          published: "2022-02-19",
          author: "Ann",
        });
        this.db.insert({
          subject: "Good exhibition continued",
          contents: "I also like the way elements are displayed",
          published: "2022-02-9",
          author: "Fred",
        });
        this.db.insert({
          subject: "Other comments",
          contents: "The cafe was also good",
          published: "2022-02-19",
          author: "Fred",
        });
      }
//a function to return all entries from the database
getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
        this.db.find({}, function(err, entries) {
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
getPetersEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //find(author:'Peter) retrieves the data,
        //with error first callback function, err=error, entries=data
        this.db.find({ author: 'Peter' }, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
                reject(err);
            //if no error resolve the promise and return the data
            } else {
                resolve(entries);
                //to see what the returned data looks like
                console.log('getPetersEntries() returns: ', entries);
             }
        })
    })
}

addEntry(author, subject, contents) {
    var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split('T')[0]
            }
    console.log('entry created', entry);
    this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
                } else {
                console.log('document inserted into the database', doc);
            }
    }) 
 }       
getEntriesByUser(authorName) {
            return new Promise((resolve, reject) => {
                this.db.find({ 'author': authorName }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
            }
        })
    })
 }

}
module.exports = GuestBook;