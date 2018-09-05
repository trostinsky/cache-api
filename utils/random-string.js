const _ = require("lodash");
module.exports = () => {
    let randomString = '';
    const alpha = "qwertyuiopasdfghjklzxcvbnm";
    const randomLength = _.random(1, 25);
    for(let i = 0; i < randomLength; i++){
        const random = _.random(alpha.length - 1);
        const randomLetter = alpha[random];
        randomString += randomLetter;
    }
    return randomString;
}