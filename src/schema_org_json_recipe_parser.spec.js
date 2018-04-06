import { Masticate } from "./index"

const fs = require("fs");

const expect = require("chai").expect;

describe("Schema.org JSON Parser", () => {
	it("sets all values", async () => {
		fs.readFile("test/fixtures/geniuskitchen.html", async (err, html) => {
			var rec = await Masticate.parse(html);
			
			expect(rec.name).to.equal("Almond Fudge Banana Cake");
			expect(rec.author).to.equal("CoolMonday");
			expect(rec.description).to.equal("Make and share this Almond Fudge Banana Cake recipe from Food.com.");
			expect(rec.image_url).to.equal("https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/14/2/picZy4Zce.jpg");
			var expected = [
				"3    DOLE&reg; Banana, peeled (extra-ripe medium)",
				"1 1/2 cups  sugar",
				"1/2 cup  margarine, softened",
				"3    eggs",
				"3  tablespoons   amaretto liqueur or 1/2-1  teaspoon  almond extract",
				"1  teaspoon  vanilla extract",
				"1 1/3 cups  all-purpose flour",
				"1/3 cup  unsweetened cocoa powder",
				"1  teaspoon  baking soda",
				"1/2 teaspoon  salt",
				"1/2 cup  Dole Almond, chopped, toasted & ground"
			];
			
			expect(rec.ingredients.length).to.equal(expected.length);
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
			
			expect(rec.instructions).to.equal("Mash bananas and set aside. Beat sugar and margarine until light and fluffy. Beat in eggs, liqueur and vanilla. Combine dry ingredients. Stir in almonds. Add to sugar mixture alternately with bananas. Beat well. Pour batter into greased 10-inch Bundt pan. Bake in preheated 350&deg;F oven 45 to 50 minutes or until toothpick inserted in center comes out almost clean and cake pulls away from side of pan. Cool 10 minutes. Remove cake from pan to wire rack to cool completely. Drizzle glaze over top and down side of cake. Make 16-20 servings.");
			
			expect(rec.cook_time).to.equal(60);
			expect(rec.prep_time).to.equal(50);
			expect(rec.total_time).to.equal(110);
			expect(rec.published_date).to.equal(Date.parse("August 20, 1999"));
			expect(rec.yield).to.equal('16-20 serving(s)');
		
		});
		fs.readFile("test/fixtures/foodnetwork.html", async (err, html) => {
			var rec = await Masticate.parse(html);
			
			expect(rec.name).to.equal("Charred Ahi Tuna with Sun-dried Tomato Tapenade and Farrotto Salad");
			expect(rec.author).to.equal("Food Network");
			expect(rec.description).to.equal(null);
			expect(rec.image_url).to.equal("http://food.fnr.sndimg.com/content/dam/images/food/editorial/homepage/fn-feature.jpg.rend.hgtvcom.406.229.suffix/1474463768097.jpeg");
			var expected = [
				"4 (8 ounce) pieces fresh ahi tuna, bloodline removed",
				"4 tablespoons olive oil",
				"Salt and pepper",
				"Sun-dried Tomato Tapenade, recipe follows",
				"Lemon wedges, as an accompaniment",
				"Farrotto Salad, recipe follows",
				"1 cup marinated sun-dried tomatoes",
				"1 cup pitted green olives",
				"2 lemons, zested and juiced",
				"1/2 cup olive oil",
				"2 tablespoons minced garlic",
				"2 tablespoons capers",
				"2 tablespoons chopped fresh parsley",
				"2 tablespoons chopped fresh basil",
				"1/2 cup grated Parmesan, Romano or Asiago",
				"1/2 teaspoon fresh ground black pepper",
				"1/2 medium yellow onion, diced",
				"2 tablespoons minced garlic",
				"2 tablespoons olive oil",
				"1 tablespoon butter",
				"1 cup faro",
				"2 cups water",
				"1/2 cup crumbled feta",
				"4 Roma tomatoes, seeded and chopped",
				"1/2 cup chopped parsley",
				"Salt and pepper"
			];
			expect(rec.ingredients.length).to.equal(expected.length);
			for (var i = 0; i >rec.ingredients.length; i++) {
				expect(rec.ingredients[i]).to.equal([expected[i]]);
			}
		
			expect(rec.instructions).to.equal(
				"In a cast iron skillet, on high heat or over a charcoal grill, cook the tuna steaks on each side for just 2 to 3 minutes, keeping the fish on the rare side of medium rare. Spread 2 tablespoons of artichoke tapenade on the fish after turning them over the first time.\n" +
				"Serve with lemon wedges and Faro Salad\n" +
				"In a food processor, puree all the ingredients together. Set aside. (This also makes a great crostini topping.)\n" +
				"In a heavy-bottomed saucepan on medium heat, sweat the onions and garlic in the oil and butter until translucent, about 5 minutes. Add the faro and saute for 1 minute more, so that each grain is coated with oil. Add the water and bring to a boil. Lower the heat to a simmer and cover for 35 to 40 minutes, or until liquid is absorbed and faro is cooked. Turn off heat and let the faro rest covered for another 10 minutes. Stir in cheese, tomatoes and parsley. Season, to taste."
							);
			expect(rec.cook_time).to.equal(45);
			expect(rec.prep_time).to.equal(40);
			expect(rec.total_time).to.equal(95);
			expect(rec.published_date).to.equal(Date.parse("2016-12-09T23:30:40.382-05:00"));
			expect(rec.yield).to.equal('4 servings');
		});
	});
});