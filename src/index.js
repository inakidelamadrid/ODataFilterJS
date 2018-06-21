let _ = require('underscore');

function ODataFilter(uri){
  this.uri = uri;
  this.tokens = []
}

ODataFilter.prototype.filter = require('./filter');


ODataFilter.prototype.build = function(){
  let tokens = _.flatten(this.tokens);

  return `${this.uri}?$filter=${tokens.join(' ')}`;
}

module.exports = ODataFilter
