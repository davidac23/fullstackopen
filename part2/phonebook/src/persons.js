import { Person } from "./person";
export const Persons = ({ persons, deletePerson }) => {
  return persons.map((person) => {
    return (
      <Person person={person} key={person.id} deletePerson={deletePerson} />
    );
  });
};
