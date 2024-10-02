const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Routes
app.use('/todos', todoRoutes);

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
