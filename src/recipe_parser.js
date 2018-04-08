import $ from "cheerio";
import { Recipe, Nutrition } from "./recipe";
import { Attributes } from "./attributes";
import * as _ from "async";
import { CanonicalUrlParser } from "./canonical_url_parser";
import * as Duration from "iso8601-duration";

export class RecipeParser {
	constructor(doc) {
		this.doc = doc;
		this.recipe = new Recipe();
	}
	
	static can_parse(doc) {
		var parser = new this(doc);
		return parser.recipe_node.length > 0;
	}
	
	static matches_domain(doc, domain) {
		var parser = new CanonicalUrlParser(doc);
		return parser.canonical_domain == domain;
	}
	
	parse() {
		var self = this;
		
		return new Promise((resp, rej) => {
			_.each(Attributes.RECIPE_ATTRIBUTES, (attr, next) => {
				var val = self[`parse_${attr}`]();
				self.recipe[attr] = val;
				next();
			}, (err) => {
				if (err)
					return rej(err);
				
				return resp(self.recipe);
			});
		});
	}
	
	parse_canonical_url() {
		var parser = new CanonicalUrlParser(this.doc);
		return parser.canonical_url;
	}
	
	parse_duration(iso8601_string) {
		if (!iso8601_string || iso8601_string == "") return null;
		var duration = Duration.parse(iso8601_string)
		return Duration.toSeconds(duration) / 60;
	}
}
