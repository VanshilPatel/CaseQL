const express = require('express');
var cookie = require('cookie');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;


app.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // basic input validation check
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Generate a JWT token 
        const jwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // Set appropriate expiration time
        const refreshToken = jwt.sign({email}, JWT_SECRET, {expiresIn : '7d'});

        res.status(201).json({
            jwtToken,
            refreshToken,
            message: 'Signup successful',
        });

        sessionStorage.setItem('jwtToken', jwtToken);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            res.status(404).json({ message: "User not found" })
        }


        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const jwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // Set appropriate expiration time
        const refreshToken = jwt.sign({email}, JWT_SECRET, {expiresIn : '7d'});

        res.status(201).json({
            jwtToken,
            refreshToken,
            message: 'Login successful',
        });

        sessionStorage.setItem('jwtToken', jwtToken);

        res.cookie('refreshToken', refreshToken, {
            secure: true, 
            httpOnly: true,
            sameSite: 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.post('/refresh', async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
  
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' });
      }
  
      jwt.verify(refreshToken, JWT_SECRET, (err) => {
        if (err) {
          
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Refresh token expired' });
          }
          return res.status(401).json({ error: 'Invalid refresh token' });
        }

       
        const newJwtToken = jwt.sign({email}, JWT_SECRET, { expiresIn: '1h' });
  
        res.json({ jwtToken: newJwtToken });
      });
    } catch (error) {
      console.error(error)
    }
  });


  app.post("/query", async (req,res)=>{

  })

// async function main(){
//   const new_Case = await prisma.case.create({
//      data : {
//         description : "All illegal site's servers were seized in a recent operation. Please submit all the users' details",
//         answer : "SELECT * FROM USERS;"
//      }
//   })
//   console.log('Created new Case: ', new_Case)

// }

// main()
//   .catch((e) => console.error(e))


// async function generate_answer_table(){
//     const new_answer = await Promise.all([
//         prisma.answer.create({
//           data: {
//             caseId: 3,
//             f_name: "John",
//             l_name: "Doe",
//             email: "john.doe@example.com",
//             Access_Time: new Date("2023-03-15T12:00:00Z"),
//             No_of_Post: 5
//           }
//         }),
//         prisma.answer.create({
//           data: {
//             caseId: 3,
//             f_name: "Jane",
//             l_name: "Smith",
//             email: "jane.smith@example.com",
//             Access_Time: new Date("2023-03-16T09:30:00Z"),
//             No_of_Post: 3
//           }
//         }),
//         prisma.answer.create({
//           data: {
//             caseId: 3,
//             f_name: "Alice",
//             l_name: "Johnson",
//             email: "alice.johnson@example.com",
//             Access_Time: new Date("2023-03-14T10:45:00Z"),
//             No_of_Post: 8
//           }
//         }),
//         prisma.answer.create({
//           data: {
//             caseId: 3,
//             f_name: "Bob",
//             l_name: "Brown",
//             email: "bob.brown@example.com",
//             Access_Time: new Date("2023-03-15T14:20:00Z"),
//             No_of_Post: 4
//           }
//         }),
//         prisma.answer.create({
//           data: {
//             caseId: 3,
//             f_name: "Emma",
//             l_name: "Davis",
//             email: "emma.davis@example.com",
//             Access_Time: new Date("2023-03-13T08:00:00Z"),
//             No_of_Post: 6
//           }
//         })
//       ]);

// }


// generate_answer_table()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect())


app.listen(5342, () => {
    console.log("App listening on port 5342");
})