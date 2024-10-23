const express = require("express");
const user = require("./models/usermodel");
const authenticateToken = require("./middleware/auth");
const test = require("./middleware/test");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparsers = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparsers());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Hello");
});

app.get("/users", test, async (req, res) => {
  const allusers = await user.find();
  // console.log(allusers);
  if (allusers.length > 0) {
    res.send(allusers);
  } else {
    res.status(404).send("No users found");
  }
});

app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  const exitsusers = await user.findOne({ email });
  if (exitsusers) {
    return res.status(400).send("User already exists");
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await user.create({
        username,
        email,
        password: hash,
      });
      // console.log("Hash :" ,hash,newUser);
      res.send(newUser);
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const existingUser = await user.findOne({ email });
  // console.log("User data",existingUser);
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (result) {
        console.log(result);
        const token = jwt.sign(
          { email: existingUser.email, userId: existingUser._id },
          "jksdjfks"
          // { expiresIn: "1m" }
        );
        res.cookie("token", token);
        console.log("login Sucess");
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

app.get("/logout", (req, res) => {
  // console.log(req.cookies);
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
  res.redirect("/login");
});

app.get("/middleware", authenticateToken, (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("server starting");
});
