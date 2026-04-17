import { imaveoArticles as articleCatalog } from "@/config/imaveo-articles";

export type ToolCategory = "video" | "image" | "audio";
export type GenerationMode = "text-to-video" | "image-to-video" | "text-to-image" | "image-to-image" | "anime";
export type ProviderId = "vertex" | "kling" | "fal" | "replicate" | "baidu";

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
  supportedModes?: GenerationMode[];
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
      en: "Turn prompts into cinematic clips with Veo, Sora, Seedance, and HappyHorse inside one workflow.",
      zh: "在一个工作流里用 Veo、Sora、Seedance 和 HappyHorse 把提示词直接生成视频。",
    },
    seo: {
      en: {
        title: "Text to Video Generator | Imaveo",
        description: "Generate AI videos from text prompts with Veo, Sora, Seedance, and HappyHorse on Imaveo.",
        keywords: ["text to video", "ai video generator", "veo text to video", "sora video generator", "happyhorse video"],
      },
      zh: {
        title: "文生视频工具 | Imaveo",
        description: "在 Imaveo 上使用 Veo、Sora、Seedance 和 HappyHorse，把一句提示词直接生成 AI 视频。",
        keywords: ["文生视频", "AI视频生成", "Veo 文生视频", "Sora 视频生成", "HappyHorse 视频生成"],
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
      en: "Animate still images into motion scenes with Seedance, HappyHorse, and other video models.",
      zh: "用 Seedance、HappyHorse 等视频模型把静态图片延展成动态镜头。",
    },
    seo: {
      en: {
        title: "Image to Video Generator | Imaveo",
        description: "Animate still images into AI videos with Seedance, HappyHorse, and other creator-friendly image-to-video models.",
        keywords: ["image to video", "ai animation", "animate image", "seedance image to video", "happyhorse ai"],
      },
      zh: {
        title: "图生视频工具 | Imaveo",
        description: "把静态图片变成短视频，适合角色动画、商品动效、老照片动态化和广告首帧延展。",
        keywords: ["图生视频", "图片生成视频", "AI动画", "图片转视频", "Seedance 图生视频"],
      },
    },
  },
  {
    slug: "text-to-image",
    category: "image",
    mode: "text-to-image",
    href: "/text-to-image",
    labels: { en: "Text to Image", zh: "文生图" },
    descriptions: {
      en: "Generate posters, thumbnails, product shots, and hero images with Nano Banana Pro, GPT Image, Flux Klein, and more.",
      zh: "用 Nano Banana Pro、GPT Image、Flux Klein 等模型生成海报、缩略图、商品图和品牌主视觉。",
    },
    seo: {
      en: {
        title: "Text to Image Generator | Imaveo",
        description: "Generate AI images from prompts with Nano Banana Pro, GPT Image, Ernie Image, Flux Klein, Wan, Z Image, and Qwen Image on Imaveo.",
        keywords: ["text to image", "ai image generator", "gpt image", "nano banana pro", "ernie image", "flux klein"],
      },
      zh: {
        title: "文生图工具 | Imaveo",
        description: "在 Imaveo 上使用 Nano Banana Pro、GPT Image、Ernie Image、Flux Klein、Wan、Z Image 和 Qwen Image 生成海报、广告图、商品图和品牌视觉。",
        keywords: ["文生图", "AI图片生成", "GPT Image", "Nano Banana Pro", "Ernie Image", "Flux Klein"],
      },
    },
  },
  {
    slug: "image-to-image",
    category: "image",
    mode: "image-to-image",
    href: "/image-to-image",
    labels: { en: "Image to Image", zh: "图生图" },
    descriptions: {
      en: "Upload a source image and refine it with Wan, Qwen Image, GPT Image, and other high-control image models.",
      zh: "上传原图，用 Wan、Qwen Image、GPT Image 等高控制力模型继续精修和扩展版本。",
    },
    seo: {
      en: {
        title: "Image to Image Generator | Imaveo",
        description: "Use image-to-image workflows on Imaveo to refine source images with Wan, Qwen Image, Ernie Image, and other high-control visual models.",
        keywords: ["image to image", "ai image to image", "wan image model", "qwen image", "ernie image", "product image generator"],
      },
      zh: {
        title: "图生图工具 | Imaveo",
        description: "在 Imaveo 上使用 Wan、Qwen Image、Ernie Image 等模型，把原图继续加工成海报、广告图、商品视觉和更完整的品牌图像。",
        keywords: ["图生图", "AI图生图", "Wan 图像模型", "Qwen Image", "Ernie Image", "商品图生成"],
      },
    },
  },
  {
    slug: "ai-image",
    category: "image",
    mode: "text-to-image",
    href: "/ai-image/nano-banana-pro",
    labels: { en: "AI Image", zh: "AI 图片" },
    descriptions: {
      en: "Generate key art, thumbnails, posters, and product visuals with a multi-model image stack.",
      zh: "用多模型图片矩阵生成主视觉、缩略图、海报和商品图。",
    },
    seo: {
      en: {
        title: "AI Image Generator | Imaveo",
        description: "Generate thumbnails, posters, ad visuals, and branded image assets with Nano Banana Pro, GPT Image, Ernie Image, Flux Klein, Wan, Z Image, and Qwen Image.",
        keywords: ["ai image generator", "nano banana pro", "gpt image", "ernie image", "flux klein", "poster generator"],
      },
      zh: {
        title: "AI 图片生成器 | Imaveo",
        description: "使用 Nano Banana Pro、GPT Image、Ernie Image、Flux Klein、Wan、Z Image 和 Qwen Image 生成海报、封面图、广告图和品牌视觉素材。",
        keywords: ["AI图片生成", "Nano Banana Pro", "GPT Image", "Ernie Image", "Flux Klein", "海报生成"],
      },
    },
  },
];

