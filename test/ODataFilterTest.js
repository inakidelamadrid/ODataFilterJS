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
      this.testURI        ='http://localhost/api-example'
      this.filterInstance = new ODataFilter(this.testURI);
      this.datetimeStr    = 'fake datetime string';
    });

    it('adds filter and query str', function(){
      this.filterInstance.filter({
          created_at: {eq: this.datetimeStr}
      });
      expect(this.filterInstance.build()).to.eql(
        `${this.testURI}?$filter=created_at eq ${this.datetimeStr}`);
    });

    it('supports multiple filters on different keys (fields) joined by and', function(){
      this.filterInstance.filter({
        createdAt : {eq: this.datetimeStr},
        visitCount: {gt: 20}
      });

      expect(this.filterInstance.build()).to.eql(
          `${this.testURI}?$filter=createdAt eq ${this.datetimeStr} AND visitCount gt 20`);

    });

    it('supports multiple filters on same keys joined by and', function(){
      this.filterInstance.filter({
          createdAt : {gt: '2 days ago', lt: 'Today'}
      });

      expect(this.filterInstance.build()).to.eql(
          `${this.testURI}?$filter=createdAt gt 2 days ago AND createdAt lt Today`);

    });


  });
});
