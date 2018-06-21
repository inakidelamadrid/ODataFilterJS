let _ = require('underscore');
let {filter, and, or} = require('./filter');

function ODataFilter(uri){
  this.uri = uri;
  this.tokens = []
}

ODataFilter.prototype.filter  = filter;
ODataFilter.prototype.and     = and;
ODataFilter.prototype.or      = or;



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
