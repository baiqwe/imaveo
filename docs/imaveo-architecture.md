# Imaveo Architecture Notes

This project now targets **Imaveo**, an AI visual creation hub built on the existing Next.js + Supabase + Creem foundation.

## Product Direction

- Brand: Imaveo (Image + Veo)
- Core promise: one destination for AI video, AI image, and anime-specialized creative flows
- Primary design language: dark minimal interface with cinematic framing and gold accents

## Route Structure

The implemented route skeleton aligns with the proposed sitemap:

- `/[locale]/`
- `/[locale]/pricing`
- `/[locale]/blog`
- `/[locale]/my-creations`
- `/[locale]/ai-video/[model]`
- `/[locale]/ai-image/[model]`

`config/imaveo.ts` acts as the shared source of truth for tools, featured models, and editorial topics.

## Supabase Evolution

The current generation pipeline can be extended with the following fields:

- `model_type`: `video | image | music`
- `provider`: upstream vendor or runtime, for example `replicate`, `fal`, `vertex`
- `status`: `pending | completed | failed`
- `output_url`: final asset URL

Recommended next step:

1. add a migration for the new columns
2. expose a typed generation record in `types/`
3. subscribe to updates in `my-creations` with Supabase Realtime

## Dispatcher Layer

The next backend milestone is a model dispatcher that receives `modelId` and routes to the proper provider.

Suggested contract:

```ts
type GenerationRequest = {
  modelId: string;
  type: "video" | "image";
  prompt?: string;
  image?: string;
  duration?: number;
  aspectRatio?: string;
};
```

Suggested dispatch flow:

1. validate credits and auth
2. store a pending generation row
3. route by `modelId`
4. persist provider job id
5. update the row when the upstream job completes

## Animeify Inside Imaveo

`Animeify` should remain a first-class entry inside the larger Imaveo product:

- dedicated route: `/[locale]/ai-image/animeify`
- alternate accent colors can be injected with CSS variables on route match
- the anime image editor remains the fastest path to first value
