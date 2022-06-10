const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// using middletier
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://good-admin:6ol0AmyUdoyUyLm0@cluster0.7i1ds.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const decisionCollection = client.db("habits").collection("decisions");
        const thinkingCollection = client.db("habits").collection("thinking");
        const influencingCollection = client.db("habits").collection("influencing");
        const drivingCollection = client.db("habits").collection("managing");
        const conflictCollection = client.db("habits").collection("conflict");

        // decision collction crud
        app.get('/decisions', async (req, res)=>{
            const query = {};
            const cursor = decisionCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/decisions', async (req, res)=>{
            const data = req.body;
            const result = await decisionCollection.insertOne(data);
            res.send(result);        
        })

        app.delete('/decisions/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await decisionCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/decisions/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await decisionCollection.updateOne(filter, updatedData, options);
            res.send(result);
          })
        
        // Thinking collction crud
        app.get('/thinking', async (req, res)=>{
            const query = {};
            const cursor = thinkingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/thinking', async (req, res)=>{
            const data = req.body;
            const result = await thinkingCollection.insertOne(data);
            res.send(result);        
        })
        
        app.delete('/thinking/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await thinkingCollection.deleteOne(query);
            res.send(result);
        })
        
        app.put('/thinking/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await thinkingCollection.updateOne(filter, updatedData, options);
            res.send(result);
          })

        //   influencing crud
        app.get('/influencing', async (req, res)=>{
            const query = {};
            const cursor = influencingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/influencing', async (req, res)=>{
            const data = req.body;
            const result = await influencingCollection.insertOne(data);
            res.send(result);        
        })
        
        app.delete('/influencing/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await influencingCollection.deleteOne(query);
            res.send(result);
        })
        
        app.put('/influencing/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await influencingCollection.updateOne(filter, updatedData, options);
            res.send(result);
          })
        // conflict card
        app.get('/conflict', async (req, res)=>{
            const query = {};
            const cursor = conflictCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/conflict', async (req, res)=>{
            const data = req.body;
            const result = await conflictCollection.insertOne(data);
            res.send(result);        
        })
        
        app.delete('/conflict/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await conflictCollection.deleteOne(query);
            res.send(result);
        })
        
        app.put('/conflict/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await conflictCollection.updateOne(filter, updatedData, options);
            res.send(result);
          })

        //   dricing crud
        app.get('/driving', async (req, res)=>{
            const query = {};
            const cursor = drivingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/driving', async (req, res)=>{
            const data = req.body;
            const result = await drivingCollection.insertOne(data);
            res.send(result);        
        })
        
        app.delete('/driving/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await drivingCollection.deleteOne(query);
            res.send(result);
        })
        
        app.put('/driving/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
              $set: data
            }
            const result = await drivingCollection.updateOne(filter, updatedData, options);
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