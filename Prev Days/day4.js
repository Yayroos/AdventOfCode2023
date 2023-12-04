const input = require('./input.js');


const lines = input.split("\n");


function part1(){
    let sum = 0;

    lines.forEach(line => {
        let [winning, have] = line.split(":")[1].split("|");
        const winningNums = winning.split(" ").map(val => val.trim()).filter(val=> val !== "").map(val => parseInt(val));
        const haveNums = have.split(" ").map(val => val.trim()).filter(val=> val !== "").map(val => parseInt(val));

        let counter = 0;
        winningNums.forEach(win => haveNums.includes(win) && counter ++);//absolutely abusing boolean shortcut - i hate this but /shrug

        if(counter > 0){
            sum += 2 ** (counter-1);
        }

    })



    return sum;
}


function part2(){
    console.log("running part 2");
    //add an extra line to the array and leave this copy alone as a reference so card numbers match their index. this is for me not going insane reasons
    const correctlyOffsetLines = ["this line left intentionally blank", ...lines.map(card => {
        console.log(card);
        const cardNum = parseInt(card.split(":")[0].substring(4));
        console.log("card number is", cardNum)
        
        let [winning, have] = card.split(":")[1].split("|");
        const winningNums = winning.split(" ").map(val => val.trim()).filter(val=> val !== "").map(val => parseInt(val));
        const haveNums = have.split(" ").map(val => val.trim()).filter(val=> val !== "").map(val => parseInt(val));

        let counter = 0;
        winningNums.forEach(win => haveNums.includes(win) && counter ++);//absolutely abusing boolean shortcut - i hate this but /shrug
        return {cardNum: cardNum, wins: counter};
    })];

    console.log(correctlyOffsetLines);

    let cardsProcessed = 0;

    let cardsToProcess = [...lines.map(card => parseInt(card.split(":")[0].substring(4)))];
    console.log(cardsToProcess);
    while(cardsToProcess.length > cardsProcessed){
        //console.log("loop round", cardsProcessed);
        const cardNum = cardsToProcess[cardsProcessed];

        for(let i = cardNum + 1; i <= cardNum + correctlyOffsetLines[cardNum].wins; i++){
            //console.log("pushing", i)
            cardsToProcess.push(i);
        }
        // cardsToProcess = cardsToProcess.sort((a, b) => {
        //     const aNum = parseInt(a.split(":")[0].split(" ")[1]);
        //     const bNum = parseInt(b.split(":")[0].split(" ")[1]);
        //     return a < b ? -1 : 1;
        // })
        
        cardsProcessed++;
    }

    return cardsProcessed;
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