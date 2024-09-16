const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.send('<h1>Welcome to My Resume Server!</h1><p><a href="/resume.pdf">Download my resume</a></p>');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

