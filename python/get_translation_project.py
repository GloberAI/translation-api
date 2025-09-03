import argparse
import json
import os
import requests

API_KEY = os.environ.get("GLOBER_API_KEY")
BASE_URL = os.environ.get("GLOBER_BASE_URL")

def get_translation_project(project_id):
    if not API_KEY:
        print("Error: GLOBER_API_KEY environment variable not set.")
        return
    if not BASE_URL:
        print("Error: GLOBER_BASE_URL environment variable not set.")
        return

    url = f"{BASE_URL}/projects/{project_id}"
    headers = {
        "x-api-key": API_KEY
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        return(response)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get a translation project by its ID.")
    parser.add_argument("--project_id", required=True, help="The ID of the translation project to retrieve.")

    args = parser.parse_args()
    response = get_translation_project(args.project_id)
    print(json.dumps(response.json(), indent=2))
