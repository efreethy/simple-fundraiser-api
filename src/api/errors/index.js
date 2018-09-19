'use strict'

import assign from 'lodash/assign';

class ApiError extends Error {
    constructor(details) {
        const { status, code, name, message } = details;
        
        super(message)
        Error.captureStackTrace(this, ApiError)
        this.status = status
        this.code = code
        this.name = name
        this.message = message
        this.details = details
    }
}

class ResourceNotFoundError extends ApiError {
    constructor(details) {
        const defaults =  {
            status: 404,
            code: 'resource_not_found',
            message: 'The requested resource doesn\'t exist.'
        };
        super(assign(defaults, details))
        Error.captureStackTrace(this, ResourceNotFoundError);
    }
}

class ValidationError extends ApiError {
    constructor(details) {
        const defaults =  {
            status: 400,
            code: 'validation_error',
            message: 'The provided request parameters are invalid'
        };
        super(assign(defaults, details))
        Error.captureStackTrace(this, ValidationError);
    }
}


ApiError.ResourceNotFoundError = ResourceNotFoundError;
ApiError.ValidationError = ValidationError;


export default ApiError
