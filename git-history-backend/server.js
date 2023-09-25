const express = require('express');

let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());  // This is to allow your frontend to make requests to this backend

// Endpoint to fetch commits from a given repository
app.get('/commits', async (req, res) => {
    const repoUrl = req.query.repo;

    if (!repoUrl) {
        return res.status(400).json({ error: 'Repo URL is required' });
    }

    // Extracting user and repository name from the provided URL
    const match = repoUrl.match(/github.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        return res.status(400).json({ error: 'Invalid GitHub repository URL' });
    }
    const user = match[1];
    const repo = match[2];

    const apiUrl = `https://api.github.com/repos/${user}/${repo}/commits`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.status !== 200) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch commit data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
