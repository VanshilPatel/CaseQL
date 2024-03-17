const express = require('express');

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

    // Generate a secure JWT token 
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      message: 'Signup successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});







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


app.listen(5342, ()=>{
    console.log("App listening on port 5342");
})