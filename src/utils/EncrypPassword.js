const bcrypt = require('bcryptjs');
exports.genPassword = (password) => {
    const salt = bcrypt.genSaltSync(15);
    return bcrypt.hashSync(password, salt)
}
exports.commparePassowrd = (hash, oldpassowrd) => {
    return bcrypt.compareSync(hash, oldpassowrd)
}