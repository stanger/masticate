var masticate = require("./lib/index").Masticate,
	fs = require("fs");
	
console.log(process.argv[2]);

masticate.parse(fs.readFileSync(process.argv[2])).then((recipe) => {
	console.log(recipe);
});

