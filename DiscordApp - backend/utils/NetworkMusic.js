const { randomString } = require("./randomSrting.js");

function createNewToken() {
    const token = randomString(15);
    const password = randomString(20);
    return {token, password};
}
module.exports = {createNewToken}