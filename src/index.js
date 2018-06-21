let _ = require('underscore');

function ODataFilter(uri){
  this.uri = uri;
  this.tokens = []
}

ODataFilter.prototype.filter  = require('./filter');
ODataFilter.prototype.and     = require('./and');
ODataFilter.prototype.or      = require('./or');



ODataFilter.prototype.build = function(){
  let filterQuery = _.reduce(this.tokens, reduceChain, '');
  return `${this.uri}?$filter=${filterQuery}`;
}

module.exports = ODataFilter


function reduceChain(acc, token){
  let filter = token.tokens.join(` ${token.logicalOperator} `);
  if (token.chainOperator){
    filter = ` ${token.chainOperator} ${filter}`;
  }
  return acc + filter;
}
