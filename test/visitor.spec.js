var createFilter = require('../lib').createFilter
var expect = require('chai').expect

describe("mongodb visitor", () => {
   var f;
  beforeEach(function() {
    var match;
     if (match = this.currentTest.title.match(/expression[^\:]*\:  ?(.*)/)) {
       f = createFilter(match[1]);
     }
  });

  //all numbers are referencing this:
  //https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#_Toc31361028

  it("expression: 1 eq 1", () => {
      expect(f).to.deep.eql({})
  })

  it("expression: (1 eq 1) or (2 eq 2)", () => {
      expect(f).to.deep.eql({})
  })

  it("expression 5.1.1.14.1: NullValue eq null", () => {
      expect(f).to.deep.eql({ NullValue: {$eq: null} })
  })

  it("expression 5.1.1.14.1: TrueValue eq true", () => {
      expect(f).to.deep.eql({ TrueValue: {$eq: true} })
  })

  it("expression 5.1.1.14.1: FalseValue eq false", () => {
      expect(f).to.deep.eql({ FalseValue: {$eq: false} })
  })

  it("expression 5.1.1.14.1: IntegerValue lt -128", () => {
      expect(f).to.deep.eql({ IntegerValue: { $lt: -128 } })
  })

  it("expression 5.1.1.14.1: DecimalValue eq 34.95", () => {
      expect(f).to.deep.eql({ DecimalValue: {$eq: 34.95} })
  })

  it("expression 5.1.1.14.1: StringValue eq 'Say Hello,then go'", () => {
      expect(f).to.deep.eql({ StringValue: {$eq: 'Say Hello,then go'} })
  })

  xit("expression 5.1.1.14.1: DurationValue eq duration'P12DT23H59M59.999999999999S'", () => {
      expect(f).to.deep.eql({ DurationValue: {$eq: 1033199000} })
  })

  it("expression 5.1.1.14.1: DateValue eq 2012-12-03", () => {
      expect(f).to.deep.eql({ DateValue: {$eq: '2012-12-03'} })
  })

  it("expression 5.1.1.14.1: DateTimeOffsetValue eq 2012-12-03T07:16:23Z", () => {
      expect(f).to.deep.eql({ DateTimeOffsetValue: {$eq: new Date('2012-12-03T07:16:23Z')} })
  })

  it("expression 5.1.1.14.1: GuidValue eq 01234567-89ab-cdef-0123-456789abcdef", () => {
      expect(f).to.deep.eql({ GuidValue: {$eq: '01234567-89ab-cdef-0123-456789abcdef'} })
  })

  it("expression 5.1.1.14.1: Int64Value eq 0", () => {
      expect(f).to.deep.eql({ Int64Value: {$eq: 0 } })
  })

  it("expression 5.1.1.14.1: A eq INF", () => {
      expect(f).to.deep.eql({ A: {$eq: Infinity } })
  })

  it("expression 5.1.1.14.1: A eq 0.31415926535897931e1", () => {
      expect(f).to.deep.eql({ A: {$eq: 0.31415926535897931e1 } })
  })

  it("expression 5.1.1.1.2: A ne 1", () => {
      expect(f).to.deep.eql({ A: { $ne: 1 } })
  })

  it("expression 5.1.1.1.3: A gt 2", () => {
      expect(f).to.deep.eql({ A: { $gt: 2 } })
  })

  it("expression 5.1.1.1.4: A ge 3", () => {
      expect(f).to.deep.eql({ A: { $gte: 3 } })
  })

  it("expression 5.1.1.1.5: A lt 2", () => {
      expect(f).to.deep.eql({ A: { $lt: 2 } })
  })

  it("expression 5.1.1.1.6: A le 2", () => {
      expect(f).to.deep.eql({ A: { $lte: 2 } })
  })

  it("expression: A/b eq 1", () => {
      expect(f).to.deep.eql({ 'A.b': {$eq: 1 } })
  })

  it("expression 5.1.1.3: (A/b eq 2) or (B/c lt 4) and ((E gt 5) or (E lt -1))", () => {
      expect(f).to.deep.eql({ $or: [{ 'A.b': { $eq: 2 } }, { $and: [{ 'B.c': { $lt: 4 } }, { $or: [{ E: { $gt: 5 } }, { E: { $lt: -1 } }] }] }] })
  })

  it("expression 5.1.1.4.1: contains(A, 'BC')", () => {
      expect(f).to.deep.eql({ A: /BC/gi });
  })

  it("expression 5.1.1.4.1: contains(A, 'BC') or contains(D, 'EF')", () => {
      expect(f).to.deep.eql({ $or: [{ A: /BC/gi }, { D: /EF/gi }]});
  })

  it("expression 5.1.1.5.3: endswith(A, 'CD')", () => {
      expect(f).to.deep.eql({ A: /CD$/gi });
  })

  it("expression 5.1.1.5.6: startswith(A, 'CD')", () => {
      expect(f).to.deep.eql({ A: /^CD/gi });
  })

  it("expression 5.1.1.1.12: not endswith(Name,'ilk')", () => {
      expect(f).to.deep.eql({ Name: { $not: /ilk$/gi } });
  })

  it("expression 5.1.1.7.2: tolower(displayName) eq 'device1'", () => {
      expect(f).to.deep.eql({ displayName: { $eq: 'device1'} });
  })

  it("expression 5.1.1.7.3: toupper(displayName) eq 'device1'", () => {
      expect(f).to.deep.eql({ displayName: { $eq: 'device1'} });
  })

  it("expression 5.1.1.1.9: not (displayName eq 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $eq: 'device1'} } });
  })

  it("expression 5.1.1.1.9: not (tolower(displayName) eq 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $eq: 'device1'} } });
  })

  it("expression 5.1.1.1.9: not (toupper(displayName) eq 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $eq: 'device1'} } });
  })

  it("expression 5.1.1.7.2: tolower(displayName) ne 'device1'", () => {
      expect(f).to.deep.eql({displayName: {$ne: 'device1'}});
  })

  it("expression 5.1.1.7.3: toupper(displayName) ne 'device1'", () => {
      expect(f).to.deep.eql({ displayName: { $ne: 'device1'} });
  })

  it("expression 5.1.1.1.9: not (displayName ne 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $ne: 'device1'} } });
  })

  it("expression 5.1.1.1.9: not (tolower(displayName) ne 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $ne: 'device1'} } });
  })

  it("expression 5.1.1.1.9: not (toupper(displayName) ne 'device1')", () => {
      expect(f).to.deep.eql({ displayName: { $not: { $ne: 'device1'} } });
  })
})
