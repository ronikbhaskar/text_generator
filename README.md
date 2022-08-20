# Text Generation: Web

To see the original text generator written in Python, go here: https://github.com/ronikbhaskar/markov_text_generation 

It has far more formatting functionality and offers greater control to the user.

Originally, this project was to enable beginners to build interesting, first web apps. That phase of the project seems to be over, but I've gotten requests and interest from artists to have increased functionality within the app. Since they don't know Python, this website is the only way they have access to my technology. As a result, I've decided to take on my own challenge, building a powerful, easy-to-use web app that gives users access to the many features available in `markov.js`. 

Design Plan:
There is one, central window for text entry and text output. Above the window will be a text input for naming models. Next to that will be a number input for the number of tokens to generate. Above that text input will be 5 buttons: "Generate Model from Corpus",  "Generate Model from JSON", "Generate Text", "Generate Model JSON", and "Delete Model". Below the window will be a dynamic list of buttons corresponding to the generated models. Clicking a button will select that model for whichever action you choose. You can select as many models as you want to do any given task that requires model selection. If no models are selected for an action that requires models to be selected, nothing happens. If you are trying to generate a model from JSON that doesn't parse, nothing happens. Any text in the window will be overwritten if the action generates text. There is no undo to any of this. Seems harsh, I know, but it keeps it simple. 

```
            (Generate Model from Corpus)   (Generate Text)            (Delete Model(s))
            (Generate Model from JSON)     (Generate Model(s) JSON) 
            __________________________________________________________________  _______
            |Model Name...___________________________________________________|  |Num__|
            ___________________________________________________________________________
            |Add text or model JSON...                                                |
            |                                                                         |
            |                                                                         |
            |                                                                         |
            |                                                                         |
            |                                                                         |
            |                                                                         |
            |_________________________________________________________________________|
            (My Homework) (The Art of War) (Chat History) (HIMYM) 
            (Wikipedia Page on the Troubadour)
```

---

⭐ from [Ronik Bhaskar](https://github.com/ronikbhaskar)
