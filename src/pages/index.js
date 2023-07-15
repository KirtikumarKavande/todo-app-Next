import { Fragment, useEffect, useRef, useState } from "react";
import DisplayTodo from "../../components/DisplayTodo";
import { MongoClient } from "mongodb";

export default function Home(props) {
  useEffect(() => {
    setTodos(props.todo);
  }, []);
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      todo: todoRef.current.value,
    };
    const res = await fetch("api/addTodo", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    setTodos([...todos, obj]);

    todoRef.current.value = "";
  };

  return (
    <Fragment>
      <form
        className="w-full max-w-sm mx-auto border border-black pr-10 py-8 mt-2"
        onSubmit={handleSubmit}
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mr-1"
              for="inline-full-name"
            >
              TODOS
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              ref={todoRef}
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 p-1 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2  rounded"
              type="submit"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
      <DisplayTodo todos={todos} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("todo");
  const todo = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      todo: todo.map((item) => {
        return {
          todo: item.todo,
          id: item._id.toString(),
        };
      }),
    },
  };
}
