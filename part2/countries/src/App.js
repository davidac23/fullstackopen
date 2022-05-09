import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const promise = axios.get("https://restcountries.com/v3.1/all");
    promise.then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setFilter(e);
    const found = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredCountries(found);
  };

  return (
    <div className="App">
      <form>
        <div>
          find countries
          <input
            value={filter}
            onChange={(e) => handleInputChange(e.target.value)}
          ></input>
        </div>
        <Country countries={filteredCountries} />
      </form>
    </div>
  );
}

export default App;
