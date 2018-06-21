let _ = require('underscore');
let {tokenizeFieldAndOperators} = require('./tokenize')


module.exports = {filter, and, or};
    
function processLogicalAndFilterTokens(args, settings){
  let _settings = _.extend({
      chainOperator: null
  }, settings || {});

  let tokens = [];

  for(var field in args){
    tokens.push( tokenizeFieldAndOperators(field, args[field], this.config.comparisonOperators) );
  }
  
  this.tokens.push({
    chainOperator: _settings.chainOperator,
    logicalOperator: 'AND', 
    tokens
  });

  return this
}

function filter(args){
  processLogicalAndFilterTokens.call(this,args);
  return this;
};

function and(args){
  processLogicalAndFilterTokens.call(this, args, {chainOperator: 'AND'});
  return this;
};

function or(args){
  processLogicalAndFilterTokens.call(this, args, {chainOperator: 'OR'});
  return this;
};
