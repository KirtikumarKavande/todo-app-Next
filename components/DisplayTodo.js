import React, { Fragment } from "react";

const DisplayTodo = ({ todos }) => {
  return (
    <Fragment>
      {todos.map((item) => {
        return (
          <div className="block mx-10 my-2 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="font-normal text-gray-700 dark:text-gray-400 flex justify-between ">
              <div>{item.todo}</div>
              <div className="flex space-x-3">
                <div>Edit</div>

                <div>Delete</div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};


export default DisplayTodo;
