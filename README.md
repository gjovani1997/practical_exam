"# practical_exam" 

Follow the steps below to setup the project

run the command:

1. npm install


DB Mingration

Prerequisite:
npm install mysql -g
npm install mysql --save
npm install db-migrate -g
npm install db-migrate-mysql --save

1. Create Database on your localhost (mine is Mysql) and name it `node_backend_db`

2. run the command: db-migrate up --config db_migrations/node_backend_db.json
After running this command it will create new tables:
a. node_backend_users
b. node_backend_sessions

Also an entry in our node_backend_users table will be created and we can use it to test the api.

use the credentails below to use the login API (url wil be povided)
username: testusername99
password: Default123

3. Database Seeding - Run the command below
- node db_seed.js

