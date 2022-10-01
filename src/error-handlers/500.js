
'use strict';

module.exports = (error, req, res, next) => {
//   console.log('error', error);
  return res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query.body,
    message: typeof (error) === 'string' ? error : `Server error: ${error.message}`,
  });
};
