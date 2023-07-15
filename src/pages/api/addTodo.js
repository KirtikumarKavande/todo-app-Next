import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
    "mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("todo");
    const result = await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "meetups updated successfully" });
  }
};
export default handler;
