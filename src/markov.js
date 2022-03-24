/*
 * markov.js
 *
 * A markov chain for generating text built from scratch.
 * Original project written in Python. This is a translation to JS.
 * 
 * This model uses 1-hot encodings of 2-grams to 
 * probabilistically generate the next token given 
 * the current token.
 * 
 * example code:
 * corpus = "..."
 * const markov = new AssociationTable();
 * const tokens = tokenize(corpus); // cleanText(corpus)
 * markov.train(tokens);
 * markov.updateProbabilities();
 * const output = markov.genText(123); // any pos int
 * end example code
 * 
 * For each 2-gram of tokens, the AssociationTable object
 * creates a new AssociationEntry, with the first token
 * being correlated to the AssociationEntry, and the second
 * token correlated with a ListEntry in the AssociationEntry.
 * 
 * To generate text, the AssociationTable starts with the first
 * key, checks its AssociationEntry, and probabilistically generates
 * a next word, which becomes the new key, and the process repeats.
 * Every token is concatenated (with formatting), and the output string
 * is returned after we reach the maximum number of tokens, or we
 * reach a node without outward edges (since this really is just
 * a big state machine as a weighted, directed graph).
 * 
 * The approach is quite naive, given that there is no analysis
 * of parts of speech, overall corpus structure, contractions, etc.
 * The intention was never to analyze these things, but instead
 * use this as a proof of concept. This is more of a toy than an
 * NLP analysis module. Regardless, it proves as a fantastic 
 * tool for learning the fundamentals of NLP, and almost anyone
 * can understand the approach. Future projects may trade accessibility
 * for functionality and efficiency.
 * 
 * Author: Ronik Bhaskar
 */

/* single entry in AssociationEntry */
class ListEntry 
{
    #word;
    #frequency;
    #probability;

    /* ListEntry
     *
     * #word - word, identifying token
     * #frequency - number of occurrences
     * #probability - probability of proceeding relevant token
     */
    constructor(word) 
    {
        this.#word = word;
        this.#frequency = 1;
        this.#probability = 0;
    }

    /* inc - increases frequency by 1 */
    inc() 
    {
        this.#frequency += 1;
    }

    /* dec - decreases frequency by 1
     * shouldn't have to be used
     */
    dec() 
    {
        this.#frequency -= 1;
    }

    /* updateProbability - updates probability field
     * 
     * totalOccur - total occurrences of preceeding token
     * 
     * Returns: nothing
     */
    updateProbability(totalOccur) 
    {
        if (!totalOccur) 
        {
            console.log("ERROR: updateProbability: totalOccur is 0");
            this.#probability = 0;
        }
        else
        {
            this.#probability = this.#frequency / totalOccur;
        }

    }

    /* isWord - compares string to #word
     *
     * otherWord - string (token) for comparison
     * 
     * Returns: bool, true if otherWord = #word
     */
    isWord(otherWord) 
    {
        return this.#word === otherWord
    }

    /* returns #word */
    getWord() 
    {
        return this.#word;
    }

    /* returns #probability */
    getProbability() 
    {
        return this.#probability;
    }
}

/* manages single entry in markov table */
class AssociationEntry
{
    #word;
    #numOccur;
    #assocMap;
    #recalculatedPossibilities;

    /* AssociationEntry
     *
     * #word - token associated with entry
     *  - passed as word
     *  - nextWord is token that follows immediately after
     * #numOccur - number of times this token shows up in corpus
     * #assocMap - Map(<string>,<ListEntry>)
     * #recalculatedPossibilities - boolean
     */
    constructor(word, nextWord)
    {
        this.#word = word;
        this.#numOccur = 1;
        this.#recalculatedPossibilities = false;
        this.#assocMap = new Map();
        this.#assocMap.set(nextWord, new ListEntry(nextWord))
    }

