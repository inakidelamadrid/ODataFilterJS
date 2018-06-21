let expect = require('expect.js');
let ODataFilter = require('../src');


describe('ODataFilter', function(){
  describe('#pit', function(){

    it('should say pit', function(){
      let filter = new ODataFilter();
      expect(filter.pit()).to.eql('pit');
    });
  });
});
