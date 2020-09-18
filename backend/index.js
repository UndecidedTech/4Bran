const express = require("express");
const fs = require("fs");
const schedule = require("node-schedule");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const sizeOf = require("image-size");

const app = express();
const port = 3000;

// {"postNumber":"0","image":"","title":"","content":"","replies":[]}


app.use(cors({
    "origin": ["http://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));

app.use(bodyParser.json());

app.use("/image", express.static("image"));

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "video/webm"){
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

let post = fs.readFileSync("post.json");
var thread = JSON.parse(post);

console.log(thread)

var refreshPost = schedule.scheduleJob("*/10 * * * *", () => {
    thread = cleanPost(thread);
})

function deleteImage(){
    fs.readdir("./image/", (err, files) => {
        if (err){
            console.error("Unable to scan directory: ", err)
        }

        files.forEach((file) => {
            if (file.endsWith(".jpg")) {
                console.log("deleting image: ", file)
                fs.unlinkSync(`./image/${file}`);
            } else if (file.endsWith(".webm")) {
                console.log("deleting webm: ", file)
                fs.unlinkSync(`./image/${file}`);
            }
        })
    })
}

function cleanPost(thread) {
    console.log("New Thread :)")
    deleteImage();
    thread.postNumber = 1;
    thread.postCount = 0;
    thread.image = "";
    thread.title = "";
    thread.content = "";
    thread.replies = [];

    // TODO delete the content of post.json
    // let stringThread = JSON.stringify(thread);
    // fs.writeFile("post.json", thread, (cb) => {
    //     console.log(cb);
    // })

    return thread;
}

app.listen(port, () => console.log(`server started on ${port}`))

app.post("/api/upload", upload.single("image"), async (req, res) => {
    console.log(req.body, "HERE");
    if (req.file !== undefined) {
        let img = sizeOf(req.file.path);
        let returnValue = {
            "nWidth": img.width,
            "nHeight": img.height
        };

        if (img.width > img.height) {
            let pWidth = 250;
            let percentChange = ((pWidth - img.width) / Math.abs(img.width));
               
            returnValue.pWidth = pWidth;
            returnValue.pHeight = img.height - Math.abs(img.height * percentChange);
                
            returnValue.width = 250;
            returnValue.height = returnValue.pHeight;
        } else {
            let pHeight = 250;
            let percentChange = (pHeight - img.height) / Math.abs(img.height);

            returnValue.pHeight = 250;
            returnValue.pWidth = img.width - Math.abs(img.width * percentChange);
            returnValue.height = 250;
            returnValue.width = returnValue.pWidth;
        }

        thread.image = {
            "path": req.file.path,
            "size": returnValue,
            "kbSize": Math.ceil(req.file.size / 1000),
            "expanded": false
        }; 
        thread.title = req.body.title;
        thread.content = req.body.content;
        // write thread object to our JSON file so we can keep concurrency
        // console.log("Thread????: " , JSON.stringify(thread));
        // let data = JSON.stringify(thread);
        // fs.writeFile("post.json", data, (cb) => {
        //     console.log(cb);
        // });
        console.log("Upload!!", thread)
        res.status(200).send("Success");   
    }
});

app.get("/api/thread", (req, res) => {
    console.log("triggered");
    if (thread.image === "") {
        console.log("HERE??>???")
        res.status(200).json({"message": "It's your lucky day"});
    } else {
        console.log("Heres your thread you filthy animal", thread)
        res.send(thread);
    }
});

app.post("/api/reply", upload.single("image"), (req, res) => {

    if (req.file !== undefined) {
        let reply = {};
        let img = sizeOf(req.file.path);
        let returnValue = {
            "nWidth": img.width,
            "nHeight": img.height
        };

        if (img.width > img.height) {
            let pWidth = 250;
            let percentChange = ((pWidth - img.width) / Math.abs(img.width));
               
            returnValue.pWidth = pWidth;
            returnValue.pHeight = img.height - Math.abs(img.height * percentChange);
                
            returnValue.width = 250;
            returnValue.height = returnValue.pHeight;
        } else {
            let pHeight = 250;
            let percentChange = (pHeight - img.height) / Math.abs(img.height);

            returnValue.pHeight = 250;
            returnValue.pWidth = img.width - Math.abs(img.width * percentChange);
            returnValue.height = 250;
            returnValue.width = returnValue.pWidth;
        }

        reply.image = {
            "path": req.file.path,
            "size": returnValue,
            "kbSize": Math.ceil(req.file.size / 1000),
            "expanded": false
        };  
        reply.comment = req.body.comment;
        thread.postCount++;
        reply.postNumber = thread.postNumber + thread.postCount;
        // write thread object to our JSON file so we can keep concurrency
        // console.log("Thread????: " , JSON.stringify(thread));
        // let data = JSON.stringify(thread);
        // fs.writeFile("post.json", data, (cb) => {
        //     console.log(cb);
        // });

        thread.replies.push(reply);

        console.log("Replied!! (You)", thread)
        res.status(200).send("Success", thread);   
    } else if (req.file === undefined) {
        let reply = {};
        reply.image = undefined;
        reply.comment = req.body.comment;
        thread.postCount++;
        reply.postNumber = thread.postNumber + thread.postCount;

        thread.replies.push(reply);

        console.log("tfw no face: ", thread);
        res.send("Success", thread)
    }
})


