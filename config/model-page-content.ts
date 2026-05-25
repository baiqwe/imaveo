type LocalizedText = {
  en: string;
  zh: string;
};

type ModelGalleryItem = {
  title: LocalizedText;
  result: LocalizedText;
  prompt: LocalizedText;
  accent: string;
};

type ModelPageProfile = {
  generatorTitle: LocalizedText;
  generatorHint: LocalizedText;
  promptPlaceholder: LocalizedText;
  starterPrompt: LocalizedText;
  visualDirection: LocalizedText;
  gallery: ModelGalleryItem[];
  workflow: LocalizedText[];
  guidance: Array<{
    title: LocalizedText;
    body: LocalizedText;
  }>;
  compare: {
    bestFor: LocalizedText;
    watchOut: LocalizedText;
    alternative: LocalizedText;
  };
  eeat: Array<{
    label: LocalizedText;
    detail: LocalizedText;
  }>;
};

const sharedEeat: ModelPageProfile["eeat"] = [
  {
    label: { en: "Workflow transparency", zh: "工作流透明度" },
    detail: {
      en: "The page explains the recommended mode, starting settings, and where a model may need additional iteration before production use.",
      zh: "页面会说明推荐工作流、起步参数，以及模型在正式生产前可能需要继续迭代的位置。",
    },
  },
  {
    label: { en: "Human review", zh: "人工复核" },
    detail: {
      en: "Review prompts, people, brands, text, and usage rights before publishing generated assets in campaigns or client work.",
      zh: "将生成结果用于活动或客户项目之前，建议复核提示词、人物、品牌、文字和使用权。",
    },
  },
  {
    label: { en: "Use-case fit", zh: "场景匹配" },
    detail: {
      en: "Model guidance is organized by realistic creative jobs such as product motion, story scenes, catalog images, posters, and brand extensions.",
      zh: "模型说明按真实创作任务组织，例如商品动效、叙事镜头、目录图、海报和品牌视觉扩展。",
    },
  },
];

