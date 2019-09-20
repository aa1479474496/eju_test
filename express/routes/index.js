module.exports = function(app) {
    app.use('/users', require('./userInfo.js'));
}