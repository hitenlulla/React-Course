import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";
function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const responseHandler = (response) => {
      const loadedTasks = [];
      for (const taskKey in response) {
        loadedTasks.push({ id: taskKey, text: response[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    sendRequest(
      {
        url: "https://react-http-5463b-default-rtdb.firebaseio.com/tasks.json",
      },
      responseHandler
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
