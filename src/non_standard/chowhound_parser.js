import { SchemaOrgRecipeParser }  from "../schema_org_recipe_parser";
import $ from "cheerio";

export class ChowhoundParser extends SchemaOrgRecipeParser {
	static can_parse(html) {
		return this.matches_domain(html, 'chowhound.com');
	}
	
	parse_name() {
		var node = this.recipe_node.find(".frajax_recipe_head [itemprop = \"name\"]").first();
		var content = $(node).text();
		return content ? content : null;
	}
}