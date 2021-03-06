// 1) Сделать конфиг для production
//      1.1) Настроить сервер ubuntu (database, nodejs, pm2, nginx)
//      1.2) Вынесите в конфиг, все что меняется в зависимости от среды запуска
//      1.3) Добавить конфиг в gitignore
// 2) Настраиваем тесты end-to-end
// 3) git pull origin master;
// 4) Настройка pm2 (pm2 start app.js);
// 5) Настройка nginx (proxy from 80 port to our server port)



const config = require("../config");
const supertest = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const agent = supertest.agent(app);
const Cache = require("../models/cache");
const connect = require("../utils/connect");
let server;

before(async () => {
    await Cache.remove();
    require("../seeders/test")();
    server = app.listen(config.port, () => {
        // ...
    });
})

describe("/cache/", () => {
    it("GET /cache/ --> Нет никаких записей в кеше", async () => {
        const response = await agent.get("/cache/").send();
        expect(response.status, "Статус должен быть 200").equal(200);
        expect(response.body.data.length).equal(100);
    });
    it("GET /cache/:key --> Создает новую запись если её не было", async () => {
        const testKey = "superpuperkey";
        const response = await agent.get(`/cache/${testKey}`).send();
        expect(response.status, "Статус должен быть 200").equal(200);
        expect(response.body.data.value.length, "Значение существует и > 5").greaterThan(5);
    });

    it("POST /cache/test5666 --> Создание нового ключа", async () => {
        const testKey = {
            key: "test5666",
            value: "fsfafaadda"
        };
        const createResponse = await agent.post(`/cache/${testKey.key}`).send({
            value: testKey.value
        });
        const response = await agent.get(`/cache/${testKey.key}`).send();
        expect(response.status, "Статус должен быть 200").equal(200);
        expect({
            key: response.body.data.key,
            value: response.body.data.value
        }).deep.equal(testKey);
    });

    
})

after(async () => {
    await Cache.remove();
    server.close();
});


