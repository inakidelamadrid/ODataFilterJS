let _ = require('underscore');

function ODataFilter(uri){
  this.uri = uri;
  this.tokens = []
}

ODataFilter.prototype.filter = require('./filter');


ODataFilter.prototype.build = function(){
  let target = this.tokens[0]
  let filterQuery = target.tokens.join(' ' + target.logicalOperator + ' ');

  return `${this.uri}?$filter=${filterQuery}`;
}

module.exports = ODataFilter
