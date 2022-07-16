import { useEffect, useState } from "react";
import { latestVersion } from "./parsingData";
import Searchbar from "./components/searchbar";
function App() {
  const [latestResponse, setLatestResponse] = useState();
  
  useEffect(() => {
    (async function fetchData() {
      fetch(
        "https://api.fda.gov/drug/label.json?search=openfda.brand_name:Sertraline&limit=50"
      )
        .then((response) => response.json())
        .then((data) => {
          setLatestResponse(latestVersion(data.results));
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  function logger(...items) {
    console.log(items);
  }

  return (
    <div className="App">
      <Searchbar/>
      {latestResponse ? "one" : null}
      <button onClick={() => logger(latestResponse)}>Logger</button>
    </div>
  );
}

export default App;

/// adverse_reactions
/// description
/// dosage_and_administration
/// drug_interactions
/// overdosage
/// mechanism_of_action
/// precautions

{
  /* <p>
        {latestResponse.description}
      </p>
      <p>
        {latestResponse.dosage_and_administration}
      </p>
      <p>
        {latestResponse.drug_interactions}
      </p>
      <p>
        {latestResponse.overdosage}
      </p>
      <p>
        {latestResponse.mechanism_of_action}
      </p> */
}
