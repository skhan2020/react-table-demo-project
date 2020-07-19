import { flattenObject, doSort } from './index';

describe('flattenObject - ', () => {
  it('handle undefined', () => {
    let testObj;
    const resultObj = {}
    expect(flattenObject(testObj)).toEqual(resultObj);
  });
  it('handle empty objects correctly', () => {
    const testObj = {};
    const resultObj = {};
    expect(flattenObject(testObj)).toEqual(resultObj);
  });
  it('flatten any nested object', () => {
    const testObj = {
      a: "a",
      b: "b",
      c: {
        d: "d",
        e: "e",
      }
    }
    const resultObj = {
      a: "a",
      b: "b",
      d: "d",
      e: "e",
    }
    expect(flattenObject(testObj)).toEqual(resultObj);
  });
  it('override items with duplicate keys', () => {
    const testObj = {
      a: "a",
      b: "b",
      c: {
        b: "b",
        e: "e",
      }
    }
    const resultObj = {
      a: "a",
      b: "b",
      e: "e",
    }
    expect(flattenObject(testObj)).toEqual(resultObj);
  });
});

describe('doSort - ', () => {
  it('handle if field is missing', () => {
    let testList;
    const resultList = testList;
    expect(doSort(testList)).toEqual(resultList);
  });
  it('handle empty list correctly', () => {
    const testList = [];
    const resultList = [];
    expect(doSort(testList, 'id')).toEqual(resultList);
  });
  it('sort a list by given field', () => {
    const testList = [
      {id: 3, label: 'test3', data: 'testData3'},
      {id: 2, label: 'test2', data: 'testData2'},
      {id: 1, label: 'test1', data: 'testData1'},
    ]
    const resultList = [
      {id: 1, label: 'test1', data: 'testData1'},
      {id: 2, label: 'test2', data: 'testData2'},
      {id: 3, label: 'test3', data: 'testData3'},
    ]
    expect(doSort(testList, "id")).toEqual(resultList);
  });
  it('sort a list by given field 2', () => {
    const testList = [
      {id: 3, label: 'test3', data: 'testData3'},
      {id: 2, label: 'test1', data: 'testData2'},
      {id: 1, label: 'test2', data: 'testData1'},
    ]
    const resultList = [
      {id: 2, label: 'test1', data: 'testData2'},
      {id: 1, label: 'test2', data: 'testData1'},
      {id: 3, label: 'test3', data: 'testData3'},
    ]
    expect(doSort(testList, "label")).toEqual(resultList);
  });
  it('handle duplicates', () => {
    const testList = [
      {id: 3, label: 'test3', data: 'testData3'},
      {id: 2, label: 'test2', data: 'testData2'},
      {id: 1, label: 'test2', data: 'testData1'},
    ]
    const resultList = [
      {id: 2, label: 'test2', data: 'testData2'},
      {id: 1, label: 'test2', data: 'testData1'},
      {id: 3, label: 'test3', data: 'testData3'},
    ]
    expect(doSort(testList, "label")).toEqual(resultList);
  });
});