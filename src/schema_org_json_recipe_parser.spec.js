import { Masticate } from "./index"

const fs = require("fs");

const expect = require("chai").expect;

describe("Schema.org JSON Parser", () => {
	describe("geniuskitche.html", () => {
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
		});
	});
	describe("foodnetwork.html", () => {
		it("sets all values", async () => {
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
	describe("thespriceeats.html", () => {
		it("sets all values", async () => {
			fs.readFile("test/fixtures/thespruceeats.html", async (err, html) => {
				var rec = await Masticate.parse(html);
			
				expect(rec.name).to.equal("Spring Leek Frittata");
				expect(rec.author).to.equal("Molly Watson");
				expect(rec.description).to.equal("Create an amazingly fresh and green frittata filled with spring herbs and tender leeks with this simple recipe.");
				expect(rec.image_url).to.equal(undefined);
				var expected = [
					'2 small <a href="https://www.thespruceeats.com/all-about-leeks-4122305">leeks</a>',
					'2 tablespoons butter',
					'1 teaspoon fine sea salt (divided)',
					'1 large potato',
					'8 <a href="https://www.thespruceeats.com/types-of-eggs-2216257">eggs</a>',
					'1/2 cup chopped spring herbs (a mix of mint, dill, and parsley is particularly tasty)'
				];
			
				expect(rec.ingredients.length).to.equal(expected.length);
				for (var i = 0; i >rec.ingredients.length; i++) {
					expect(rec.ingredients[i]).to.equal([expected[i]]);
				}
			
				expect(rec.instructions).to.equal("&lt;p&gt;Trim the leeks, cut them in half lengthwise, and thinly slice. Go ahead and use the darker green parts as long as they aren&amp;#39;t dried out. Put the leeks in a colander and rinse under cold running water to remove any dirt or grit.&lt;/p&gt; &lt;p&gt;In a large frying pan over medium heat, melt the butter. Add the leeks, including any water clinging to them, and add 1/2 teaspoon of the salt. Cook, covered, stirring now and again, until the leeks are very tender, 20 to 30 minutes.&lt;/p&gt; &lt;p&gt;Meanwhile, peel and grate the potato into a medium saucepan, cover with water and the remaining 1/2 teaspoon salt. Bring to a boil over high heat. Adjust the heat to maintain a steady simmer and cook until the potato is just tender, about 5 minutes. Drain and rinse with cold water to cool off. Working in a small handful at a time, squeeze the potato dry. &lt;/p&gt; &lt;p&gt;Put the eggs in a large bowl and whisk until completely blended. Add the potatoes, leeks, and herbs. Stir to combine.&lt;/p&gt; &lt;p&gt;Heat an oven-safe 10-inch frying pan over medium-high heat. Coat with spray oil. Pour in the frittata mixture, using a spoon or spatula to even out the top. Cook for a few minutes until the edges are set. Reduce the heat to low and cook until the frittata is set except just in the center.&lt;/p&gt; &lt;p&gt;Heat a &lt;a href=&quot;https://www.thespruceeats.com/a-crash-course-guide-to-using-your-broiler-4157844&quot; data-component=&quot;link&quot; data-source=&quot;inlineLink&quot; data-type=&quot;internalLink&quot; data-ordinal=&quot;1&quot;&gt;broiler&lt;/a&gt; and slip the pan under it. Cook until the top of the frittata is set and starting to brown.&lt;/p&gt; &lt;p&gt;Turn the frittata out onto a serving platter. Let cool slightly, slice, and serve warm or at room temperature (leftovers are pretty darn good cold, too!).&lt;/p&gt;");
			
				expect(rec.cook_time).to.equal(45);
				expect(rec.prep_time).to.equal(10);
				expect(rec.total_time).to.equal(55);
				expect(rec.published_date).to.equal(1489599563134);
				expect(rec.yield).to.equal('Makes 6 servings');
			});
		})
	});
	
	describe("yummly.html", async () => {
		it("sets all values", async () => {
		
			fs.readFile("test/fixtures/yummly.html", async (err, html) => {
				var rec = await Masticate.parse(html);
			
				expect(rec.name).to.equal("1 2 3 Cake");
				expect(rec.author).to.equal("As receitas lá de casa");
			});
		});
	})

});