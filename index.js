require('dotenv').config()
const Dependencies = require("./src/helper/dependency_helper");
const dept_helper_obj = new Dependencies();
const body_parser = dept_helper_obj.bodyparser
const app = dept_helper_obj.express();
const PORT = process.env.PORT || 8080;

const users_api = require('./src/api/users_api');
const auth_api = require('./src/api/auth_api');

app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

app.use('/users', users_api);
app.use('/auth', auth_api);


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});