const axios = require('axios');

const API_KEY = process.env.GLOBER_API_KEY;
const BASE_URL = process.env.GLOBER_BASE_URL;

async function getTranslationProject(projectId) {
    if (!API_KEY) {
        console.error('Error: GLOBER_API_KEY environment variable not set.');
        return;
    }
    if (!BASE_URL) {
        console.error('Error: GLOBER_BASE_URL environment variable not set.');
        return;
    }

    const url = `${BASE_URL}/projects/${projectId}`;
    const headers = {
        'x-api-key': API_KEY
    };

    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Usage: node get_translation_project.js <project_id>');
        process.exit(1);
    }

    const [projectId] = args;
    getTranslationProject(projectId)
        .then(response => console.log(response))
        .catch(error => console.error(error));
}
