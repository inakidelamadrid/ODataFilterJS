let {tokenizeFieldAndOperators} = require('./tokenize')


module.exports = function(args){

  let tokens = [];

  for(var field in args){
    tokens.push(tokenizeFieldAndOperators(field, args[field]))
  }
  
  this.tokens.push({'logicalOperator': 'AND', tokens});
  return this
};
