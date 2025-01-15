// let array = [16, 1, 2, 3, 7, 7, 8, 14, 10];
// const sort = (arr)=>{
// for (let i = 0; i < array.length; i++) {
//   let flag = array.length;
//   for (let index = 0; index < array.length; index++) {
//     if (array[index] > array[index + 1]) {
//       [array[index], array[index + 1]] = [array[index + 1], array[index]];
//     } else {
//       flag--;
//     }
//   }
//    if (flag === 0) break;
// }
// return arr;
// }
// console.log(sort(array));

function loadImage(str, callback){
callback(); 
}


loadImage("img1.png", function () {
  console.log("img1.png");

  loadImage("img2.png", function () {
   console.log("img2.png");

    loadImage("img3.png", function () {
      console.log("img3.png");
      console.log("все картинки загружены");
    });
  });
});