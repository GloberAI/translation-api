const axios = require('axios');

const API_KEY = process.env.GLOBER_API_KEY;
const BASE_URL = process.env.GLOBER_BASE_URL;

async function createTranslationProject(name, sourceLanguage, targetLanguage, texts, translationContextTags, tenantId) {
    if (!API_KEY) {
        console.error('Error: GLOBER_API_KEY environment variable not set.');
        return;
    }
    if (!BASE_URL) {
        console.error('Error: GLOBER_BASE_URL environment variable not set.');
        return;
    }

    const url = `${BASE_URL}/translate`;
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    };
    const payload = {
        name: name,
        source_language: sourceLanguage,
        target_language: targetLanguage,
        assets: {
            texts: texts
        }
    };

    if (translationContextTags) {
        payload.translation_context_tags = translationContextTags;
    }

    if (tenantId) {
        payload.tenant_id = tenantId;
    }

    try {
        const response = await axios.post(url, payload, { headers: headers });
        return response.data;
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    let name, sourceLanguage, targetLanguage, texts, translationContextTags, tenantId;

    const tagIndex = args.indexOf('--translation_context_tags');
    if (tagIndex !== -1) {
        const tagsCsv = args[tagIndex + 1];
        translationContextTags = tagsCsv.split(',');
        args.splice(tagIndex, 2);
    }

    const tenantIdIndex = args.indexOf('--tenant_id');
    if (tenantIdIndex !== -1) {
        tenantId = args[tenantIdIndex + 1];
        args.splice(tenantIdIndex, 2);
    }

    if (args.length < 4) {
        console.log('Usage: node create_translation_project.js <name> <source_language> <target_language> <text1> <text2> ... [--translation_context_tags <tags>] [--tenant_id <tenantId>]');
        process.exit(1);
    }

    [name, sourceLanguage, targetLanguage, ...texts] = args;
    
    createTranslationProject(name, sourceLanguage, targetLanguage, texts, translationContextTags, tenantId)
        .then(response => console.log(JSON.stringify(response, null, '  ')))
        .catch(error => console.error(error));
}