export const modelPageProfiles: Record<string, ModelPageProfile> = {
  "veo-3": {
    generatorTitle: {
      en: "Draft a cinematic Veo shot",
      zh: "快速起草一个 Veo 电影感镜头",
    },
    generatorHint: {
      en: "Use Veo when the shot needs premium camera movement, stronger temporal coherence, and a polished first pass.",
      zh: "当镜头需要更高级的运动、更强时间一致性和更接近成片的首稿时，优先用 Veo。",
    },
    promptPlaceholder: {
      en: "Describe the subject, location, camera movement, lighting, and emotional turn...",
      zh: "描述主体、地点、镜头运动、光线和情绪转折...",
    },
    starterPrompt: {
      en: "A rain-soaked luxury car reveal at night, slow dolly-in, reflections on wet asphalt, cinematic contrast, restrained lens flare",
      zh: "雨夜豪华汽车揭幕，镜头缓慢推进，湿润柏油路反光，电影级对比度，克制镜头光晕",
    },
    visualDirection: { en: "premium launch film", zh: "高质感发布片" },
    gallery: [
      {
        title: { en: "Launch Film Open", zh: "发布片开场" },
        result: {
          en: "A polished 16:9 reveal shot for hero campaigns.",
          zh: "适合品牌首屏的 16:9 揭幕镜头。",
        },
        prompt: {
          en: "slow dolly-in, dramatic lighting, product reveal",
          zh: "缓慢推进，戏剧化灯光，产品揭幕",
        },
        accent: "from-amber-300/35 via-sky-300/10 to-zinc-950",
      },
      {
        title: { en: "Cinematic Character Beat", zh: "电影角色瞬间" },
        result: {
          en: "Stable motion around a character turn or entrance.",
          zh: "适合角色转身、入场等稳定运动。",
        },
        prompt: {
          en: "character enters frame, wind, shallow depth",
          zh: "角色入画，微风，浅景深",
        },
        accent: "from-blue-300/30 via-zinc-800 to-black",
      },
      {
        title: { en: "Architectural Atmosphere", zh: "建筑氛围镜头" },
        result: {
          en: "Slow environmental camera language for mood setting.",
          zh: "用环境镜头建立空间和氛围。",
        },
        prompt: {
          en: "wide establishing shot, fog, controlled camera",
          zh: "大全景，薄雾，受控镜头",
        },
        accent: "from-zinc-200/25 via-emerald-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Start with a single shot idea instead of a full story.",
        zh: "先从一个明确镜头开始，而不是一次写完整故事。",
      },
      {
        en: "Lock aspect ratio and camera movement before adding style words.",
        zh: "先锁定比例和镜头运动，再添加风格词。",
      },
      {
        en: "Generate one premium pass, then make smaller prompt adjustments.",
        zh: "先生成一版高质量首稿，再做小幅提示词调整。",
      },
      {
        en: "Move strong outputs into the creation library for campaign review.",
        zh: "把可用结果放进创作资产库，方便活动复审。",
      },
    ],
    guidance: [
      {
        title: { en: "What Veo is strongest at", zh: "Veo 最强的地方" },
        body: {
          en: "Veo is best for polished motion, controlled cinematic language, and scenes where a premium first impression matters more than speed.",
          zh: "Veo 更适合高质感运动、受控电影语言，以及首稿观感比速度更重要的场景。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Use subject, environment, camera move, light, pacing, and finish. Veo rewards clear shot direction over vague style stacking.",
          zh: "建议按主体、环境、镜头、光线、节奏和质感来写。Veo 更吃清晰镜头指令，而不是堆风格词。",
        },
      },
      {
        title: { en: "Production use", zh: "生产使用建议" },
        body: {
          en: "Use it for hero scenes, pitch films, and polished campaign shots where coherence is worth a slightly slower iteration loop.",
          zh: "适合主视觉镜头、提案短片和活动级成片，在这些场景里一致性比快速试错更重要。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "High-end cinematic shots and brand launch scenes.",
        zh: "高端电影感镜头和品牌发布片。",
      },
      watchOut: {
        en: "Less ideal for casual high-volume social tests.",
        zh: "不太适合非常轻量的高频社媒测试。",
      },
      alternative: {
        en: "Use HappyHorse for faster vertical social drafts, or Seedance when a source image must stay stable.",
        zh: "高频竖屏测试可选 HappyHorse；需要保留首帧可选 Seedance。",
      },
    },
    eeat: sharedEeat,
  },
  sora: {
    generatorTitle: {
      en: "Shape a Sora story scene",
      zh: "起草一个 Sora 叙事场景",
    },
    generatorHint: {
      en: "Use Sora for scenes where narrative premise, atmosphere, and concept exploration matter.",
      zh: "当重点是叙事设定、氛围和概念探索时，Sora 更合适。",
    },
    promptPlaceholder: {
      en: "Write the world, scene progression, subject action, and emotional arc...",
      zh: "写下世界观、场景推进、主体动作和情绪弧线...",
    },
    starterPrompt: {
      en: "A quiet astronaut discovers a glowing garden inside an abandoned subway station, slow reveal, surreal but grounded, cinematic short",
      zh: "安静的宇航员在废弃地铁站发现发光花园，缓慢揭示，超现实但真实，电影短片感",
    },
    visualDirection: { en: "story-first concept film", zh: "叙事优先的概念片" },
    gallery: [
      {
        title: { en: "Concept Trailer", zh: "概念预告片" },
        result: {
          en: "A mood-led scene that sells a fictional world.",
          zh: "用氛围带出虚构世界的短片镜头。",
        },
        prompt: {
          en: "world premise, reveal, emotional escalation",
          zh: "世界观，揭示，情绪递进",
        },
        accent: "from-indigo-300/35 via-fuchsia-300/10 to-black",
      },
      {
        title: { en: "Narrative Character", zh: "叙事角色镜头" },
        result: {
          en: "Character action that feels connected to a story.",
          zh: "让角色动作服务于故事设定。",
        },
        prompt: {
          en: "protagonist pauses, memory fragments, soft camera",
          zh: "主角停顿，记忆碎片，柔和镜头",
        },
        accent: "from-rose-300/30 via-slate-700 to-zinc-950",
      },
      {
        title: { en: "Impossible Setting", zh: "奇观场景" },
        result: {
          en: "Broad visual ideas before production treatment.",
          zh: "适合正式制作前探索大视觉方向。",
        },
        prompt: {
          en: "surreal city, grounded physics, dramatic scale",
          zh: "超现实城市，物理可信，宏大尺度",
        },
        accent: "from-cyan-300/25 via-violet-400/10 to-black",
      },
    ],
    workflow: [
      {
        en: "Write the premise before the shot list.",
        zh: "先写清故事前提，再写镜头。",
      },
      {
        en: "Use a clear emotional verb for the subject.",
        zh: "给主体一个明确的情绪动作。",
      },
      {
        en: "Generate concept passes, then narrow the visual grammar.",
        zh: "先生成概念版本，再收窄视觉语言。",
      },
      {
        en: "Compare Sora against Veo when the final output must feel more polished.",
        zh: "如果最终要更成片感，再和 Veo 横向比较。",
      },
    ],
    guidance: [
      {
        title: { en: "Story over product demo", zh: "故事优先于产品演示" },
        body: {
          en: "Sora pages should answer narrative intent: what is happening, why it matters, and what world the viewer is entering.",
          zh: "Sora 页面应优先回答叙事意图：发生了什么、为什么重要、观众进入了怎样的世界。",
        },
      },
      {
        title: { en: "Best prompt ingredients", zh: "最佳提示词要素" },
        body: {
          en: "Premise, subject motivation, setting rules, camera distance, and tonal reference usually matter more than listing many visual adjectives.",
          zh: "故事前提、主体动机、场景规则、镜头距离和情绪基调通常比堆砌形容词更重要。",
        },
      },
      {
        title: { en: "Where it fits", zh: "适用位置" },
        body: {
          en: "Use it for pitch scenes, concept trailers, speculative worlds, and story-led social teasers.",
          zh: "适合提案场景、概念预告、虚构世界和带故事钩子的社媒 teaser。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Narrative exploration and concept trailers.",
        zh: "叙事探索和概念预告片。",
      },
      watchOut: {
        en: "If you only need a product loop, it may be too story-heavy.",
        zh: "如果只需要商品循环动效，可能过于叙事化。",
      },
      alternative: {
        en: "Use Veo for premium cinematic polish or Seedance for first-frame animation.",
        zh: "要电影级成片感选 Veo；要首帧延展选 Seedance。",
      },
    },
    eeat: sharedEeat,
  },
  seedance: {
    generatorTitle: {
      en: "Animate a Seedance first frame",
      zh: "用 Seedance 延展一张首帧",
    },
    generatorHint: {
      en: "Use Seedance when the input image matters: posters, product stills, characters, and controlled image-to-video motion.",
      zh: "当输入图片本身很重要时使用 Seedance：海报、商品静物、角色图和受控图生视频。",
    },
    promptPlaceholder: {
      en: "Describe camera drift, subject motion, parallax, loop behavior, and what must stay unchanged...",
      zh: "描述镜头漂移、主体运动、视差、循环方式，以及必须保持不变的内容...",
    },
    starterPrompt: {
      en: "Subtle parallax from a premium product poster, slow push-in, liquid highlights move gently, logo and packaging stay sharp",
      zh: "高端产品海报产生轻微视差，镜头缓慢推进，液体高光轻柔流动，logo 和包装保持清晰",
    },
    visualDirection: {
      en: "controlled first-frame motion",
      zh: "受控首帧动效",
    },
    gallery: [
      {
        title: { en: "Product Poster Motion", zh: "商品海报动效" },
        result: {
          en: "Adds camera drift without losing packaging identity.",
          zh: "增加镜头漂移，同时保留包装识别度。",
        },
        prompt: {
          en: "slow push-in, highlights shimmer, logo locked",
          zh: "缓慢推进，高光闪动，logo 锁定",
        },
        accent: "from-emerald-300/30 via-amber-300/10 to-zinc-950",
      },
      {
        title: { en: "Character Art Loop", zh: "角色图循环" },
        result: {
          en: "Hair, fabric, and atmosphere move while the face remains stable.",
          zh: "头发、衣料和氛围运动，脸部保持稳定。",
        },
        prompt: {
          en: "hair motion, blinking, ambient dust, stable face",
          zh: "发丝运动，眨眼，空气尘埃，脸部稳定",
        },
        accent: "from-pink-300/25 via-sky-300/10 to-black",
      },
      {
        title: { en: "Social Teaser", zh: "社媒 teaser" },
        result: {
          en: "Turns one key visual into a short vertical motion asset.",
          zh: "把一张 KV 变成竖屏短动效素材。",
        },
        prompt: {
          en: "vertical crop, slow reveal, layered depth",
          zh: "竖屏裁切，缓慢揭示，分层景深",
        },
        accent: "from-yellow-300/25 via-orange-400/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Upload the strongest first frame or product visual.",
        zh: "上传最强的首帧或商品视觉。",
      },
      {
        en: "Name what must remain unchanged before describing motion.",
        zh: "先写哪些内容必须保持不变，再描述运动。",
      },
      {
        en: "Start with subtle movement and increase only after stability is confirmed.",
        zh: "先用轻微运动确认稳定性，再逐步加大动作。",
      },
      {
        en: "Use the creation library to compare first-frame fidelity across variants.",
        zh: "用创作资产库对比不同版本的首帧保真度。",
      },
    ],
    guidance: [
      {
        title: { en: "First-frame fidelity", zh: "首帧保真" },
        body: {
          en: "Seedance pages should help users think like motion designers: preserve the hero image, then add depth, drift, and small subject motion.",
          zh: "Seedance 页面应引导用户像动效设计师一样思考：先保留主视觉，再加入景深、漂移和轻微主体运动。",
        },
      },
      {
        title: { en: "Motion vocabulary", zh: "运动词汇" },
        body: {
          en: "Useful words include parallax, slow push-in, locked logo, subtle blink, fabric motion, depth layers, and clean loop.",
          zh: "可用词包括视差、缓慢推进、锁定 logo、轻微眨眼、衣料运动、景深分层、干净循环。",
        },
      },
      {
        title: { en: "Business fit", zh: "商业适配" },
        body: {
          en: "It is a strong fit for e-commerce motion, poster animation, character loops, and campaign assets derived from approved stills.",
          zh: "适合电商动效、海报动画、角色循环，以及从已批准静态图延展出的活动素材。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Image-to-video where the original frame must stay recognizable.",
        zh: "需要保留原始首帧识别度的图生视频。",
      },
      watchOut: {
        en: "Large action changes can reduce source-image fidelity.",
        zh: "过大的动作变化可能降低原图保真度。",
      },
      alternative: {
        en: "Use Veo for text-first cinematic generation, or HappyHorse for faster vertical drafts.",
        zh: "文生电影感选 Veo；快速竖屏草稿选 HappyHorse。",
      },
    },
    eeat: sharedEeat,
  },
  happyhorse: {
    generatorTitle: {
      en: "Make a HappyHorse social clip",
      zh: "生成一个 HappyHorse 社媒短片",
    },
    generatorHint: {
      en: "Use HappyHorse for quick vertical clips, Shorts experiments, teaser motion, and high-frequency creative testing.",
      zh: "HappyHorse 适合快速竖屏短片、Shorts 测试、teaser 动效和高频创意试跑。",
    },
    promptPlaceholder: {
      en: "Describe the hook, vertical framing, source image motion, pacing, and social platform mood...",
      zh: "描述开场钩子、竖屏构图、原图运动、节奏和社媒氛围...",
    },
    starterPrompt: {
      en: "A vertical sneaker teaser, fast product reveal, punchy camera pop, urban lighting, three-second loop for Shorts",
      zh: "竖屏运动鞋 teaser，快速产品揭示，有冲击力的镜头弹出，城市灯光，适合 Shorts 的三秒循环",
    },
    visualDirection: { en: "fast social teaser", zh: "快速社媒 teaser" },
    gallery: [
      {
        title: { en: "Shorts Hook", zh: "Shorts 开场钩子" },
        result: {
          en: "Fast visual hook for creator-led vertical videos.",
          zh: "适合创作者竖屏视频的快速视觉钩子。",
        },
        prompt: {
          en: "first-second reveal, vertical, bold motion",
          zh: "首秒揭示，竖屏，强运动",
        },
        accent: "from-lime-300/30 via-cyan-300/10 to-zinc-950",
      },
      {
        title: { en: "Event Teaser", zh: "活动 teaser" },
        result: {
          en: "A lightweight animated asset for announcements.",
          zh: "适合活动发布的轻量动态素材。",
        },
        prompt: {
          en: "countdown energy, fast pan, bright accents",
          zh: "倒计时能量，快速摇镜，亮色点缀",
        },
        accent: "from-orange-300/35 via-red-300/10 to-black",
      },
      {
        title: { en: "Creator Product Beat", zh: "创作者商品节奏" },
        result: {
          en: "Product motion tuned for high-volume testing.",
          zh: "用于高频测试的商品动效。",
        },
        prompt: {
          en: "quick zoom, handheld energy, product stays centered",
          zh: "快速变焦，手持感，商品居中",
        },
        accent: "from-fuchsia-300/30 via-yellow-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Write the hook first: what happens in the first second?",
        zh: "先写开场钩子：第一秒发生什么？",
      },
      {
        en: "Use 9:16 unless the asset is clearly horizontal.",
        zh: "除非素材明显横屏，否则优先 9:16。",
      },
      {
        en: "Generate multiple small variants instead of one over-specified clip.",
        zh: "生成多个小变体，而不是一次写得过度复杂。",
      },
      {
        en: "Keep winners in the creation library for future social batches.",
        zh: "把有效版本放入资产库，后续批量复用。",
      },
    ],
    guidance: [
      {
        title: { en: "Speed and volume", zh: "速度与批量" },
        body: {
          en: "HappyHorse is positioned around iteration: hooks, small variants, teaser pacing, and social assets that can be tested quickly.",
          zh: "HappyHorse 的核心是迭代：钩子、小变体、teaser 节奏，以及可以快速测试的社媒素材。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Start with platform format, first-second hook, product or subject, camera punch, and loop behavior.",
          zh: "建议从平台格式、首秒钩子、商品或主体、镜头冲击和循环方式写起。",
        },
      },
      {
        title: { en: "When to scale", zh: "何时放大使用" },
        body: {
          en: "Use it after you know the creative angle and need many variations for ads, Shorts, reels, or event snippets.",
          zh: "当创意方向已经明确，需要为广告、Shorts、Reels 或活动切出大量变体时使用。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Vertical social drafts, Shorts, and fast teaser loops.",
        zh: "竖屏社媒草稿、Shorts 和快速 teaser 循环。",
      },
      watchOut: {
        en: "Not the first choice for premium cinematic hero shots.",
        zh: "不适合作为高端电影感主视觉镜头的第一选择。",
      },
      alternative: {
        en: "Use Veo for premium polish or Seedance when image fidelity matters more.",
        zh: "需要高端质感选 Veo；更重视首帧保真选 Seedance。",
      },
    },
    eeat: sharedEeat,
  },
  "nano-banana-pro": {
    generatorTitle: {
      en: "Build a Nano Banana Pro campaign visual",
      zh: "生成 Nano Banana Pro 活动视觉",
    },
    generatorHint: {
      en: "Use Nano Banana Pro for commercial layouts, poster-ready key visuals, product campaigns, and conversion-oriented imagery.",
      zh: "Nano Banana Pro 适合商业构图、海报级主视觉、商品活动和转化导向图片。",
    },
    promptPlaceholder: {
      en: "Describe the product, audience, layout, headline space, lighting, and commercial finish...",
      zh: "描述商品、受众、版式、标题留白、光线和商业质感...",
    },
    starterPrompt: {
      en: "Premium skincare campaign poster, centered serum bottle, soft gold rim light, clean headline space, luxury retail finish",
      zh: "高端护肤品活动海报，精华瓶居中，柔和金色轮廓光，干净标题留白，奢华零售质感",
    },
    visualDirection: { en: "commercial poster system", zh: "商业海报系统" },
    gallery: [
      {
        title: { en: "Retail Hero Poster", zh: "零售主海报" },
        result: {
          en: "A clean product-first layout with obvious copy space.",
          zh: "商品优先且留出明显文案空间的构图。",
        },
        prompt: {
          en: "centered product, retail lighting, headline space",
          zh: "商品居中，零售灯光，标题留白",
        },
        accent: "from-yellow-300/35 via-white/10 to-zinc-950",
      },
      {
        title: { en: "Campaign KV", zh: "活动 KV" },
        result: {
          en: "A key visual suitable for landing pages and ads.",
          zh: "适合落地页和广告投放的主视觉。",
        },
        prompt: {
          en: "brand key visual, premium finish, clear hierarchy",
          zh: "品牌主视觉，高端质感，层级清晰",
        },
        accent: "from-amber-300/30 via-rose-200/10 to-black",
      },
      {
        title: { en: "Product Bundle", zh: "商品组合图" },
        result: {
          en: "Multiple SKUs arranged for campaign storytelling.",
          zh: "多 SKU 用活动叙事方式排列。",
        },
        prompt: {
          en: "product family, clean composition, soft shadows",
          zh: "产品家族，干净构图，柔和阴影",
        },
        accent: "from-lime-200/25 via-amber-200/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Define the commercial job: poster, hero, product page, or ad.",
        zh: "先定义商业任务：海报、主视觉、商品页还是广告。",
      },
      {
        en: "Reserve space for headline, logo, or CTA in the prompt.",
        zh: "在提示词里预留标题、logo 或 CTA 空间。",
      },
      {
        en: "Generate a square or 4:5 master before adapting to channels.",
        zh: "先生成 1:1 或 4:5 母版，再适配各渠道。",
      },
      {
        en: "Store winning variants for product page and social reuse.",
        zh: "把有效变体保存，后续用于商品页和社媒复用。",
      },
    ],
    guidance: [
      {
        title: { en: "Commercial intent", zh: "商业意图" },
        body: {
          en: "This page should feel like a campaign builder: product hierarchy, clean composition, copy space, and sellable finish.",
          zh: "这个页面应像活动视觉生成器：强调商品层级、干净构图、文案留白和可销售质感。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Product, market category, background, lighting, composition, text-safe area, and output channel are the most useful details.",
          zh: "商品、市场品类、背景、灯光、构图、文字安全区和输出渠道是最有用的信息。",
        },
      },
      {
        title: { en: "Where it wins", zh: "优势场景" },
        body: {
          en: "Use it for posters, product launch images, paid social concepts, and hero visuals that need a clear commercial read.",
          zh: "适合海报、产品发布图、投放概念图和需要商业识别度的主视觉。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Commercial posters, product campaigns, and hero visuals.",
        zh: "商业海报、商品活动和主视觉。",
      },
      watchOut: {
        en: "If you need source-image edits, start from Wan or Qwen Image instead.",
        zh: "如果需要基于原图精修，优先从 Wan 或 Qwen Image 开始。",
      },
      alternative: {
        en: "Use Flux Klein for more editorial poster style or Z Image for cleaner catalog shots.",
        zh: "更偏编辑海报选 Flux Klein；更干净目录图选 Z Image。",
      },
    },
    eeat: sharedEeat,
  },
  wan: {
    generatorTitle: {
      en: "Refine a source image with Wan",
      zh: "用 Wan 精修一张源图",
    },
    generatorHint: {
      en: "Use Wan for controlled restyling, product cleanup, source-image fidelity, and practical image-to-image refinement.",
      zh: "Wan 适合受控换风格、商品清理、保留源图信息和实用图生图精修。",
    },
    promptPlaceholder: {
      en: "Describe what to preserve, what to clean up, what style to apply, and what details to avoid changing...",
      zh: "描述要保留什么、清理什么、应用什么风格，以及哪些细节不要改变...",
    },
    starterPrompt: {
      en: "Clean up the uploaded product photo, preserve packaging shape and label placement, improve studio lighting, remove background clutter",
      zh: "清理上传的商品图，保留包装形状和标签位置，提升棚拍光线，去除背景杂乱",
    },
    visualDirection: { en: "controlled image refinement", zh: "受控图片精修" },
    gallery: [
      {
        title: { en: "Product Cleanup", zh: "商品图清理" },
        result: {
          en: "Removes clutter while keeping product identity.",
          zh: "去除杂乱，同时保留商品识别。",
        },
        prompt: {
          en: "preserve label, clean background, studio light",
          zh: "保留标签，清洁背景，棚拍光",
        },
        accent: "from-cyan-200/25 via-zinc-300/10 to-zinc-950",
      },
      {
        title: { en: "Style Transfer", zh: "受控换风格" },
        result: {
          en: "Applies a new finish without rebuilding the whole image.",
          zh: "改变视觉质感，但不重建整张图。",
        },
        prompt: {
          en: "same composition, editorial finish, richer shadows",
          zh: "同样构图，编辑质感，更丰富阴影",
        },
        accent: "from-violet-300/25 via-sky-300/10 to-black",
      },
      {
        title: { en: "Poster Cleanup", zh: "海报清理" },
        result: {
          en: "Improves a draft poster into a cleaner visual base.",
          zh: "把草稿海报优化成更干净的视觉底稿。",
        },
        prompt: {
          en: "remove artifacts, sharpen subject, keep layout",
          zh: "去除瑕疵，强化主体，保留版式",
        },
        accent: "from-emerald-300/25 via-white/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Upload the source image and list the preserved elements first.",
        zh: "上传源图后，先列出必须保留的元素。",
      },
      {
        en: "Separate cleanup instructions from style instructions.",
        zh: "把清理要求和风格要求分开写。",
      },
      {
        en: "Use subtle or balanced strength for product identity.",
        zh: "商品识别度重要时，用轻度或平衡强度。",
      },
      {
        en: "Compare variants in the creation library before using them in campaigns.",
        zh: "进入投放前，在资产库里对比变体。",
      },
    ],
    guidance: [
      {
        title: { en: "Edit discipline", zh: "编辑纪律" },
        body: {
          en: "Wan is strongest when the user can name exactly what should stay and exactly what should change.",
          zh: "当用户能明确说出什么要保留、什么要改变时，Wan 的效果最好。",
        },
      },
      {
        title: { en: "Useful constraints", zh: "有效约束" },
        body: {
          en: "Preserve composition, preserve product label, remove background clutter, improve light, and keep color family are practical constraints.",
          zh: "保留构图、保留商品标签、去除背景杂乱、提升光线、保持色系都是实用约束。",
        },
      },
      {
        title: { en: "Where it fits", zh: "适用位置" },
        body: {
          en: "Use it for polishing existing assets, cleaning product shots, reworking poster drafts, and producing controlled visual variants.",
          zh: "适合精修已有素材、清理商品图、优化海报草稿和生成受控视觉变体。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Image-to-image cleanup and controlled restyling.",
        zh: "图生图清理和受控重绘。",
      },
      watchOut: {
        en: "Not the best first choice when no source image exists.",
        zh: "没有源图时，它不是第一选择。",
      },
      alternative: {
        en: "Use Nano Banana Pro for text-to-image campaigns or Qwen Image for brand-system continuity.",
        zh: "纯文生商业视觉选 Nano Banana Pro；品牌系统延展选 Qwen Image。",
      },
    },
    eeat: sharedEeat,
  },
  "gpt-image": {
    generatorTitle: {
      en: "Write a GPT Image visual brief",
      zh: "写一个 GPT Image 视觉 brief",
    },
    generatorHint: {
      en: "Use GPT Image for prompt-led visuals, ad mockups, thumbnails, concept boards, and copy-aware image direction.",
      zh: "GPT Image 适合 prompt 驱动的视觉、广告概念图、缩略图、概念板和文案理解型任务。",
    },
    promptPlaceholder: {
      en: "Describe the message, audience, key visual, layout, copy relationship, and expected output...",
      zh: "描述信息、受众、核心视觉、版式、文案关系和预期输出...",
    },
    starterPrompt: {
      en: "YouTube thumbnail concept for an AI productivity video, expressive founder portrait, clear before-after composition, readable title area",
      zh: "AI 效率视频的 YouTube 缩略图概念，创始人表情鲜明，清晰前后对比构图，标题区域可读",
    },
    visualDirection: {
      en: "copy-aware creative concept",
      zh: "文案理解型创意概念",
    },
    gallery: [
      {
        title: { en: "Ad Mockup", zh: "广告概念图" },
        result: {
          en: "Translates a message into a visual advertising direction.",
          zh: "把信息转成可见的广告方向。",
        },
        prompt: {
          en: "pain point, product promise, clear composition",
          zh: "痛点，产品承诺，清晰构图",
        },
        accent: "from-sky-300/30 via-amber-300/10 to-zinc-950",
      },
      {
        title: { en: "Thumbnail Ideation", zh: "缩略图构思" },
        result: {
          en: "Makes the content hook visually obvious.",
          zh: "让内容钩子在视觉上更明确。",
        },
        prompt: {
          en: "big contrast, readable title zone, expressive face",
          zh: "强对比，可读标题区，表情鲜明",
        },
        accent: "from-red-300/30 via-yellow-300/10 to-black",
      },
      {
        title: { en: "Brand Concept", zh: "品牌概念图" },
        result: {
          en: "Explores visual metaphors for positioning.",
          zh: "探索定位背后的视觉隐喻。",
        },
        prompt: {
          en: "metaphor, audience, brand tone, campaign visual",
          zh: "隐喻，受众，品牌语气，活动视觉",
        },
        accent: "from-emerald-300/25 via-blue-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Start from the message, not only the image style.",
        zh: "从信息出发，而不只是从图片风格出发。",
      },
      {
        en: "Tell the model where copy needs to live.",
        zh: "明确文案需要放在哪里。",
      },
      {
        en: "Generate several concept directions before polishing one.",
        zh: "先生成多个概念方向，再精修其中一个。",
      },
      {
        en: "Move promising concepts into the library for team review.",
        zh: "把有潜力的概念放入资产库，便于团队复审。",
      },
    ],
    guidance: [
      {
        title: { en: "Prompt comprehension", zh: "提示词理解" },
        body: {
          en: "GPT Image is framed around instruction following, concept translation, and visuals where the idea is as important as the rendering style.",
          zh: "GPT Image 的重点是理解指令、转译概念，以及处理创意本身和渲染风格同等重要的视觉。",
        },
      },
      {
        title: { en: "Brief structure", zh: "Brief 结构" },
        body: {
          en: "Use audience, objective, message, subject, layout, text-safe space, and emotional tone.",
          zh: "建议写清受众、目标、信息、主体、版式、文字安全区和情绪语气。",
        },
      },
      {
        title: { en: "When to use it", zh: "何时使用" },
        body: {
          en: "Use it when the output must communicate an idea, title, comparison, offer, or campaign message.",
          zh: "当图片需要表达观点、标题、对比、优惠或活动信息时使用。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Prompt-led visuals, ad concepts, thumbnails, and copy-aware layouts.",
        zh: "Prompt 驱动视觉、广告概念、缩略图和文案理解型版式。",
      },
      watchOut: {
        en: "For pure catalog cleanliness, Z Image may be more direct.",
        zh: "如果只追求目录图干净度，Z Image 可能更直接。",
      },
      alternative: {
        en: "Use Flux Klein for stronger editorial poster styling or Nano Banana Pro for campaign hero images.",
        zh: "更强编辑海报风格选 Flux Klein；活动主视觉选 Nano Banana Pro。",
      },
    },
    eeat: sharedEeat,
  },
  "flux-klein": {
    generatorTitle: {
      en: "Compose a Flux Klein poster",
      zh: "创作一张 Flux Klein 设计海报",
    },
    generatorHint: {
      en: "Use Flux Klein for editorial posters, cover art, campaign layouts, and sharper design-forward compositions.",
      zh: "Flux Klein 适合编辑感海报、封面、活动版式和更锐利的设计导向构图。",
    },
    promptPlaceholder: {
      en: "Describe the poster system, subject, typography area, editorial treatment, color contrast, and texture...",
      zh: "描述海报系统、主体、文字区域、编辑化处理、色彩对比和材质...",
    },
    starterPrompt: {
      en: "Editorial music festival poster, bold central figure silhouette, sharp typographic space, high contrast print texture, modern layout",
      zh: "编辑感音乐节海报，大胆中心人物剪影，清晰字体区域，高对比印刷纹理，现代版式",
    },
    visualDirection: { en: "editorial poster language", zh: "编辑化海报语言" },
    gallery: [
      {
        title: { en: "Editorial Cover", zh: "编辑封面" },
        result: {
          en: "A stylized cover with strong visual hierarchy.",
          zh: "层级鲜明的风格化封面。",
        },
        prompt: {
          en: "cover art, central figure, print texture",
          zh: "封面艺术，中心人物，印刷纹理",
        },
        accent: "from-purple-300/25 via-orange-300/10 to-zinc-950",
      },
      {
        title: { en: "Event Poster", zh: "活动海报" },
        result: {
          en: "Design-forward campaign art for announcements.",
          zh: "用于活动宣发的设计感视觉。",
        },
        prompt: {
          en: "bold layout, contrast, stage lighting",
          zh: "大胆版式，对比，舞台灯光",
        },
        accent: "from-red-300/30 via-yellow-300/10 to-black",
      },
      {
        title: { en: "Campaign Art", zh: "活动视觉" },
        result: {
          en: "A sharper style direction for brand campaigns.",
          zh: "更锐利的品牌活动方向。",
        },
        prompt: {
          en: "stylized product, editorial grid, color punch",
          zh: "风格化商品，编辑网格，色彩冲击",
        },
        accent: "from-cyan-300/25 via-lime-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Choose poster, cover, or campaign art as the output type.",
        zh: "先选择海报、封面或活动视觉作为输出类型。",
      },
      {
        en: "Give hierarchy: title area, subject scale, supporting elements.",
        zh: "写清层级：标题区域、主体尺度、辅助元素。",
      },
      {
        en: "Use 4:5 for social posters or 16:9 for page heroes.",
        zh: "社媒海报用 4:5，页面主视觉可用 16:9。",
      },
      {
        en: "Generate variations around layout before changing the concept.",
        zh: "先围绕版式生成变体，再改变概念。",
      },
    ],
    guidance: [
      {
        title: { en: "Design language", zh: "设计语言" },
        body: {
          en: "Flux Klein should be framed as a design model: composition, hierarchy, print energy, and campaign taste are the core content.",
          zh: "Flux Klein 应被定位为设计模型：构图、层级、印刷感和活动审美是核心内容。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Output format, subject, layout grid, typographic zone, contrast, material texture, and channel usually produce stronger prompts.",
          zh: "输出格式、主体、版式网格、字体区域、对比、材质纹理和渠道通常能写出更强提示词。",
        },
      },
      {
        title: { en: "Best work", zh: "最佳用途" },
        body: {
          en: "Use it for posters, album-style covers, social campaign art, and brand visuals that should feel designed rather than generic.",
          zh: "适合海报、专辑式封面、社媒活动视觉，以及需要明显设计感的品牌图。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Editorial posters, covers, and design-forward campaign art.",
        zh: "编辑海报、封面和设计导向活动视觉。",
      },
      watchOut: {
        en: "For plain product catalogs, it can be more stylized than needed.",
        zh: "普通商品目录图可能会过度风格化。",
      },
      alternative: {
        en: "Use Z Image for catalog clarity or Nano Banana Pro for broader commercial hero visuals.",
        zh: "目录清晰度选 Z Image；广义商业主视觉选 Nano Banana Pro。",
      },
    },
    eeat: sharedEeat,
  },
  "z-image": {
    generatorTitle: {
      en: "Create a clean Z Image product visual",
      zh: "生成一张 Z Image 干净商品图",
    },
    generatorHint: {
      en: "Use Z Image for clean catalog shots, simple advertising layouts, crisp product assets, and high-clarity commercial visuals.",
      zh: "Z Image 适合干净目录图、简洁广告版式、清晰商品资产和高辨识商业视觉。",
    },
    promptPlaceholder: {
      en: "Describe the product, background, catalog angle, lighting, shadow, and cleanliness requirements...",
      zh: "描述商品、背景、目录角度、光线、阴影和干净度要求...",
    },
    starterPrompt: {
      en: "Clean catalog image of a ceramic desk lamp, neutral background, soft studio shadow, crisp edges, no extra props",
      zh: "陶瓷台灯干净目录图，中性背景，柔和棚拍阴影，边缘清晰，不加多余道具",
    },
    visualDirection: { en: "catalog-ready clarity", zh: "目录级清晰度" },
    gallery: [
      {
        title: { en: "Catalog Shot", zh: "目录图" },
        result: {
          en: "A crisp product asset ready for listings.",
          zh: "适合商品列表的清晰资产。",
        },
        prompt: {
          en: "neutral background, crisp edge, soft shadow",
          zh: "中性背景，清晰边缘，柔和阴影",
        },
        accent: "from-zinc-100/25 via-sky-200/10 to-zinc-950",
      },
      {
        title: { en: "Simple Ad Layout", zh: "简洁广告图" },
        result: {
          en: "Commercial visual with minimal distractions.",
          zh: "没有多余干扰的商业视觉。",
        },
        prompt: {
          en: "single product, clean copy space, soft light",
          zh: "单个商品，干净文案区，柔光",
        },
        accent: "from-lime-200/25 via-white/10 to-black",
      },
      {
        title: { en: "Marketplace Visual", zh: "电商视觉" },
        result: {
          en: "High-readability image for commerce contexts.",
          zh: "适合电商语境的高可读图片。",
        },
        prompt: {
          en: "front angle, product scale, no clutter",
          zh: "正面角度，商品尺度，无杂乱",
        },
        accent: "from-cyan-200/25 via-zinc-200/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Use a simple subject and clear background instruction.",
        zh: "使用简单主体和明确背景指令。",
      },
      {
        en: "Ask for soft shadow and crisp edges instead of heavy styling.",
        zh: "要求柔和阴影和清晰边缘，而不是重风格化。",
      },
      {
        en: "Generate catalog masters before adding ad copy or layout elements.",
        zh: "先生成目录母版，再添加广告文案或版式元素。",
      },
      {
        en: "Keep final images grouped by product family in the creation library.",
        zh: "按商品系列把最终图归入创作资产库。",
      },
    ],
    guidance: [
      {
        title: { en: "Clarity first", zh: "清晰度优先" },
        body: {
          en: "Z Image pages should focus on commerce clarity: product edges, clean background, consistent light, and easy comparison.",
          zh: "Z Image 页面应强调商业清晰度：商品边缘、干净背景、一致光线和易比较性。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Product type, angle, background, shadow, scale, and what not to include are usually enough.",
          zh: "商品类型、角度、背景、阴影、尺度和排除项通常就足够。",
        },
      },
      {
        title: { en: "Best use", zh: "最佳用途" },
        body: {
          en: "Use it for listing visuals, product families, simple ads, and commercial images where legibility beats style.",
          zh: "适合列表图、商品家族图、简洁广告，以及可读性优先于风格的商业图片。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Clean product images, catalog visuals, and simple commercial layouts.",
        zh: "干净商品图、目录视觉和简洁商业版式。",
      },
      watchOut: {
        en: "It is intentionally less dramatic than editorial poster models.",
        zh: "它本来就不会像编辑海报模型那样戏剧化。",
      },
      alternative: {
        en: "Use Flux Klein for expressive posters or GPT Image for copy-led concepts.",
        zh: "表现型海报选 Flux Klein；文案概念选 GPT Image。",
      },
    },
    eeat: sharedEeat,
  },
  "ernie-image": {
    generatorTitle: {
      en: "Explore an Ernie Image concept",
      zh: "探索一个 Ernie Image 概念图",
    },
    generatorHint: {
      en: "Use Ernie Image when you need flexible concept generation, layout exploration, and both text-to-image and image-to-image paths.",
      zh: "当你需要灵活概念生成、版式探索，并兼顾文生图和图生图时，可以使用 Ernie Image。",
    },
    promptPlaceholder: {
      en: "Describe the concept, layout direction, reference constraints, style range, and refinement goal...",
      zh: "描述概念、版式方向、参考约束、风格范围和精修目标...",
    },
    starterPrompt: {
      en: "Flexible brand concept board for a smart home product, multiple layout directions, warm technology mood, clean product focus",
      zh: "智能家居产品的灵活品牌概念板，多种版式方向，温暖科技感，商品聚焦清晰",
    },
    visualDirection: { en: "flexible concept exploration", zh: "灵活概念探索" },
    gallery: [
      {
        title: { en: "Concept Board", zh: "概念板" },
        result: {
          en: "Several visual directions from one brief.",
          zh: "从同一个 brief 延展多个视觉方向。",
        },
        prompt: {
          en: "brand concept, options, warm tech",
          zh: "品牌概念，多方向，温暖科技",
        },
        accent: "from-blue-300/25 via-amber-300/10 to-zinc-950",
      },
      {
        title: { en: "Layout Draft", zh: "版式草图" },
        result: {
          en: "Explores composition before final styling.",
          zh: "在最终风格前探索构图。",
        },
        prompt: {
          en: "layout variations, product focus, clean hierarchy",
          zh: "版式变体，商品聚焦，层级清晰",
        },
        accent: "from-emerald-300/25 via-sky-300/10 to-black",
      },
      {
        title: { en: "Refinement Pass", zh: "精修版本" },
        result: {
          en: "Turns a chosen draft into a stronger visual.",
          zh: "把选中的草图推进成更强成片。",
        },
        prompt: {
          en: "improve finish, keep structure, richer light",
          zh: "提升质感，保留结构，更丰富光线",
        },
        accent: "from-purple-300/25 via-rose-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Start broad when exploring, then narrow into a chosen direction.",
        zh: "探索阶段先放宽，再收窄到一个方向。",
      },
      {
        en: "Use text-to-image for concepts and image-to-image for refinement.",
        zh: "用文生图做概念，用图生图做精修。",
      },
      {
        en: "Name the layout intent separately from the visual style.",
        zh: "把版式意图和视觉风格分开描述。",
      },
      {
        en: "Compare directions before investing in high-detail polishing.",
        zh: "先比较方向，再投入高细节精修。",
      },
    ],
    guidance: [
      {
        title: { en: "Flexible stack role", zh: "灵活模型位置" },
        body: {
          en: "Ernie Image is useful as the flexible middle of the image stack: ideate, draft, refine, and branch.",
          zh: "Ernie Image 适合作为图片模型矩阵里的灵活中段：发散、打草稿、精修和分支。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Concept, use case, layout direction, style range, and refinement target help keep exploration productive.",
          zh: "概念、用途、版式方向、风格范围和精修目标能让探索更有效。",
        },
      },
      {
        title: { en: "Best fit", zh: "最佳适配" },
        body: {
          en: "Use it when you are still deciding the visual direction or need one model that can continue into refinement.",
          zh: "适合视觉方向尚未完全确定，或希望一个模型继续做后续精修的场景。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Flexible concept generation and refinement across workflows.",
        zh: "跨工作流的灵活概念生成和精修。",
      },
      watchOut: {
        en: "For very specific catalog cleanliness, Z Image may be simpler.",
        zh: "如果目标是非常明确的目录图清晰度，Z Image 可能更简单。",
      },
      alternative: {
        en: "Use GPT Image for copy-heavy briefs or Wan for source-image controlled edits.",
        zh: "文案重的 brief 选 GPT Image；受控源图编辑选 Wan。",
      },
    },
    eeat: sharedEeat,
  },
  "qwen-image": {
    generatorTitle: {
      en: "Extend a brand system with Qwen Image",
      zh: "用 Qwen Image 延展品牌系统",
    },
    generatorHint: {
      en: "Use Qwen Image for brand consistency, layout guidance, campaign extensions, and controlled image refinement.",
      zh: "Qwen Image 适合品牌一致性、版式引导、活动视觉延展和受控图像精修。",
    },
    promptPlaceholder: {
      en: "Describe the existing brand rules, layout constraints, assets to preserve, and new campaign extension...",
      zh: "描述现有品牌规则、版式约束、要保留的资产，以及新的活动延展...",
    },
    starterPrompt: {
      en: "Extend the uploaded brand key visual into a 4:5 social ad, preserve color system and product placement, add seasonal campaign elements",
      zh: "把上传的品牌 KV 延展成 4:5 社媒广告，保留色彩系统和商品位置，加入季节活动元素",
    },
    visualDirection: { en: "brand-consistent extension", zh: "品牌一致性延展" },
    gallery: [
      {
        title: { en: "Campaign Extension", zh: "活动延展图" },
        result: {
          en: "Adapts an existing visual into a new channel.",
          zh: "把已有视觉适配到新渠道。",
        },
        prompt: {
          en: "preserve brand color, adapt to 4:5, seasonal layer",
          zh: "保留品牌色，适配 4:5，季节层",
        },
        accent: "from-blue-300/30 via-yellow-300/10 to-zinc-950",
      },
      {
        title: { en: "Layout Continuity", zh: "版式一致性" },
        result: {
          en: "Keeps hierarchy while changing the format.",
          zh: "改变尺寸但保留层级。",
        },
        prompt: {
          en: "same hierarchy, new ratio, clean typography zone",
          zh: "同样层级，新比例，干净文字区",
        },
        accent: "from-indigo-300/25 via-emerald-300/10 to-black",
      },
      {
        title: { en: "Brand Variant", zh: "品牌变体" },
        result: {
          en: "Produces variants without losing brand memory.",
          zh: "生成变体但不丢失品牌记忆。",
        },
        prompt: {
          en: "consistent palette, product lockup, alternate scene",
          zh: "一致色板，商品组合锁定，替代场景",
        },
        accent: "from-rose-300/25 via-sky-300/10 to-zinc-950",
      },
    ],
    workflow: [
      {
        en: "Upload the strongest approved brand visual.",
        zh: "上传最强的已批准品牌视觉。",
      },
      {
        en: "Name the brand rules: colors, layout, product lockup, text area.",
        zh: "写清品牌规则：颜色、版式、商品组合、文字区域。",
      },
      {
        en: "Ask for one channel adaptation at a time.",
        zh: "一次只要求一个渠道适配。",
      },
      {
        en: "Store approved variants as a reusable campaign set.",
        zh: "把批准变体作为可复用活动套组保存。",
      },
    ],
    guidance: [
      {
        title: { en: "Consistency over novelty", zh: "一致性优先" },
        body: {
          en: "Qwen Image should be presented as a brand continuity tool: it helps extend a visual system without starting over.",
          zh: "Qwen Image 应定位为品牌连续性工具：帮助在不重来的情况下延展视觉系统。",
        },
      },
      {
        title: { en: "Prompt structure", zh: "提示词结构" },
        body: {
          en: "Preserved assets, brand colors, layout hierarchy, channel ratio, and allowed new elements make the brief clearer.",
          zh: "保留资产、品牌色、版式层级、渠道比例和允许新增元素，会让 brief 更清晰。",
        },
      },
      {
        title: { en: "Best fit", zh: "最佳适配" },
        body: {
          en: "Use it after a direction is approved and the team needs variations for social, ads, landing pages, and seasonal campaigns.",
          zh: "适合方向已批准后，为社媒、广告、落地页和季节活动生产变体。",
        },
      },
    ],
    compare: {
      bestFor: {
        en: "Brand-consistent image refinement and campaign expansion.",
        zh: "品牌一致性的图片精修和活动扩展。",
      },
      watchOut: {
        en: "If you want a completely new concept, start with GPT Image or Ernie Image.",
        zh: "如果要全新概念，先用 GPT Image 或 Ernie Image。",
      },
      alternative: {
        en: "Use Wan for tighter source cleanup or Nano Banana Pro for fresh commercial campaign images.",
        zh: "更细源图清理选 Wan；全新商业活动图选 Nano Banana Pro。",
      },
    },
    eeat: sharedEeat,
  },
};

export function getModelPageProfile(slug: string): ModelPageProfile {
  return modelPageProfiles[slug] ?? modelPageProfiles["nano-banana-pro"];
}
