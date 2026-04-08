export type ToolCategory = "video" | "image" | "audio";

export type ImaveoTool = {
  slug: string;
  category: ToolCategory;
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
};

export type ImaveoModel = {
  slug: string;
  category: Exclude<ToolCategory, "audio">;
  provider: string;
  href: string;
  badge: string;
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
};

export type ImaveoArticle = {
  slug: string;
  href: string;
  category: string;
  title: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
};

export const imaveoTools: ImaveoTool[] = [
  {
    slug: "text-to-video",
    category: "video",
    href: "/ai-video/veo-3",
    labels: { en: "Text to Video", zh: "文生视频" },
    descriptions: {
      en: "Turn prompts into cinematic clips with duration and ratio controls.",
      zh: "把提示词直接变成视频，支持时长和比例控制。",
    },
  },
  {
    slug: "image-to-video",
    category: "video",
    href: "/ai-video/kling-2-6",
    labels: { en: "Image to Video", zh: "图生视频" },
    descriptions: {
      en: "Animate still images into motion scenes with camera energy.",
      zh: "让静态图片动起来，生成带镜头感的动态场景。",
    },
  },
  {
    slug: "animeify",
    category: "image",
    href: "/ai-image/animeify",
    hot: true,
    labels: { en: "Animeify", zh: "Animeify" },
    descriptions: {
      en: "Specialized anime portrait workflow inside Imaveo.",
      zh: "Imaveo 内置的二次元专属工作流。",
    },
  },
  {
    slug: "ai-image",
    category: "image",
    href: "/ai-image/flux-pro",
    labels: { en: "AI Image", zh: "AI 图片" },
    descriptions: {
      en: "Generate key art, thumbnails, posters, and product visuals.",
      zh: "生成主视觉、缩略图、海报和商品图。",
    },
  },
];

export const imaveoModels: ImaveoModel[] = [
  {
    slug: "veo-3",
    category: "video",
    provider: "Google Vertex AI",
    href: "/ai-video/veo-3",
    badge: "HOT",
    labels: { en: "Veo 3.1", zh: "Veo 3.1" },
    descriptions: {
      en: "Flagship cinematic video generation with premium motion coherence.",
      zh: "旗舰级电影感视频生成，运动一致性更强。",
    },
    strengths: {
      en: ["Dialogue-ready scenes", "Longer camera moves", "Premium output"],
      zh: ["适合对白场景", "更长镜头运动", "高质量成片"],
    },
  },
  {
    slug: "kling-2-6",
    category: "video",
    provider: "Kling",
    href: "/ai-video/kling-2-6",
    badge: "FAST",
    labels: { en: "Kling 2.6", zh: "Kling 2.6" },
    descriptions: {
      en: "Balanced speed and quality for social clips and concept videos.",
      zh: "兼顾速度与质量，适合社媒短片和概念视频。",
    },
    strengths: {
      en: ["Fast iteration", "Prompt flexibility", "Creator-friendly cost"],
      zh: ["迭代速度快", "提示词兼容广", "创作者成本友好"],
    },
  },
  {
    slug: "flux-pro",
    category: "image",
    provider: "Fal / Black Forest Labs",
    href: "/ai-image/flux-pro",
    badge: "PRO",
    labels: { en: "Flux Pro", zh: "Flux Pro" },
    descriptions: {
      en: "High-fidelity image generation for ads, thumbnails, and product art.",
      zh: "高保真图片生成，适合广告图、封面图和商品主图。",
    },
    strengths: {
      en: ["Sharp prompt following", "Strong typography support", "Consistent styling"],
      zh: ["提示词跟随强", "文字生成更稳", "风格一致性好"],
    },
  },
  {
    slug: "animeify",
    category: "image",
    provider: "Replicate",
    href: "/ai-image/animeify",
    badge: "PINK",
    labels: { en: "Animeify", zh: "Animeify" },
    descriptions: {
      en: "Domain-specific anime image pipeline optimized for portraits.",
      zh: "针对人像优化的二次元图片生成链路。",
    },
    strengths: {
      en: ["Portrait-first", "Anime-specialized weights", "Brandable outputs"],
      zh: ["人像优先", "动漫专用权重", "更适合品牌输出"],
    },
  },
];

export const imaveoArticles: ImaveoArticle[] = [
  {
    slug: "veo-vs-sora",
    href: "/blog",
    category: "MODEL REVIEW",
    title: {
      en: "Veo 3.1 vs Sora 2: which model should creators pick in 2026?",
      zh: "Veo 3.1 vs Sora 2：2026 年创作者该选谁？",
    },
    excerpt: {
      en: "Compare motion realism, prompt adherence, and cost curves before you buy credits.",
      zh: "在充值前先比较运动真实度、提示词理解和成本曲线。",
    },
  },
  {
    slug: "anime-avatar-prompts",
    href: "/blog",
    category: "PROMPT GUIDE",
    title: {
      en: "How to generate a perfect anime avatar with Animeify prompts",
      zh: "如何用 Animeify 提示词生成一张完美二次元头像",
    },
    excerpt: {
      en: "A prompt formula for cosplay shots, profile pictures, and creator branding.",
      zh: "适用于 Cos 照、社交头像和创作者品牌图的一套提示词模板。",
    },
  },
  {
    slug: "ai-video-workflow",
    href: "/blog",
    category: "WORKFLOW",
    title: {
      en: "The Imaveo workflow: from still image to publish-ready short video",
      zh: "Imaveo 工作流：从一张静图到可发布的短视频",
    },
    excerpt: {
      en: "A practical production loop for ideation, image keyframes, and video generation.",
      zh: "一套从创意、关键帧到视频生成的实用生产流程。",
    },
  },
];

export function getImaveoModel(slug: string, category?: "video" | "image") {
  return imaveoModels.find((model) => model.slug === slug && (!category || model.category === category));
}
