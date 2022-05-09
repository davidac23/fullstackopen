import { useEffect, useState } from "react";
import { SearchFilter } from "./searchFilter";
import { Persons } from "./persons";
import { Form } from "./personForm";
import Notification from "./notification";
import service from "./services/service";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleDelete = (person) => {
    const deleteConfirm = window.confirm(`Delete ${person.name} ?`);
    if (deleteConfirm) {
      service.deletePerson(person.id).then(() =>
        service.getAll().then((response) => {
          setPersons(response.data);
          setMessage("Succesfully deleted");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter persons={persons} setFiltered={setFilteredPersons} />
      <h3>Add a new</h3>
      <Form persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons.length ? filteredPersons : persons}
        deletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
