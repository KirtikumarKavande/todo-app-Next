import { MongoClient, ObjectId } from "mongodb"
async function handler(req,resp){
    if(req.method !== 'GET') return
    
    var query = { _id: new ObjectId(req.query.param[0].toString())};
    const options = {upsert: true }
    const updateTodo = {
         $set: { done: req.query.param[1] } 
      };
    const client = await MongoClient.connect("mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("todo")
    const result = await collection.updateOne(query, updateTodo, options);
    client.close()
    console.log("updated record::::"+result)
    return resp.json({
        todo: result,
        message: "To do updated!"
    })
}
export default handler