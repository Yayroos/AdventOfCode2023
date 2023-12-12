const input = require('./input.js');


const sections = input.split("\n\n");//split on new new lines to get the sections - will break these into lines later


function part1(){
    const seedsSection = sections[0];

    const seedNums = seedsSection.split(":")[1].trim().split(" ").map(val => parseInt(val));

    const transformSections = sections.slice(1);

    const transformed = transformSections.reduce((acc, section) => {
        const sectionLines = section.split("\n");

        console.log("sectionLines", sectionLines);

        const sectionValues = [];

        for(let i = 1; i < sectionLines.length; i++){
            const [destStart, sourceStart, range] = sectionLines[i].split(" ").map(val => parseInt(val));
            sectionValues.push({destStart, sourceStart, range});
        }

        console.log("sectionValues", sectionValues);

        return acc.map(sourceNum => {
            //find the relevant line
            for(let map of sectionValues){
                if(map.sourceStart <= sourceNum && (sourceNum - map.sourceStart) <= map.range){
                    return map.destStart + (sourceNum - map.sourceStart);
                }
            }
            //if not in any range, return input
            return sourceNum;
            
        })


    }, seedNums)

    return Math.min(...transformed);
}


function part2(){

    const seedsSection = sections[0];

    const seedNums = seedsSection.split(":")[1].trim().split(" ").map(val => parseInt(val));

    const seedRanges = seedNums.reduce((acc, val, index) => {
        if(index % 2 === 0){
            //even, first of a pair
            return [...acc, [val]];
        } else {
            //secod of a pair - these values are the size of the ranges
            acc[acc.length-1].push(acc[acc.length-1][0] + val);
            return acc;
        }
    }, []);

    const transformSections = sections.slice(1);

    const transformed = transformSections.reduce((acc, section) => {
        console.log(acc);
        const sectionLines = section.split("\n");

        console.log("sectionLines", sectionLines);

        let sectionValues = [];

        for(let i = 1; i < sectionLines.length; i++){
            const [destStart, sourceStart, range] = sectionLines[i].split(" ").map(val => parseInt(val));
            sectionValues.push({destStart, sourceStart, range});
        }

        //sort the sections so when we iterate through them for the ranges we dont miss any
        sectionValues = sectionValues.sort((a,b) => a.sourceStart < b.sourceStart ? -1 : 1);

        return acc.flatMap(sourceRange => {
            const res = [];
            //find the relevant lines for this range, transform each part, push the new ranges
            for(mapping of sectionValues){
                if(sourceRange[0] < mapping.sourceStart){
                    //since the maps were sorted, we must be in an un-mapped range. pass values through before continuing
                    res.push([sourceRange[0], Math.min(mapping.sourceStart -1, sourceRange[1])]);
                    sourceRange[0] = Math.min(mapping.sourceStart -1, sourceRange[1]);
                }
                if(sourceRange[0] >= mapping.sourceStart && sourceRange[0] <= mapping.sourceStart + mapping.range){
                    //valid section, work out the size of the range, set new sourcerange[0], push result range into result
                    const startPoint = mapping.destStart + (sourceRange[0] - mapping.sourceStart)
                    if(sourceRange[1] > mapping.sourceStart + mapping.range){
                        //goes beyond end of range, have to split
                        //push the mapped range for the completed section
                        res.push([startPoint, mapping.destStart + mapping.range]);
                        //and change the start of this range for the next loop
                        sourceRange[0] = mapping.sourceStart + mapping.range;
                    } else {
                        //this range fits entirely within this mapping, transform and use it
                        res.push([startPoint, startPoint + (sourceRange[1] - sourceRange[0])]);
                        //then we know we're done with this range so save some cycles and
                        return res;
                    }
                } 
            }
            //we have reached the end of the mapped ranges - anything left is passed straight through
            res.push([sourceRange[0], sourceRange[1]]);
            return res;
            
        })


    }, seedRanges)

    return Math.min(...transformed.flat(1));
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