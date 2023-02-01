module.exports =  class Dependencies {

    express = require('express');
    router = this.express.Router();
    jwt = require('jsonwebtoken');
    bodyparser = require('body-parser');
    json = this.bodyparser.json();
    bcrypt = require('bcrypt');

}
