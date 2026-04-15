import type { ImaveoArticle } from "@/config/imaveo";

export const imaveoArticles: ImaveoArticle[] = [
  {
    slug: "what-is-imaveo-studio",
    href: "/blog/what-is-imaveo-studio",
    category: "PLATFORM GUIDE",
    readTime: "6 min",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    title: {
      en: "What is Imaveo Studio and why does it matter for creators?",
      zh: "什么是 Imaveo Studio，它为什么对创作者重要？",
    },
    excerpt: {
      en: "A clear explanation of how Imaveo brings image generation, video generation, and model switching into one creative workspace.",
      zh: "解释 Imaveo 如何把图片生成、视频生成和模型切换放进一个统一的创作工作台。",
    },
    seo: {
      en: {
        title: "What is Imaveo Studio? | Imaveo Blog",
        description: "Understand what Imaveo Studio is, how it connects workflows and models, and why a unified workspace matters for creators.",
        keywords: ["imaveo studio", "what is imaveo", "ai creator workspace", "imaveo create"],
      },
      zh: {
        title: "什么是 Imaveo Studio？ | Imaveo 博客",
        description: "解释 Imaveo Studio 是什么、它如何连接工作流和模型，以及统一工作台为什么更适合创作者。",
        keywords: ["Imaveo Studio", "什么是 Imaveo", "AI创作工作台", "Imaveo 创作中心"],
      },
    },
    sections: [
      {
        heading: {
          en: "Why a unified workspace matters",
          zh: "为什么统一工作台很重要",
        },
        paragraphs: {
          en: [
            "Most creator tools make users choose between separate pages for image generation, video generation, and model exploration. That structure may be fine for product demos, but it creates friction when the real job is to move from one creative step into the next without losing context.",
            "Imaveo Studio matters because it turns those disconnected actions into one continuous surface. A creator can start with a still image, switch into video intent, compare models, and keep moving without treating every task as a new session.",
          ],
          zh: [
            "很多创作工具会把生图、生成视频和模型探索拆到多个页面里。这样的结构对演示产品功能也许足够，但对于真实创作来说，最大的成本恰恰来自上下文不断中断。",
            "Imaveo Studio 的意义就在于它把这些分散动作收成一个连续工作面。创作者可以从静图开始，再切到视频意图，再比较模型，而不需要把每一步都当成全新的会话。",
          ],
        },
      },
      {
        heading: {
          en: "How it fits the creation flow",
          zh: "它在创作流程里承担什么角色",
        },
        paragraphs: {
          en: [
            "Studio is not meant to replace every product guide. Video pages, image pages, and model pages still help creators understand what to choose. The Studio is where those choices turn into actual generation.",
            "That distinction matters. Guide pages help users compare options, while the Studio helps them create. When everything is forced into one page, both learning and creation become harder.",
          ],
          zh: [
            "Studio 并不是为了取代所有产品说明页。视频页、图片页和模型页仍然负责帮助创作者理解该选什么，而 Studio 负责把这些选择变成真实生成。",
            "这个分工很重要。说明页帮助用户比较选项，Studio 帮助用户开始创作。如果所有内容都挤在一个页面里，理解和操作都会变得更困难。",
          ],
        },
      },
      {
        heading: {
          en: "What creators should do next",
          zh: "创作者下一步应该怎么用",
        },
        paragraphs: {
          en: [
            "If the goal is exploration, start from a hub or workflow page first. If the goal is action, move into the Studio early. The more specific the idea becomes, the more valuable a unified workspace becomes.",
            "That is why Imaveo treats the Studio as the main creation workspace rather than as a stand-alone information page. It is where comparison ends and production begins.",
          ],
          zh: [
            "如果目标是探索，先从 hub 或 workflow 页进入会更合理；如果目标已经是执行，就应该尽早切进 Studio。创意越具体，统一工作台的价值就越明显。",
            "这也是为什么 Imaveo 把 Studio 视为主要创作工作台，而不是孤立的信息页。它是比较阶段结束、生产阶段开始的地方。",
          ],
        },
      },
    ],
    takeaways: {
      en: [
        "Imaveo Studio unifies image, video, and model switching into one production surface.",
        "Guide pages still matter, but they should help creators move into the Studio when they are ready.",
        "A unified workspace becomes more valuable as creator intent becomes more concrete.",
      ],
      zh: [
        "Imaveo Studio 把图片、视频和模型切换收进一个统一工作面。",
        "说明页依然重要，但它们应该帮助创作者在准备好时进入 Studio。",
        "创作者意图越具体，统一工作台的价值就越高。",
      ],
    },
    cta: {
      href: "/create",
      label: {
        en: "Open Imaveo Studio",
        zh: "打开 Imaveo Studio",
      },
      description: {
        en: "Move from explanation into the actual Studio workspace.",
        zh: "从解释页直接进入真实的创作工作台。",
      },
    },
  },
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
            "Veo 3.1 和 Sora 2 都是创作者经常比较的视频模型，但两者擅长的方向并不完全一样。Veo 更容易打动看重电影感连贯性和成片质感的用户，Sora 则更适合重视题材跨度和探索空间的团队。",
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
            "That makes Sora useful during early exploration, while Veo often feels stronger once a team has locked the concept and cares more about reliable output quality than open-ended experimentation.",
          ],
          zh: [
            "如果团队还处在探索阶段，需要快速试很多视觉方向，Sora 依然很有吸引力。这个时候灵活性和题材覆盖度，往往比镜头一致性更重要，因为目标是先找对创意方向，再做后续打磨。",
            "所以 Sora 更适合早期探索，而 Veo 更适合在方向已经确定后承接正式生产，因为那个阶段更在意的是稳定成片，而不是开放式试验。",
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
  {
    slug: "best-text-to-video-prompts",
    href: "/blog/best-text-to-video-prompts",
    category: "PROMPT GUIDE",
    readTime: "7 min",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    title: {
      en: "Best text-to-video prompts for cinematic clips and social shorts",
      zh: "最适合电影感短片和社媒短视频的文生视频提示词",
    },
    excerpt: {
      en: "A prompt framework for camera motion, scene pacing, and output-ready AI clips.",
      zh: "一套围绕镜头运动、场景节奏和成片导向的文生视频提示词框架。",
    },
    seo: {
      en: {
        title: "Best text-to-video prompts | Imaveo Blog",
        description: "Use a practical prompt framework for cinematic AI video clips, camera motion, and short-form social output on Imaveo.",
        keywords: ["text to video prompts", "ai video prompt guide", "cinematic video prompts", "best text to video prompts"],
      },
      zh: {
        title: "最佳文生视频提示词 | Imaveo 博客",
        description: "用一套更实用的提示词结构组织电影感 AI 视频、镜头运动和短视频输出。",
        keywords: ["文生视频提示词", "AI视频提示词", "电影感提示词", "最佳文生视频 prompt"],
      },
    },
    sections: [
      {
        heading: {
          en: "Start with motion, not decoration",
          zh: "先写运动，再写修饰",
        },
        paragraphs: {
          en: [
            "Most weak text-to-video prompts spend too much time on decorative adjectives and too little time on motion logic. A better structure begins with subject, action, camera movement, pacing, and mood before adding style detail.",
            "That ordering matters because video is judged by movement over time. If the motion arc is vague, beautiful adjectives cannot rescue a weak clip.",
          ],
          zh: [
            "很多差的文生视频提示词会把大量篇幅花在修饰词上，却没有交代清楚运动逻辑。更好的结构应该先写主体、动作、镜头运动、节奏和氛围，再补风格线索。",
            "这种顺序之所以重要，是因为视频的核心是时间里的运动。如果运动弧线本身模糊，再多华丽形容词也救不了成片。",
          ],
        },
      },
      {
        heading: {
          en: "Use one shot intention at a time",
          zh: "一次只表达一个镜头意图",
        },
        paragraphs: {
          en: [
            "Prompts fail when they try to include every good idea in one generation. Slow dolly-in, aerial reveal, close-up emotion, and crowd action are all strong directions individually, but they compete when packed into the same prompt.",
            "A better workflow is to treat each prompt as one shot intention. That makes results easier to evaluate and helps the team learn which prompt spine is actually reusable.",
          ],
          zh: [
            "提示词容易失败，往往不是因为信息不够，而是因为把太多好想法塞进了一次生成里。缓慢推进、俯拍揭示、特写情绪和群像动作单独看都不错，但放在同一个 prompt 里就会互相竞争。",
            "更好的做法是把每次生成当成一个明确镜头意图。这样结果更容易判断，也更容易沉淀出真正可复用的提示词骨架。",
          ],
        },
      },
      {
        heading: {
          en: "Turn prompt quality into workflow efficiency",
          zh: "把提示词质量转成 workflow 效率",
        },
        paragraphs: {
          en: [
            "Prompt quality is not just about prettier output. In production, a strong prompt reduces retries and improves clip usability on the first pass. That changes the cost structure of the whole workflow.",
            "This is why creators should think of prompts as operational assets. Once a working prompt pattern appears, it should be saved, named, and reused instead of reinvented from scratch every time.",
          ],
          zh: [
            "提示词质量不只是为了让结果更好看。在真实生产里，一个强提示词意味着更少重试和更高首稿可用率，这会直接改变整条工作流的成本结构。",
            "所以创作者应该把提示词看成运营资产。一旦一套结构被验证可用，就应该保存、命名并复用，而不是每次都重新发明。",
          ],
        },
      },
    ],
    takeaways: {
      en: [
        "Organize prompts around subject, motion, camera, pacing, and mood in that order.",
        "Treat every prompt as one shot intention rather than a list of every possible effect.",
        "Save working prompt patterns because they lower cost and improve output stability over time.",
      ],
      zh: [
        "提示词优先按主体、运动、镜头、节奏、氛围来组织。",
        "每个 prompt 只表达一个镜头意图，不要把所有效果都塞进去。",
        "把可用 prompt 当成资产保存下来，它会持续降低成本并提高稳定性。",
      ],
    },
    cta: {
      href: "/text-to-video",
      label: {
        en: "Open text-to-video",
        zh: "打开文生视频工作流",
      },
      description: {
        en: "Take the prompt framework into the text-to-video workflow.",
        zh: "把这套提示词框架直接带进文生视频工作流。",
      },
    },
  },
];
