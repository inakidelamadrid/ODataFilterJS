let _ = require('underscore');
let {tokenizeFieldAndOperators} = require('./tokenize')

module.exports = function(args){
  let tokens = [];

  for(var field in args){
    tokens.push(tokenizeFieldAndOperators(field, args[field]))
  }
  
  this.tokens.push({
    chainOperator: 'AND',
    logicalOperator: 'AND', 
    tokens
  });

  return this
};
