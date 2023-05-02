module.exports = {createNewToken}

function createNewToken() {
    const token = randomString(15);
    const password = randomString(20);
    return {token, password};
}