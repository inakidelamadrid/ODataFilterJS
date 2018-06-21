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
      this.odata = new ODataFilter(this.testURI);
      this.datetimeStr    = 'fake datetime string';
    });

    it('doesnt add the query params mark if already included', function(){
      let URIWithQueryParams = 'http://localhost/api-example?someParam=example';
      let odata = new ODataFilter(URIWithQueryParams);
      odata.filter({newParam: {gt: 20}});
      expect(odata.build()).to.eql(`${URIWithQueryParams} & $filter=newParam gt 20`);
    });

    it('adds filter and query str', function(){
      this.odata.filter({
          created_at: {eq: this.datetimeStr}
      });
      expect(this.odata.build()).to.eql(
        `${this.testURI}?$filter=created_at eq ${this.datetimeStr}`);
    });

    it('supports multiple filters on different keys (fields) joined by and', function(){
      this.odata.filter({
        createdAt : {eq: this.datetimeStr},
        visitCount: {gt: 20}
      });

      expect(this.odata.build()).to.eql(
          `${this.testURI}?$filter=createdAt eq ${this.datetimeStr} AND visitCount gt 20`);

    });

    it('supports multiple filters on same keys joined by and', function(){
      this.odata.filter({
          createdAt : {gt: '2 days ago', lt: 'Today'}
      });

      expect(this.odata.build()).to.eql(
          `${this.testURI}?$filter=createdAt gt 2 days ago AND createdAt lt Today`);

    });

    it('supports combined same/different field filters joined by and', function(){
      this.odata.filter({
        createdAt : {gt: '2 days ago', lt: 'Today'},
        visitCount: {gt: 20}
      });

      expect(this.odata.build()).to.eql(
          `${this.testURI}?$filter=createdAt gt 2 days ago AND createdAt lt Today AND visitCount gt 20`);

    });
  });

  describe('#and', function(){
    beforeEach(function(){
      this.testURI        ='http://localhost/api-example'
      this.odata = new ODataFilter(this.testURI);
    });

    it('chains a filter on one field using AND', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).and({visitCount: {gt: 20}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago AND visitCount gt 20`)
    });

    it('chains a filter on many fields using AND', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).and({visitCount: {gt: 20}, category: {eq: 'Bussiness'}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago AND visitCount gt 20 AND category eq Bussiness`)
    });

    it('supports AND chained field with many filters', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).and({visitCount: {gt: 20, lt: 100}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago AND visitCount gt 20 AND visitCount lt 100`)
    });

    it('can be used together with OR', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).and({visitCount: {gt: 100}}).or({category: {eq: 'business'}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago AND visitCount gt 100 OR category eq business`);

    });
  });

  describe('#or', function(){
    beforeEach(function(){
      this.testURI  ='http://localhost/api-example'
      this.odata    = new ODataFilter(this.testURI);
    });

    it('chains a filter on one field using OR', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).or({visitCount: {gt: 20}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago OR visitCount gt 20`)
    });

    it('chains a filter on many fields using OR', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).or({visitCount: {gt: 20}, category: {eq: 'Bussiness'}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago OR visitCount gt 20 AND category eq Bussiness`)
    });

    it('supports OR chained field with many filters', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).or({visitCount: {gt: 20, lt: 100}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago OR visitCount gt 20 AND visitCount lt 100`)
    });
    it('can be used together with AND', function(){
      filtered = this.odata.filter(
          {createdAt: {gt: '2 days ago'}}).or({visitCount: {gt: 100}}).and({category: {eq: 'business'}});
      expect(filtered.build()).to.eql(`${this.testURI}?$filter=createdAt gt 2 days ago OR visitCount gt 100 AND category eq business`);

    });
  })
});
