# JavaScript Scripts for Translation Service

These scripts allow you to interact with the Translation Service API.

## Setup

1.  Install dependencies:
    ```
    npm install
    ```

2.  Set the environment variables:
    ```
    export GLOBER_API_KEY=your_api_key
    export GLOBER_BASE_URL=https://api.glober.com/v1/api
    ```

## Usage

### Create a Translation Project

```
node create_translation_project.js "My Project" "en" "es" "Hello, world!" "How are you?"
```

#### Create a Translation Project with Context Tags

```
node create_translation_project.js "My Project with Context" "en" "zh" "There are 5 buttons." --translation_context_tags "industry:fashion,product_category:Dress Shirt"
```
**Arguments:**
- `--translation_context_tags`: (Optional) A CSV string of translation context tags.

#### Create a Translation Project for a Tenant
```
node create_translation_project.js "My Project for Tenant" "en" "es" "Hello, world!" "How are you?" --tenant_id "store-123"
```
**Arguments:**
- `--tenant_id`: (Optional) An external ID for a tenant, such as a store.


### Get a Translation Project

```
node get_translation_project.js "123e4567-e89b-12d3-a456-426614174000"
```

Arguments:
- `project_id`: The UUID of the translation project to retrieve.
