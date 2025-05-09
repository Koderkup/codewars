// import { resolve } from "path";
// import { createInterface } from "readline";

// // Создаем интерфейс для чтения данных из стандартного ввода (консоли)
// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const md = (a, b, c, d) => {
//   if (Math.abs(a - c) <= d && Math.abs(c - b) <= d && Math.abs(a - b) <= d) {
//     return true;
//   }
//   return false;
// };
// const accum = [];

// const question = async (query) => {
//   return new Promise((resolve) => {
//     rl.question(query, resolve);
//   });
// };

// async function askForNumbers() {
//   let  N = await question("Input N:");
//   let d = await question("Input d:");
//   // Преобразуем введенные строки в числа
//   N = parseFloat(N);
//   d = parseFloat(d);
//   rl.close();
//   console.log(N, "    ", d);
// }

// // Запускаем функцию
// askForNumbers();

//get array from console
const randomArray = [3, 7, 2, 5, 3, 8, 1, 7, 6, 2];
//implement arr from unique set
const uniqArr = Array.from(new Set(randomArray));

//Looping through data
for (let i = 0; i < uniqArr.length; i++) {
  const idx = randomArray.indexOf(uniqArr[i]);
  randomArray.splice(idx, 1);
}

console.log(randomArray.length);
