/*
*  all functions that will or can be used in different files
*  should be exported from here
* */

export var validate_email = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

};
export var ResponseRender = function (status, message = "", data = {}) {
    return {
        status: status,
        message: message,
        data: data
    }
};