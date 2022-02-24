/** @format */

const { MongoClient } = require("mongodb");


const url = "mongodb+srv://haseeb:haseeb.0505@socailmedia.70ggi.mongodb.net/bot?retryWrites=true&w=majority"

const client = new MongoClient(url);

module.exports = { client };