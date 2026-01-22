import { useEffect, useState } from "react";
import axios from "axios";

function GuessList({list})
{
  return(
    <ul>
      {list.map((element) => (
        <li>
          Guess made : {element} 
          {/* Name : {element.name}
          Type of Item : {element.typeItem} */}
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
    updateList([...lst, guess])
  }

  const [data, setData] = useState("");

  useEffect( () => 
  {
    axios.get("/api/data/byname/Breakfast").then(res => {setData(res.data)})
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <h1>Isaacdle</h1>
      <p>Enter an item to guess:</p>
      <Input addItem={newGuess}/>
      <GuessList list={lst}/>
      <p>data: {data.name}</p>
    </div>
  );
}

export default App;
