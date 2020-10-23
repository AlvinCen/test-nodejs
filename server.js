const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var cors = require('cors')
const dbName = 'dbTest';
const uri = "mongodb+srv://admin:admin123@cluster0.z7fq4.mongodb.net/dbTest?retryWrites=true&w=majority";

async function main() {
  await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    assert.equal(null, err);
    console.log("Connected : " + dbName);
    const db = client.db(dbName);
    const col = db.collection('tbTest');
    try {
      app.use(cors());
      app.get('/read', (req, res) => {
        col.find().toArray(function (e, docs) {
          res.send(JSON.stringify(docs));
        });
      });

      app.get('/readbyid/:id', async (req, res) => {
        const id = req.params.id;
        col.findOne({ ID: parseInt(id) }, (er, doc) => {
          res.send(JSON.stringify(doc));
        });
      });

      app.get('/login/:username&:password', async (req, res) => {
        const username = req.params.username;
        const password = req.params.password;
        console.log(username, password);
        col.findOne({username: username},{password: password}, (er, doc) => {
          res.send(JSON.stringify(doc));
        });
      });

      app.get('/hapus/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        col.deleteOne({ ID: parseInt(id) }, (er, doc) => {
          res.send(JSON.stringify(doc));
        });
      });

      app.post('/api', (req, res) => {
        let action = req.body.action;
        let data = { ID: parseInt(req.body.id), Nama_Barang: req.body.nama };
        console.log(data);
        if (action === 'Simpan') {
          col.insertOne({ ID: parseInt(data.ID), Nama_Barang: data.Nama_Barang }, (er, doc) => {
            res.send(JSON.stringify(doc.result));
          });
        } else {
          col.updateOne({Nama_Barang: data.Nama_Barang}, (er, doc) =>{
            res.send(JSON.stringify(doc.result));
          });
        }


      });
    } catch (err) {
      console.log(err.stack);
    }
  });
}

main().catch(console.error);

app.use(bodyParser.json());
app.use(express.static("public"));
app.listen(4000, () => console.log('Server berjalan di port 4000'));

