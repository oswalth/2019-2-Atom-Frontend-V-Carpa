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
    let output;
    let prefixes = ' KMGTPE';
    let i = 0;
    while (bytes >= 1024 && i <= 4){
      i++;
      let double = bytes % 1024 / 1024;
      bytes = Math.floor(bytes / 1024) + double
    }
    let prefix = (i > 0) ? prefixes[i] : ''
    return `${bytes.toFixed(2)} ${prefix}B`
  }
  return false
}

//convertBytesToHuman(4210506827776)
export default convertBytesToHuman