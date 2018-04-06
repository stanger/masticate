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
				var obj = JSON.parse($(node).html());
				if (obj["@context"] == "http://schema.org" && obj["@type"] == "Recipe") {
					self.obj = obj;
					return false;
				}
			}
			catch (e) {
				
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
		return this.obj["author"];
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
		return null;
	}
	
	parse_image_url() {
		return this.obj["image"]["url"];
	}
	
	parse_nutrition() {
		// TODO
		return new Nutrition();
	}
	
	parse_published_date() {
		return Date.parse(this.obj["datePublished"]);
	}
	
	parse_ingredients() {
		return this.obj["recipeIngredient"];
	}
	
	parse_instructions() {
		var inst = "";
		for (var text of this.obj["recipeInstructions"]) {
			inst += text + "\n";
		}
		return inst;
	}
	
	parse_yield() {
		return this.obj["recipeYield"];
	}
}