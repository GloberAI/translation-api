# Glober Translation API Guide

Welcome to the Glober Translation API. Our service goes beyond simple translation by offering powerful features to ensure high-quality, consistent, and context-aware results.

Glober automatically manages your **Translation Memory (TM)** and **Glossary** for you. You can enhance this further by:
- Providing **Context Tags** (e.g., for industry or product category) to utilize Glober domain-specific Glossary.
- Using a **Tenant ID** to create isolated TMs and glossaries for different clients or storefronts.

This guide outlines the API endpoints and request/response formats to get you started.


<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#🧠-glober-managed-translation-memory">🧠 Glober-managed Translation Memory</a></li>
    <li><a href="#📖-glober-managed-glossary">📖 Glober-managed Glossary</a></li>
    <li><a href="#💡-leveraging-context-tags-for-better-translations">💡 Leveraging Context Tags for Better Translations</a></li>
    <li><a href="#🏢-for-multi-tenant-platforms-and-multi-client-agencies">🏢 For Multi-tenant Platforms and Multi-client Agencies</a></li>
    <li><a href="#📘-api-reference">📘 API Reference</a>
      <ul>
        <li><a href="#🫐-user-flow-overview">🫐 User Flow Overview</a></li>
        <li><a href="#🔐-authentication">🔐 Authentication</a></li>
        <li><a href="#1-create-a-translation-project">1. Create a Translation Project</a></li>
        <li><a href="#2-get-a-translation-project">2. Get a Translation Project</a></li>
      </ul>
    </li>
    <li><a href="#🖼️-translating-multimedia-assets">🖼️ Translating Multimedia Assets</a>
      <ul>
        <li><a href="#step-1-upload-an-asset">Step 1: Upload an Asset</a></li>
        <li><a href="#step-2-translate-the-asset">Step 2: Translate the Asset</a></li>
        <li><a href="#step-3-download-the-translated-asset">Step 3: Download the Translated Asset</a></li>
      </ul>
    </li>
    <li><a href="#📄-upload-user-glossary-pairs">📄 Upload User Glossary Pairs</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#contact-us">Contact Us</a></li>
  </ul>
</details>

---

## 🧠 Glober-managed Translation Memory

A Translation Memory (TM) is a powerful tool used by human translators to ensure consistency and speed up their work. It is a database that stores pairs of source and translated sentences. When a translator works on a new text, the TM tool surfaces identical or similar phrases that have been translated before.

Glober automatically creates and maintains a Translation Memory for you. Our service refers to these past translations to improve the consistency of results between your requests. If you submit content that is an exact match to a previous translation (considering both the text and its context), Glober will automatically reuse the existing translation. As a result, you'll benefit from a discounted translation fee for that content. This process not only saves you money but also ensures that repeated content in the right context are always translated the same way, maintaining a consistent translation across all your materials.

---


## 📖 Glober-managed Glossary

A Localization Glossary, or Translation Glossary, is an important tool for translation. It typically consists of a user-provided list of key terms and phrases for a translation project. This ensures that specific terminology is translated accurately for a certain audience. For an English example, *football* in en-GB is the same as *soccer* in en-US.  For an English to Chinese example, a *button* could be on a clothing -> *扣子*,  or a *button* could be on an electronic device -> *按钮*.

