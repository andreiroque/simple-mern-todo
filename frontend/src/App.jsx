import React, { useEffect, useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import axios from "axios";

const App = () => {
  const [tasks, setTask] = useState([]);

  const taskRef = useRef();

  const addNewTask = () => {
    if (taskRef.current.value != "") {
      axios
        .post("http://localhost:5000/api/newtask", {
          name: taskRef.current.value,
          status: "Pending",
        })
        .catch((err) => console.error(err));

      taskRef.current.value = "";
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTask(response.data);
      })
      .catch((err) => console.error(err));
  }, [tasks]);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5 font-mono">
      <div className="flex gap-5">
        <Input ref={taskRef} placeholder="Task" />
        <Button onClick={addNewTask}>Add Task</Button>
      </div>
      <div>
        <Table>
          <TableCaption>Todo List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Task name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{<Button variant="outline">Done</Button>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default App;
