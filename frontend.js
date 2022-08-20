/*
 * This is where you can go absolutely wild with the frontend design
 * Author: Ronik Bhaskar
 */

const modelButtons = document.getElementById("models");
const textArea = document.getElementById("textArea");
const modelName = document.getElementById("modelName");
const numTokens = document.getElementById("numTokens");
const nameModelMap = new Map();

textArea.focus();

function genModelFromCorpus()
{
    const text = textArea.value.trim();

    if (text.length === 0)
        return;

    let name = modelName.value.trim();
    
    if (name.length === 0)
        name = "Model";

    if (nameModelMap.has(name))
        name = name + " 2";

    let digitsToRemove;
    for (let i = 3; nameModelMap.has(name); ++i)
    {
        digitsToRemove = (i-1).toString().length;
        name = name.slice(0, -digitsToRemove) + i;
    }
    
    const markov = new AssociationTable();
    const tokens = cleanText(text); 
    markov.train(tokens);
    markov.updateProbabilities();

    nameModelMap.set(name, markov);

    const modelButton = document.createElement("button");
    modelButton.classList.add("model-button");
    modelButton.innerText = name;
    modelButton.onclick = genModelButtonFunction(name);
    modelButtons.appendChild(modelButton);
}

function genModelButtonFunction(name)
{
    return function onModelButtonClick()
    {
        const len = modelButtons.children.length;
        for (let i = 0; i < len; ++i)
        {
            if (name === modelButtons.children[i].innerText)
            {
                modelButtons.children[i].classList.toggle("selected");
                break;
            }
        }
    }
}

function getSelectedModels()
{
    let selectedModels = [];
    const len = modelButtons.children.length;
    for (let i = 0; i < len; ++i)
    {
        /* innerText matches the key for a model. push that model */
        if (modelButtons.children[i].classList.contains("selected"))
            selectedModels.push(nameModelMap.get(modelButtons.children[i].innerText))
    }

    return selectedModels;
}

function genTextFromModels()
{
    const numOutput = Number(numTokens.value);

    if (numOutput === 0)
        return;

    const selectedModels = getSelectedModels();

    if (selectedModels.length === 0)
        return;

    let markov = new AssociationTable();

    selectedModels.forEach(model =>
    {
        markov = markov.combine(model);
    });

    markov.updateProbabilities();

    const output = markov.genText(numOutput);

    textArea.value = output;
}

function deleteModels()
{
    let names = [];
    let children = [];
    const len = modelButtons.children.length;
    for (let i = 0; i < len; ++i)
    {
        /* innerText matches the key for a model. push that model */
        if (modelButtons.children[i].classList.contains("selected"))
        {
            child = modelButtons.children[i];
            children.push(child);
            names.push(child.innerText);
        }
    }

    if (names.length === 0)
        return;

    children.forEach(child =>
    {
        modelButtons.removeChild(child);
    });

    names.forEach(name =>
    {
        nameModelMap.delete(name);
    });
}

function genJSONFromModels()
{
    const selectedModels = getSelectedModels();

    if (selectedModels.length === 0)
        return;

    let markov = new AssociationTable();

    selectedModels.forEach(model =>
    {
        markov = markov.combine(model);
    });

    textArea.value = markov.makeCopyable();

}

function genModelFromJSON()
{
    const text = textArea.value.trim();

    if (text.length === 0)
        return;

    let name = modelName.value.trim();
    
    if (name.length === 0)
        name = "Model";

    if (nameModelMap.has(name))
        name = name + " 2";

    let digitsToRemove;
    for (let i = 3; nameModelMap.has(name); ++i)
    {
        digitsToRemove = (i-1).toString().length;
        name = name.slice(0, -digitsToRemove) + i;
    }
    
    const markov = AssociationTable.fromCopyable(text);
    
    if (!markov)
        return;

    markov.updateProbabilities();

    nameModelMap.set(name, markov);

    const modelButton = document.createElement("button");
    modelButton.classList.add("model-button");
    modelButton.innerText = name;
    modelButton.onclick = genModelButtonFunction(name);
    modelButtons.appendChild(modelButton);
}

function createTags(input) {
    const tags = input.split(",").filter(tag => tag.trim() !== "").map(tag => tag.trim())
    
    tagsEl.innerHTML = ""

    tags.forEach(tag => {
        const tagEl = document.createElement("span")
        tagEl.classList.add("tag")
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
	
	if (randomTag !== undefined) {
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
	}
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll(".tag")
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add("highlight")
}

function unHighlightTag(tag) {
    tag.classList.remove("highlight")
}