import type { ImaveoArticle } from "@/config/imaveo";

export const imaveoArticles: ImaveoArticle[] = [
  {
    slug: "veo-vs-sora",
    href: "/blog/veo-vs-sora",
    category: "MODEL REVIEW",
    readTime: "7 min",
    publishedAt: "2026-04-09",
    updatedAt: "2026-04-09",
    title: {
      en: "Veo 3.1 vs Sora 2: which model should creators pick in 2026?",
      zh: "Veo 3.1 vs Sora 2：2026 年创作者该选谁？",
    },
    excerpt: {
      en: "Compare motion realism, prompt adherence, and cost curves before you buy credits.",
      zh: "在充值前先比较运动真实度、提示词理解和成本曲线。",
    },
    seo: {
      en: {
        title: "Veo 3.1 vs Sora 2 for creators | Imaveo Blog",
        description: "Compare Veo 3.1 and Sora 2 across motion realism, prompting behavior, and production economics before you scale a video workflow.",
        keywords: ["veo vs sora", "veo 3.1 review", "sora 2 comparison", "ai video model comparison"],
      },
      zh: {
        title: "Veo 3.1 vs Sora 2 对比 | Imaveo 博客",
        description: "从运动表现、提示词理解与成本结构对比 Veo 3.1 和 Sora 2，帮助创作者选择更合适的视频主力模型。",
        keywords: ["Veo 对比 Sora", "Veo 3.1 评测", "Sora 2 对比", "AI 视频模型对比"],
      },
    },
    sections: [
      {
        heading: {
          en: "Why this comparison matters now",
          zh: "为什么现在要做这组对比",
        },
        paragraphs: {
          en: [
            "Veo 3.1 and Sora 2 both sit in the high-intent part of the AI video market, but they tend to win on different criteria. Veo usually appeals to creators who care about cinematic continuity and premium scene quality, while Sora attracts teams who value experimentation breadth and narrative range.",
            "For an operator building a repeatable workflow, the question is rarely which model looks best in a launch video. The real question is which model keeps output quality stable enough that a team can produce assets without burning too many credits on retries.",
          ],
          zh: [
            "Veo 3.1 和 Sora 2 都处在 AI 视频市场里最靠近高意图转化的一层，但两者擅长的方向并不完全一样。Veo 更容易打动看重电影感连贯性和成片质感的用户，Sora 则更适合重视题材跨度和探索空间的团队。",
            "对要搭建稳定生产流的操作者来说，关键并不是哪一个模型在宣传视频里更惊艳，而是哪一个模型能让输出足够稳定，减少反复重试带来的时间和额度消耗。",
          ],
        },
      },
      {
        heading: {
          en: "Where Veo 3.1 tends to win",
          zh: "Veo 3.1 更容易赢的地方",
        },
        paragraphs: {
          en: [
            "Veo becomes especially strong when the brief requires camera confidence: longer motion arcs, stronger coherence across the clip, and shots that feel ready for client-facing use. This matters if your product or creative team is trying to move from concept clips into campaign assets.",
            "That strength also changes how you budget. A model with higher first-pass usability often costs more per run, but can still be cheaper operationally because fewer retries are needed before a clip is good enough to publish.",
          ],
          zh: [
            "当需求里包含更复杂的镜头语言、更长的运动轨迹，或者要求视频一开始就更接近客户可用稿时，Veo 往往更有优势。这对于正在把概念短片升级为营销素材的团队尤其重要。",
            "这也会改变预算判断。单次生成更贵的模型，并不一定意味着整体更贵；如果首稿可用率更高，实际运营成本反而可能更低，因为返工次数会减少。",
          ],
        },
      },
      {
        heading: {
          en: "Where Sora 2 can still be the better fit",
          zh: "Sora 2 依然可能更适合的场景",
        },
        paragraphs: {
          en: [
            "Sora is still compelling when the team is in exploration mode and needs to test multiple visual directions quickly. In these moments, flexibility and breadth can matter more than perfect continuity, because the point is to discover the right creative lane before refining.",
            "That makes Sora useful earlier in a funnel, while Veo often feels stronger once a team has locked the concept and cares more about reliable output quality than open-ended experimentation.",
          ],
          zh: [
            "如果团队还处在探索阶段，需要快速试很多视觉方向，Sora 依然很有吸引力。这个时候灵活性和题材覆盖度，往往比镜头一致性更重要，因为目标是先找对创意方向，再做后续打磨。",
            "所以可以把 Sora 放在漏斗更前段，而 Veo 更适合在方向已经确定后承接正式生产，因为那个阶段更在意的是稳定成片，而不是开放式试验。",
          ],
        },
      },
    ],
    takeaways: {
      en: [
        "Choose Veo 3.1 when first-pass publishability matters more than experimentation breadth.",
        "Choose Sora 2 when the team is still searching for a creative direction and wants broader exploration.",
        "Judge models by operational cost per usable clip, not only by cost per generation.",
      ],
      zh: [
        "如果你更在意首稿可发布性而不是探索空间，优先选 Veo 3.1。",
        "如果团队还在寻找创意方向、需要更广泛试验，Sora 2 仍然更合适。",
        "评估模型时要看每条可用视频的运营成本，而不只是单次生成价格。",
      ],
    },
    cta: {
      href: "/ai-video/veo-3",
      label: {
        en: "Try Veo 3.1 on Imaveo",
        zh: "在 Imaveo 试用 Veo 3.1",
      },
      description: {
        en: "Move from comparison into a real Veo workflow.",
        zh: "从对比页直接进入真实的 Veo 工作流。",
      },
    },
  },
  {
    slug: "anime-avatar-prompts",
    href: "/blog/anime-avatar-prompts",
    category: "PROMPT GUIDE",
    readTime: "6 min",
    publishedAt: "2026-04-09",
    updatedAt: "2026-04-09",
    title: {
      en: "How to generate a perfect anime avatar with Animeify prompts",
      zh: "如何用 Animeify 提示词生成一张完美二次元头像",
    },
    excerpt: {
      en: "A prompt formula for cosplay shots, profile pictures, and creator branding.",
      zh: "适用于 Cos 照、社交头像和创作者品牌图的一套提示词模板。",
    },
    seo: {
      en: {
        title: "Animeify prompt guide for better avatars | Imaveo Blog",
        description: "A practical Animeify prompt framework for profile pictures, cosplay portraits, and creator branding images with fewer failed generations.",
        keywords: ["animeify prompts", "anime avatar prompts", "photo to anime prompts", "anime portrait guide"],
      },
      zh: {
        title: "Animeify 提示词指南 | Imaveo 博客",
        description: "面向头像、Cos 照和创作者品牌图的 Animeify 提示词公式，帮助你更稳定地得到可用成片。",
        keywords: ["Animeify 提示词", "二次元头像提示词", "照片转动漫提示词", "动漫人像指南"],
      },
    },
    sections: [
      {
        heading: {
          en: "Start with the role of the image",
          zh: "先明确这张图在承担什么角色",
        },
        paragraphs: {
          en: [
            "The strongest Animeify prompts usually begin with intent, not with visual adjectives. A profile picture, a cosplay remake, and a creator-branding portrait all need different emotional weight, crop discipline, and styling instructions.",
            "When the role is clear, the rest of the prompt becomes easier to control. You can decide whether the image should feel usable, expressive, commercial, or highly stylized before adding visual details.",
          ],
          zh: [
            "最好用的 Animeify 提示词通常不是从视觉形容词开始，而是先从用途开始。头像、Cos 改绘和创作者品牌图，对情绪、裁切和风格约束的要求完全不同。",
            "当用途足够明确时，后面的描述会更容易控制。你可以先决定它要更偏可用、表达型、商业型还是强风格化，再补视觉细节。",
          ],
        },
      },
      {
        heading: {
          en: "Use a stable prompt spine",
          zh: "用一条稳定的提示词骨架",
        },
        paragraphs: {
          en: [
            "A useful Animeify structure is: subject + camera crop + mood + rendering cues + cleanup constraints. This keeps the prompt readable while making sure the model knows who the character is, how tightly the portrait is framed, and what details should remain consistent.",
            "The cleanup part is often underrated. Constraints like clean facial features, consistent hair silhouette, and controlled background detail help prevent the model from spending too much attention on elements that do not improve the final avatar.",
          ],
          zh: [
            "一个稳定好用的 Animeify 结构是：主体 + 镜头裁切 + 情绪氛围 + 渲染线索 + 清理约束。这样既能让提示词保持可读，也能让模型明确角色是谁、镜头有多近、哪些细节必须保持稳定。",
            "最后这层清理约束很容易被忽略。像面部干净、发型轮廓稳定、背景细节受控这类限制，能减少模型把注意力浪费在对头像并不加分的部分上。",
          ],
        },
      },
      {
        heading: {
          en: "Iterate with one variable at a time",
          zh: "每次只改一个变量",
        },
        paragraphs: {
          en: [
            "Most failed prompt sessions come from changing too many things at once. If you alter camera angle, styling mood, color treatment, and character pose in the same pass, you cannot tell which variable actually improved or hurt the result.",
            "A cleaner workflow is to lock the identity first, then iterate on mood, then refine polish. This sequence saves credits and creates a reusable prompt pattern the team can return to later.",
          ],
          zh: [
            "大多数失败的提示词实验，并不是因为写得不够花哨，而是一次改动了太多变量。如果同一轮同时改镜头、情绪、配色和姿势，你很难知道真正起作用的是哪一部分。",
            "更稳的做法是先锁定人物识别，再迭代氛围，最后补精修。这样不仅更省额度，也更容易沉淀出团队可以反复复用的提示词模板。",
          ],
        },
      },
    ],
    takeaways: {
      en: [
        "Write prompts around the job the image must perform, not only around aesthetics.",
        "Use a repeatable prompt spine so Animeify gets identity, crop, and mood instructions clearly.",
        "Change one variable at a time to learn what actually improves the output.",
      ],
      zh: [
        "提示词先围绕图片用途展开，而不是只堆视觉形容词。",
        "用固定骨架组织提示词，让 Animeify 清楚主体、裁切和情绪。",
        "每次只改一个变量，才能知道什么真的提升了结果。",
      ],
    },
    cta: {
      href: "/ai-image/animeify",
      label: {
        en: "Open Animeify Studio",
        zh: "打开 Animeify Studio",
      },
      description: {
        en: "Try the prompt pattern in a live Animeify workflow.",
        zh: "把这套提示词直接带进真实的 Animeify 工作流。",
      },
    },
  },
  {
    slug: "ai-video-workflow",
    href: "/blog/ai-video-workflow",
    category: "WORKFLOW",
    readTime: "8 min",
    publishedAt: "2026-04-09",
    updatedAt: "2026-04-09",
    title: {
      en: "The Imaveo workflow: from still image to publish-ready short video",
      zh: "Imaveo 工作流：从一张静图到可发布的短视频",
    },
    excerpt: {
      en: "A practical production loop for ideation, image keyframes, and video generation.",
      zh: "一套从创意、关键帧到视频生成的实用生产流程。",
    },
    seo: {
      en: {
        title: "From still image to short video workflow | Imaveo Blog",
        description: "A practical creator workflow for moving from image ideation into publish-ready AI video using image-to-video and text-to-video stages.",
        keywords: ["ai video workflow", "image to video workflow", "short video production", "imaveo workflow"],
      },
      zh: {
        title: "从静图到短视频的工作流 | Imaveo 博客",
        description: "一套把图片创意推进到可发布 AI 短视频的工作流，涵盖图生视频、文生视频与后续迭代判断。",
        keywords: ["AI 视频工作流", "图生视频流程", "短视频生产流程", "Imaveo 工作流"],
      },
    },
    sections: [
      {
        heading: {
          en: "Treat the still image as a production asset",
          zh: "先把静图当成生产资产，而不只是灵感草稿",
        },
        paragraphs: {
          en: [
            "A lot of teams jump into video too early. In practice, the still image stage is where you lock identity, palette, framing, and brand atmosphere before motion complexity is added. That makes downstream video passes far more controllable.",
            "When the keyframe is deliberate, image-to-video becomes less about rescuing a weak idea and more about extending a strong one. The clip inherits a clearer visual center from the beginning.",
          ],
          zh: [
            "很多团队会太早进入视频阶段。实际上，静图阶段才是锁定角色识别、色板、构图和品牌氛围的关键节点，等这些先被固定后，再加上运动复杂度会容易很多。",
            "当关键帧本身足够明确时，图生视频就不再是在救一个弱创意，而是在延展一个已经成立的视觉方向，整条视频从开始就会有更清晰的重心。",
          ],
        },
      },
      {
        heading: {
          en: "Use image-to-video before text-to-video when consistency matters",
          zh: "当一致性比自由度更重要时，先用图生视频",
        },
        paragraphs: {
          en: [
            "Image-to-video is often the safer first step when character identity, product form, or shot composition must remain recognizable. It narrows the degrees of freedom and gives the model a stronger visual anchor.",
            "Text-to-video becomes more valuable either at the concept stage or when you need to generate fresh shot ideas that are not tied to one specific frame. The best workflows usually combine both, but not in the same role.",
          ],
          zh: [
            "如果角色识别、产品形态或镜头构图必须保持清晰，图生视频通常是更稳的起点。它缩小了自由度，把模型的注意力固定在一个更强的视觉锚点上。",
            "文生视频更适合概念探索阶段，或者当你需要重新生成新的镜头想法，而不是围绕某一帧延展时。最好的流程通常会同时用到两者，只是分工不同。",
          ],
        },
      },
      {
        heading: {
          en: "Scale only after the loop is repeatable",
          zh: "只有当流程可重复时才开始放量",
        },
        paragraphs: {
          en: [
            "The point of a workflow is not simply to produce one successful clip. It is to create a loop that another teammate can run again with similar quality. That means the prompt, keyframe logic, and model choice all need to be explainable.",
            "Once the loop becomes predictable, pricing decisions get easier as well. At that point you are no longer paying for exploration alone; you are paying to increase output volume with a system that already works.",
          ],
          zh: [
            "工作流的目标，不只是偶然做出一条成功视频，而是让另一个同事也能用差不多的方法复现相近质量。这意味着提示词、关键帧逻辑和模型选择都要能够被讲清楚。",
            "当这个循环变得可预测之后，价格判断也会更简单。因为这时你购买的就不只是探索机会，而是在给一个已经成立的系统扩大量产能力。",
          ],
        },
      },
    ],
    takeaways: {
      en: [
        "Lock the still image first so downstream video generations inherit a clear visual anchor.",
        "Use image-to-video for consistency and text-to-video for broader concept expansion.",
        "Scale spend only after the workflow becomes repeatable for another operator.",
      ],
      zh: [
        "先锁定静图，这样后续视频生成才会有稳定的视觉锚点。",
        "图生视频更适合做一致性，文生视频更适合扩展概念。",
        "只有当流程可以被别人复现时，才值得放大量产预算。",
      ],
    },
    cta: {
      href: "/image-to-video",
      label: {
        en: "Open the image-to-video workflow",
        zh: "打开图生视频工作流",
      },
      description: {
        en: "Use the workflow article as a bridge into the product flow.",
        zh: "把这篇流程文章直接接到产品工作流里。",
      },
    },
  },
];
