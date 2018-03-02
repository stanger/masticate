import { Masticate } from "../index"

const fs = require("fs");

const expect = require("chai").expect;

describe("Epicurious Parser", () => {
	it("sets all values", async () => {
		fs.readFile("test/fixtures/epicurious.html", async (err, html) => {
			var rec = await Masticate.parse(html);
		
			expect(rec.name).to.equal("Chickpea Pancakes with Leeks, Squash, and Yogurt");
			expect(rec.author).to.equal("Alison Roman");
			expect(rec.cook_time).to.equal(null);
			expect(rec.description).to.equal("Weekday pancakes sound like a stretch? Make the batter Sunday evening and start the week strong.");
			expect(rec.image_url).to.equal("https://assets.epicurious.com/photos/54b71f83ac90eb2c34cfbdf0/master/pass/51260630_chickpea-pancakes_1x1.jpg");
			var expected = [
				"6 tablespoons olive oil, divided",
				"1 medium leek, white and pale-green parts only, chopped",
				"1/2 teaspoon kosher salt, plus more",
				"Freshly ground black pepper",
				"1 cup grated peeled squash (such as butternut or kabocha)",
				"1 large egg",
				"3/4 cup chickpea flour",
				"1/4 teaspoon baking powder",
				"1/2 cup plain yogurt",
				"1/4 cup coarsely chopped fresh parsley",
				"Flaky sea salt (such as Maldon)"
			];
			expect(rec.ingredients.length).to.equal(expected.length);
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
		
			expect(rec.instructions).to.equal(
				"Preparation Heat 2 tablespoons oil in a large skillet, preferably nonstick, over medium-high.\n"+
				"Add leek, season with kosher salt and pepper, and cook, stirring occasionally, until leek is softened and starting to brown, about 4 minutes. Add squash and season again. Cook, stirring often, until squash is cooked through and softened, about 4 minutes. Transfer vegetables to a plate and let cool.\n"+
				"Wipe out skillet and reserve.\n"+
				"Meanwhile, whisk egg, chickpea flour, baking powder, 1 tablespoon oil, 1/2 teaspoon kosher salt, and 1/2 cup water in a medium bowl; season with pepper and let sit 5 minutes for flour to hydrate. Stir vegetables into batter just to coat.\n"+
				"Heat 1 1/2 tablespoons oil in reserved skillet over medium-high. Add batter by the 1/4-cupful to make 4 pancakes, gently flattening to about 1/4\" thick. Batter should spread easily—if it doesn't, thin with a little water. Cook until bottoms are lightly browned and bubbles form on top, about 4 minutes. Use a spatula to carefully flip pancakes over and cook until browned and cooked through, about 2 minutes longer. Transfer to a plate and tent with a sheet of foil to keep warm. Repeat with another 1 1/2 tablespoons oil and remaining batter. Serve pancakes topped with yogurt, parsley, sea salt, and pepper.\n"+
				"Do ahead: Leek and squash can be cooked 2 days ahead; cover and chill. Batter can be made 1 day ahead; cover and chill."
			);
			expect(rec.prep_time).to.equal(null);
			expect(rec.published_date).to.equal(null);
			expect(rec.yield).to.equal('4 servings');
		});
	});
});