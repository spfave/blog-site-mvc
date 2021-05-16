const sequelize = require("../../config/connection");
const { Post, User } = require("../../models");

const userData = require("./seed-user.json");
const postData = require("./seed-posts.json");

async function seedDatabase() {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(userData, { individualHooks: true });
  console.log("\n----- USERS SEEDED -----\n");

  await Post.bulkCreate(postData);
  console.log("\n----- POSTS SEEDED -----\n");

  process.exit(0);
}

seedDatabase();
