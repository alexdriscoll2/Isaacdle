import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function GuessList({list})
{
  return(
    <ul>
      {list.map((element) => (
        <p style={{whiteSpace: "pre-wrap"}}>
          Name : {element.name + " -- "}
          Type of Item : {element.typeItem + " -- "}
          Quality : {element.quality + " -- "}
          Stats : {element.stats.reduce((acc, s) => acc + s + ", ", "").slice(0, -2) + " -- "} {/* these two lines format the arrays correctly*/}
          Item Pool : {element.itemPool.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}
        </p>
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
  const [lst, updateList] = useState([]);
  const [imgTest, setImg] = useState();
  const [iURL, setIURL] = useState("");

  const newGuess = async (guess) => {
    try
    {
      const res = await axios.get("/api/data/byname/" + guess)
      updateList([res.data, ...lst])

      const id = res.data.id;
      const idToStr = id > 99 ? id.toString() : id > 9 ? "0" + id : "00" + id
      const imgURL = "/images/itemPNGs/collectibles_" + idToStr + "_" + res.data.name.toLowerCase().replace(" ", "") + ".png";
      setIURL(imgURL)
      setImg({ ...res.data, image: imgURL})
    }
    catch (error)
    {
      console.error("Error fetching data: " + error)
    }
  }

  const [mysteryItem, setMysteryItem] = useState(); 

  useEffect( () => 
  {
    axios.get("/api/data/byid/" + (Math.floor(Math.random() * 732) + 1).toString()).then(res => {setMysteryItem(res.data)});
  }, [])
 
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

      <GuessList list={lst}/>

      {mysteryItem && <p>Mystery Item : {mysteryItem.name}</p>}
      {imgTest && <img 
        src={imgTest.image}
        alt={imgTest.name}
      />}
      <p>png url: {iURL}</p>
    </div>
  );
}

export default App;
