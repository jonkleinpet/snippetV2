const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const errorHandling = {
    checkReqFields(username, password) {
        if (!username) {
            return 'please enter a username';
        }
        if (!password) {
            return 'please enter a password';
        }
        return null;
    },
    
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters';
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters';
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces';
        }
        if (!regex.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character';
        }
        return null;
    }
}

module.exports = {
    errorHandling
};