Glober automates this process by curating context-specific glossaries for multiple language pairs. These Glober-managed Glossaries are automatically applied during translation, ensuring that your content uses the correct terminology every time. Our glossaries include both industry-specific jargon and region-specific colloquialisms, leading to more natural and accurate translations that resonate with the local audience. This means less manual work for you and a higher degree of consistency and quality in your translations. To get more specialized translations, see how to use the `translation_context_tags` parameter in the [Leveraging Context Tags for Better Translations](#-leveraging-context-tags-for-better-translations) section.

---

## 💡 Leveraging Context Tags for Better Translations

The `translation_context_tags` parameter allows you to provide valuable context along with your translation requests. By specifying details like industry or product category, you enable the Glober API to tap into our domain-specialized Glossaries.  Your Glober-managed Translation Memory is context aware.  When context changes, our service understand certain memory shouldn't be reused.

This leads to:
- **Higher Accuracy:** Translations are more precise and use the correct terminology for your specific domain.
- **Improved Context Consistency:** Tranlation results remains consistent across your translation projects of the same context.

For example, providing `"industry:fashion"` ensures that terms are translated with the correct nuance for the fashion industry.

---

## 🏢 For Multi-tenant Platforms and Multi-client Agencies

Glober supports your multi-tenancy needs through the optional `tenant_id` parameter. This powerful feature allows you to logically isolate Translation Memory (TM) and Glossaries for different tenants.

By assigning a unique `tenant_id`, you ensure that the translations for one tenant do not influence the translations for another.  And you can determine the format of `tenant_id`, Glober translation service will track as you use our service.
Glober translation Service will use the TM and glossary associated with that specific tenant.

This is ideal for:

- **Ecommerce Platforms with multiple storefronts:** Each store can have its own dedicated TM and glossary, maintaining brand consistency.
- **Agencies serving multiple clients:** Keep each client's linguistic assets separate and secure.
- **SaaS offering with multiple customers:** Each of your customer is isolated on our service as well.

---

## 📘 API Reference

### 🫐 User Flow Overview

1.  **Create a translation project** using `POST /translate`
2.  **Check project status** using `GET /projects/{projectId}`

### 🔐 Authentication

All API endpoints require an **API key** to be passed via the `x-api-key` header.

```http
x-api-key: YOUR_API_KEY
```

### 1. Create a Translation Project

**Endpoint:** `POST /translate`
**Description:** Initialize a new translation project.

**Request Example:**
```json
{
  "name": "My Project with Context",
  "tenant_id": "store-123",
  "source_language": "en-US",
  "target_language": "es-CO",
  "assets": {
    "texts": [
      "There are 5 buttons."
    ]
  },
  "translation_context_tags": [
    "industry:fashion",
    "product_category:Dress Shirt"
  ]
}
```

**Arguments:**
- `name`: A human-readable name for the translation project.
- `tenant_id`: (Optional) An external ID for a tenant, such as a store.
- `source_language`: BCP-47 language code for the source language (e.g., "en-US").
- `target_language`: BCP-47 language code for the target language (e.g., "es-CO").
- `texts`: One or more strings to be translated.
- `translation_context_tags`: (Optional) A list of "key:value" pairs that provide context for the translation. Allowed keys are "translation_type", "industry", and "product_category". For example: "translation_type:ecommerce_product", "industry:ecommerce_fashion", "product_category:Athletic Footwear Running Shoes".

**Curl Example:**
```bash
curl -X POST https://api.glober.ai/v1/api/translate \
-H "x-api-key: YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "name": "My Project with Context",
  "tenant_id": "store-123",
  "source_language": "en-US",
  "target_language": "es-CO",
  "assets": {
    "texts": [
      "There are 5 buttons."
    ]
  },
  "translation_context_tags": [
    "industry:fashion",
    "product_category:Dress Shirt"
  ]
}'
```

**Response Example:**
```json
{
    "project": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "status": "COMPLETED",
        "translated_assets": {
            "texts": [
                "Hay 5 botones."
            ]
        }
    }
}
```

### 2. Get a Translation Project

**Endpoint:** `GET /projects/{project_id}`
**Description:** Retrieve the status and translated assets of a project.

**Curl Example:**
```bash
curl https://api.glober.ai/v1/api/projects/123e4567-e89b-12d3-a456-426614174000 \
-H "x-api-key: YOUR_API_KEY"
```

**Response Example:**
```json
{
    "project": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "status": "COMPLETED",
        "translated_assets": {
            "texts": [
                "Hay 5 botones."
            ]
        }
    }
}
```

---

## 🖼️ Translating Multimedia Assets

For non-text assets like images, documents, videos, and audio files, the translation process is a three-step flow:

1.  **Upload the asset:** First, upload your file to the corresponding `/asset-upload/{type}` endpoint to get an `asset_id`.
2.  **Create a translation project:** Use the `asset_id` in your `POST /translate` request.
3.  **Download the translated asset:** Use the `asset_id` for the translated asset from the translation project details with the `/asset-download/{type}/{asset_id}` endpoint.

This approach allows you to efficiently manage and reference your multimedia assets for translation.

### Step 1: Upload an Asset

**Endpoint:** `POST /asset-upload/image`
**Description:** Upload an image file to get an `image_asset_id`.

**Curl Example:**
```bash
curl -X POST https://api.glober.ai/v1/api/asset-upload/image \
-H "x-api-key: YOUR_API_KEY" \
-H "Content-Type: multipart/form-data" \
-F "file=@/path/to/your/image.png" \
-F "tenant_id=store-123"
```

**Response Example:**
```json
{
    "image_asset_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```
Asset upload endpoints include: `/asset-upload/image`, `/asset-upload/document`, `/asset-upload/video`, and `/asset-upload/audio`.

### Step 2: Translate the Asset

**Endpoint:** `POST /translate`
**Description:** Reference the uploaded asset's ID in your translation project.

**Request Example:**
```json
{
  "name": "My Image Translation Project",
  "source_language": "en-US",
  "target_language": "es-CO",
  "assets": {
    "images": [
      "a1b2c3d4-e5f6-7890-1234-567890abcdef"
    ]
  }
}
```

This will create a project to translate the referenced image. You can then use the `GET /projects/{project_id}` endpoint to retrieve the `asset_id` of the translated asset.

### Step 3: Download the Translated Asset

**Endpoint:** `GET /asset-download/image/{image_asset_id}`
**Description:** Download the translated image asset.

**Curl Example:**
```bash
curl https://api.glober.ai/v1/api/asset-download/image/a1b2c3d4-e5f6-7890-1234-567890abcdef \
-H "x-api-key: YOUR_API_KEY" \
--output translated_image.png
```
Asset download endpoints include: `/asset-download/image/{image_asset_id}`, `/asset-download/document/{document_asset_id}`, `/asset-download/video/{video_asset_id}`, and `/asset-download/audio/{audio_asset_id}`.


---

## 📄 Upload User Glossary Pairs

For your specialized or tenant specific glossary, you can upload these glossary for translation use.  These user-managed glossary pairs will be used in a higher priority than Glober-managed ones.  The higher priority allow you to override Glober suggested glossary pairs with the ones you uploaded.

**Endpoint:** `POST /glossary/upload`
**Description:** Uploads new or updates existing user-managed glossary pairs for a specific language pair, optionally associated with a tenant.

**Request Example:**
```json
{
  "source_language": "en-US",
  "target_language": "es-CO",
  "source_texts": [
    "Hello",
    "Goodbye"
  ],
  "translated_texts": [
    "Buenas",
    "¡Chao, pues!"
  ],
  "tenant_id": "store-123"
}
```

**Arguments:**
- `source_language`: BCP-47 language code for the source language (e.g., "en-US").
- `target_language`: BCP-47 language code for the target language (e.g., "es-CO").
- `source_texts`: An array of source texts for the glossary.
- `translated_texts`: An array of translated texts, corresponding to the `source_texts`. Array must be the same length as source_texts array.
- `tenant_id`: (Optional) An external ID for a tenant, such as a store.

**Curl Example:**
```bash
curl -X POST https://api.glober.ai/v1/api/glossary/upload \
-H "x-api-key: YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "source_language": "en-US",
  "target_language": "es-CO",
  "source_texts": [
    "Hello",
    "Goodbye"
  ],
  "translated_texts": [
    "Hola",
    "Adiós"
  ],
  "tenant_id": "store-123"
}'
```

**Response Example:**
```json
{
    "created": 1,
    "updated": 1
}
```

---

## Scripts

We have provided scripts in Python and Javascript to help you interact with the API.

- [Python Scripts](./python/README.md)
- [Javascript Scripts](./javascript/README.md)

---

## Contact Us

For any inquiries or support, please contact us at [info@glober.ai](mailto:info@glober.ai).