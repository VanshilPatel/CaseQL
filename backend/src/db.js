
const { PrismaClient } = require("@prisma/client");



const prisma = new PrismaClient();

const questions = [
    {
        description : "Find all users who have made more than 100 posts.",
        answer : "SELECT * FROM answer WHERE posts > 100;"   
    },
    {
        description : "Find all users who have made more than 100 posts.",
        answer : "SELECT * FROM answer WHERE posts > 100;"   
    },
    {
        description : "List all users' first names and last names.",
        answer : "SELECT firstName, lastName FROM answer;;"   
    },
    {
        description : "Find users who have not made any posts.",
        answer : "SELECT * FROM answer WHERE posts = 0;"   
    },
    {
        description : "Retrieve users who have made exactly 5 posts.",
        answer : "SELECT * FROM answer WHERE posts = 5;"
    },
    {
        description : "All illegal site's servers were seized in a recent operation. Please submit all the users' details",
        answer : "SELECT * FROM answer;"
     }

]


const usersData = [
    {
        caseId: 3,
        firstName: "John",
        lastName: "Doe",
        emailAdd: "john.doe@example.com",
        lastAccess: new Date("2023-03-15T12:00:00Z"),
        posts: 5
    },
    {
        caseId: 3,
        firstName: "Jane",
        lastName: "Smith",
        emailAdd: "jane.smith@example.com",
        lastAccess: new Date("2023-03-16T09:30:00Z"),
        posts: 3
    },
    {
        caseId: 3,
        firstName: "Alice",
        lastName: "Johnson",
        emailAdd: "alice.johnson@example.com",
        lastAccess: new Date("2023-03-14T10:45:00Z"),
        posts: 8
    },
    {
        caseId: 3,
        firstName: "Bob",
        lastName: "Brown",
        emailAdd: "bob.brown@example.com",
        lastAccess: new Date("2023-03-15T14:20:00Z"),
        posts: 103
    },
    {
        caseId: 3,
        firstName: "Emma",
        lastName: "Davis",
        emailAdd: "emma.davis@example.com",
        lastAccess: new Date("2023-03-13T08:00:00Z"),
        posts: 100
    },
    {
        caseId: 3,
        firstName: "Vanshil",
        lastName: "Patel",
        emailAdd: "vanshil.dev@gmail.com",
        lastAccess: new Date("2023-07-12T08:00:00Z"),
        posts: 103
    },
    {
        caseId: 3,
        firstName: "Meet",
        lastName: "Gorasia",
        emailAdd: "gmeet@example.com",
        lastAccess: new Date("2020-11-28T08:00:00Z"),
        posts: 100
    }
];
  


async function createCases() {
    for (const question of questions) {
        try {
            const newCase = await prisma.cases.create({
                data: {
                    description: question.description,
                    answer: question.answer
                }
            });
            console.log('Created new Case: ', newCase);
        } catch (error) {
            console.error('Error creating case:', error);
        }
    }
}


createCases() .catch((e) => console.error(e));




async function generate_users_table() {

    try {
        const newUsers = await Promise.all(usersData.map(userData =>
            prisma.users.create({ data: userData })
        ));
        console.log('Created new users:', newUsers);
    } catch (error) {
        console.error('Error creating users:', error);
    }
}


generate_users_table()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

