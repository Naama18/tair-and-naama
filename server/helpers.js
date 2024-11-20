const path = require("path");
const fs = require("fs");

exports.validatePath = function (filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`The path '${filePath}' exists.`);
    return true;
  } else {
    console.log(`The path '${filePath}' does not exist.`);
    return false;
  }
};

exports.isExist = function (name, password = "nothing") {
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
};
