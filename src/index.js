const express = require("express");
const layout = require("express-ejs-layouts");
const path = require("path");
const route = require("./routes/indexRoute");
const methodOverride = require("method-override");
const database = require("./configs/db");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const user = require("./models/usersModel");

const app = express();
const port = process.env.PORT || 3000;

database.connection();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(layout);
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash;
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

route(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
