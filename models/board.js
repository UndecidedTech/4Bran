const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
    "title": {
        "required": true,
        "type": String
    },
    "image": {
        "required": true,
        "type": mongoose.SchemaTypes.Mixed 
    },
    "content": {
        "required": true,
        "type": String
    },
    "postNumber": {
        "required": true,
        "type": Number
    },
    "date": {
        "type": Date,
        "default": Date.now
    }
}) 


const threadSchema = new Schema({
    "title": {
        "required": true,
        "type": String
    },
    "image": {
        "required": true,
        "type": mongoose.SchemaTypes.Mixed 
    },
    "content": {
        "required": true,
        "type": String
    },
    "date": {
        "type": Date,
        "default": Date.now
    },
    "postNumber": {
        "required": true,
        "type": Number
    },
    "replies": [replySchema]
})

const boardSchema = new Schema({
    "name": {
        "type": String
    },
    "title": {
        "type": String
    },
    "nsfw": {
        "type": Boolean
    },
    "threads": [threadSchema]
})


const Board = mongoose.model("boards", boardSchema);

module.exports = Board;
