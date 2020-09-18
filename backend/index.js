const express = require("express");
const fs = require("fs");
const schedule = require("node-schedule");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

var postNumber = 0;


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

var refreshPost = schedule.scheduleJob("*/5 * * * *", () => {
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

function padPostNumber() {
    // increment post counter
    postNumber += 1;
    
    let padAmount = 8 - post.postNumber.length;
    console.log("padding: ", postNumber, padAmount);
    let paddedPost = postNumber.toString();
    paddedPost = paddedPost.padStart(padAmount, "0")
    return paddedPost;
}

function cleanPost(thread) {
    console.log("New Thread :)")
    deleteImage();
    thread.number = undefined;
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

app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log(req.body, "HERE");
    if (req.file !== undefined) {
        thread.image = req.file.path;
        thread.title = req.body.title;
        thread.content = req.body.content;
        thread.postNumber = padPostNumber();
        // write thread object to our JSON file so we can keep concurrency
        // console.log("Thread????: " , JSON.stringify(thread));
        // let data = JSON.stringify(thread);
        // fs.writeFile("post.json", data, (cb) => {
        //     console.log(cb);
        // });
        console.log("Upload!!", thread)
        res.send("Success");   
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

app.get("api/reply", upload.single("image"), (req, res) => {
    console.log("Bran Reply Trigger");

    if (req.file !== undefined) {
        let reply = {};

        reply.image = req.file.path;
        reply.comment = req.body.comment;
        reply.postNumber = padPostNumber();
        // write thread object to our JSON file so we can keep concurrency
        // console.log("Thread????: " , JSON.stringify(thread));
        // let data = JSON.stringify(thread);
        // fs.writeFile("post.json", data, (cb) => {
        //     console.log(cb);
        // });

        thread.replies.push(reply);

        console.log("Replied!! (You)", thread)
        res.send("Success");   
    }
})


