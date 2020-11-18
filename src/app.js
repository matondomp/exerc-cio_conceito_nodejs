const express = require("express");
const cors = require("cors");
const axios=require('axios')
const{ v4: uuidv4 } =require('uuid')

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
app.get("/repositories", (request, response) => {
  // TODO
   return response.json({data:repositories})
});

app.post("/repositories", async(request, response) => {
  // TODO
   const res= await axios.get('https://api.github.com/users/Freitas-Mp/repos')
   const list=res.data.map(res=>{
        var data={
          id:uuidv4(),
          title:res.name,
          url:res.url,
          techs:[res.language],
          like:0
        } 
         return repositories.push(data)
      
   })
   
  return response.json(list)
});


app.put("/repositories/:id", (request, response) => {
  // TODO
    const {title,url,techs,like}=request.body
    const {id}=request.params
    const index=repositories.findIndex(index=>index.id==id)
    if(index<0) return response.json({error:"not found!"})
     const res=repositories[index]={
               id:uuidv4(),
               title:title,
               url:url,
               techs:techs,
               like:like
            }
     return response.json({data:res})
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
    const {id}=request.params
    const index=repositories.findIndex(index=>index.id==id)
    if(index<0)return response.json({error:"Not found!"})
    repositories.splice(index,1)
    return response.json({Ok:"deletado com sucesso"})

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
    const {id}=request.params
    const index=repositories.findIndex(index=>index.id==id)
    if(index<0)return response.json({error:"Not found!"})
    const data=repositories[index].like++
    return response.status(200).json({like:"👍"+data})
});

module.exports = app;
