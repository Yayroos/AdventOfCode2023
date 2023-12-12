const input = require('./input.js');


const lines = input.split("\n");


function part1(){
    const times = lines[0].split(":")[1].trim().split(" ").filter(val => val !== "");
    const records = lines[1].split(":")[1].trim().split(" ").filter(val => val !== "");
    
    const races = times.map((val, index) => {return {time: parseInt(val), record: parseInt(records[index])}});

    return races.reduce((acc, race) => {

        let minWin;

        for(let i = 0; i <= race.time; i++){
            if(i * (race.time-i) > race.record){
                minWin = i;
                break;
            }
        }

        let winPaths = (race.time + 1) - (2*minWin); //filthy maths but i think its right (the plus 1 is to account for the fact that 0 is an option even through you would never take it)

        return winPaths * acc;
    }, 1)

}


function part2(){
    const time = parseInt(lines[0].split(":")[1].trim().split(" ").filter(val => val !== "").join(""));
    const record = parseInt(lines[1].split(":")[1].trim().split(" ").filter(val => val !== "").join(""));
    
    let minWin;

    for(let i = 0; i <= time; i++){
        if(i * (time-i) > record){
            minWin = i;
            break;
        }
    }

    let winPaths = (time + 1) - (2*minWin); //filthy maths but i think its right (the plus 1 is to account for the fact that 0 is an option even through you would never take it)

    return winPaths;
}


console.log("Part 1", part1());
console.log("Part 2", part2());


//helpers from previous days - carried forward because i couldnt be bothered making a utils file right now.
function getCoordsAround([startRow, startCol], [endRow, endCol], rowCount, colCount){
    //breaking this out because it will probably be useful later in the advent
    //maybe i should make a utils file... hmmm
    const res = [];
    //top
    if(startRow-1 >= 0){
        for(let i = startCol -1; i <= endCol +1; i++){
            if(i >= 0 && i < colCount){ //exclude areas that are off the grid
                res.push([startRow-1, i]);
            }
        }
    }
    //now down the right, noting that we dont go up because we already got that from the top
    if(endCol+1 < colCount){
        for(let i = startRow; i <= endRow +1; i++){
            if(i >= 0 && i < rowCount){ //exclude areas that are off the grid
                res.push([i, endCol+1]);
            }
        }
    }
    //now across the bottom, again starting directly below the end rather than before it
    if(endRow+1 < rowCount){
        for(let i = endCol; i >= startCol -1; i--){
            if(i >= 0 && i < colCount){ //exclude areas that are off the grid
                res.push([endRow+1, i]);
            }
        }
    }
    //finally back up the side - we already have the top and bottom of the side though
    if(startCol-1 >= 0){
        for(let i = endRow; i >= startRow; i--){
            if(i >= 0 && i < rowCount){ //exclude areas that are off the grid
                res.push([i, startCol-1]);
            }
        }
    }
    return res;
}


function isWithin([testRow, testCol], [startRow, startCol], [endRow, endCol]){
    return testRow >= startRow && testRow <= endRow && testCol >= startCol && testCol <= endCol;
}