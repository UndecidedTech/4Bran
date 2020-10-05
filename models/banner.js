const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    "path": {
        "type": String
    },
    "board": {
        "type": String
    },
    "number": {
        "type": Number
    }
})


const Banner = mongoose.model("banners", bannerSchema);

module.exports = Banner;
