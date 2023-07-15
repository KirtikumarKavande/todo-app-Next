import { MongoClient, ObjectId } from "mongodb"
async function handler(req, resp){
    
    const {todoId} = req.query
    if(req.method !== 'DELETE') return
    
    const client = await MongoClient.connect("mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority")
    const db = client.db()
    const collection = db.collection("todo")
    const result = await (await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
    client.close()
   
    return resp.json({
        todo: result,
        message: "To do deleted"
    })
}
export default handler