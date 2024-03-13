// O objetivo desse arquivo é configurar o express
const app = require("./config/express");
const port = app.get("port")

app.listen(port, () => {
    console.log(`Servidor rodando. http://localhost:${port}`)
})