const PythonShell = require('python-shell').PythonShell;
const ipfs = require('ipfs-http-client')
const client = ipfs.create('https://ipfs.infura.io:5001/api/v0')
const fs = require('fs')
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/here', async (req, res) => {

    const details = {
        description: req.body.description,
        username: req.body.username,
        course_name: req.body.course_name,
        course_number: req.body.course_number
    }

    let options = {
        mode: 'text',
        args: [details.description, details.username, details.course_name, details.course_number]
    };

    PythonShell.run('./py/gen.py', options, function (err, results) {
        if (err) throw err;
        console.log('certificate ' + details.username + ' created');
    
        console.log("uploading to IPFS...");
        fs.readFile(details.username + ".png", async function (err, file) {
            if (err) throw err;

            let added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )

            url = `https://ipfs.infura.io/ipfs/${added.path}`

            console.log(url);

            res.send(url);

        });
    });

    


})

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))