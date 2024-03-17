import { PrismaClient } from '@prisma/client'
import { match } from 'assert';

const prisma = new PrismaClient()


async function main(){
  const new_Case = await prisma.case.create({
     data : {
        description : "All illegal site's servers were seized in a recent operation. Please submit all the users' details",
        answer : "SELECT * FROM USERS;"
     }
  })
  console.log('Created new Case: ', new_Case)


}

main()
  .catch((e) => console.error(e))
  

async function generate_answer_table(){
    const new_answer = await Promise.all([
        prisma.answer.create({
          data: {
            caseId: 3,
            f_name: "John",
            l_name: "Doe",
            email: "john.doe@example.com",
            Access_Time: new Date("2023-03-15T12:00:00Z"),
            No_of_Post: 5
          }
        }),
        prisma.answer.create({
          data: {
            caseId: 3,
            f_name: "Jane",
            l_name: "Smith",
            email: "jane.smith@example.com",
            Access_Time: new Date("2023-03-16T09:30:00Z"),
            No_of_Post: 3
          }
        }),
        prisma.answer.create({
          data: {
            caseId: 3,
            f_name: "Alice",
            l_name: "Johnson",
            email: "alice.johnson@example.com",
            Access_Time: new Date("2023-03-14T10:45:00Z"),
            No_of_Post: 8
          }
        }),
        prisma.answer.create({
          data: {
            caseId: 3,
            f_name: "Bob",
            l_name: "Brown",
            email: "bob.brown@example.com",
            Access_Time: new Date("2023-03-15T14:20:00Z"),
            No_of_Post: 4
          }
        }),
        prisma.answer.create({
          data: {
            caseId: 3,
            f_name: "Emma",
            l_name: "Davis",
            email: "emma.davis@example.com",
            Access_Time: new Date("2023-03-13T08:00:00Z"),
            No_of_Post: 6
          }
        })
      ]);
      
}


generate_answer_table()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())