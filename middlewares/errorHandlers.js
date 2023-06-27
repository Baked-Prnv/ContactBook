const { constant } = require("../constants");


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case constant.VALIDATION_ERROR: //400
            res.json({
                title:"Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constant.UNAUTHORIZED: // 401
            res.json({
                title:"UnAuthorised User", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constant.FORBIDDEN:  // 403
            res.json({
                title:"Forbidden User", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constant.NOT_FOUND: // 404
            res.json({
                title:"Not Found", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constant.SERVER_ERROR:  //500
            res.json({
                title:"Server Error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log(`No Error! All Good TO GO... statusCode:${statusCode}`)
            break;
    }
    
};

module.exports = errorHandler;