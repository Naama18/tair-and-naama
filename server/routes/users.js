const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const urlUsersFolders = path.join(__dirname, "..", "users-folders");

// const helpes_function = require("../helpers");

router.get("/folders/", function (req, res, next) {
    res.send("respond with a resource");
});
function validatePath(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`The path '${filePath}' exists.`);
    return true;
  } else {
    console.log(`The path '${filePath}' does not exist.`);
    return false;
  }
}
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
<<<<<<< HEAD
    const userName = req.body.name;

    if (!helpes_function.isExist(userName)) {
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
=======
  const urlJson = path.join(__dirname, "..", "users.json");

  const userName = req.body.name;
  const password = req.body.password;

  if (!isExist(userName)) {
    const fileData = JSON.parse(fs.readFileSync(urlJson));
    fileData.push({ name: userName, password: password });
    fs.writeFileSync(urlJson, JSON.stringify(fileData));
    fs.mkdir(path.join(urlUsersFolders, userName), (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return res.status(500).send({ message: "Error creating directory" });
      }
      const fileName = fs.readdirSync(`${urlUsersFolders}/${userName}`);

      return res.send({ fileName });
    });
  } else {
    console.log("name alredy exist");
    return res.status(500).send({ message: "Name already exists" });
  }
>>>>>>> f7974be5538abef1b680b1fa66fe853f0e898e7a
});

router.post("/logIn", (req, res) => {
    console.log("LogIn request received");

<<<<<<< HEAD
    const userName = req.body.name;
    const password = req.body.password;
    console.log("isExist(userName, password): ", helpes_function.isExist(userName, password));

    try {
        if (helpes_function.isExist(userName, password)) {
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
=======
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
>>>>>>> f7974be5538abef1b680b1fa66fe853f0e898e7a
    }
});

router.delete("/users-folder/:name", (req, res) => {
<<<<<<< HEAD
    const fileName = req.body.fileName;
    const userName = req.params.name;
    const filePath = path.join(__dirname, "..", `users-folders/${userName}/${fileName}`);
=======
  const fileName = req.body.fileName;
  console.log("fileName: ", fileName);
  const userName = req.params.name;
  const filePath = path.join(
    __dirname,
    "..",
    `users-folders/${userName}/${fileName}`
  );
>>>>>>> f7974be5538abef1b680b1fa66fe853f0e898e7a

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
        return res.send({
            message: `File renamed from ${oldFileName} to ${newFileName}`,
        });
    });
});
// function validatePath(filePath) {
//   if (fs.existsSync(filePath)) {
//     return true;
//   } else {
//     return false;
//   }
// }
router.post("/users-folder/:name", (req, res) => {
    const type = req.body.type; // check if he try to add folder or file
    console.log("type: ", type);
    const userName = req.params.name;
    const filePath = path.join(__dirname, "..", `users-folders/${userName}`);

    if (type === "file") {
        const nameOfFile = req.body.fileName;

<<<<<<< HEAD
        if (helpes_function.validatePath(`${filePath}/${nameOfFile}`)) {
            console.log("file name already exist");
        } else {
            fs.open(`${filePath}/${nameOfFile}`, "w", function (err, file) {
                if (err) throw err;
                console.log("Saved!");
            });
        }
    } else if (type === "folder") {
        const nameOfFolder = req.body.folderName;

        if (helpes_function.validatePath(`${filePath}/${nameOfFolder}`)) {
            console.log("folder name already exist");
        } else {
            fs.mkdir(`${filePath}/${nameOfFolder}`, (err) => {
                if (err) {
                    return console.log(err);
                }
                console.log("directory created!");
                // message: to the client the directory
            });
=======
    if (validatePath(`${filePath}/${nameOfFile}`)) {
      console.log("file name already exist");
    } else {
      fs.open(`${filePath}/${nameOfFile}`, "w", function (err, file) {
        if (err) throw err;
        console.log("Saved!");
      });
    }
  } else if (type === "folder") {
    const nameOfFolder = req.body.folderName;

    if (validatePath(`${filePath}/${nameOfFolder}`)) {
      console.log("folder name already exist");
    } else {
      fs.mkdir(`${filePath}/${nameOfFolder}`, (err) => {
        if (err) {
          return console.log(err);
>>>>>>> f7974be5538abef1b680b1fa66fe853f0e898e7a
        }
    }
});
router.patch("/users-folder/:name/:filename", (req, res) => {
    const fileNameToEdit = req.params.filename;
    const name = req.params.name;
    const content = req.body.content;
    fs.writeFile(`${urlUsersFolders}/${name}/${fileNameToEdit}`, content, { flag: "a+" }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("add content");
        }
    });
});
router.get("/users-folder/:name", (req, res) => {
    console.log("im here");
    const fileName = req.body.filename;
    const name = req.params.name;

    fs.stat(`${urlUsersFolders}/${name}/${fileName}`, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stats.isFile());
        console.log(" stats.isDirectory();: ", stats.isDirectory());
        console.log("stats.isSymbolicLink(): ", stats.isSymbolicLink());
        console.log("stats.size: ", stats.size);
    });
});
module.exports = router;
