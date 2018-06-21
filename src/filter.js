let _ = require('underscore');
let {extend}  = require("./utils");


module.exports = function(args){

  for(var field in args){
    this.tokens.push(tokenizeFieldAndOperators(field, args[field]));
  }
};

function tokenizeFieldAndOperators(field, filters){
  return _.map(_.pairs(filters), function(pair){
      return `${field} ${pair[0]} ${pair[1]}`; 
  }, []);
}
