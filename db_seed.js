const mysql = require("mysql2");
const  { faker }  =  require('@faker-js/faker');
// import { faker } from '@faker-js/faker/locale/de';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_backend_db'
});


function createRandomUser(){
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    address:faker.address.city(),
    postcode: 9999,
    contact_number: faker.phone.number(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

function create_user(args){

    let query = `
    INSERT INTO node_backend_users 
    (first_name,last_name,address,postcode,contact_number,email,username,password)
    VALUES
    (?,?,?,?,?,?,?,?)
    `;

    let bind_data = [args['first_name'],args['last_name'],args['address'],args['postcode'],args['contact_number'],args['email'],args['username'],args['password']];

    connection.query(query,bind_data);
        
}

console.log("Seeding...");
let i = 0;
Array.from({ length: 100 }).forEach(() => {
  create_user(createRandomUser());
  i++;
  console.log(i+" of 100");
});

if(i>99){
    console.log("Database seeding completed!");
}

