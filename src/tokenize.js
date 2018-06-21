let _ = require('underscore');


module.exports = {tokenizeFieldAndOperators}

function tokenizeFieldAndOperators(field, filters){
  let sameFieldTokens = _.map(_.pairs(filters), function(pair){
      return `${field} ${pair[0]} ${pair[1]}`; 
  }, []);
  
  return sameFieldTokens.join(' AND ');
}
