import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function GuessList({list})
{
  return(
    <ul>
      {list.map((element) => (
        <div className="label-style">
          
          <div>
            <p>{element.name}</p>
            <img src={element.itemImg} alt="Item" className="image-style"/>
          </div>
          <div>
            <p>{element.typeItem} </p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[0] + ".png"} alt="type correctness" className="image-style"/>
          </div>
          <div>
            <p>{element.quality}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[1] + ".png"} alt="quality correctness" className="image-style"/>
          </div>
          <div style={{width:"30ch", wordWrap:"break-word"}}>
            <p>{element.stats?.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[2] + ".png"} alt="stats correctness" className="image-style"/>
          </div>
          <div>
            <p>{element.itemPool?.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[3] + ".png"} alt="item pool correctness" className="image-style"/>
          </div>
        </div>
      ))}
    </ul>
  );
}

function Input({addItem})
{
  const [guess, setGuess] = useState("");

  // when we submit, we want to add the item and reset the guess
  function pressSubmit()
  {
    addItem(guess);
    setGuess("");
  }

  // we return an input field and a submit button
  return (
    <div>
      <input 
        value={guess}
        onChange={e => setGuess(e.target.value)}
      />
      <button onClick={pressSubmit}>
        Submit
      </button>
    </div>
  );
}

function WinScreen({item, guesses})
{
  return (
    <div className="overlay">
      <div className="win-style">
        <p>Correct!</p>
        <p>Item Name: {item.name}</p>
        <img src={item.itemImg} alt="mystery item" className="image-style"/>
        <p>Guesses: {guesses}</p>
      </div>
    </div>
  )
}

function updateRevealed(guesses, actualWord, currentProgressWord)
{
  const actualNoSpaces = actualWord.replaceAll(" ", "");
  if(guesses < actualNoSpaces.length)
  {
    let charToReveal = Math.floor(Math.random() * (actualNoSpaces.length - guesses))

    let index = 0;

    while(index < currentProgressWord.length)
    {
      if(charToReveal === 0 && currentProgressWord[index] === "_")
      {
        return (currentProgressWord.slice(0, index) + actualWord[index] + currentProgressWord.slice(index+1));
      }
      if(currentProgressWord[index] === "_")
      {
        charToReveal--;
      }
      index++;
    }

  }
  return currentProgressWord;
}

function App() {
  const [itemList, updateList] = useState([]);

  const [mysteryItem, setMysteryItem] = useState(); 

  const [correct, setCorrect] = useState(false);

  const [numGuesses, setNumGuesses] = useState(0);

  const [revealedChars, setRevealed] = useState("");

  useEffect( () => 
  {
    const fetchMysteryItem = async () => 
    {
      const res = await axios.get("/api/data/byid/" + (Math.floor(Math.random() * 732) + 1).toString());

      setMysteryItem(res.data)

      setRevealed(Array.from(res.data.name).reduce((hidden, c) => c === " " ? hidden + c : hidden + "_", ""))
    }
    
    fetchMysteryItem();
  }, [])

  const newGuess = async (guess) => {
    try
    {
      const itemDetails = await axios.get("/api/data/byname/" + guess)
      const comparisonResults = await axios.get("/api/data/compare/" + mysteryItem.name + "/" + itemDetails.data.name)

      const id = itemDetails.data.id;
      const idToStr = id > 99 ? id.toString() : id > 9 ? "0" + id : "00" + id
      const imgURL = "/images/itemPNGs/collectibles_" + idToStr + "_" + itemDetails.data.name.toLowerCase().replaceAll(" ", "") + ".png";

      updateList([{ ...itemDetails.data, itemImg: imgURL, comparisonResults: comparisonResults.data}, ...itemList])

      setRevealed(updateRevealed(numGuesses, mysteryItem.name, revealedChars));

      setNumGuesses(numGuesses+1);

      if(itemDetails.data.name === mysteryItem.name) setCorrect(true);
    }
    catch (error)
    {
      console.error("Error fetching data: " + error)
    }
  }
 
  return (
    <div style={{textAlign: "center"}}> 
      <h1>Isaacdle</h1>
      <p>Enter an item to guess:</p>
      <Input addItem={newGuess}/>

      <p>Item name: {revealedChars}</p>

      <div className="label-style">
        {["Name", "Type of Item", "Quality", "Stats", "Item Pool"].map(topic => (
          <p style={{margin:0}}>{topic}</p>
        ))}
      </div>
      
      <hr style={{border:'0', borderTop: '1px solid #ccc', margin: '10px auto', width: "70%" }}/>

      <GuessList list={itemList}/>

      {/* {mysteryItem && <p>Mystery Item : {mysteryItem.name}</p>} */}
      
      {correct && <WinScreen item={itemList[0]} guesses={numGuesses} />}

    </div>
  );
}

export default App;
