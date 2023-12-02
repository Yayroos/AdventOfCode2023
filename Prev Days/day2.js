const input = require('./Inputs/day2In.js');

const lines = input.split("\n");


function part1(){
    const max = {
        red: 12,
        green: 13,
        blue: 14
    }

    let answer = 0;

    lines.forEach((line, index) => {

        let possible = true;

        const withoutGameNum = line.split(": ")[1];
        const cubeSets = withoutGameNum.split(";");
        const cubes = cubeSets.flatMap(set => set.split(","));
        for(let cube of cubes) {
            const [num, colour] = cube.trim().split(" ");
            const parsed = parseInt(num);
            if(parsed > max[colour]){
                possible = false;
                break;
            }
        }

        if(possible){
            answer += index+1;
        }

    })

    return answer;
}


function part2(){
    

    let answer = 0;

    lines.forEach((line, index) => {

        const minPossible = {
            red: undefined,
            green: undefined,
            blue: undefined
        }

        const withoutGameNum = line.split(": ")[1];
        const cubeSets = withoutGameNum.split(";");
        const cubes = cubeSets.flatMap(set => set.split(","));
        for(let cube of cubes) {
            const [num, colour] = cube.trim().split(" ");
            const parsed = parseInt(num);
            if(minPossible[colour] === undefined || parsed > minPossible[colour]){
                //there must be more than we previously knew
                minPossible[colour] = parsed;
            }
        }

        answer += minPossible.red * minPossible.green * minPossible.blue;

    })

    return answer;
}

console.log("Part 1", part1());
console.log("Part 2", part2());