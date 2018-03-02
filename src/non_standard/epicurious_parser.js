import { SchemaOrgRecipeParser }  from "../schema_org_recipe_parser";
import $ from "cheerio";

export class EpicuriousParser extends SchemaOrgRecipeParser {
	static can_parse(html) {
		return this.matches_domain(html, 'epicurious.com');
	}
	
	// parse_ingredients() {
	// 	var node = this.recipe_node.find('.ingredients');
	// 	return $(node).map(v => $(v).text());
	// }
	
	// parse_instructions() {
	// 	var node = this.node_with_itemprop("recipeInstructions");
	// 	var greds = $(node.find(">p")).map(v => $(v).text()).toArray().join("\n");
	// 	return greds
	// }
}