    /* addWord - updates relevant entry in assocMap
     * - creates new entry if one doesn't exist
     *
     * word - string (token) to be added to/updated in map
     *
     * Returns: nothing
     */
    addWord(word)
    {
        this.#numOccur += 1;

        if (this.#assocMap.has(word))
        {
            const listEntry = this.#assocMap.get(word);
            listEntry.inc();
            this.#assocMap.set(word, listEntry);
        }
        else
            this.#assocMap.set(word, new ListEntry(word))

        this.#recalculatedPossibilities = false;
    }

    /* updateProbabilities - loops through map and updates probs
     *
     * Returns: nothing
     */
    updateProbabilities()
    {
        if (this.#recalculatedPossibilities)
            return;
        
        this.#assocMap.forEach((listEntry, word) => 
        {
            listEntry.updateProbability(this.#numOccur);
            this.#assocMap.set(word, listEntry);
        });

        this.#recalculatedPossibilities = true;
    }

    /* nextWord - probabilistic method to generate next token
     *
     * Returns: nothing
     */
    nextWord()
    {
        if (!this.#recalculatedPossibilities)
            console.log("ERROR: nextWord: probabilities not recalc'd");

        let randomNum = Math.random();
        let foundWord = false;
        let nextWord;

        this.#assocMap.forEach((listEntry, word) =>
        {
            if (foundWord)
                return;

            let prob = listEntry.getProbability();

            if (prob > randomNum)
            {
                foundWord = true;
                nextWord = word;
                return;
            }
            randomNum -= prob;
        });

        if (foundWord)
            return nextWord;

        console.log("ERROR: unable to generate random word");
        return null;
    }

}

/* manages markov model variables */
class AssociationTable
{
    #table;
    #recalculatedProbabilities;
    #wordsAnalyzed;

    /* AssociationTable 
     *
     * #table - Map(<string>, <AssociationEntry>)
     * #recalculatedProbabilities - boolean
     * #wordsAnalyzed - integer number of (nonunique) tokens analyzed
     */
    constructor()
    {
        this.#table = new Map();
        this.#recalculatedProbabilities = false;
        this.#wordsAnalyzed = 0;
    }

    /* addWord - adds word to table or updates word if possible
     *
     * word - token being added to table
     * 
     * nextWord - token that follows word
     * 
     * Returns: nothing
     */
    addWord(word, nextWord)
    {
        this.#wordsAnalyzed += 1;

        if (this.#table.has(word))
        {
            const assocEntry = this.#table.get(word);
            assocEntry.addWord(nextWord);
            this.#table.set(word, assocEntry);
        }
        else
            this.#table.set(word, new AssociationEntry(word, nextWord));

        this.#recalculatedProbabilities = false;
    }

    /* updateProbabilities - loops through table to update probs
     * - also updates #recalculatedProbabilities to true
     *
     * Returns: nothing
     */
    updateProbabilities()
    {
        if (this.#recalculatedProbabilities)
            return;

        this.#table.forEach((assocEntry, word) =>
        {
            assocEntry.updateProbabilities();
            this.#table.set(word, assocEntry);
        });

        this.#recalculatedProbabilities = true;
    }

    /* train - trains Markov chain on array of tokens
     *
     * tokens - array of tokens in order
     * 
     * Returns: nothing
     */
    train(tokens)
    {
        const len = tokens.length;
        if (!len)
            console.log("ERROR: length of tokens is 0");
        
        for (let i = 1; i < len; ++i)
            this.addWord(tokens[i - 1], tokens[i]);

        this.addWord(tokens[len - 1], tokens[0]);
    }

    /* capitalize - capitalizes first char of string if possible
     *
     * word - string to capitalize
     * 
     * Returns: word if not capitalizable, else capitalized Word 
     */
    static capitalize(word)
    {
        if (!word.length)
            return word;

        const firstChar = word.charAt(0);
        if (firstChar.toLowerCase() != firstChar.toUpperCase()) 
        {
            return firstChar.toUpperCase() + word.slice(1);
        }
        else
            return word;
    }

    /* genText - uses probabilistic method to generate string of text
     *
     * numTokens - integer max number of tokens
     * 
     * Returns: formatted string concatenation of tokens
     */
    genText(numTokens)
    {
        if (!this.#recalculatedProbabilities)
            console.log("ERROR: generating text w/o updating probs");
        let [prevWord] = this.#table.keys();
        let out = AssociationTable.capitalize(prevWord);
        let assocEntry;
        let nextWord;
        let wasPeriod = prevWord === ".";

        for (let i = 0; i < numTokens; ++i)
        {
            assocEntry = this.#table.get(prevWord);
            if (assocEntry === undefined)
                break;
            
            nextWord = assocEntry.nextWord();

            if (nextWord === null)
                break;

            if (!(nextWord === "." || nextWord === ","))
                out += " ";
            
            if (wasPeriod)
                out += AssociationTable.capitalize(nextWord);
            else
                out += nextWord;

            prevWord = nextWord;
            wasPeriod = prevWord === ".";
        }

        return out;
    }
}

/* cleanText - prepares text for training
 *
 * text - string to be prepared
 * 
 * Returns: array of strings (tokens)
 */
function cleanText(text)
{
    /* end of sentence punctuation */
    text = text.replace(/[\.\?!;]+/g, " . ");
    /* end of phrase punctuation */
    text = text.replace(/--|[,:()]+/g, " , ");
    /* get rid of quotes */
    text = text.replace(/\"/g, "");
    text = text.replace(/( \')|(\' )/g, "");
    /* lowercase */
    text = text.toLowerCase();
    /* remove excess spaces */
    text = text.replace(/[ \t\n]+/g, " ");
    /* capitalization of I */
    text = text.replace(/ i /g, " I ");
    text = text.replace(/ i\'/g, " I\'");

    /* make array */
    let textList = text.split(" ");
    textList = textList.filter(word => word.length > 0);
    return textList;
}