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

  describe('#filter', function(){
    beforeEach(function(){
      this.testURI='http://localhost/api-example'
      this.filterInstance = new ODataFilter(this.testURI);
    });

    it('adds filter and query str', function(){
      let datetimeStr = 'fake datetime string';
      this.filterInstance.filter({created_at: {eq: datetimeStr}});
      expect(this.filterInstance.build()).to.eql(
          `${this.testURI}?$filter=created_at eq ${datetimeStr}`);
    });
  });
});
