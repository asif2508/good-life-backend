const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// using middletier
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://good-admin:<password>@cluster0.7i1ds.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const habitCollection = client.db("habits").collection("decision");

        app.get('/posts', async (req, res)=>{
            const query = {};
            const cursor = todoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/posts', async (req, res)=>{
            const data = req.body;
            const result = await todoCollection.insertOne(data);
            res.send(result);        
        })

        app.delete('/posts/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await todoCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await todoCollection.updateOne(filter, updatedData, options);
            res.send(result);
          })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})