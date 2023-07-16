import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  console.log(req.body)
  try {
      // connect to the database
      const client = await MongoClient.connect(
        "mongodb+srv://kirtikumar0005:233186@cluster0.rnprxo8.mongodb.net/Todo?retryWrites=true&w=majority"
        );
        const db = client.db();
      // update the published status of the post
      await db.collection('todo').updateOne(
          {
              _id: new ObjectId(req.body),
          },
          { $set: { status: "completed" } }
      );

      // return a message
      return res.json({
          message: 'Post updated successfully',
          success: true,
      });
  } catch (error) {

      // return an error
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}
export default handler;