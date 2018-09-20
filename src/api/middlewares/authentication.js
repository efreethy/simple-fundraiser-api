import expressJwt from 'express-jwt';

import config from '../../config';

export default expressJwt({
  secret: config.authentication_token_secret,
  userProperty: 'account'
})