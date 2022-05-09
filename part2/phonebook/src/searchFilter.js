export const SearchFilter = ({ persons, setFiltered }) => {
  const handleChange = (e) => {
    if (e.target.value) {
      const array = [];
      persons.forEach((person) => {
        if (person.name.toLowerCase().includes(e.target.value)) {
          array.push(person);
        }
      });
      setFiltered(array);
    }
  };

  return (
    <div>
      filter shown with <input onChange={(e) => handleChange(e)} />
    </div>
  );
};
