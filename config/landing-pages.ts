export type LandingPageFaq = { question: string; answer: string };
export type LandingPageMode = "text-to-image" | "image-to-image" | "text-to-video" | "image-to-video";
export type LandingPageCategory = "video" | "image";
export type AnimeStyleId = "standard" | "ghibli" | "cyberpunk" | "retro_90s" | "webtoon" | "cosplay";

type LandingPageLocalizedFields = {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  introTitle: string;
  introBody: string[];
  stepsTitle: string;
  steps: string[];
  useCasesTitle: string;
  useCases: string[];
  faqTitle: string;
  faqs: LandingPageFaq[];
};

export type LandingPageConfig = {
  slug: string;
  targetKeyword: string;
  category: LandingPageCategory;
  recommendedMode: LandingPageMode;
  recommendedModel: string;
  keywords: {
    en: string[];
    zh: string[];
  };
  labels: {
    en: string;
    zh: string;
  };
  content: {
    en: LandingPageLocalizedFields;
    zh: LandingPageLocalizedFields;
  };
};

const landingPageCatalog: LandingPageConfig[] = [
  {
    slug: "ai-youtube-shorts-generator",
    targetKeyword: "ai youtube shorts generator",
    category: "video",
    recommendedMode: "text-to-video",
    recommendedModel: "happyhorse",
    keywords: {
      en: ["ai youtube shorts generator", "ai shorts maker", "vertical ai video", "short video generator"],
      zh: ["AI Shorts 生成器", "AI 短视频生成", "竖屏视频生成", "YouTube Shorts 生成器"],
    },
    labels: { en: "AI YouTube Shorts Generator", zh: "AI YouTube Shorts 生成器" },
    content: {
      en: {
        title: "AI YouTube Shorts Generator | Imaveo",
        description: "Create vertical AI videos for YouTube Shorts with prompt-led workflows, creator-friendly controls, and fast iteration on Imaveo.",
        h1: "AI YouTube Shorts Generator",
        subtitle: "Create short-form vertical videos from prompts and move quickly from idea to publishable social clips.",
        introTitle: "What is an AI YouTube Shorts generator?",
        introBody: [
          "An AI YouTube Shorts generator helps you turn prompts into short vertical videos that are easier to script, test, and publish quickly.",
          "For creators, brands, and operators, this workflow is useful when you need hooks, product clips, teaser loops, or fast social concepts without a traditional shoot.",
        ],
        stepsTitle: "How to create YouTube Shorts with AI",
        steps: [
          "Start with a short prompt that clearly describes the subject, hook, camera movement, and vertical framing.",
          "Choose a fast-iteration video model and generate a first pass in a 9:16 ratio.",
          "Review the first result, tighten pacing, and create more variants before moving into production volume.",
        ],
        useCasesTitle: "When should creators use this page?",
        useCases: [
          "Short-form creators testing multiple hooks for social distribution",
          "Brands making fast teaser clips for launches and promotions",
          "Teams generating concept reels before investing in larger production",
          "Operators who need vertical-first ad creatives and quick iteration",
        ],
        faqTitle: "AI YouTube Shorts generator FAQ",
        faqs: [
          {
            question: "Should I start from text-to-video or image-to-video for Shorts?",
            answer: "Start from text-to-video if you only have an idea or script. Move to image-to-video when you already have a poster, product visual, or first frame you want to preserve.",
          },
          {
            question: "What model is a good starting point for vertical short clips?",
            answer: "A social-first model like HappyHorse is a practical starting point for short vertical experiments because it helps you iterate quickly before scaling output.",
          },
        ],
      },
      zh: {
        title: "AI YouTube Shorts 生成器 | Imaveo",
        description: "在 Imaveo 上用 prompt 生成竖屏 AI 短视频，适合做 YouTube Shorts、社媒短片和高频测试素材。",
        h1: "AI YouTube Shorts 生成器",
        subtitle: "从想法和脚本快速生成竖屏短视频，更适合高频测试、社媒分发和短片起量。",
        introTitle: "什么是 AI YouTube Shorts 生成器？",
        introBody: [
          "AI YouTube Shorts 生成器可以把 prompt 直接转换成竖屏短视频，更适合快速生成开场、钩子和高频分发内容。",
          "对创作者、品牌和运营团队来说，这种工作流特别适合做新品预热、内容测试、社媒扩散和轻量广告短片。",
        ],
        stepsTitle: "如何用 AI 生成 Shorts 短视频",
        steps: [
          "先写一个简短但明确的 prompt，把主体、钩子、镜头运动和 9:16 竖屏需求写清楚。",
          "选择适合高频迭代的视频模型，先跑出第一条短视频。",
          "根据节奏、镜头和信息密度继续微调，再扩展出更多版本用于分发。",
        ],
        useCasesTitle: "这个页面适合哪些场景？",
        useCases: [
          "做 YouTube Shorts、Reels 和短视频内容的创作者",
          "需要快速做产品预热视频和活动 teaser 的品牌团队",
          "想在正式投放前先测试多个开场版本的运营团队",
          "需要大量竖屏素材进行社媒分发和广告测试的项目",
        ],
        faqTitle: "AI YouTube Shorts 常见问题",
        faqs: [
          {
            question: "Shorts 更适合文生视频还是图生视频？",
            answer: "如果你只有创意和脚本，先用文生视频；如果你已经有产品图、海报或视觉首帧，图生视频会更稳。",
          },
          {
            question: "做 Shorts 应该先选哪个模型？",
            answer: "如果你的重点是高频测试和快速迭代，HappyHorse 会是更合适的起点，先验证内容方向再决定是否切换模型。",
          },
        ],
      },
    },
  },
  {
    slug: "animate-old-photos",
    targetKeyword: "animate old photos",
    category: "video",
    recommendedMode: "image-to-video",
    recommendedModel: "seedance",
    keywords: {
      en: ["animate old photos", "photo to video", "old photo animation", "image to video ai"],
      zh: ["老照片动起来", "老照片动画", "照片转视频", "图生视频"],
    },
    labels: { en: "Animate Old Photos", zh: "让老照片动起来" },
    content: {
      en: {
        title: "Animate Old Photos with AI | Imaveo",
        description: "Bring old photos to life with image-to-video workflows on Imaveo and add subtle motion, camera drift, and cinematic pacing.",
        h1: "Animate Old Photos with AI",
        subtitle: "Turn a still family photo, portrait, or archive image into a moving clip with gentle motion and preserved subject consistency.",
        introTitle: "What does it mean to animate old photos?",
        introBody: [
          "Animating old photos means taking a still image and adding motion to it so that the scene feels more alive without losing the original subject.",
          "The most useful version of this workflow keeps the emotional tone of the photo while adding subtle movement, camera drift, and a stronger sense of presence.",
        ],
        stepsTitle: "How to animate an old photo",
        steps: [
          "Upload the clearest version of the source photo you have and decide whether you want subtle or more expressive motion.",
          "Use an image-to-video workflow that keeps the subject stable and introduces motion gradually.",
          "Review the first clip for consistency, then refine the motion description and output length if needed.",
        ],
        useCasesTitle: "Where does this workflow fit best?",
        useCases: [
          "Personal archive projects and family memory edits",
          "Editorial storytelling using historical or documentary images",
          "Brand or museum campaigns built around legacy visuals",
          "Creators producing emotional social clips from still photography",
        ],
        faqTitle: "Animate old photos FAQ",
        faqs: [
          {
            question: "What kinds of photos work best?",
            answer: "Clear photos with a visible subject and stable lighting usually produce the most believable motion. Heavily damaged or blurry images often need cleanup first.",
          },
          {
            question: "Should I create strong motion or subtle motion first?",
            answer: "Start with subtle motion first. It is easier to keep the subject consistent, and you can always push the motion further after the first test.",
          },
        ],
      },
      zh: {
        title: "让老照片动起来 | Imaveo",
        description: "在 Imaveo 上用图生视频工作流让老照片动起来，适合加轻微镜头运动、表情变化和更有情绪的动态效果。",
        h1: "让老照片动起来",
        subtitle: "把一张静态老照片、家族人像或档案图片变成带轻微动态的短片，同时尽量保留原始主体和情绪。",
        introTitle: "让老照片动起来是什么意思？",
        introBody: [
          "让老照片动起来，本质上是把静态图像继续加工成带轻微运动的短视频，让画面更有存在感，但又不过度破坏原始照片。",
          "这类工作流最有价值的地方在于，它能保留照片的情绪和主体，同时加入更自然的镜头漂移和细微动态。",
        ],
        stepsTitle: "如何让老照片动起来",
        steps: [
          "先准备一张尽量清晰的源图，再决定你希望画面是轻微动起来还是更明显地加入镜头运动。",
          "进入图生视频工作流，优先选择更稳定的模型，让主体先保持一致。",
          "先检查第一版的主体稳定性，再继续微调运动描述和时长。",
        ],
        useCasesTitle: "这个工作流适合哪些场景？",
        useCases: [
          "家庭照片、纪念视频和个人档案整理",
          "历史、纪录和编辑内容里的情绪化镜头",
          "基于旧视觉素材做品牌叙事的活动项目",
          "想把静态摄影变成更有传播力短片的创作者",
        ],
        faqTitle: "让老照片动起来常见问题",
        faqs: [
          {
            question: "什么样的老照片效果更好？",
            answer: "主体清晰、光线相对稳定的照片通常更容易得到自然结果。模糊严重或损坏过多的照片建议先做基础修复。",
          },
          {
            question: "应该一开始就让照片大幅运动吗？",
            answer: "不建议。先从轻微运动开始更容易保持主体和情绪，确认稳定后再考虑加大动作幅度。",
          },
        ],
      },
    },
  },
  {
    slug: "text-to-movie-trailer",
    targetKeyword: "text to movie trailer",
    category: "video",
    recommendedMode: "text-to-video",
    recommendedModel: "veo-3",
    keywords: {
      en: ["text to movie trailer", "ai trailer generator", "cinematic ai video", "movie trailer ai"],
      zh: ["电影预告片生成", "AI 预告片", "电影感 AI 视频", "文生视频"],
    },
    labels: { en: "Text to Movie Trailer", zh: "文生电影预告片" },
    content: {
      en: {
        title: "Text to Movie Trailer Generator | Imaveo",
        description: "Create cinematic trailer-style AI videos from text prompts on Imaveo and structure scenes around mood, pacing, and dramatic motion.",
        h1: "Text to Movie Trailer Generator",
        subtitle: "Turn a written concept into a trailer-style short clip with dramatic pacing, cinematic composition, and stronger scene intent.",
        introTitle: "Why use text-to-video for trailer-style content?",
        introBody: [
          "Trailer-style content starts with tone, pacing, and cinematic intent. Text-to-video is a strong fit because it lets you define atmosphere and shot language before production details.",
          "This is useful for concept trailers, launch films, campaign teasers, and narrative demos where the hook matters more than a literal scene recreation.",
        ],
        stepsTitle: "How to create a movie-trailer style AI clip",
        steps: [
          "Write a prompt that defines the mood, subject, scene progression, and camera motion clearly.",
          "Use a cinematic model and start with a strong 16:9 composition to test drama and pacing.",
          "Refine the prompt around tension, rhythm, and visual reveals before generating more versions.",
        ],
        useCasesTitle: "Who benefits from this workflow?",
        useCases: [
          "Creators pitching stories, concepts, and fictional worlds",
          "Brands making dramatic teaser edits for launches",
          "Agencies developing high-concept treatments before production",
          "Teams testing cinematic campaign directions with AI",
        ],
        faqTitle: "Text to movie trailer FAQ",
        faqs: [
          {
            question: "What makes a trailer prompt stronger?",
            answer: "A stronger trailer prompt usually includes atmosphere, pacing, shot movement, emotional tone, and a sense of escalation instead of only describing the subject.",
          },
          {
            question: "Which model is a good starting point for cinematic clips?",
            answer: "Veo is a strong starting point when you want more premium motion coherence and a cinematic visual feel from the first pass.",
          },
        ],
      },
      zh: {
        title: "文生电影预告片生成器 | Imaveo",
        description: "在 Imaveo 上把文字概念生成电影感预告片风格短视频，更适合做情绪化镜头、品牌 teaser 和概念验证。",
        h1: "文生电影预告片生成器",
        subtitle: "把文字概念转成更有电影感的预告片短视频，适合做情绪节奏、戏剧冲突和镜头语言测试。",
        introTitle: "为什么预告片更适合文生视频？",
        introBody: [
          "预告片的核心不只是主体，而是情绪、节奏、镜头语言和戏剧推进。文生视频更适合先把这些关键表达写进 prompt。",
          "这类工作流很适合概念预告片、品牌 teaser、故事测试和活动大片方向验证，因为它先解决的是气质和节奏问题。",
        ],
        stepsTitle: "如何生成电影预告片风格的 AI 短片",
        steps: [
          "先写清楚情绪、主体、镜头推进和画面升级节奏，而不是只写一个场景。",
          "优先选择更有电影感和一致性的模型，用 16:9 先试第一版。",
          "围绕 tension、节奏和画面揭示继续微调 prompt，再生成更多版本。",
        ],
        useCasesTitle: "这个工作流适合谁？",
        useCases: [
          "做故事概念、世界观和角色氛围测试的创作者",
          "做品牌预热视频和发布 teaser 的团队",
          "广告公司和内容团队在正式拍摄前做高概念方向验证",
          "需要更有电影感镜头语言的 AI 视频项目",
        ],
        faqTitle: "文生电影预告片常见问题",
        faqs: [
          {
            question: "什么样的预告片 prompt 更有效？",
            answer: "更好的预告片 prompt 往往会写清情绪、节奏、镜头运动、画面揭示和升级关系，而不只是描述主体本身。",
          },
          {
            question: "哪种模型更适合电影感短片？",
            answer: "如果你希望第一版就更接近电影感镜头和更强的一致性，Veo 会是很好的起点。",
          },
        ],
      },
    },
  },
  {
    slug: "ai-music-video-maker",
    targetKeyword: "ai music video maker",
    category: "video",
    recommendedMode: "text-to-video",
    recommendedModel: "sora",
    keywords: {
      en: ["ai music video maker", "music video ai", "song visualizer ai", "ai video maker for music"],
      zh: ["AI 音乐视频生成", "音乐视频 AI", "歌曲 MV 生成", "AI MV 制作"],
    },
    labels: { en: "AI Music Video Maker", zh: "AI 音乐视频生成器" },
    content: {
      en: {
        title: "AI Music Video Maker | Imaveo",
        description: "Create mood-driven AI music videos on Imaveo and turn songs, demos, and audio ideas into visual clips with cinematic motion.",
        h1: "AI Music Video Maker",
        subtitle: "Build music-driven video concepts from text prompts and shape the visual atmosphere around rhythm, mood, and scene energy.",
        introTitle: "What makes AI useful for music videos?",
        introBody: [
          "AI is useful for music-video work because it can quickly turn a mood, theme, or lyric idea into a visual treatment without a traditional shoot.",
          "This workflow helps musicians, producers, and content teams create concept clips, release teasers, and social cuts around a track or sonic direction.",
        ],
        stepsTitle: "How to create an AI music video",
        steps: [
          "Start with the emotional direction of the track rather than a literal scene list.",
          "Describe rhythm, color, pace, and camera language in the prompt to anchor the visual identity.",
          "Generate a first pass, then iterate around energy level, repetition, and reveal timing.",
        ],
        useCasesTitle: "Where does this workflow fit best?",
        useCases: [
          "Artists creating concept visuals for a new release",
          "Producers building teaser cuts around demos or sonic moods",
          "Content teams packaging songs for social distribution",
          "Independent musicians who need a visual companion without filming",
        ],
        faqTitle: "AI music video maker FAQ",
        faqs: [
          {
            question: "Should music-video prompts be literal or emotional?",
            answer: "Emotional prompts usually work better. Define mood, pace, color, and energy first, then add specific scene elements only when necessary.",
          },
          {
            question: "Can I use text-to-video before I have final cover art?",
            answer: "Yes. Text-to-video is a good starting point when you want to explore visual direction before cover art or stills are finalized.",
          },
        ],
      },
      zh: {
        title: "AI 音乐视频生成器 | Imaveo",
        description: "在 Imaveo 上用文生视频生成更有氛围的音乐视频概念片、MV teaser 和歌曲配套短片。",
        h1: "AI 音乐视频生成器",
        subtitle: "从歌曲气质和情绪出发，用 prompt 快速生成更有氛围感的音乐视频概念片和短视频素材。",
        introTitle: "为什么 AI 适合做音乐视频？",
        introBody: [
          "音乐视频最重要的通常不是写实场景，而是情绪、节奏和氛围。AI 非常适合先把这些抽象方向快速变成可看的视觉提案。",
          "这类工作流适合歌手、制作人和内容团队围绕歌曲做概念片、预告片、社媒分发短片和视觉 moodboard。",
        ],
        stepsTitle: "如何生成 AI 音乐视频",
        steps: [
          "先从歌曲的气质、节奏和情绪出发，而不是一开始就把场景写得过细。",
          "把颜色、节奏、镜头运动和视觉能量写进 prompt，先确定整体调性。",
          "生成第一版后，再继续围绕速度、重复感和高潮节奏做迭代。",
        ],
        useCasesTitle: "这个工作流适合哪些场景？",
        useCases: [
          "歌手和音乐人围绕新歌制作概念视觉",
          "制作人围绕 Demo 做 teaser 和氛围视频",
          "内容团队做歌曲社媒分发和二次传播短片",
          "没有拍摄条件，但仍需要歌曲视觉配套的独立项目",
        ],
        faqTitle: "AI 音乐视频常见问题",
        faqs: [
          {
            question: "音乐视频 prompt 应该更写实还是更情绪化？",
            answer: "通常更情绪化的 prompt 效果会更好。先把氛围、节奏、色调和能量定义清楚，再加具体场景。",
          },
          {
            question: "如果还没有封面图，可以先做音乐视频吗？",
            answer: "可以。文生视频很适合在封面图和静态视觉还没定之前，先探索整体视频方向。",
          },
        ],
      },
    },
  },
  {
    slug: "ai-product-photography",
    targetKeyword: "ai product photography",
    category: "image",
    recommendedMode: "text-to-image",
    recommendedModel: "nano-banana-pro",
    keywords: {
      en: ["ai product photography", "product image generator", "ecommerce visual ai", "ai product shots"],
      zh: ["AI 商品图", "商品图生成", "AI 产品摄影", "电商商品图生成"],
    },
    labels: { en: "AI Product Photography", zh: "AI 商品图生成" },
    content: {
      en: {
        title: "AI Product Photography Generator | Imaveo",
        description: "Create product shots, ecommerce visuals, and campaign-ready stills with AI image workflows on Imaveo.",
        h1: "AI Product Photography Generator",
        subtitle: "Generate cleaner product visuals, stronger backgrounds, and more campaign-ready ecommerce images without a full studio shoot.",
        introTitle: "Why use AI for product photography?",
        introBody: [
          "AI product photography helps you generate polished product visuals without booking a full studio shoot for every variation, angle, or campaign need.",
          "This is especially useful when you need multiple background directions, seasonal assets, ad iterations, or hero images around a product catalog.",
        ],
        stepsTitle: "How to create AI product photography",
        steps: [
          "Define the product angle, background mood, and campaign look clearly in the prompt.",
          "Generate a first pass in a stable ratio and evaluate readability, lighting, and layout room.",
          "Refine the background, shadows, and brand feel before producing more variants.",
        ],
        useCasesTitle: "Who benefits from this workflow?",
        useCases: [
          "Ecommerce teams producing more product assets at lower cost",
          "Brands testing multiple creative directions for ads and landing pages",
          "Studios building hero images around product launches",
          "Founders who need fast visuals before a full campaign shoot",
        ],
        faqTitle: "AI product photography FAQ",
        faqs: [
          {
            question: "Should I start from text-to-image or image-to-image for product work?",
            answer: "Use text-to-image when you need a fresh campaign concept. Use image-to-image when you already have a product shot and want to refine or expand it.",
          },
          {
            question: "What model is a strong starting point for product visuals?",
            answer: "Nano Banana Pro is a practical first choice when you want strong prompt following, cleaner composition, and more stable commercial-looking outputs.",
          },
        ],
      },
      zh: {
        title: "AI 商品图生成器 | Imaveo",
        description: "在 Imaveo 上用 AI 图片工作流生成商品图、电商主图和更适合投放与落地页的品牌视觉。",
        h1: "AI 商品图生成器",
        subtitle: "无需完整拍摄棚，也能更快生成更干净的商品视觉、电商主图和投放素材。",
        introTitle: "为什么 AI 适合做商品图？",
        introBody: [
          "AI 商品图能帮助你在不重复搭景和拍摄的情况下，快速生成更多商品主图、投放图和活动视觉。",
          "它特别适合需要多背景、多主题和多版本测试的电商和品牌团队，因为核心商品可以围绕不同场景快速扩展。",
        ],
        stepsTitle: "如何用 AI 生成商品图",
        steps: [
          "先明确商品卖点、背景气质和投放场景，再把这些信息写进 prompt。",
          "用稳定比例先生成第一版，检查主体、光线和版式空间是否足够。",
          "再围绕背景、阴影和品牌气质继续优化，输出更多版本。",
        ],
        useCasesTitle: "这个工作流适合哪些人？",
        useCases: [
          "需要低成本扩商品图和电商主图的团队",
          "要测试多种广告创意方向的品牌和运营团队",
          "做新品上线主视觉和落地页 KV 的项目",
          "还没完成正式拍摄，但需要先有可用视觉的创业团队",
        ],
        faqTitle: "AI 商品图常见问题",
        faqs: [
          {
            question: "商品图应该先用文生图还是图生图？",
            answer: "如果你想从零起一个完整广告视觉，先用文生图；如果已经有商品拍摄图，想继续优化和扩背景，就用图生图。",
          },
          {
            question: "做商品图先选哪个模型比较合适？",
            answer: "如果你的重点是提示词跟随、商业构图和更稳的商品视觉，Nano Banana Pro 会是很合适的起点。",
          },
        ],
      },
    },
  },
  {
    slug: "ai-poster-generator",
    targetKeyword: "ai poster generator",
    category: "image",
    recommendedMode: "text-to-image",
    recommendedModel: "flux-klein",
    keywords: {
      en: ["ai poster generator", "poster maker ai", "campaign poster ai", "event poster ai"],
      zh: ["AI 海报生成器", "海报生成", "活动海报 AI", "广告海报生成"],
    },
    labels: { en: "AI Poster Generator", zh: "AI 海报生成器" },
    content: {
      en: {
        title: "AI Poster Generator | Imaveo",
        description: "Create posters, campaign key visuals, and launch graphics with text-to-image workflows on Imaveo.",
        h1: "AI Poster Generator",
        subtitle: "Turn a campaign idea into a poster-style visual faster, then refine composition, mood, and output variations around the first pass.",
        introTitle: "What makes AI poster generation useful?",
        introBody: [
          "AI poster generation is useful when you need to turn a concept into a visible layout direction quickly without waiting for a full design cycle.",
          "It works especially well for campaigns, events, launches, editorial covers, and visual treatments that begin as a written brief.",
        ],
        stepsTitle: "How to create an AI poster",
        steps: [
          "Define the subject, visual tone, layout feel, and headline direction clearly in the prompt.",
          "Generate the first poster concept in a ratio that matches the distribution surface.",
          "Refine composition and style, then output multiple versions for comparison or campaign rollout.",
        ],
        useCasesTitle: "When should teams use this workflow?",
        useCases: [
          "Campaign teams creating launch posters and event visuals",
          "Editorial teams building covers and issue art quickly",
          "Brands exploring multiple hero directions from the same brief",
          "Founders and marketers who need a concept before design production",
        ],
        faqTitle: "AI poster generator FAQ",
        faqs: [
          {
            question: "Is text-to-image enough for poster work?",
            answer: "It is the right first step when you are still finding the visual direction. You can move into image-to-image later if you want to refine an existing poster draft.",
          },
          {
            question: "What should a poster prompt include?",
            answer: "Include the subject, mood, composition direction, lighting, color palette, and the role of any headline or product within the layout.",
          },
        ],
      },
      zh: {
        title: "AI 海报生成器 | Imaveo",
        description: "在 Imaveo 上用文生图工作流生成海报、活动主视觉和品牌 KV，更适合从 brief 快速起方向。",
        h1: "AI 海报生成器",
        subtitle: "把一个活动、发布会或品牌 brief 快速变成海报式视觉，再继续围绕构图、气质和版本输出做优化。",
        introTitle: "为什么 AI 适合做海报？",
        introBody: [
          "AI 海报生成特别适合在视觉方向还没定的时候，先把文字 brief 变成可以讨论的视觉稿。",
          "这对活动、发布会、专题内容、品牌传播和媒体封面都很有帮助，因为它先解决的是方向而不是最后一版精修。",
        ],
        stepsTitle: "如何用 AI 生成海报",
        steps: [
          "先把主体、气质、构图方向和标题需求写进 prompt。",
          "按分发场景选择合适比例，先生成第一版海报方向。",
          "围绕构图、风格和重点信息继续迭代，再输出更多备选版本。",
        ],
        useCasesTitle: "这个工作流适合哪些团队？",
        useCases: [
          "做活动海报、发布会视觉和 campaign KV 的团队",
          "做专题封面和编辑视觉的内容团队",
          "要围绕同一 brief 测试多个视觉方向的品牌团队",
          "需要在正式设计前先拿到方向稿的创业团队和营销团队",
        ],
        faqTitle: "AI 海报常见问题",
        faqs: [
          {
            question: "做海报只用文生图够吗？",
            answer: "如果你还在找视觉方向，文生图很适合做第一版。等方向定了，再用图生图继续精修现有稿子会更稳。",
          },
          {
            question: "海报 prompt 应该包含哪些信息？",
            answer: "建议写清主体、情绪、构图方向、光线、色彩和标题/产品在画面里的角色，这样更容易得到接近需求的结果。",
          },
        ],
      },
    },
  },
  {
    slug: "ai-thumbnail-generator",
    targetKeyword: "ai thumbnail generator",
    category: "image",
    recommendedMode: "text-to-image",
    recommendedModel: "gpt-image",
    keywords: {
      en: ["ai thumbnail generator", "youtube thumbnail ai", "cover image ai", "thumbnail maker ai"],
      zh: ["AI 缩略图生成器", "YouTube 缩略图", "封面图生成", "缩略图制作"],
    },
    labels: { en: "AI Thumbnail Generator", zh: "AI 缩略图生成器" },
    content: {
      en: {
        title: "AI Thumbnail Generator | Imaveo",
        description: "Generate thumbnail concepts, cover images, and social cover art with AI image workflows on Imaveo.",
        h1: "AI Thumbnail Generator",
        subtitle: "Create stronger thumbnails and cover images from a prompt, then refine for clarity, contrast, and click intent.",
        introTitle: "Why use AI for thumbnails?",
        introBody: [
          "Thumbnails live or die on clarity, hierarchy, and emotional signal. AI helps you test more directions from the same content idea much faster.",
          "That is useful for YouTube, short-form platforms, blog covers, launch assets, and any surface where first-glance clicks matter.",
        ],
        stepsTitle: "How to create a thumbnail with AI",
        steps: [
          "Define the subject, emotion, framing, and headline feel in the prompt.",
          "Generate a first cover concept and check readability at a small size.",
          "Create variants with stronger contrast, tighter framing, or different visual hooks.",
        ],
        useCasesTitle: "Where does this workflow fit best?",
        useCases: [
          "Video creators making YouTube or Reels covers",
          "Editorial teams designing issue and blog covers",
          "Social teams testing multiple click-through directions",
          "Founders creating launch covers and promotional visuals",
        ],
        faqTitle: "AI thumbnail generator FAQ",
        faqs: [
          {
            question: "What matters most for an AI-generated thumbnail?",
            answer: "Clarity at small size, a clear subject, and strong visual contrast matter most. The prompt should reflect those priorities instead of trying to say everything at once.",
          },
          {
            question: "Can I use image-to-image after generating a thumbnail draft?",
            answer: "Yes. Text-to-image is great for the first concept, and image-to-image is a strong next step when you want to refine an existing cover.",
          },
        ],
      },
      zh: {
        title: "AI 缩略图生成器 | Imaveo",
        description: "在 Imaveo 上用 AI 图片工作流生成缩略图、封面图和社媒 Cover，更适合高频测试点击方向。",
        h1: "AI 缩略图生成器",
        subtitle: "从 prompt 快速生成缩略图和封面图，再围绕清晰度、对比度和点击意图做精修和多版本测试。",
        introTitle: "为什么 AI 适合做缩略图？",
        introBody: [
          "缩略图最看重的是第一眼可读性、主体突出和点击意图。AI 的价值在于可以用同一个内容方向快速跑出更多版本。",
          "这对 YouTube、短视频平台、博客封面、活动预热图和内容分发素材都很有帮助，因为缩略图本身就是强测试场景。",
        ],
        stepsTitle: "如何用 AI 生成缩略图",
        steps: [
          "先把主体、情绪、构图和标题气质写进 prompt。",
          "生成第一版封面后，先用小尺寸检查可读性和画面重心。",
          "继续输出更多高对比度和不同钩子方向的版本做测试。",
        ],
        useCasesTitle: "这个工作流适合哪些场景？",
        useCases: [
          "YouTube 和短视频创作者做封面与缩略图",
          "内容团队做专题封面和文章 cover",
          "社媒团队测试不同点击率方向",
          "创业团队做发布视觉和转化导向的封面素材",
        ],
        faqTitle: "AI 缩略图常见问题",
        faqs: [
          {
            question: "做 AI 缩略图最重要的是什么？",
            answer: "最重要的是小尺寸下依然清晰、主体足够突出、对比度够强。prompt 也要围绕这些目标写，而不是试图一次表达太多信息。",
          },
          {
            question: "缩略图第一版生成后还能继续精修吗？",
            answer: "可以。通常先用文生图起第一版，再把现有缩略图带进图生图做更稳的精修，会更高效。",
          },
        ],
      },
    },
  },
  {
    slug: "ai-logo-maker",
    targetKeyword: "ai logo maker",
    category: "image",
    recommendedMode: "text-to-image",
    recommendedModel: "qwen-image",
    keywords: {
      en: ["ai logo maker", "logo generator ai", "brand mark generator", "startup logo ai"],
      zh: ["AI Logo 生成器", "Logo 生成", "品牌标识生成", "创业 Logo 生成"],
    },
    labels: { en: "AI Logo Maker", zh: "AI Logo 生成器" },
    content: {
      en: {
        title: "AI Logo Maker | Imaveo",
        description: "Create brand-mark concepts, startup logos, and icon-first visual directions with AI image workflows on Imaveo.",
        h1: "AI Logo Maker",
        subtitle: "Turn a brand idea into logo-like visual concepts faster, then refine the direction around tone, simplicity, and recognizability.",
        introTitle: "What is an AI logo maker useful for?",
        introBody: [
          "An AI logo maker is useful when you want to explore brand-mark directions quickly before moving into a more formal identity or vector design process.",
          "It works best for early-stage exploration, startup naming, product launches, and visual mood direction rather than final production identity files.",
        ],
        stepsTitle: "How to create logo concepts with AI",
        steps: [
          "Define the brand tone, shape language, and level of simplicity in the prompt.",
          "Generate several directions and look for recognizability, balance, and a clear visual center.",
          "Use the strongest direction as a concept base before moving into deeper design refinement.",
        ],
        useCasesTitle: "Where does this workflow fit best?",
        useCases: [
          "Startups exploring brand identity directions before hiring design support",
          "Product teams testing names and visual systems together",
          "Founders who need a first visual signal for a landing page or launch",
          "Marketers building concept boards around a brand refresh",
        ],
        faqTitle: "AI logo maker FAQ",
        faqs: [
          {
            question: "Is AI enough to create a final logo?",
            answer: "AI is best used for concept exploration. It is great for finding direction quickly, but final production logos usually need human refinement and vector design work.",
          },
          {
            question: "What kind of prompt works for logo concepts?",
            answer: "A logo prompt should define tone, simplicity, shape language, brand category, and any strong symbolic direction without overloading the model with too many details.",
          },
        ],
      },
      zh: {
        title: "AI Logo 生成器 | Imaveo",
        description: "在 Imaveo 上用 AI 图片工作流生成 Logo 概念、品牌标识方向和适合创业项目的初版视觉信号。",
        h1: "AI Logo 生成器",
        subtitle: "把品牌想法快速转成 Logo 概念视觉，再围绕气质、简洁度和识别性继续优化方向。",
        introTitle: "AI Logo 生成器适合用来做什么？",
        introBody: [
          "AI Logo 生成器最适合在品牌方向还没定时，先快速探索几个 Logo 和标识方向，再决定后续是否进入更正式的设计流程。",
          "它尤其适合创业项目、产品发布、品牌改版前的探索阶段，因为这一步最重要的是找方向而不是做最终交付文件。",
        ],
        stepsTitle: "如何用 AI 生成 Logo 概念",
        steps: [
          "先把品牌气质、图形语言和你想要的简洁程度写进 prompt。",
          "生成多个版本，重点看识别性、平衡感和视觉中心是否明确。",
          "把最好的一个方向当成概念底稿，再进入更深的设计完善流程。",
        ],
        useCasesTitle: "这个工作流适合哪些场景？",
        useCases: [
          "创业项目在正式找设计师前先探索品牌方向",
          "产品团队同步测试名称和视觉系统",
          "需要为 landing page 或上线活动快速做第一版标识的项目",
          "品牌团队在改版前先整理一组概念方向",
        ],
        faqTitle: "AI Logo 常见问题",
        faqs: [
          {
            question: "AI 能直接做最终 Logo 吗？",
            answer: "更适合做概念探索。AI 很适合快速找方向，但真正用于正式品牌体系的最终 Logo 往往还需要人工精修和矢量化处理。",
          },
          {
            question: "Logo prompt 应该怎么写？",
            answer: "建议写清品牌气质、图形风格、简洁度、行业方向和想表达的符号感，不要一次塞太多互相冲突的信息。",
          },
        ],
      },
    },
  },
];

export const landingPages = Object.fromEntries(landingPageCatalog.map((page) => [page.slug, page]));

export function getLandingPage(slug: string): LandingPageConfig | null {
  return landingPages[slug] ?? null;
}

export function getLocalizedLandingPage(slug: string, locale: string) {
  const page = getLandingPage(slug);
  if (!page) return null;

  const localeKey = locale === "zh" ? "zh" : "en";
  return {
    ...page,
    ...page.content[localeKey],
    keywords: page.keywords[localeKey],
    label: page.labels[localeKey],
  };
}

export const landingPageSlugs = landingPageCatalog.map((page) => page.slug);
export const indexableLandingPageSlugs = [...landingPageSlugs];
