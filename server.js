const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port  = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express! My name is Andrey'});
});


app.get('/api/customers', (req, res) => {
    res.send(
        [
            {
                id: '1',
                img: 'https://placeimg.com/64/64/man',
                name: '홍길동',
                birthday: '961222',
                gender: 'Man',
                job: 'Student'
            },
            {
                id: '2',
                img: 'https://placeimg.com/64/64/woman',
                name: '리현일',
                birthday: '961222',
                gender: 'Man',
                job: 'designer'
            },
            {
                id: '3',
                img: 'https://placeimg.com/64/64/girl',
                name: '리순신',
                birthday: '961222',
                gender: 'Man',
                job: 'programmer'
            },
            {
                id: '4',
                img: 'https://placeimg.com/64/64/cat',
                name: '리순홍',
                birthday: '961222',
                gender: 'Man',
                job: 'programmer'
            }
        ]
    );
});

 app.listen(port, () => console.log(`Listening on port ${port}`));