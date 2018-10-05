import { Nutrition } from "./recipe"
import { RecipeParser } from "./recipe_parser";
import $ from "cheerio";

export class SchemaOrgJsonRecipeParser extends RecipeParser {
	constructor(doc) {
		super(doc);
		this.obj = null;
		this.find_linked_data(doc);
	}
	
	find_linked_data(doc) {
		var self = this;
		var nodes = this.doc('script[type="application/ld+json"]');
		nodes.each((i, node) => {
			try
			{
				var html = $(node).html()
				// newlines in side string literal cause parse errors. so get rid of all of them
				html = html.replace(/\s+/g, " ");
				var obj = JSON.parse(html);
				if (obj["@context"].startsWith("http://schema.org") && obj["@type"] == "Recipe") {
					self.obj = obj;
					return false;
				}
			}
			catch (e) {
				console.log(e);
			}
		});
	}
	
	static can_parse(html) {
		var parser = new this(html)
		return parser.obj != null;
	}
	
	parse_name() {
		return this.obj["name"];
	}
	
	parse_author() {
		if (typeof this.obj["author"] == "object") {
			if (this.obj["author"]["@type"] == "Person") {
				return this.obj["author"]["name"];
			}
		} else {
			return this.obj["author"];
		}
	}
	
	parse_cook_time() {
		return this.parse_duration(this.obj["cookTime"]);
	}
	
	parse_prep_time() {
		return this.parse_duration(this.obj["prepTime"]);
	}
	
	parse_total_time() {
		return this.parse_duration(this.obj["totalTime"]);
	}
	
	parse_description() {
		return this.obj["description"] || null;
	}
	
	parse_image_url() {
		switch (typeof this.obj["image"]) {
			case 'object':
				return this.obj["image"]["url"];
			case 'string':
				return this.obj["image"];
			default:
				return null;
		}
	}
	
	parse_nutrition() {
		if (this.obj["nutrition"]) {
			return this.obj["nutrition"];
		} else {
			return new Nutrition();
		}
		
	}
	
	parse_published_date() {
		return Date.parse(this.obj["datePublished"]);
	}
	
	parse_ingredients() {
		return this.obj["recipeIngredient"];
	}
	
	parse_instructions() {
		if (typeof this.obj["recipeInstructions"] == 'object') {
			var inst = "";
			for (var text of this.obj["recipeInstructions"]) {
				inst += text + "\n";
			}
			return inst;
		} else {
			return this.obj["recipeInstructions"]
		}
	}
	
	parse_yield() {
		return this.obj["recipeYield"];
	}
}