let _ = require('underscore');
let {tokenizeFieldAndOperators} = require('./tokenize')

module.exports = function(args){
  let tokens = [];

  for(var field in args){
    tokens.push(tokenizeFieldAndOperators(field, args[field]))
  }
  
  this.tokens.push({
    chainOperator: 'OR',
    logicalOperator: 'AND', 
    tokens
  });

  return this
};
