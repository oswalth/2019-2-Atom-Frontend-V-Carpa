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
  expect(convertBytesToHuman(1/0)).toBe(Infinity)
  expect(convertBytesToHuman(12.35)).toBe(12.35)
  expect(convertBytesToHuman(Infinity)).toBe(Infinity)
  expect(convertBytesToHuman(1)).toBe(1)
  expect(convertBytesToHuman(-1 * -1)).toBe(1)
  expect(convertBytesToHuman(0 / -1)).toBe(-0)
})

// другая группа проверок
