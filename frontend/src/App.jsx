import React, { useRef, useState } from "react";
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

const App = () => {
  const [tasks, setTask] = useState([]);

  const taskRef = useRef();

  const addNewTask = () => {
    if (taskRef.current.value != "") {
      //Send task to server.

      setTask([...tasks, { name: taskRef.current.value, status: "Pending" }]);
      taskRef.current.value = "";
    }
  };

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
            {tasks.map((task, index) => (
              <TableRow key={index}>
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
