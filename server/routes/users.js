const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
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
  const filePath = path.join(__dirname, "..", "users-folders");

  if (!isExist(userName)) {
    fs.mkdir(path.join(filePath, userName), (err) => {
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
// app.get("/logIn", (req, res) => {
//   res.send("In log in");
// });
router.post("/logIn", (req, res) => {
  console.log("im here");
  const filePath = path.join(__dirname, "..", "users-folders");

  const userName = req.body.name;
  const password = req.body.password;
  console.log("isExist(userName, password): ", isExist(userName, password));

  if (isExist(userName, password)) {
    console.log("im tryting to get the directory");
    const fileName = fs.readdirSync(`${filePath}/${userName}`);
    console.log("fileName: ", fileName);
    // message:  send to the client his files
  }
});
// app.listen(4000, () => {
//   console.log("..");
// });
module.exports = router;
