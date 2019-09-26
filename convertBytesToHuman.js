/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof(bytes) == "number" && bytes >= 0){
    return bytes
  }
  return false
}

export default convertBytesToHuman