
import argparse
import json
import os
import requests

API_KEY = os.environ.get("GLOBER_API_KEY")
BASE_URL = os.environ.get("GLOBER_BASE_URL")

def create_translation_project(name, source_language, target_language, texts, translation_context_tags=None, tenant_id=None):
    if not API_KEY:
        print("Error: GLOBER_API_key environment variable not set.")
        return
    if not BASE_URL:
        print("Error: GLOBER_BASE_URL environment variable not set.")
        return

    url = f"{BASE_URL}/translate"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }
    payload = {
        "name": name,
        "source_language": source_language,
        "target_language": target_language,
        "assets": {
            "texts": texts
        }
    }

    if translation_context_tags:
        payload["translation_context_tags"] = translation_context_tags

    if tenant_id:
        payload["tenant_id"] = tenant_id

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        return response
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a new translation project.")
    parser.add_argument("--name", required=True, help="A human-readable name for the translation project.")
    parser.add_argument("--source_language", required=True, help="BCP-47 language code for the source language.")
    parser.add_argument("--target_language", required=True, help="BCP-47 language code for the target language.")
    parser.add_argument("--texts", nargs='+', required=True, help="A list of texts to translate.")
    parser.add_argument("--translation_context_tags", help="A CSV string of translation context tags.")
    parser.add_argument("--tenant_id", help="Optional ID for a tenant, such as a store.")

    args = parser.parse_args()

    tags = None
    if args.translation_context_tags:
        tags = args.translation_context_tags.split(',')

    response = create_translation_project(args.name, args.source_language, args.target_language, args.texts, tags, args.tenant_id)
    print(response.json())
