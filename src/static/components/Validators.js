
/**
 * Email validation function
 * @param {string} email
 * @return {Boolean} True if validation passes, false otherwise
 */
const validateEmail = (email) => {
    if (email && email.indexOf("@") !== -1) return true;
    return false;
};

/**
 * Username validation function
 * @param {string} username
 * @return {Boolean} True if validation passes, false otherwise
 */
/*const validateUsername = (username) => {
    if (username && username.length >= 3) return true;
    return false;
}; */

/**
 * Password validation function
 * @param {string} password
 * @returns True if validation passes, false otherwise
 */
const validatePassword = (password) => {
    if (password && password.length >= 3) return true;
    return false;
};

/**
 * Validation function for RegUserForm
 * @param {object} values An object representation of all user submitted values
 * @returns {object} An object representing validation error
 */
export const  regFormValidator = (values) => {
    let error = {};
    //let email = values.email;
    let email = values.username;
    let password = values.password;
    

    if (!validateEmail(email)) error.username = "Enter a valid email address";
    //if (!validateUsername(username)) error.username = "Enter a valid email address";
    if (!validatePassword(password)) error.password = "Password should be a minimum of 3 characters";

    return error;
};


export const loginFormValidator = (values) => {
    let error = {}
    let email = values.username;
    let password = values.password;

    if (!validateEmail(email)) error.username = "Enter a valid email address";
    if (!validatePassword(password)) error.password = "Password should be a minimum of 3 characters";

    return error;
    
}

