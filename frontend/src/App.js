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
            <img src={element.itemImg} className="image-style"/>
          </div>
          <div>
            <p>{element.typeItem} </p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[0] + ".png"} className="image-style"/>
          </div>
          <div>
            <p>{element.quality}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[1] + ".png"} className="image-style"/>
          </div>
          <div style={{width:"30ch", wordWrap:"break-word"}}>
            <p>{element.stats?.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[2] + ".png"} className="image-style"/>
          </div>
          <div>
            <p>{element.itemPool?.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}</p>
            <img src={"/images/resultPNGs/" + element?.comparisonResults[3] + ".png"} className="image-style"/>
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

function App() {
  const [itemList, updateList] = useState([]);

  const [mysteryItem, setMysteryItem] = useState(); 

  useEffect( () => 
  {
    axios.get("/api/data/byid/" + (Math.floor(Math.random() * 732) + 1).toString()).then(res => {setMysteryItem(res.data)});
  }, [])

  const newGuess = async (guess) => {
    try
    {
      const itemDetails = await axios.get("/api/data/byname/" + guess)
      const comparisonResults = await axios.get("/api/data/compare/" + mysteryItem.name + "/" + itemDetails.data.name)

      const id = itemDetails.data.id;
      const idToStr = id > 99 ? id.toString() : id > 9 ? "0" + id : "00" + id
      const imgURL = "/images/itemPNGs/collectibles_" + idToStr + "_" + itemDetails.data.name.toLowerCase().replace(" ", "") + ".png";

      updateList([{ ...itemDetails.data, itemImg: imgURL, comparisonResults: comparisonResults.data}, ...itemList])
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

      <div className="label-style">
        {["Name", "Type of Item", "Quality", "Stats", "Item Pool"].map(topic => (
          <p style={{margin:0}}>{topic}</p>
        ))}
      </div>
      
      <hr style={{border:'0', borderTop: '1px solid #ccc', margin: '10px auto', width: "70%" }}/>

      <GuessList list={itemList}/>

      {mysteryItem && <p>Mystery Item : {mysteryItem.name}</p>}

    </div>
  );
}

export default App;
