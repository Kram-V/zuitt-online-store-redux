const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Mark Anthony",
    email: "mark@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },

  {
    name: "Mary Grace",
    email: "grace@gmail.com",
    password: bcrypt.hashSync("marygrace", 10),
  },
];

module.exports = users;
