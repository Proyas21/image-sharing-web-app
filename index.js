import express from "express";
import { v5 as uuidv5 } from "uuid";
import multer from "multer";
import fs from "fs";
import path from "path";
// import bodyParser from "body-parser";

const publicFilesPath = process.cwd() + "/public";
const imageFilesPath = process.cwd() + "/images";

const app = express();
app.use(express.static(publicFilesPath));
// app.use(bodyParser({ uploadDir: imageFilesPath, keepExtensions: true }));


app.get("/", (req, res) => {
    res.sendFile(publicFilesPath + "/index.html");
});

app.get("/image/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.sendFile(imageFilesPath + "/" + id);
});


const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    dest: "/tempImg"
})

app.post("/upload", upload.single("image"), (req, res) => {
    const ogName = req.file.originalname;
    const newImgName = ogName + req.file.filename + path.extname(ogName);

    fs.rename(req.file.path, imageFilesPath + "/" + newImgName, console.log);
    res.redirect("/image/" + newImgName);
});


app.listen(process.env.port || 3000, () => {
    console.log("Service started");
});
