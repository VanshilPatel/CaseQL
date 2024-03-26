import React from 'react';

const Results = () => {
  
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

  return (
    <div className="bg-gray-950 text-gray-50 p-4">
      <h2 className="text-2xl mb-4">Results</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-600 w-full">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2">caseId</th>
              <th className="p-2">FirstName</th>
              <th className="p-2">LastName</th>
              <th className="p-2">Email Add</th>
              <th className="p-2">Last Access</th>
              <th className="p-2">Posts</th>
              
            </tr>
          </thead>
          <tbody>
            {usersData.map(item => (
              <tr key={item.id} className="bg-gray-700">
                <td className="p-2 border border-gray-600">{item.caseId}</td>
                <td className="p-2 border border-gray-600">{item.firstName}</td>
                <td className="p-2 border border-gray-600">{item.lastName}</td>
                <td className="p-2 border border-gray-600">{item.emailAdd}</td>
                <td className="p-2 border border-gray-600">{item.lastAccess.toLocaleString()}</td>
                <td className="p-2 border border-gray-600">{item.posts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
