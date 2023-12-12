const input = require('./input.js');


const lines = input.split("\n");

const cardOrder = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];


function part1(){
    const hands = lines.map(line => {
        const [cards, bid] = line.split(" ");
        return {cards, bid: parseInt(bid)};
    });

    const sorted = hands.sort((a, b) => {
        const aType = findType(a.cards);
        const bType = findType(b.cards);
        if(aType !== bType){
            return aType - bType;
        } else {
            //compare card-wise
            for(let i = 0; i < 5; i++){
                if(a.cards.charAt(i) !== b.cards.charAt(i)){
                    //compare them
                    return cardOrder.indexOf(a.cards.charAt(i)) - cardOrder.indexOf(b.cards.charAt(i));
                }
            }
        }
    });

    return sorted.reduce((acc, hand, index) => acc + (hand.bid * (index+1)), 0);
}

function findType(hand){
    const groupings = {};
    for(let i = 0; i < 5; i++){
        if(groupings[hand.charAt(i)]){
            groupings[hand.charAt(i)]++;
        } else {
            groupings[hand.charAt(i)] = 1;
        }
    }
    switch(Object.values(groupings).sort((a, b) => a - b).join()){
        case "5": return 7;
        case "1,4": return 6;
        case "2,3": return 5;
        case "1,1,3": return 4;
        case "1,2,2": return 3;
        case "1,1,1,2": return 2;
        default: return 1;
    }
}

const cardOrderPart2 = ["J","2","3","4","5","6","7","8","9","T","Q","K","A"];



function part2(){

    const hands = lines.map(line => {
        const [cards, bid] = line.split(" ");
        return {cards, bid: parseInt(bid)};
    });

    const sorted = hands.sort((a, b) => {
        const aType = findTypePart2(a.cards);
        const bType = findTypePart2(b.cards);
        if(aType !== bType){
            return aType - bType;
        } else {
            //compare card-wise
            for(let i = 0; i < 5; i++){
                if(a.cards.charAt(i) !== b.cards.charAt(i)){
                    //compare them
                    return cardOrderPart2.indexOf(a.cards.charAt(i)) - cardOrderPart2.indexOf(b.cards.charAt(i));
                }
            }
        }
    });

    return sorted.reduce((acc, hand, index) => acc + (hand.bid * (index+1)), 0);
}

function findTypePart2(hand){
    const groupings = {};
    for(let i = 0; i < 5; i++){
        if(groupings[hand.charAt(i)]){
            groupings[hand.charAt(i)]++;
        } else {
            groupings[hand.charAt(i)] = 1;
        }
    }
    let groupCounts;
    if(groupings["J"]){
        const jokers = groupings["J"];
        delete groupings["J"];
        //there are jokers. always add to largest other group
        const groupsVals = Object.values(groupings).sort((a, b) => a - b);
        groupsVals[groupsVals.length -1] += jokers;
        groupCounts = groupsVals.join();
        if(jokers === 5){
            groupCounts = "5";
        }
    } else {
        groupCounts = Object.values(groupings).sort((a, b) => a - b).join();
    }
    switch(groupCounts){
        case "5": return 7;
        case "1,4": return 6;
        case "2,3": return 5;
        case "1,1,3": return 4;
        case "1,2,2": return 3;
        case "1,1,1,2": return 2;
        default: return 1;
    }
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