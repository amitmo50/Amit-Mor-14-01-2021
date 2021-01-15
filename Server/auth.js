const { joinInUser, addLoginUser } = require('./users.js');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authenticated')

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401
        next(err)
    }

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const userName = auth[0];
    const password = auth[1];
    const isExist = joinInUser(userName);
    addLoginUser(userName);
    if(isExist){
        next();
    }else{
        var err = new Error('You are not authenticated')

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401
        next(err)
    }

}

module.exports = auth;