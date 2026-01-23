import { useEffect, useState } from "react";
import axios from "axios";

function GuessList({list})
{
  return(
    <ul>
      {list.map((element) => (
        <li style={{whiteSpace: "pre-wrap"}}>
          Name : {element.name + " -- "}
          Type of Item : {element.typeItem + " -- "}
          Quality : {element.quality + " -- "}
          Stats : {element.stats.reduce((acc, s) => acc + s + ", ", "").slice(0, -2) + " -- "} {/* these two lines format the arrays correctly*/}
          Item Pool : {element.itemPool.reduce((acc, s) => acc + s + ", ", "").slice(0, -2)}
        </li>
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

  const newGuess = (guess) => {
    // useEffect( () => 
    // {
    //   axios.get("/api/data/byname/" + guess).then(res => {updateList([...lst, res])})
    // }, [])
    axios.get("/api/data/byname/" + guess).then(res => {updateList([res.data, ...lst])})
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1>Isaacdle</h1>
      <p>Enter an item to guess:</p>
      <Input addItem={newGuess}/>
      <GuessList list={lst}/>
    </div>
  );
}

export default App;
