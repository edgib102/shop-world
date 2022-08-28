//if previous difference is greater than the current, that means we're closer. so, set the current distance to the previous and loop untill the previous difference is smaller

const numbers = [4, 15, 59, 67, 80, 105, 130, 160, 187]

const targetNumber = 78

let prev = Math.abs(targetNumber - numbers[0]);

let result = null;

// for(let index = 0; index < numbers.length; index++){

//     let current = Math.abs(targetNumber - numbers[index]);
    
//     if(prev > current){
//         // console.log(current);

//         prev = Math.abs(targetNumber - numbers[index])
//     }else if (prev < current){
//         result = numbers[index];
//         console.log("difference: "+current);
//         break;
//     }  
// }

var current = numbers[0]
var difference = Math.abs (targetNumber - current);

for (var val = 0; val < numbers.length; val++) {

    var newdiff = Math.abs (targetNumber - numbers[val]);

    if (newdiff < difference) {
        difference = newdiff;
        current = numbers[val];
    }
}

console.log(current);

