## Inspiration
Modern lifestyles are increasingly restricting the amount of time people have for home food preparation and cooking, and this has had serious public health consequences. People are increasingly resorting to eating easy to prepare and highly-processed foods that contribute to malnutrition. We wanted to create an application that would make it easier for people to cook using ingredients that they already have on hand, so they aren't constantly make one-off ingredient purchases simply to follow a recipe. In addition to saving people time and money, this may also significantly reduce food wastage, a serious issue that contributes to landfill waste and greenhouse gas production.

Here, we introduce Pantry Pal. We hope that Pantry Pal can be used to help encourage users to cook healthy recipes with ingredients that they already have on hand, thus helping users save time, money and contribute towards improving their nutrition status and health.

## What it does
On the home page, Pantry Pal allows users to access their kitchen inventory in order to add, delete, and modify items. The home page also allows a user to select what type of what type of cuisine they would like to cook from among 8 different cuisine options, including Italian and Japanese, or a user can enter whatever type of cuisine or food they would like to cook (e.g., bread, cookies).

Once selected, the user can then select the amount of time that they have required to cook, ranging from 30 minutes to 3+ hours. When a user select specific ingredients from their inventory to use, the recipe generated will include and highlight these ingredients, in addition to using other ingredients from the user's inventory (e.g., if "beef" and "noodles" were selected, then the recipe response must include those). The "Surprise me" functionality will produce a random recipe based on the user's entire ingredient inventory. Overall, the generated recipe will respect the user's preferences with respect to cuisine/food type, amount of time available to cook, and specified ingredients.

By accessing their inventory using the "Inventory" button on the home page, the user may update the ingredients they have in their kitchen. The user simply needs to type in the name through a text field, and the update is easily done through the "Add Ingredient" and "Remove Ingredient" buttons. We have also added a functionality where the user can add the amount and the units for each ingredient. 

## How we built it
Pantry Pal was built using the React + Vite framework, due to its ease of usage and handling of styling and design. We also appreciated React's capabilities of handling development changes through live updates with the local server. We utilized HTML and CSS to adjust the aesthetics of our project components to our liking.

To ensure that our project accurately reflects what the user currently has within their fridge, we included MongoDB Atlas on AWS to allow user changes to be made to the pantry (I.e., add/deleting ingredients). 

Finally, the inclusion of Groq and its LLM API (followed by very specific prompting) will return back a recipe tailored to the users' current ingredient list, cuisine, and the amount of time they have available to cook.

## Challenges we ran into

1. React + Vite set-up - a big thank-you to our mentors for assisting us with this and giving us a comprehensive walkthrough on how to get it running properly 
2.  Connecting the front-end to the back-end - this was something completely new that some of our members hadn't done before, so incorporating MongoDB and having it successfully working to reflect user updates/changes was something that we were proud of.
3.  Groq wouldn't always print out the best responses - that also took a lot of tweaking the prompt.

## Accomplishments that we're proud of

1.   Being able to produce a working MVP! 
2.  Front-end to back-end connectivity (Thank you again, mentors!)
3.  Troubleshooting as a team to ensure that Groq prints out the recipe response that we want - we learnt that Groq requires very thorough instructions!
4.  Cultivating a supportive team culture (Open communication is integral, especially in team-based projects like a hackathon)
5.  Worked through Git pushes and pulls with no merge conflicts!

## What we learned

1.   React + Vite
2.  Back-end connectivity to the front-end (Using MongoDB)
3.  Effective communication skills to convey project goals, tasks and milestones
4.  Using a combination of Google, Generative AI and Stack Overflow to assist 
...And much more!     

## What's next for Pantry Pal

1.  Introduce a user database so different users can use our web application
2.  Modify Groq to introduce storage and "saving" of previous recipes so that they don't replicate all the time
3.  With multiple users, include a social network where users can befriend others, view photos of each others' creations/recipes and share recipes that their friends would like (Another mini-Facebook)
4.  Further user + recipe tailoring (Food allergies, ingredient/cuisine preferences) 
5.  Image recognition (Either by taking a photo of the receipt OR a photo of all groceries, then add the designated identifiable ingredients into the Inventory)