const users = require("./data/users.js");
const products = require("./data/products.js");
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const Order = require("./models/Order.js");
const conn = require("./config/db.js");

require("dotenv").config();

conn();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const allUsers = await User.insertMany(users);

    const adminUser = await allUsers.find((user) => user.isAdmin === true);

    const allProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(allProducts);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
