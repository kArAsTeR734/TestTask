const express = require('express');
const path = require('path')
const app = express();
app.use(express.static(__dirname + '/public'));
items = [
    {id:0,title:'Корпус Т5МЭ.018500.001 ст.1',unit:'шт',code:'5853249',description:'About'}
];

app.get("/items", function(_, response){
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});
function getReqData(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = JSON.parse(Buffer.concat(buffers).toString());
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}
app.post('/api/wh/items/', async(req, res) => {
    try{
        const itemData = await getReqData(req);
        const item = {id:itemData.id,title: itemData.title, unit: itemData.unit,code:itemData.code,description:itemData.description};
        const id = Math.max.apply(Math,items.map(function(u){return u.id;}))
        item.id = id + 1;

        items.push(item);
        res.end(JSON.stringify(item));
    }
    catch(error){
        res.writeHead(400,{"Content-Type":"application/json"})
        res.end(JSON.stringify({ message: "Некорректный запрос" }));
    }
})

app.put('/api/wh/items/:id/', async(req, res) => {
    try{
        const itemData = await getReqData(req);
        const item = items.find((i) => i.id === parseInt(itemData.id));
        if(item){
            item.title = itemData.title;
            item.unit = itemData.unit;
            item.code = itemData.code;
            item.description = itemData.description;
            res.end(JSON.stringify(item));
        }
        else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Пользователь не найден" }));
        }
    }
    catch(error){
        res.writeHead(400,{"Content-Type":"application/json"})
        res.end(JSON.stringify({ message: "Некорректный запрос" }));
    }
})

app.get('/api/wh/items', async(req, res) => {
    try{
        res.setHeader('Content-Type','application/json; charset=utf-8');
        res.end(JSON.stringify(items));
    }
    catch(error){
        res.end(JSON.stringify({ message: "Некорректный запрос" }));
    }
})

app.get('/api/wh/items/:id/', (req, res) => {
    const id = req.params.id;

    try{
        const item = items.find((u) => u.id === parseInt(id));

        if(item)
            res.end(JSON.stringify(item));
        else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Пользователь не найден" }));
        }
    }
    catch(error){
        res.end(JSON.stringify({ message: "Некорректный запрос" }));
    }
});

app.get('/api/wh/itemsName/:title', (req, res) => {
    const decodedTitle = decodeURIComponent(req.params.title.trim());
    let filteredItems = [...items];
    try{
        const item = items.find((u) => u.title.trim().toLowerCase() === decodedTitle.trim().toLowerCase());
        filteredItems = item;
        if(item)
            res.end(JSON.stringify(filteredItems));
        else{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Предмет с названием "${decodedTitle}" не найден!` }));
        }
    }
    catch(error){
        res.end(JSON.stringify({ message: "Некорректный запрос" }));
    }
});
app.listen(3000, (res) => {
    console.log(`Сервер запущен на http://localhost:${3000}/items`);
});
