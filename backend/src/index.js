const express = require("express");
var cookie = require("cookie");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRequiredFields = require("../middlewares/checkRequiredFields");
const cors = require('cors')
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate a JWT token
    const jwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" }); // Set appropriate expiration time
    const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      jwtToken,
      refreshToken,
      message: "Signup successful",
    });

    sessionStorage.setItem("jwtToken", jwtToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" }); // Set appropriate expiration time
    const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      jwtToken,
      refreshToken,
      message: "Login successful",
    });

    sessionStorage.setItem("jwtToken", jwtToken);

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/refresh", authMiddleware, async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Refresh token expired" });
        }
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      const newJwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ jwtToken: newJwtToken });
    });
  } catch (error) {
    console.error(error);
  }
});


app.get("/brief/:id", async(req,res)=>{
    const id = parseInt(req.params.id);

    const question = await prisma.cases.findUnique({
        where : { id : id },
    })

    if(!question){
        res.status(404).json({message : "Brief not found"})
    }

    res.json(question).status(200);
})



app.post("/query", async (req,res)=>{
    const value = req.body.value.replace(/\s+/g, '');
    const id = parseInt(req.body.id)
    
    const question = await prisma.cases.findUnique({
        where : { id : id },
    })
    const answer = question.answer.replace(/\s+/g, '');

    if(answer == value){
        res.json({message : 'success'})
    }
    else{
        res.json({message : "Wrong answer"});
    }

    
})



app.listen(5342, () => {
  console.log("App listening on port 5342");
});
