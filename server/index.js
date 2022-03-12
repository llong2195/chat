const app  = require('./src/app/app');
const chat = require('./src/app/chat');


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})

chat(server);