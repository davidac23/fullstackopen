const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
// app.use(morgan("tiny"));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log(response.json(persons));
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<div>Phonebook has info for ${persons.length} people</div><div>${date}</div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 1000000);

  const person = request.body;
  person.id = id;

  const nameExists = persons.find((p) => p.name === person.name);
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    persons = persons.concat(person);
    response.json(person);
    morgan.token("content", response);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
