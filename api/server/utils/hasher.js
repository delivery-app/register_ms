import Util from '../utils/Utils';
const bcrypt = require('bcrypt');

const util = new Util();

class hasher {
  static async hashPass(password_digest) {
    return bcrypt.hash(password_digest, 10)
    .then(function(hashed) {
      return hashed;
    })
    .catch(function(hashErr) {
      util.setError(400, hashErr);
      return util.send(res);
    });
  }

  static async hashCompare(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }
}

export default hasher;