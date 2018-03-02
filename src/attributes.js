
export class Attributes {
	static get RECIPE_ATTRIBUTES() {
		return [
			"author",
			"canonical_url",
			"cook_time",
			"description",
			"image_url",
			"ingredients",
			"instructions",
			"name",
			"nutrition",
			"prep_time",
			"published_date",
			"total_time",
			"yield"
		];
	}
	
	static get NUTRITION_ATTRIBUTES() {
		return [
			"calories",
			"cholesterol",
			"fiber",
			"protein",
			"saturated_fat",
			"sodium",
			"sugar",
			"total_carbohydrates",
			"total_fat",
			"trans_fat",
			"unsaturated_fat"
		];
	}
}

export class AttributeCleaner {
	
	static get MULTILINE_ATTRIBUTES() {
		return ["instructions"];
	}
	
	constructor(recipe) {
		this.recipe = recipe;
	}
	
	clean() {
		for (let attr of Attributes.RECIPE_ATTRIBUTES) {
			var opts = { "preserve_newlines": AttributeCleaner.MULTILINE_ATTRIBUTES.includes(attr) };
			this.recipe[attr] = this.clean_value(this.recipe[attr], opts);
		}
		return this.recipe;
	}
	
	clean_value(value, options) {
		var self = this;
		switch (typeof value) {
			case 'string':
				return this.clean_string(value, options)
			case 'array':
				return value.map( s => self.clean_string(s, options));
			default:
				return value;
		}
	}
	
	clean_string(value, options) {
		var opts = Object.assign({ "preserve_newlines": false }, options);
		
		// Remove leadings and trailing spaces
		var val = value.trim();
		if (opts["preserve_newlines"]) {
			val = val.replace(/\s*\n\s*/g, "\n");  // replace any whitespace group with a newline with a single newline
			val = val.replace(/[ ]+/g, " ");       // consolidate duplicate spaces into a single space
		} else {
			val = val.replace(/\s+/g, ' ');        // replace all consecutive whitespace with a single space
		}
		return val;
	}
}
