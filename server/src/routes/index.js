const auth = require('./auth');
const user = require('./user');
const tour = require('./tour');
const routes = [
    auth,
    user,
    tour
]

module.exports = routes