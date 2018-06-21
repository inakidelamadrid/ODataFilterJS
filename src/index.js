function ODataFilter(uri){
  this.uri = uri;
}

ODataFilter.prototype.pit = require('./pit');

module.exports = ODataFilter
