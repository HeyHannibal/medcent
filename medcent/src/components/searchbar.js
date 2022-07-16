import { useState } from 'react';
import searchTree from '../trie.json'
console.log(searchTree)
export default function Searchbar() {

  const [input, setInput] = useState("")

  
  function searchTree(e) {
    const input = e.currentTarget.value
    
    console.log(input.split('').map((letter, indx, arr) => {
      if(indx > 0)return arr[indx-1] + letter
      else return letter
    }))
    setInput(input)
    
  }
  return (
    <div>
      <form>
       <label htmlFor="site-search">Search the site:</label>
      <input type="search" id="site-search" value={input} onChange={searchTree}/>
      </form>
        <button onClick={()=> console.log(input)}>Search</button>
    </div>

  );
}
