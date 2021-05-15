const sequelize = require("../../config/connection");
const { Post } = require("../../models");

const postData = require("./seed-posts.json");

async function seedDatabase() {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await Post.bulkCreate(postData);
  console.log("\n----- POSTS SEEDED -----\n");

  process.exit(0);
}

seedDatabase();
