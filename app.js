import express from "express";
import db from "./db/db";

const app = express();

app.use(express.json())

app.get("/api/v1/todos", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "todos retrieved successfully",
    todos: db,
  });
});

app.post('/api/v1/todos', (req, res) => {
  console.log(req.body);
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description){
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const toDo= {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description
  }

  db.push(toDo);
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    toDo
  })
});


const PORTA = 5000;

app.listen(PORTA, () => {
    console.log(`server running on port ${PORTA}`)
  });


 