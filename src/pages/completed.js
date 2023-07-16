import { MongoClient } from "mongodb";
import React, { useEffect } from "react";

const completed = (props) => {
    console.log(props.todo)


  return (
    <div>
        {
            props.todo.map((item)=>{
                return(
                    <div>{item.todo}</div>
                )
            })
        }
      <div>{props.todo.todo}</div>
    </div>
  );
};


export async function getStaticProps() {
    const client = await MongoClient.connect(
        "mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority"
        );
        const db = client.db();
        const meetupCollection = db.collection("todo");
        const selectedMeetup = await meetupCollection.findOne({
            status:"completed"
          })
          const updatedData=[selectedMeetup]
      console.log('good',selectedMeetup)
        client.close();
        return {
            props: {
              todo: updatedData?.map((item) => {
                return {
                  todo: item.todo,
                  status:item.status.toString(),
                  id: item._id.toString(),
               
                };
              }),
            },
          };

}
export default completed;
