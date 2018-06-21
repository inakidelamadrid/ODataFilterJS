let _ = require('underscore');
let {filter, and, or} = require('./filter');
let defaults = require('./defaults');


function ODataFilter(uri, args){
  this.uri      = uri;
  this.config   = _.extend(Object.assign({}, defaults), args || {});
  this.tokens   = []
}

ODataFilter.prototype.filter  = filter;
ODataFilter.prototype.and     = and;
ODataFilter.prototype.or      = or;



ODataFilter.prototype.build = function(){
  let filterQuery = _.reduce(this.tokens, reduceChain, '');
  let filterOpener = this.uri.indexOf('?') > -1 ?  ' & ' : '?';
  return `${this.uri}${filterOpener}${this.config.filterParamName}=${filterQuery}`;
}

module.exports = ODataFilter


function reduceChain(acc, token){
  let filter = token.tokens.join(` ${token.logicalOperator} `);
  if (token.chainOperator){
    filter = ` ${token.chainOperator} ${filter}`;
  }
  return acc + filter;
}
