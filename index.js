const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`);
})