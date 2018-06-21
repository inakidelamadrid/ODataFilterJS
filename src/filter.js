let _ = require('underscore');


module.exports = function(args){
  let tokens = [];

  for(var field in args){
    tokens.push(tokenizeFieldAndOperators(field, args[field]))
  }
  
  this.tokens.push({'logicalOperator': 'AND', tokens});
  return this
};

function tokenizeFieldAndOperators(field, filters){
  let sameFieldTokens = _.map(_.pairs(filters), function(pair){
      return `${field} ${pair[0]} ${pair[1]}`; 
  }, []);
  
  return sameFieldTokens.join(' AND ');
}