export const imaveoModels: ImaveoModel[] = [
  {
    slug: "veo-3",
    category: "video",
    provider: "Google Veo",
    providerId: "vertex",
    href: "/ai-video/veo-3",
    badge: "FLAGSHIP",
    mode: "text-to-video",
    labels: { en: "Veo", zh: "Veo" },
    descriptions: {
      en: "Flagship cinematic AI video generation for premium motion, stronger shot coherence, and polished first-pass output.",
      zh: "旗舰级电影感视频模型，适合更强的镜头一致性、更稳定的运动质量和更可用的首稿成片。",
    },
    strengths: {
      en: ["Cinematic camera language", "Higher motion coherence", "Strong first-pass quality"],
      zh: ["电影感镜头语言", "运动一致性更强", "首稿成片质量更高"],
    },
    seo: {
      en: {
        title: "Google Veo Video Generator | Imaveo",
        description: "Use Google Veo on Imaveo to generate cinematic AI videos with high motion coherence, stronger camera language, and premium scene quality.",
        keywords: ["google veo", "veo video generator", "veo ai video", "cinematic ai video"],
      },
      zh: {
        title: "Google Veo 视频生成器 | Imaveo",
        description: "在 Imaveo 上使用 Google Veo 生成电影级 AI 视频，适合更强镜头语言、更稳运动一致性和更高质量成片。",
        keywords: ["Google Veo", "Veo 视频生成", "Veo AI 视频", "电影感 AI 视频"],
      },
    },
    generationDefaults: { aspectRatio: "16:9", duration: 8, style: "Cinematic" },
  },
  {
    slug: "sora",
    category: "video",
    provider: "OpenAI Sora",
    providerId: "replicate",
    href: "/ai-video/sora",
    badge: "NARRATIVE",
    mode: "text-to-video",
    labels: { en: "Sora", zh: "Sora" },
    descriptions: {
      en: "Narrative-first AI video model for longer scene ideas, cinematic storytelling, and broader concept exploration.",
      zh: "偏叙事表达的视频模型，适合更长场景构想、电影化讲述和更宽的创意探索空间。",
    },
    strengths: {
      en: ["Narrative scene building", "Creative breadth", "Concept trailer generation"],
      zh: ["叙事场景构建", "创意跨度更大", "适合概念预告片"],
    },
    seo: {
      en: {
        title: "Sora AI Video Generator | Imaveo",
        description: "Generate AI videos with Sora on Imaveo for narrative scenes, concept trailers, cinematic shorts, and story-driven visual ideas.",
        keywords: ["sora ai video generator", "openai sora online", "sora text to video", "sora alternative"],
      },
      zh: {
        title: "Sora AI 视频生成器 | Imaveo",
        description: "在 Imaveo 上使用 Sora 生成 AI 视频，适合叙事场景、概念预告片、电影感短片和故事型画面表达。",
        keywords: ["Sora AI 视频", "OpenAI Sora 在线", "Sora 文生视频", "Sora 替代方案"],
      },
    },
    generationDefaults: { aspectRatio: "16:9", duration: 8, style: "Narrative" },
  },
  {
    slug: "seedance",
    category: "video",
    provider: "Seedance",
    providerId: "fal",
    href: "/ai-video/seedance",
    badge: "I2V",
    mode: "image-to-video",
    labels: { en: "Seedance", zh: "Seedance" },
    descriptions: {
      en: "Image-to-video model built for steady subject preservation, camera drift, and polished motion from a single frame.",
      zh: "图生视频模型，适合从单张首帧出发保留主体一致性，并生成更稳的镜头运动和动态延展。",
    },
    strengths: {
      en: ["Stable subject retention", "Poster and product animation", "Cleaner first-frame control"],
      zh: ["主体保留更稳", "适合海报与商品动效", "首帧控制更清晰"],
    },
    seo: {
      en: {
        title: "Seedance Image to Video Generator | Imaveo",
        description: "Use Seedance on Imaveo to animate posters, product stills, and character art into clean short-form AI videos.",
        keywords: ["seedance image to video", "seedance ai video", "animate image with seedance", "image to video ai"],
      },
      zh: {
        title: "Seedance 图生视频生成器 | Imaveo",
        description: "在 Imaveo 上使用 Seedance 把海报、商品图和角色图转成更稳定的 AI 视频，适合首帧延展和动态化展示。",
        keywords: ["Seedance 图生视频", "Seedance AI 视频", "图片转视频", "图生视频模型"],
      },
    },
    generationDefaults: { aspectRatio: "9:16", duration: 6, style: "Stable motion" },
  },
  {
    slug: "happyhorse",
    category: "video",
    provider: "HappyHorse AI",
    providerId: "replicate",
    href: "/ai-video/happyhorse",
    badge: "SOCIAL",
    mode: "image-to-video",
    labels: { en: "HappyHorse", zh: "HappyHorse" },
    descriptions: {
      en: "Fast social-first video generation for Shorts, motion teasers, vertical clips, and creator-led experiments.",
      zh: "偏社媒和短内容的视频模型，适合 Shorts、活动 teaser、竖屏短片和高频创意测试。",
    },
    strengths: {
      en: ["Vertical short-form clips", "Fast teaser generation", "Social-ready pacing"],
      zh: ["竖屏短片更合适", "适合快速 teaser", "更偏社媒节奏"],
    },
    seo: {
      en: {
        title: "HappyHorse AI Video Generator | Imaveo",
        description: "Generate AI Shorts, social clips, and vertical teaser videos with HappyHorse on Imaveo.",
        keywords: ["happyhorse ai", "happyhorse video generator", "ai shorts maker", "vertical ai video"],
      },
      zh: {
        title: "HappyHorse AI 视频生成器 | Imaveo",
        description: "在 Imaveo 上使用 HappyHorse 生成 Shorts、社媒短片和竖屏 teaser，适合高频内容分发与短视频测试。",
        keywords: ["HappyHorse AI", "HappyHorse 视频生成", "AI 短视频生成", "竖屏 AI 视频"],
      },
    },
    generationDefaults: { aspectRatio: "9:16", duration: 5, style: "Social short" },
  },
  {
    slug: "nano-banana-pro",
    category: "image",
    provider: "Nano Banana Pro",
    providerId: "fal",
    href: "/ai-image/nano-banana-pro",
    badge: "HOT",
    mode: "text-to-image",
    labels: { en: "Nano Banana Pro", zh: "Nano Banana Pro" },
    descriptions: {
      en: "High-conversion image model for posters, hero visuals, product campaigns, and commercial prompt work.",
      zh: "适合海报、主视觉、商品广告和商业 prompt 任务的高转化图片模型。",
    },
    strengths: {
      en: ["Commercial layouts", "Strong poster generation", "Stable brand visuals"],
      zh: ["商业构图稳定", "海报生成更强", "品牌视觉更稳"],
    },
    seo: {
      en: {
        title: "Nano Banana Pro Image Generator | Imaveo",
        description: "Generate posters, campaign visuals, hero images, and product marketing assets with Nano Banana Pro on Imaveo.",
        keywords: ["nano banana pro", "ai poster generator", "ai hero image", "product marketing visuals"],
      },
      zh: {
        title: "Nano Banana Pro 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Nano Banana Pro 生成海报、品牌主视觉、活动 KV 和商品营销图片。",
        keywords: ["Nano Banana Pro", "海报生成", "主视觉生成", "商品广告图"],
      },
    },
    generationDefaults: { aspectRatio: "1:1", style: "Commercial clean" },
  },
  {
    slug: "wan",
    category: "image",
    provider: "Wan",
    providerId: "replicate",
    href: "/ai-image/wan",
    badge: "EDIT",
    mode: "image-to-image",
    labels: { en: "Wan", zh: "Wan" },
    descriptions: {
      en: "Image-to-image model designed for controlled restyling, product cleanup, and source-image refinement.",
      zh: "偏图生图精修的模型，适合受控换风格、商品图优化和源图继续加工。",
    },
    strengths: {
      en: ["Controlled restyling", "Product cleanup", "Source-image fidelity"],
      zh: ["风格重绘可控", "商品图清理更稳", "保留原图信息更好"],
    },
    seo: {
      en: {
        title: "Wan Image Generator | Imaveo",
        description: "Use Wan on Imaveo for image-to-image refinement, product retouching, poster cleanup, and controlled restyling.",
        keywords: ["wan image model", "wan ai image", "image to image model", "product image retouching"],
      },
      zh: {
        title: "Wan 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Wan 做图生图精修、商品图优化、海报清理和受控重绘。",
        keywords: ["Wan 图片模型", "Wan AI 图片", "图生图精修", "商品图优化"],
      },
    },
    generationDefaults: { aspectRatio: "4:5", style: "Controlled edit" },
  },
  {
    slug: "gpt-image",
    category: "image",
    provider: "GPT Image",
    providerId: "replicate",
    href: "/ai-image/gpt-image",
    badge: "COPY",
    mode: "text-to-image",
    labels: { en: "GPT Image", zh: "GPT Image" },
    descriptions: {
      en: "Prompt-friendly image model for branded concepts, ad mockups, thumbnail ideation, and copy-led visuals.",
      zh: "更偏 prompt 理解和商业表达的图片模型，适合广告概念图、封面构思和文案驱动型视觉任务。",
    },
    strengths: {
      en: ["Prompt comprehension", "Ad concepting", "Copy-led visual tasks"],
      zh: ["提示词理解更强", "广告概念图更合适", "适合文案驱动任务"],
    },
    seo: {
      en: {
        title: "GPT Image Generator | Imaveo",
        description: "Generate ad mockups, thumbnails, brand concepts, and prompt-led visuals with GPT Image on Imaveo.",
        keywords: ["gpt image", "gpt image generator", "ai thumbnail generator", "brand concept generator"],
      },
      zh: {
        title: "GPT Image 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 GPT Image 生成广告概念图、缩略图、品牌方向图和文案驱动型视觉素材。",
        keywords: ["GPT Image", "GPT 图片生成", "缩略图生成", "广告概念图"],
      },
    },
    generationDefaults: { aspectRatio: "1:1", style: "Prompt-first" },
  },
  {
    slug: "flux-klein",
    category: "image",
    provider: "Flux Klein",
    providerId: "fal",
    href: "/ai-image/flux-klein",
    badge: "DESIGN",
    mode: "text-to-image",
    labels: { en: "Flux Klein", zh: "Flux Klein" },
    descriptions: {
      en: "Design-oriented image model for posters, editorial layouts, stylized covers, and sharper campaign art.",
      zh: "偏设计表现的图片模型，适合海报、封面、杂志感版式和更具风格化的营销视觉。",
    },
    strengths: {
      en: ["Poster composition", "Editorial styling", "Sharper campaign art"],
      zh: ["海报构图更强", "更适合编辑化风格", "营销视觉更锐利"],
    },
    seo: {
      en: {
        title: "Flux Klein Image Generator | Imaveo",
        description: "Create editorial posters, cover art, campaign visuals, and stylized compositions with Flux Klein on Imaveo.",
        keywords: ["flux klein", "poster image generator", "editorial poster ai", "campaign art generator"],
      },
      zh: {
        title: "Flux Klein 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Flux Klein 生成海报、封面、活动视觉和更有设计感的图片成片。",
        keywords: ["Flux Klein", "海报图片生成", "编辑感海报", "活动视觉生成"],
      },
    },
    generationDefaults: { aspectRatio: "4:5", style: "Editorial poster" },
  },
  {
    slug: "z-image",
    category: "image",
    provider: "Z Image",
    providerId: "replicate",
    href: "/ai-image/z-image",
    badge: "CLEAN",
    mode: "text-to-image",
    labels: { en: "Z Image", zh: "Z Image" },
    descriptions: {
      en: "Clean commercial image model for catalog shots, simple advertising layouts, and high-clarity product visuals.",
      zh: "偏干净商业风格的图片模型，适合目录图、简洁广告图和高辨识度商品视觉。",
    },
    strengths: {
      en: ["Clean product visuals", "Catalog-friendly outputs", "Simple commercial layouts"],
      zh: ["商品图更干净", "适合目录图输出", "商业排版更简洁"],
    },
    seo: {
      en: {
        title: "Z Image Generator | Imaveo",
        description: "Generate clean catalog visuals, simple ad layouts, and crisp product images with Z Image on Imaveo.",
        keywords: ["z image model", "catalog image generator", "clean ai product image", "commercial ai image"],
      },
      zh: {
        title: "Z Image 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Z Image 生成目录图、简洁广告图和高辨识度商品图片。",
        keywords: ["Z Image", "目录图生成", "商品图生成", "商业 AI 图片"],
      },
    },
    generationDefaults: { aspectRatio: "1:1", style: "Clean commerce" },
  },
  {
    slug: "ernie-image",
    category: "image",
    provider: "Ernie Image",
    providerId: "baidu",
    href: "/ai-image/ernie-image",
    badge: "VERSATILE",
    mode: "text-to-image",
    supportedModes: ["text-to-image", "image-to-image"],
    labels: { en: "Ernie Image", zh: "Ernie Image" },
    descriptions: {
      en: "A versatile image model for prompt-led concept generation, layout exploration, and source-image refinement inside one image stack.",
      zh: "兼顾文生图与图生图的通用图片模型，适合概念生成、版式探索和源图精修。",
    },
    strengths: {
      en: ["Prompt-driven concept generation", "Layout exploration", "Image refinement and extension"],
      zh: ["概念生成更直接", "版式探索更灵活", "图像精修与延展能力更均衡"],
    },
    seo: {
      en: {
        title: "Ernie Image Generator | Imaveo",
        description: "Use Ernie Image on Imaveo for text-to-image concepts, layout drafts, and image-to-image refinements in one workflow.",
        keywords: ["ernie image", "ernie image generator", "text to image", "image to image", "ai image model"],
      },
      zh: {
        title: "Ernie Image 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Ernie Image 完成文生图概念图、版式草图和图生图精修，让图片工作流更灵活。",
        keywords: ["Ernie Image", "Ernie 图片生成", "文生图", "图生图", "AI 图片模型"],
      },
    },
    generationDefaults: { aspectRatio: "4:5", style: "Flexible concept" },
  },
  {
    slug: "qwen-image",
    category: "image",
    provider: "Qwen Image",
    providerId: "replicate",
    href: "/ai-image/qwen-image",
    badge: "BRAND",
    mode: "image-to-image",
    labels: { en: "Qwen Image", zh: "Qwen Image" },
    descriptions: {
      en: "High-control image model for layout direction, brand consistency, image refinement, and campaign extensions.",
      zh: "更偏高控制力和品牌一致性的图片模型，适合版式方向图、图生图精修和活动视觉扩展。",
    },
    strengths: {
      en: ["Brand consistency", "Layout guidance", "Controlled image refinement"],
      zh: ["品牌一致性更强", "版式方向更清晰", "图生图控制更好"],
    },
    seo: {
      en: {
        title: "Qwen Image Generator | Imaveo",
        description: "Use Qwen Image on Imaveo for image refinement, brand-consistent layouts, campaign expansions, and controlled visual updates.",
        keywords: ["qwen image", "qwen image generator", "brand image generator", "image refinement ai"],
      },
      zh: {
        title: "Qwen Image 图片生成器 | Imaveo",
        description: "在 Imaveo 上使用 Qwen Image 做图像精修、品牌一致性版式、活动视觉扩展和受控视觉更新。",
        keywords: ["Qwen Image", "Qwen 图片生成", "品牌图片生成", "图像精修"],
      },
    },
    generationDefaults: { aspectRatio: "4:5", style: "Brand system" },
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
