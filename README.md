# Text Generation: Web

IMPORTANT: This repository functions more as a way for me to begin collaborating with others and give people a quick project if they want to try their hand at HTML, JS, and CSS. For a more useful version of my text generator, see: https://github.com/ronikbhaskar/markov_text_generation.

If you haven't already seen my text generator in action, let me know if you want a demo.

## Instructions for collaborators:

### To initialize the repository on your machine
1. Create a GitHub account if you don't already have one.
2. Send me your GitHub username.
3. Accept the invitation in your email to join this repository.
4. Open a terminal/command prompt.
5. Enter the following commands:

  - `git clone https://github.com/ronikbhaskar/text_gen_web/` to clone the repository
  - `cd text_gen_web` to enter the root directory
  - `git checkout -b [name of your branch]` replace [name of your branch] with something you can identify as yours, like your GitHub username
    - make sure there are no spaces in the name of your branch: ✅ ronik_is_the_best ❌ ronik is the best

6. In the file `frontend.js`, replace INSERT NAME HERE at the top of the file with your name and save
7. Enter the following commands in the terminal:
  - `git add .; git commit -m 'initial commit'; git push --set-upstream origin [name of your branch]` to create an online branch for your local branch to track

### To try out your web app
Navigate through your files, get to the folder called "text_gen_web", and double click on the file titled "index.html"
It should open in your default browser, but I recommend you copy-paste the url (starting with `file://...`) into Chrome for ease of use.

Enter some text into the field, select the number of tokens to output, and click the button. Voila! If you're using my example, the layout should look absolutely awful, and that's intentional. It shouldn't be too hard to make it look better than it does initially.

If you modify any code and want to test it out, just refresh the page.

### To modify the code
There are three files at your disposal: `index.html`, `style.css`, and `frontend.js`

 - `index.html` is where you can add, remove, and modify HTML elements, like buttons, inputs, headers (h1, h2, etc.), divs, links, etc.
   - I marked what you should modify and what you shouldn't, but you're free to change anything and everything.
 - `style.css` is where you can change the color, fonts, formatting, layout, and overall look of your HTML elements.
   - This is where you make everything look *~pretty~*.
 - `frontend.js` is where you can add basic functionality, like what to do when someone presses a button. 

Once you've made changes you are happy with, in your terminal/command prompt, navigate to the folder "text_gen_web" and enter the following:
 - `git add .`
 - `git commit -m 'commit message'`
 - `git push`

Let me know if you ever reach a point where you're done or you want to add functionality to show statistics about the text.

### To debug your code
Most of your changes will be visual, affecting the look of html elements on the page, in which case playing around with the page in your browser should be just fine, but sometimes you need to modify things you can't see, like margins. For those:
 - in Chrome, go to View->Developer->Inspect Elements. Here, you can hover over parts of the page and get information on the HTML element

When you want to see why your JavaScript isn't working as expected, you will want to go to the browser's console:
 - in Chrome, go to View->Developer->JavaScript Console, and you'll see any error messages that popped up, or any output statements from calls to  `console.log("log this string")`

### To make progress when you're stumped
Although HTML and CSS are quite clunky, they are also extensively convered in online resources and tutorials. If you're ever stuck, know that >50% of being a good developer is being good at using Google. If you run into an issue, Google it. If you don't know how to do something, Google it. If you get a bug you can't solve, Google it. More times than not, you will get an answer to your question.

 - get input text html js
 - change background color html css
 - grid layout html css
 - make text input bigger html css
 - make button work html js
 - add hyperlink html 
 - margins vs padding html css
 - [error message] html js 

The only question you can't google is "how to center a div." You'll never be able to.

---

⭐ from [Ronik Bhaskar](https://github.com/ronikbhaskar)
