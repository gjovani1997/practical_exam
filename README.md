"# practical_exam" 

Follow the steps below to setup the project:
> npm install
> npm install nodemon -g


DB Mingration
Prerequisite:
> npm install mysql -g
> npm install mysql --save
> npm install db-migrate -g
> npm install db-migrate-mysql --save

- Create Database on your localhost (mine is Mysql) and name it `node_backend_db`

- use the command: db-migrate up --config db_migrations/node_backend_db.json
After running this command it will create new tables:
a. node_backend_users
b. node_backend_sessions

- Also an entry in our node_backend_users table will be created and we can use it to test the api.

use the credentails below to use the login API (url wil be povided)
username: testusername99
password: Default123

- Database Seeding - Run the command below
> node db_seed.js


Once done on the on the steps above we can now run this project by typing the command below
> nodemon index.js