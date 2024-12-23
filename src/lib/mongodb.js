const { MongoClient } = require("mongodb");

let clientPromise;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = MongoClient.connect(
            process.env.MONGODB_URI
        );
    }
    clientPromise = global._mongoClientPromise;
} else {
    clientPromise = MongoClient.connect(process.env.MONGODB_URI);
}

module.exports = clientPromise;
