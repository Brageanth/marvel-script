// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from "mongodb"

const clientPromise = new MongoClient("mongodb://mongo:27017/", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).connect();

type Data = {
  data: Array<any>
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const db = client.db("marvel_script") 
  const collection = await db.collection("characters").find({}).toArray()
  res.status(200).json({ data: collection })
}
