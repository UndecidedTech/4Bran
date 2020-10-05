require("dotenv").config();
const express = require("express");
const fs = require("fs");
const schedule = require("node-schedule");
const multer = require("multer");
const cors = require("cors");
const sizeOf = require("image-size");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_ip = process.env.DB_IP
const url = `mongodb://${db_user}:${db_pass}@${db_ip}/4Bran?authSource=admin`

// is this the best way to do it?

let JSONthread = fs.readFileSync("post.json");


let storedThread = JSON.parse(JSONthread);


function writePostNumber() {
    storedThread.postNumber++
    fs.writeFileSync("post.json", JSON.stringify(storedThread))
    return storedThread.postNumber
}


const Board = require("./models/board");
const Banner =  require("./models/banner")


mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

// rate limiters
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
});
//change postlimit back
const postLimit = rateLimit({
    windowMs: 1000 * 60 * 5,
    max: 100
})

const replyLimit = rateLimit({
    windowsMs: 1000 * 30,
    max: 5
})

const app = express();
const port = process.env.PORT || 3000;

// {"postNumber":"0","image":"","title":"","content":"","replies":[]}

app.use(limiter);

app.use(cors({
    "origin": ["http://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));

app.use(express.json());

app.use("/image", express.static("image"));

app.use("/", express.static("./public"));

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "video/webm" || file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./image/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.listen(port, () => console.log(`server started on ${port}`))

app.post("/api/thread", postLimit, upload.single("image"), async (req, res) => {
    if (req.file !== undefined) {
        let thread = {};
        let img = sizeOf(req.file.path);
        let returnValue = {
            "nWidth": img.width,
            "nHeight": img.height
        };

        if (img.width > img.height) {
            let pWidth = 250;
            let cWidth = 150;
            let percentChange = ((pWidth - img.width) / Math.abs(img.width));
            let catalogChange = ((cWidth - img.width) / Math.abs(img.width));
               
            returnValue.pWidth = 250;
            returnValue.cWidth = 150;
            returnValue.cHeight = img.height - Math.abs(img.height * catalogChange);
            returnValue.pHeight = img.height - Math.abs(img.height * percentChange);
                
            returnValue.width = 250;
            returnValue.height = returnValue.pHeight;
        } else {
            let pHeight = 250;
            let cHeight = 150;
            let percentChange = (pHeight - img.height) / Math.abs(img.height);
            let catalogChange = (cHeight - img.height) / Math.abs(img.height);

            returnValue.pHeight = 250;
            returnValue.cHeight = 150;
            returnValue.pWidth = img.width - Math.abs(img.width * percentChange);
            returnValue.cWidth = img.width - Math.abs(img.width * catalogChange);


            returnValue.height = 250;
            returnValue.width = returnValue.pWidth;
        }

        thread.image = {
            "path": req.file.path,
            "size": returnValue,
            "kbSize": Math.ceil(req.file.size / 1000),
            "expanded": false
        }; 
        thread.postNumber = writePostNumber();
        thread.title = req.body.title;
        thread.content = req.body.content;
        // write to Board thread list
        let newThread = await Board.findOneAndUpdate({"name": req.body.board}, {$push: { "threads": thread}});
        
        res.status(200).send("Success");   
    }      
});

app.get("/api/board/:boardName", async (req, res) => {
    let returnValue = await Board.findOne({"name": req.params.boardName});
    
    res.send(returnValue);
})


app.get("/api/thread/", async (req, res) => {
    let threadNumber = Number(req.query.threadNumber);
    let board = req.query.board;
    
    console.log("WHATS HAPPENING", req.query);

    let threadReturn = await Board.findOne({"name": board})
        .where("threads.postNumber").equals(threadNumber)
        .lean();

    let returnValue = threadReturn.threads.find(thread => {
        if (thread.postNumber === threadNumber) {
            return thread
        }
    })

    res.send(returnValue);
});

app.post("/api/thread/reply", replyLimit,upload.single("image"), async (req, res) => {
    let board = req.body.board;
    let comment = req.body.comment;
    let threadNumber = req.body.threadNumber;
    let postNumber = writePostNumber()

    if (req.file !== undefined) {
        let reply = {};
        let img = sizeOf(req.file.path);
        let returnValue = {
            "nWidth": img.width,
            "nHeight": img.height
        };

        if (img.width > img.height) {
            let pWidth = 125;
            let percentChange = ((pWidth - img.width) / Math.abs(img.width));
               
            returnValue.pWidth = pWidth;
            returnValue.pHeight = img.height - Math.abs(img.height * percentChange);
                
            returnValue.width = 125;
            returnValue.height = returnValue.pHeight;
        } else {
            let pHeight = 125;
            let percentChange = (pHeight - img.height) / Math.abs(img.height);

            returnValue.pHeight = 125;
            returnValue.pWidth = img.width - Math.abs(img.width * percentChange);
            returnValue.height = 125;
            returnValue.width = returnValue.pWidth;
        }

        reply.image = {
            "path": req.file.path,
            "size": returnValue,
            "kbSize": Math.ceil(req.file.size / 1000),
            "expanded": false
        };
        reply.comment = req.body.comment;
        //temp placeholder
        reply.postNumber = postNumber;
        //write to DB document
        let replyUpdate = await Board.findOneAndUpdate({"name": board, "threads.postNumber": threadNumber}, {$push: {"threads.$.replies": reply}}, {new: true});
        res.status(200).send(replyUpdate);   
    } else if (req.file === undefined) {
        let reply = {};
        reply.image = undefined;
        reply.comment = comment;
        reply.postNumber = postNumber;

        console.log(reply);

        let replyUpdate = await Board.findOneAndUpdate({"name": board, "threads.postNumber": threadNumber}, {$push: {"threads.$.replies": reply}}, {new: true});
        res.send(replyUpdate)
    }
})

app.get("/api/banner", async (req, res) => {
    let boardName = req.body.board;
    
    let boards = ["a"];
    let randomBoard = boards[Math.floor(Math.random() * boards.length)];

    let bannerList = await Banner.find()
        .where("board").equals(randomBoard);

    let result = bannerList[Math.floor(Math.random() * bannerList.length)];
    res.send(result);
})

