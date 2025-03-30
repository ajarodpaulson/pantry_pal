# Pantry Pal's Brief Introduction

This tool helps the user to receive AI recommendations for recipes based on available time to cook and ingredients.

## Inspiration
Cooking, as enjoyable as it is, is something that can be a cumbersome and time-consuming task. And often, we don't want to go out of our way to buy extra ingredients to prepare a meal. Thus, we were inspired to create a web-based application to make cooking much more seamless and stress-free (and, of course, contribute to less food waste).

Here, we introduce Pantry Pal. We hope that Pantry Pal can be used to help encourage users to cook healthy recipes with ingredients that they already have on hand, thus helping users save time, money and develop better eating habits.

## What it does
To start, Pantry Pal asks what type of cuisine they would like to cook today (There are 9 possible cuisine options, with the last being one of their choosing).

Once selected, the user can then select the amount of time that they have required to cook, ranging from 30 minutes to 3+ hours. There are designated ingredients listed right underneath that the user can check off, indicating that those selected are the ones to be used in the recipe (I.e., if "beef" and "noodles" were selected, then the recipe response must include those). The "Surprise me" functionality will note all of the users' current ingredient list found in their inventory, and conjure up a new recipe for them to try. 

Additionally, the "Inventory" button also allows the user to update their current ingredients found within their pantry. The user simply needs to type in the name through a text field, and the update is easily done through the "Add Ingredient" and "Remove Ingredient" buttons. We have also added a functionality where the user can add the amount and the units for each ingredient. 

Finally, once all ingredients are selected, a recipe will be generated for the user, tailored specifically to their preferences listed above (Cuisine type, amount of time to be allocated for cooking task, and ingredients).

For Step-by-Step procedures:

- Choose a regional cusine category.
- Manage your ingredients inventory.
- Choose your preferred cooking time.
- Select ingredients you want to use.
- Recieve an AI-recommended recipe with instructions using ingredients you have.
- Choose "Surprise me" and have AI recommend you a random recipe with ingredients you have!

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
