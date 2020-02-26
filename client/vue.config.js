const path = require('path');

module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : 'http://locahost:5000'
            }
        }
    }
}