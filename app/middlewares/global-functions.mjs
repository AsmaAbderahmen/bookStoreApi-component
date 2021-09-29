import bcrypt from'bcrypt'

export var validate_email = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

};
export var ResponseRender = function (status, message = "", data) {
    return {
        status: status,
        message: message,
        data: data
    }
};

export var hash_password = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash)
            });
        });
    });
};

export var paginate= async (array, page_size, page_number)=> {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
