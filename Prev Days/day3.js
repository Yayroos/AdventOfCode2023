const input = require('./input.js');


const lines = input.split("\n");


function part1(){
    //first find all the numbers by coordinate range
    const foundNums = [];
    lines.forEach((line, rowNum) => {
        for(let colNum = 0; colNum < line.length; colNum++){
            if(/\d/.test(line.charAt(colNum))){
                //we have a digit, save this coord as the start of a number and look for the end
                let endNum = colNum;
                let strVal = "";
                
                while(/\d/.test(line.charAt(endNum))){
                    strVal += line.charAt(endNum);
                    endNum++;
                }
                foundNums.push({
                    startCoord: [rowNum, colNum],
                    endCoord: [rowNum, endNum-1],
                    value: parseInt(strVal) 
                });
                colNum = endNum;

            }
        }
    })

    //now we have all the numbers, check their surroundings for symbols
    return foundNums.reduce((acc, num) => {
        //start at the top left and go around the number
        const coordsToCheck = getCoordsAround(num.startCoord, num.endCoord, lines.length, lines[0].length);
        //console.log("checking", coordsToCheck, "around", num);
        for([row, col] of coordsToCheck){ //array destructuring my beloved
            if(/[^\.]/.test(lines[row].charAt(col))){
                //console.log("found a symbol at", row, col, "around", num, "acc now", acc + num.value);
                //is a symbol
                return acc + num.value;
            }
        }
        //have gotten through all the surrounds without hitting a symbol, not a part number
        return acc;
    }, 0)

}


function part2(){
    //first find all the numbers by coordinate range
    const foundNums = [];
    const foundSymbols = [];
    lines.forEach((line, rowNum) => {
        for(let colNum = 0; colNum < line.length; colNum++){
            if(/\d/.test(line.charAt(colNum))){
                //we have a digit, save this coord as the start of a number and look for the end
                let endNum = colNum;
                let strVal = "";
                
                while(/\d/.test(line.charAt(endNum))){
                    strVal += line.charAt(endNum);
                    endNum++;
                }
                foundNums.push({
                    startCoord: [rowNum, colNum],
                    endCoord: [rowNum, endNum-1],
                    value: parseInt(strVal) 
                });
                colNum = endNum-1;

            } else if(/\*/.test(line.charAt(colNum))) {
                //we only care about gears now
                foundSymbols.push([rowNum, colNum]);
            }
        }
    })

    //now run through the gears and check against the numbers
    let sumOfRatios = 0;
    foundSymbols.forEach(gear => {
        const coordsToCheck = getCoordsAround(gear, gear, lines.length, lines[0].length);

        let adjacent = new Set();
        coordsToCheck.forEach(([row, col]) => {
            foundNums.forEach(num => {
                if(isWithin([row,col], num.startCoord, num.endCoord)){
                    //we have a number - add it to the set
                    adjacent.add(num); //because these are objects this adds the reference which means if it's adjacent to two different cells of the same number it will try and add twice and take no action
                }
            })
        })
        if(adjacent.size === 2){
            //this is a gear, find it's ratio
            //console.log("gear found at", gear, "numbers are", adjacent);
            const arr = Array.from(adjacent);
            const ratio = arr[0].value * arr[1].value;
            sumOfRatios += ratio;
        } else {
            console.log("* that isnt a gear at", gear, "adjacent to", adjacent, "checked", coordsToCheck);
        }
    })

    return sumOfRatios;
}


console.log("Part 1", part1());
console.log("Part 2", part2());



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