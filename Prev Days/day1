const input = require('./Inputs/day1In.js');


const lines = input.split("\n");

//part 1
function part1(){
    return (lines.reduce((acc, line) => {
        const digits = line.matchAll(/\d/g);
        const digitsArr = Array.from(digits);
        return acc + parseInt(digitsArr[0][0] + digitsArr[digitsArr.length-1][0])
    }, 0));
}

function part2(){
    return (lines.reduce((acc, line, index) => {
        //yes i know my regex is bad. but it works so.
        const last = line.match(/^.*(\d|one|two|three|four|five|six|seven|eight|nine)/);
        const first = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine).*$/);
        //console.log("line", line, "index", index, "first", first[1], "last", last[1]);
        return acc + parseInt(fixSpelled(first[1]) + fixSpelled(last[1]))
    }, 0));
}

console.log("Part 1", part1());
console.log("Part 2", part2());



function fixSpelled(str) {
    switch(str){
        case "one": return "1";
        case "two": return "2";
        case "three": return "3";
        case "four": return "4";
        case "five": return "5";
        case "six": return "6";
        case "seven": return "7";
        case "eight": return "8";
        case "nine": return "9";
        default: return str;
    }
}