let expect = require('expect.js');
let ODataFilter = require('../src');


describe('ODataFilter', function(){
  before(function(){
    this.testURI='http://localhost/api-example'
  });

  describe('#new', function(){
    it('should keep the URI arg in the object', function(){
      let filter = new ODataFilter(this.testURI);
      expect(filter.uri).to.eql(this.testURI);
    });
  });
});
