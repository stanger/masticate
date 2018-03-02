import { SchemaOrgRecipeParser }  from "../schema_org_recipe_parser";

export class FoodNetworkParser extends SchemaOrgRecipeParser {
	
	static can_parse(html) {
		return this.matches_domain(html, 'foodnetwork.com');
	}
	
	parse_instructions() {
		var nodes = this.node_with_itemprop("recipeInstructions").find("p");
		return $(nodes).toArray().map(v => v.text()).join("\n");
	}
}