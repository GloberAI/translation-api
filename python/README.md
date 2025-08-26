# Python Scripts for Translation Service

These scripts allow you to interact with the Translation Service API.

## Setup

1.  Install dependencies:
    ```
    pip install -r requirements.txt
    ```

2.  Set the environment variables:
    ```
    export GLOBER_API_KEY=your_api_key
    export GLOBER_BASE_URL=https://api.glober.com
    ```

## Usage

### Create a Translation Project

```
python create_translation_project.py --name "My Project" --source_language "en" --target_language "es" --texts "Hello, world!" "How are you?"
```

#### Create a Translation Project with Context Tags

```
python create_translation_project.py --name "My Project with Context" --source_language "en" --target_language "zh" --texts "There are 5 buttons." --translation_context_tags "industry:fashion,product_category:Dress Shirt"
```
**Arguments:**
- `--translation_context_tags`: (Optional) A CSV string of translation context tags.

#### Create a Translation Project for a Tenant

```
python create_translation_project.py --name "My Project for a Tenant" --source_language "en" --target_language "fr" --texts "Some text" --tenant_id "store-123"
```
**Arguments:**
- `--tenant_id`: (Optional) An external ID for a tenant, such as a store.

### Get a Translation Project

```
python get_translation_project.py --project_id "123e4567-e89b-12d3-a456-426614174000"
```

Arguments:
- `--project_id`: The UUID of the translation project to retrieve.
