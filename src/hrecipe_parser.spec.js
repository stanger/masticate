import { Masticate } from "./index";
import { HRecipeParser }  from "./hrecipe_parser";
import $ from "cheerio";

const expect = require("chai").expect;

const html = 
"<!DOCTYPE html>" +
"<html>" +
"<body>" +
"<div class=\"hrecipe\">" +
"    <h1 class=\"fn\">Pommes Frites</h1>" +
"    <p class=\"summary\">" +
"        Pommes frites originate in outer space. They are served hot.<br />" +
"        This recipe is only an example. Don't try this at home!" +
"    </p>" +
"    <p>" +
"        Contributed by <span class=\"author\">CJ Tom</span> and the" +
"        <span class=\"author vcard\"><a class=\"url fn\" href=\"http://example.com\">Cooky Gang</a></span>." +
"    </p>" +
"     <p>Published <span class=\"published\"><span class=\"value-title\" title=\"2008-10-14T10:05:37-01:00\"> </span>14. Oct 2008</span></p>" +
"    <img src=\"/img/pommes.png\" class=\"photo\" width=\"100\" height=\"100\" alt=\"Pommes Frites\"/>" +
"    <h2>Ingredients</h2>" +
"    <ul>" +
"        <li class=\"ingredient\">" +
"            <span class=\"value\">500</span> " +
"            <span class=\"type\">gramme</span> potatoes, hard cooking." +
"        </li>" +
"        <li class=\"ingredient\">" +
"            <span class=\"value\">1</span> <span class=\"type\">spoonful</span> of salt" +
"        </li>" +
"        <li>" +
"            You may want to provide some " +
"            <span class=\"ingredient\">Ketchup and Mayonnaise</span>" +
"            as well." +
"        </li>" +
"    </ul>" +
"    <h2>Instructions</h2>" +
"    <ul class=\"instructions\">" +
"        <li>First wash the potatoes.</li>" +
"        <li>Then slice and dice them and put them in boiling fat.</li>" +
"        <li>After a few minutes take them out again.</li>" +
"    </ul>" +
"    <h2>Further details</h2>" +
"    <p>Enough for <span class=\"yield\">12 children</span>.</p>" +
"    <p>Preparation time is approximately " +
"        <span class=\"duration\"><span class=\"value-title\" title=\"PT1H30M\"> </span>90 min</span>" +
"    </p>" +
"    <p>Add <span  class=\"duration\"><span class=\"value-title\" title=\"PT30M\"></span>half an hour</span> to prepare your homemade Ketchup.</p>" +
"    <p>This recipe is <a href=\"http://www.example.com/tags/difficulty/easy\" rel=\"tag\">easy</a> and <a href=\"http://www.example.com/tags/tastyness/delicious\" rel=\"tag\">delicious</a>.</p>" +
"    <p>" +
"        <span class=\"nutrition\">" +
"        Pommes Frites have more than " +
"        <span class=\"value\">1000</span> " +
"        <span class=\"type\">Joule</span>" +
"        Energy</span>, " +
"        while Ketchup and Mayonnaise have " +
"        <span class=\"nutrition\">0 vitamins</span>." +
"    </p>" +
"</div>" +
"</body>" +
"</html>"
;
			
describe("HRecipeParser", () => {
	describe("With no content", () => {
		it("sets all values to null", async () => {
			var parser = new HRecipeParser($.load(""));
			var rec = await parser.parse();
			
			expect(rec.canonical_url).to.equal(null);
			expect(rec.cook_time).to.equal(null);
			expect(rec.description).to.equal(null);
			expect(rec.image_url).to.equal(null);
			expect(rec.ingredients).to.be.a("Array");
			expect(rec.ingredients.length).to.equal(0);
			expect(rec.instructions).to.equal(null);
			expect(rec.name).to.equal(null);
			expect(rec.prep_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.total_time).to.equal(null);
			expect(rec.yield).to.equal(null);
		});
	});
	
	describe("With valid document", () => {
		it("Sets all values", async () => {
			var rec = await Masticate.parse(html);
			
			expect(rec.author).to.equal("CJ Tom");
			expect(rec.total_time).to.equal(90);
			expect(rec.description).to.equal("Pommes frites originate in outer space. They are served hot. This recipe is only an example. Don't try this at home!");
			expect(rec.image_url).to.equal("/img/pommes.png");
			expect(rec.ingredients.length).to.equal(3);
			var expected = ["500 gramme potatoes, hard cooking.", "1 spoonful of salt", "Ketchup and Mayonnaise"];
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
			
			expect(rec.instructions).to.equal("First wash the potatoes. Then slice and dice them and put them in boiling fat. After a few minutes take them out again.");
			expect(rec.name).to.equal("Pommes Frites");
			expect(rec.prep_time).to.equal(null);
			expect(rec.cook_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.yield).to.equal("12 children");
			
		});
	});
});