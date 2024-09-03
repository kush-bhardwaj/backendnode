const bcrypt = require('bcryptjs');
exports.genPassword = (password) => {
    const salt = bcrypt.genSaltSync(15);
    return bcrypt.hashSync(password, salt)
}
exports.commparePassowrd = (oldpassowrd, hash) => {
    // console.log("oldpassword",oldpassowrd)
    // console.log('hash',hash)
    return bcrypt.compareSync(oldpassowrd,hash)
}
