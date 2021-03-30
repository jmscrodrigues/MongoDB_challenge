const fs = require('fs');

// Function that flattens the received JSON
function flat(object) {
    var result = {};

    function recursive(object, current) {
        for (var key of Object.keys(object)) {
            if(object[key] == '[object Object]') {
                if(current == null) {
                    recursive(object[key], key);
                }
                else {
                    recursive(object[key], current + "." +key);
                }   
            }
            else {
                if(current != null) {
                    result[current + "." +key] = object[key];
                }
                else result[key] = object[key]; 
            } 
        }
    }

    recursive(object);

    return JSON.stringify(result, null, "\t");
}


// Reading input file
const data = fs.readFileSync(process.stdin.fd, 'utf-8',(err, data) => {
    if (err) throw err;
});

// Parsing input file to JSON
let jsonObject;
try {
    jsonObject = JSON.parse(data);
} catch(e) {
    console.error("Invalid JSON input!");
    return;
}

console.log(flat(jsonObject));


//Writing flatten JSON to output.json file
fs.writeFile("output.json", flat(jsonObject), function(err) {
    if(err) throw err;
});