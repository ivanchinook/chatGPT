//import { Configuration, OpenAIApi } from "openai";
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-zPR0n5y7oCfoLnzpBrpF6Kvs",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
//         res.send('Hello world!');
// });

app.post('/', async (req, res) => {
    const { message } = req.body;
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    //prompt: "Who are you?",
    prompt: `Pretend you are happy Steve. Answer with nice languange.
           Steve: What do you want to know, my beatiful love?
           Person: What time it is?
           Steve: It is time to be happy''
           Person:`+ message,
    max_tokens: 300,
    temperature: 0,
    });
    console.log(response.data)
    if(response.data.choices[0].text){
        res.json({ message: response.data.choices[0].text});
        }
});
    

app.listen(port, () => {
    console.log('Example app listening')
});