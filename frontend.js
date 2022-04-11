/*
 * This is where you can go absolutely wild with the frontend design
 * Author: Jon
 */

/* Example code (it works as is, but it's boring to look at) */
const myInputWindow = document.getElementById("myInputWindow");
const myOutput = document.getElementById("myOutput");
const myNumInput = document.getElementById("myNumInput");

const myButton = document.getElementById("myButton");
function onMyButtonClick() 
{
    /* reads in text and generates output*/
    const text = myInputWindow.value.trim();
    if (text.length === 0)
    {
        console.log("ERROR: no input text");
        return;
    }
    const markov = new AssociationTable();
    const tokens = cleanText(text); 
    markov.train(tokens);
    markov.updateProbabilities();
    const numOutput = Number(myNumInput.value);
    const output = markov.genText(numOutput);

    /* sets output */
    myOutput.innerText = output;
}
myButton.addEventListener("click", onMyButtonClick);
/* end example code */