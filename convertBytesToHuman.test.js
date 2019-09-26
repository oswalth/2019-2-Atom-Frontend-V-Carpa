import convertBytesToHuman from "./convertBytesToHuman.js"
/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(false)).toBe(false)
  expect(convertBytesToHuman(Symbol("hello"))).toBe(false)
  // ...
})

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1084479324)).toBe('1.01 GB')
  expect(convertBytesToHuman(1024)).toBe('1.00 KB')
  expect(convertBytesToHuman(1029)).toBe('1.00 KB')
  expect(convertBytesToHuman(1174)).toBe('1.15 KB')
  expect(convertBytesToHuman(930)).toBe('930.00 B')
  expect(convertBytesToHuman(4210506827776)).toBe('3.83 TB')
  expect(convertBytesToHuman(3249558991642624)).toBe('2.89 PB')
})

// другая группа проверок
