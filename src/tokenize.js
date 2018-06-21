let _ = require('underscore');


module.exports = {tokenizeFieldAndOperators}

function tokenizeFieldAndOperators(field, filters, comparisonOperatorsMap){
  let sameFieldTokens = _.map(_.pairs(filters), function(pair){
      return `${field} ${comparisonOperatorsMap[pair[0]]} ${pair[1]}`; 
  }, []);
  
  return sameFieldTokens.join(' AND ');
}
