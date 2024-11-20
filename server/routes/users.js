const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const urlUsersFolders = path.join(__dirname, "..", "users-folders");
// const app = express();
/* GET users listing. */
router.get("/folders/", function (req, res, next) {
  res.send("respond with a resource");
});
function isExist(name, password = "nothing") {
  const filePath = path.join(__dirname, "..", "users.json");

  // Read the file and parse the JSON
  const users = JSON.parse(fs.readFileSync(filePath));

  // Log input and file data for debugging
  console.log("name", name);
  console.log("pass", password);
  console.log("fileData: ", users);

  // Find the user by name
  const user = users.find((user) => user.name === name);

  // Check if the user exists and handle the password condition
  if (user) {
    if (password === "nothing" || user.password === password) {
      console.log("User found: ", user);
      return true;
    }
  }

  console.log("User not found or password mismatch");
  return false;
}

router.post("/signIn", (req, res) => {
  const userName = req.body.name;

  if (!isExist(userName)) {
    fs.mkdir(path.join(urlUsersFolders, userName), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("directory created!");
      // message: to the client the directory
    });
  } else {
    console.log("name alredy exist");
  }
});

router.post("/logIn", (req, res) => {
  console.log("im here");

  const userName = req.body.name;
  const password = req.body.password;
  console.log("isExist(userName, password): ", isExist(userName, password));

  if (isExist(userName, password)) {
    console.log("im tryting to get the directory");
    const fileName = fs.readdirSync(`${urlUsersFolders}/${userName}`);
    console.log("fileName: ", fileName);
    // message:  send to the client his files
  }
});
router.delete("/users-folder/:name", (req, res) => {
  const fileName = req.body.fileName;
  const userName = req.params.name;
  const filePath = path.join(
    __dirname,
    "..",
    `users-folders/${userName}/${fileName}`
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File is deleted.");
    }
  });
});
function validatePath(filePath) {
  if (fs.existsSync(filePath)) {
    return true;
  } else {
    return false;
  }
}
router.post("/users-folder/:name", (req, res) => {
  const type = req.body.type; // check if he try to add folder or file
  console.log("type: ", type);
  const userName = req.params.name;
  const filePath = path.join(__dirname, "..", `users-folders/${userName}`);

  if (type === "file") {
    const nameOfFile = req.body.fileName;

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
        }
        console.log("directory created!");
        // message: to the client the directory
      });
    }
  }
});
router.patch("/users-folder/:name/:filename", (req, res) => {
  const fileNameToEdit = req.params.filename;
  const name = req.params.name;
  const content = req.body.content;
  fs.writeFile(
    `${urlUsersFolders}/${name}/${fileNameToEdit}`,
    content,
    { flag: "a+" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("add content");
      }
    }
  );
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
