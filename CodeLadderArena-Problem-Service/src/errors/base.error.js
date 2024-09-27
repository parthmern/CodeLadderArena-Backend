// default js error class [ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error ]

class BaseError extends Error {

    constructor(name, statusCode, description, details){
        super(description) ;  // calling constructor for parent class here Error
        this.name = name ;
        this.statusCode = statusCode ;
        this.details = details ;
    }
}

module.exports = BaseError ;