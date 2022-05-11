const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json' }))
//app.use(express.json)

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Documentation Backend",
      description: "information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["./routes/event.route.js", "./routes/commentaire.route.js"
, "./routes/share.route.js", "./routes/user.route.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 3000;

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://dbWalidCamping:1234@campingdb.nslug.mongodb.net/dbWalidCamping?retryWrites=true&w=majority";

mongoose.connect(uri).then(()=> {
  console.log("database is connected")
}).catch(err => {
  console.log(console.log(err))
});

/*mongoose.connect("mongodb://127.0.0.1:27017/campingDB").then(()=> {
mongoose.connect("mongodb://database_service/campingDB").then(()=> {
  console.log("database is connected")
}).catch(err => {
  console.log(console.log(err))
});*/

app.listen(PORT, function(){
  const today = new Date()
  console.log("Server started on port "+PORT+" "+today);
})




const userRoute = require("./routes/user.route")
const eventRoute = require("./routes/event.route")
const shareRoute = require("./routes/share.route")
const commentaireRoute = require("./routes/commentaire.route")

app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/users", userRoute)
app.use("/events", eventRoute)
app.use("/shares", shareRoute)
app.use("/commentaires", commentaireRoute)
app.use(express.static('uploads/images'))


/*
//camper participate to event
app.put("/event/participate/:id",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  Event.updateOne({_id: id}, {participants: request.body}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});
app.put("/event/unparticipate/:id/:campeur",function(request,response){
  const { id } = request.params;
  console.log(request.body)
  Event.updateOne({_id: id}, {participants: []}
    ,function(err){
      if(err){
        console.log("failed");
      }else{
        console.log("success update");
      }
    })
  return response.send("update")
});
//shareEvent
const ShareEventSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: Date,
  position:{
    Longitude: Number,
    Latitude: Number
  }
});
const ShareEvent = mongoose.model("ShareEvent", ShareEventSchema)

app.get("/share/events",function(request,response){
  ShareEvent.find(function(err, shareevents){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      response.send(shareevents);
    }
  });
});

app.post("/share/event/create",function(request,response){
  console.log(request.body)
  const shareevent = new ShareEvent(request.body)
  shareevent.save()
  response.send(shareevent)
  return 
});
//Commentaire
const commentaireSchema = new mongoose.Schema({
  idEvent: String,
  idCampeur: String,
  commentaire: String
});
const Commentaire = mongoose.model("Commentaire", commentaireSchema)

app.get("/share/events/commentaires",function(request,response){
  Commentaire.find(function(err, commentaires){
    if(err){
      console.log(err);
    }else{
      //mongoose.connection.close();
      //events.forEach(function(event){
        //console.log(event.createur.nom);
      //});
      response.send(commentaires);
    }
  });
});

app.post("/share/event/commentaire/create",function(request,response){
  console.log(request.body)
  const commentaire = new Commentaire(request.body)
  commentaire.save()
  response.send(commentaire)
  return 
});


/*
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://dbWalidCamping:1234@campingdb.nslug.mongodb.net/dbWalidCamping?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('camping');
    console.log("connexion etablie")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/

