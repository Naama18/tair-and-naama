const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const urlUsersFolders = path.join(__dirname, "..", "users-folders");

function validatePath(filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`The path '${filePath}' exists.`);
        return true;
    } else {
        console.log(`The path '${filePath}' does not exist.`);
        return false;
    }
}

router.get("/folders/", function (req, res, next) {
    res.send("respond with a resource");
});
function isExist(name, password = "nothing") {
    const filePath = path.join(__dirname, "..", "users.json");
    let users;
    try {
        users = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        console.error("Error reading or parsing users.json:", err);
        return false;
    }

    const user = users.find((user) => user.name === name);

    if (user) {
        if (password === "nothing" || user.password === password) {
            console.log("User found: ", user);
            return true;
        }
    }

    console.log("User not found or password mis-match");
    return false;
}

router.post("/signIn", (req, res) => {
    const userName = req.body.name;

    if (!isExist(userName)) {
        fs.mkdir(path.join(urlUsersFolders, userName), (err) => {
            if (err) {
                console.error("Error creating directory:", err);
                return res.status(500).send({ message: "Error creating directory" });
            }
            console.log("directory created!");
            // return res.send({ message: "directory created!" });
        });
    } else {
        console.log("name alredy exist");
        return res.status(500).send({ message: "Name already exists" });
    }
});

router.post("/logIn", (req, res) => {
    console.log("LogIn request received");

    const userName = req.body.name;
    const password = req.body.password;
    console.log("isExist(userName, password): ", isExist(userName, password));

    try {
        if (isExist(userName, password)) {
            console.log("Retrieving directory contents...");
            const fileName = fs.readdirSync(`${urlUsersFolders}/${userName}`);
            console.log("fileName: ", fileName);
            return res.send({ fileName });
        } else {
            return res.status(401).send({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).send({ message: "Error during login" });
    }
});

router.delete("/users-folder/:name", (req, res) => {
    const fileName = req.body.fileName;
    const userName = req.params.name;
    const filePath = path.join(__dirname, "..", `users-folders/${userName}/${fileName}`);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send({ message: "Error deleting file" });
        }
        console.log("File deleted successfully.");
        return res.send({ message: "File deleted successfully." });
    });
});

router.patch("/users-folder/:name", (req, res) => {
    const userName = req.params.name;
    const { oldFileName, newFileName } = req.body;

    const oldFilePath = path.join(urlUsersFolders, userName, oldFileName);
    const newFilePath = path.join(urlUsersFolders, userName, newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error("Error renaming file:", err);
            // return res.status(500).send({ message: "Error renaming file" });
        }
        console.log(`File renamed from ${oldFileName} to ${newFileName}`);
        return res.send({ message: `File renamed from ${oldFileName} to ${newFileName}` });
    });
});

module.exports = router;
