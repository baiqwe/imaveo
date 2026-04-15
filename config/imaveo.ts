import { imaveoArticles as articleCatalog } from "@/config/imaveo-articles";

export type ToolCategory = "video" | "image" | "audio";
export type GenerationMode = "text-to-video" | "image-to-video" | "text-to-image" | "anime";
export type ProviderId = "vertex" | "kling" | "fal" | "replicate";

export type ImaveoTool = {
  slug: string;
  category: ToolCategory;
  mode: GenerationMode;
  href: string;
  hot?: boolean;
  labels: {
    en: string;
    zh: string;
  };
  descriptions: {
    en: string;
    zh: string;
  };
  seo: {
    en: {
      title: string;
      description: string;
      keywords: string[];
    };
    zh: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
};

export type ImaveoModel = {
  slug: string;
  category: Exclude<ToolCategory, "audio">;
  provider: string;
  providerId: ProviderId;
  href: string;
  badge: string;
  mode: GenerationMode;
  labels: {
    en: string;
    zh: string;
  };
  descriptions: {
    en: string;
    zh: string;
  };
  strengths: {
    en: string[];
    zh: string[];
  };
  seo: {
    en: {
      title: string;
      description: string;
      keywords: string[];
    };
    zh: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  generationDefaults?: {
    aspectRatio?: string;
    duration?: number;
    style?: string;
  };
};

export type ImaveoArticle = {
  slug: string;
  href: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  title: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
  seo: {
    en: {
      title: string;
      description: string;
      keywords: string[];
    };
    zh: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  sections: Array<{
    heading: {
      en: string;
      zh: string;
    };
    paragraphs: {
      en: string[];
      zh: string[];
    };
  }>;
  takeaways: {
    en: string[];
    zh: string[];
  };
  cta: {
    href: string;
    label: {
      en: string;
      zh: string;
    };
    description: {
      en: string;
      zh: string;
    };
  };
};

export const imaveoArticles = articleCatalog;

export const imaveoTools: ImaveoTool[] = [
  {
    slug: "text-to-video",
    category: "video",
    mode: "text-to-video",
    href: "/text-to-video",
    labels: { en: "Text to Video", zh: "文生视频" },
    descriptions: {
      en: "Turn prompts into cinematic clips with duration and ratio controls.",
      zh: "把提示词直接变成视频，支持时长和比例控制。",
    },
    seo: {
      en: {
        title: "Text to Video Generator | Imaveo",
        description: "Generate AI videos from text prompts with Veo, Kling, and other production-ready models on Imaveo.",
        keywords: ["text to video", "ai video generator", "veo text to video", "kling video"],
      },
      zh: {
        title: "文生视频工具 | Imaveo",
        description: "在 Imaveo 上使用 Veo、Kling 等模型，把一句提示词直接生成 AI 视频。",
        keywords: ["文生视频", "AI视频生成", "Veo 文生视频", "Kling 视频生成"],
      },
    },
  },
  {
    slug: "image-to-video",
    category: "video",
    mode: "image-to-video",
    href: "/image-to-video",
    labels: { en: "Image to Video", zh: "图生视频" },
    descriptions: {
      en: "Animate still images into motion scenes with camera energy.",
      zh: "让静态图片动起来，生成带镜头感的动态场景。",
    },
    seo: {
      en: {
        title: "Image to Video Generator | Imaveo",
        description: "Animate still images into short AI videos with cinematic camera motion and creator-friendly controls.",
        keywords: ["image to video", "ai animation", "animate image", "image to video ai"],
      },
      zh: {
        title: "图生视频工具 | Imaveo",
        description: "把静态图片变成短视频，支持电影感运动、镜头语言和多模型切换。",
        keywords: ["图生视频", "图片生成视频", "AI动画", "图片转视频"],
      },
    },
  },
  {
    slug: "ai-image",
    category: "image",
    mode: "text-to-image",
    href: "/ai-image/flux-pro",
    labels: { en: "AI Image", zh: "AI 图片" },
    descriptions: {
      en: "Generate key art, thumbnails, posters, and product visuals.",
      zh: "生成主视觉、缩略图、海报和商品图。",
    },
    seo: {
      en: {
        title: "AI Image Generator | Imaveo",
        description: "Generate thumbnails, posters, ad visuals, and branded image assets with Flux and other premium image models.",
        keywords: ["ai image generator", "flux pro", "poster generator", "thumbnail ai"],
      },
      zh: {
        title: "AI 图片生成器 | Imaveo",
        description: "使用 Flux 等高质量模型生成海报、封面图、广告图和品牌视觉素材。",
        keywords: ["AI图片生成", "Flux Pro", "海报生成", "封面图生成"],
      },
    },
  },
];

export const imaveoModels: ImaveoModel[] = [
  {
    slug: "veo-3",
    category: "video",
    provider: "Google Vertex AI",
    providerId: "vertex",
    href: "/ai-video/veo-3",
    badge: "HOT",
    mode: "text-to-video",
    labels: { en: "Veo 3.1", zh: "Veo 3.1" },
    descriptions: {
      en: "Flagship cinematic video generation with premium motion coherence.",
      zh: "旗舰级电影感视频生成，运动一致性更强。",
    },
    strengths: {
      en: ["Dialogue-ready scenes", "Longer camera moves", "Premium output"],
      zh: ["适合对白场景", "更长镜头运动", "高质量成片"],
    },
    seo: {
      en: {
        title: "Google Veo 3.1 Online Generator | Imaveo",
        description: "Use Google Veo 3.1 on Imaveo to generate cinematic AI videos with high motion coherence and premium scene quality.",
        keywords: ["veo 3.1", "google veo", "veo video generator", "ai video online"],
      },
      zh: {
        title: "Google Veo 3.1 在线生成 | Imaveo",
        description: "在 Imaveo 上使用 Google Veo 3.1 在线生成电影级 AI 视频，支持高一致性运动与高质量成片。",
        keywords: ["Veo 3.1", "Google Veo", "Veo 视频生成", "AI视频在线生成"],
      },
    },
    generationDefaults: { aspectRatio: "16:9", duration: 8 },
  },
  {
    slug: "kling-2-6",
    category: "video",
    provider: "Kling",
    providerId: "kling",
    href: "/ai-video/kling-2-6",
    badge: "FAST",
    mode: "image-to-video",
    labels: { en: "Kling 2.6", zh: "Kling 2.6" },
    descriptions: {
      en: "Balanced speed and quality for social clips and concept videos.",
      zh: "兼顾速度与质量，适合社媒短片和概念视频。",
    },
    strengths: {
      en: ["Fast iteration", "Prompt flexibility", "Creator-friendly cost"],
      zh: ["迭代速度快", "提示词兼容广", "创作者成本友好"],
    },
    seo: {
      en: {
        title: "Kling 2.6 Online Video Generator | Imaveo",
        description: "Generate AI videos with Kling 2.6 on Imaveo for fast concepting, social clips, and image-to-video animation.",
        keywords: ["kling 2.6", "kling video generator", "image to video kling", "ai social video"],
      },
      zh: {
        title: "Kling 2.6 在线视频生成 | Imaveo",
        description: "在 Imaveo 上使用 Kling 2.6 生成 AI 视频，适合快速迭代社媒短片和图生视频。",
        keywords: ["Kling 2.6", "Kling 视频生成", "图生视频", "AI短视频"],
      },
    },
    generationDefaults: { aspectRatio: "9:16", duration: 5 },
  },
  {
    slug: "flux-pro",
    category: "image",
    provider: "Fal / Black Forest Labs",
    providerId: "fal",
    href: "/ai-image/flux-pro",
    badge: "PRO",
    mode: "text-to-image",
    labels: { en: "Flux Pro", zh: "Flux Pro" },
    descriptions: {
      en: "High-fidelity image generation for ads, thumbnails, and product art.",
      zh: "高保真图片生成，适合广告图、封面图和商品主图。",
    },
    strengths: {
      en: ["Sharp prompt following", "Strong typography support", "Consistent styling"],
      zh: ["提示词跟随强", "文字生成更稳", "风格一致性好"],
    },
    seo: {
      en: {
        title: "Flux Pro Image Generator | Imaveo",
        description: "Create premium marketing visuals with Flux Pro on Imaveo for ads, thumbnails, product renders, and hero art.",
        keywords: ["flux pro", "flux image generator", "ai marketing image", "thumbnail generator"],
      },
      zh: {
        title: "Flux Pro 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Flux Pro 生成高质量广告图、商品图、海报和封面视觉。",
        keywords: ["Flux Pro", "图片生成器", "广告图生成", "封面图生成"],
      },
    },
    generationDefaults: { aspectRatio: "1:1" },
  },
];

export const modelConfig = Object.fromEntries(
  imaveoModels.map((model) => [
    model.slug,
    {
      providerId: model.providerId,
      category: model.category,
      mode: model.mode,
      generationDefaults: model.generationDefaults ?? {},
    },
  ])
);

export function getImaveoModel(slug: string, category?: "video" | "image") {
  return imaveoModels.find((model) => model.slug === slug && (!category || model.category === category));
}

export function getImaveoTool(slug: string) {
  return imaveoTools.find((tool) => tool.slug === slug);
}

export function getImaveoArticle(slug: string) {
  return imaveoArticles.find((article) => article.slug === slug);
}
