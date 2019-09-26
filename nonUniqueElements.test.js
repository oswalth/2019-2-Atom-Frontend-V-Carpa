import nonUniqueElements from "./nonUniqueElements.js"

test('returns non unique elements', () => {
  expect(nonUniqueElements([1, 2, 3, 1, 3])).toEqual([1, 3, 1, 3]);
  expect(nonUniqueElements([1, 2, 3, 4, 5])).toEqual([]);
  expect(nonUniqueElements([-1,-1*-1,1])).toEqual([1, 1]);
  expect(nonUniqueElements([5 **2,25,50/2, 24])).toEqual([25, 25, 25]);
  expect(nonUniqueElements([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
  expect(nonUniqueElements([10, 9, 10, 10, 9, 8])).toEqual([10, 9, 10, 10, 9]);
  expect(nonUniqueElements(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 1, 11, 22, 3])
    ).toEqual([1, 3, 11, 1, 11, 3]);
})
