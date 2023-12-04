const input = require('./input.js');


const lines = input.split("\n");


function part1(){
}


function part2(){
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