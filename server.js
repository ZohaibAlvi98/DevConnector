const express = require('express');

const app = express();

app.get('/',async(req,res)=>{
    res.send ('running')
})

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

