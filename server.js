const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
  secret: "secret",
  cookie: { maxAge: 10 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
const hbs = exphbs.create();

// Setup
app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

// Sync database connection and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
