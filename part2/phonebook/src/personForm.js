import { useState } from "react";
import service from "./services/service";

export const Form = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleInputNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found) {
      const update = window.confirm(
        `${newName} is already added to phonebook, replace old number witha a new one?`
      );
      if (update) {
        const newPerson = { name: newName, number: number, id: found.id };
        service.update(found.id, newPerson).then((response) => {
          service.getAll().then((response) => {
            setPersons(response.data);
            setMessage("Succesfully updated");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        });
      }
    } else {
      const id = getNewId();
      service
        .create({ name: newName, number: number, id: id })
        .then((response) => {
          service.getAll().then((response) => {
            setPersons(response.data);
          });
        });
    }
  };
  const getNewId = () => {
    let id = persons.length + 1;
    return id;
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleInputNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
