"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { getImaveoModel, type ImaveoModel } from "@/config/imaveo";
import { normalizeStudioMode, type StudioMode } from "@/utils/studio";

type StudioContextContentProps = {
  locale: string;
};

type StudioBreadcrumbTrailProps = {
  locale: string;
  className?: string;
};

function getWorkflowLabel(mode: StudioMode, isZh: boolean) {
  switch (mode) {
    case "text-to-video":
      return isZh ? "文生视频" : "Text to Video";
    case "image-to-video":
      return isZh ? "图生视频" : "Image to Video";
    case "image-to-image":
      return isZh ? "图生图" : "Image to Image";
    case "text-to-image":
    default:
      return isZh ? "文生图" : "Text to Image";
  }
}

function getHubLabel(model: ImaveoModel | undefined, mode: StudioMode, isZh: boolean) {
  if (model?.category === "video" || mode === "text-to-video" || mode === "image-to-video") {
    return isZh ? "AI 视频中心" : "AI Video Hub";
  }
  return isZh ? "AI 图片中心" : "AI Image Hub";
}

function getHubHref(locale: string, model?: ImaveoModel, mode?: StudioMode) {
  if (model) return `/${locale}/${model.category === "video" ? "ai-video" : "ai-image"}`;
  if (mode === "text-to-video" || mode === "image-to-video") return `/${locale}/ai-video`;
  return `/${locale}/ai-image`;
}

function getWorkflowHref(locale: string, mode: StudioMode) {
  return `/${locale}/${mode}`;
}

function getCreateHref(locale: string, mode: StudioMode, model?: ImaveoModel) {
  const params = new URLSearchParams();
  params.set("mode", mode);
  if (model) params.set("model", model.slug);
  return `/${locale}/create?${params.toString()}`;
}

function getPageTitle(locale: string, mode: StudioMode, model?: ImaveoModel) {
  const isZh = locale === "zh";
  const workflowLabel = getWorkflowLabel(mode, isZh);

  if (model) {
    return isZh
      ? `${model.labels.zh} ${workflowLabel} | Imaveo 创作中心`
      : `${model.labels.en} ${workflowLabel} | Imaveo Studio`;
  }

  return isZh ? `${workflowLabel} | Imaveo 创作中心` : `${workflowLabel} | Imaveo Studio`;
}

function getSeoContent(locale: string, mode: StudioMode, model?: ImaveoModel) {
  const isZh = locale === "zh";
  const localeKey = isZh ? "zh" : "en";
  const workflowLabel = getWorkflowLabel(mode, isZh);
  const hubLabel = getHubLabel(model, mode, isZh);
  const hubHref = getHubHref(locale, model, mode);
  const workflowHref = getWorkflowHref(locale, mode);
  const createHref = getCreateHref(locale, mode, model);

  if (model) {
    const modelName = model.labels[localeKey];
    const strengths = model.strengths[localeKey];
    return {
      breadcrumbs: [
        { name: isZh ? "首页" : "Home", href: `/${locale}` },
        { name: hubLabel, href: hubHref },
        { name: workflowLabel, href: workflowHref },
        { name: modelName, href: `/${locale}${model.href}` },
        { name: isZh ? `${modelName}${workflowLabel}入口` : `${modelName} ${workflowLabel}`, href: createHref },
      ],
      keyword: modelName,
      introTitle: isZh ? `什么是 ${modelName} ${workflowLabel} 入口？` : `What is the ${modelName} ${workflowLabel} entry?`,
      introBody: [
        isZh
          ? `当前页面已经锁定到 ${modelName}，因此这里的创作中心内容会围绕 ${modelName} 的核心关键词和 ${workflowLabel} 工作流展开。`
          : `This Studio entry is now locked to ${modelName}, so the content below focuses on ${modelName} keywords and the ${workflowLabel} workflow.`,
        isZh
          ? `${modelName} 更适合 ${strengths.join("、")} 这些结果方向。进入工作台后，你可以围绕这些能力继续写 prompt、调比例、调时长或切输出数量。`
          : `${modelName} is especially useful for ${strengths.join(", ")}. Inside the Studio you can keep refining prompts, ratio, duration, and output count around those strengths.`,
      ],
      stepsTitle: isZh ? `如何用 ${modelName} 开始 ${workflowLabel}` : `How to start ${workflowLabel} with ${modelName}`,
      steps: [
        isZh ? `先保持当前模式为 ${workflowLabel}，这样模型和任务类型会保持一致。` : `Keep the current mode on ${workflowLabel} so the model stays aligned with the job type.`,
        isZh ? `围绕 ${modelName} 的核心优势写 prompt，再逐步微调参数。` : `Write the prompt around what ${modelName} does best, then refine settings step by step.`,
        isZh ? "先生成第一版，再决定是否真的需要切换到其他模型做横向比较。" : "Generate a first pass before deciding whether a model comparison is actually necessary.",
      ],
      useCasesTitle: isZh ? `${modelName} 适合哪些场景？` : `When should creators use ${modelName}?`,
      useCases: [
        isZh ? `${modelName} 适合已经明确想做 ${workflowLabel}，并且希望直接落到具体模型能力上的用户。` : `${modelName} is a good fit when you already know the job is ${workflowLabel} and want a more specific model path.`,
        isZh ? "适合已经从 hub 页或模型页完成比较，现在准备直接生成的用户。" : "It works well for visitors who already compared options on hubs or model pages and are now ready to generate.",
        isZh ? "适合希望先用一个明确模型跑第一版，再根据结果决定是否继续横向比较的人。" : "It is useful when you want one clear model for the first pass before comparing alternatives.",
        isZh ? "适合把搜索关键词直接转成真实操作链路的高意图用户。" : "It helps high-intent users turn search intent directly into a real creation workflow.",
      ],
      faqTitle: isZh ? `${modelName} 创作入口常见问题` : `${modelName} Studio FAQ`,
      faqs: [
        {
          question: isZh ? `为什么这里显示的是 ${modelName} 的内容？` : `Why is this page showing ${modelName}-specific content?`,
          answer: isZh
            ? `因为你当前是从 ${modelName} 相关路径进入创作中心，页面会自动切换成与该模型和当前模式对应的关键词内容。`
            : `Because you entered the Studio from a ${modelName}-related path, the content switches automatically to match that model and workflow intent.`,
        },
        {
          question: isZh ? `进入 ${modelName} 后还能切换模型吗？` : `Can I still switch models after entering with ${modelName}?`,
          answer: isZh
            ? "可以。当前内容会先围绕这个模型展开，但生成器本身仍然允许你继续切换模型。"
            : "Yes. The keyword content starts from this model, but the generator still lets you switch models if needed.",
        },
      ],
      relatedTitle: isZh ? "继续浏览相关页面" : "Continue with related pages",
      relatedLinks: [
        {
          label: hubLabel,
          href: hubHref,
          description: isZh ? "回到中心页继续横向比较模型。" : "Return to the hub and compare more models.",
        },
        {
          label: workflowLabel,
          href: workflowHref,
          description: isZh ? "查看当前任务类型的独立 workflow 页面。" : "Open the dedicated workflow page for this task type.",
        },
        {
          label: isZh ? "价格方案" : "Pricing",
          href: `/${locale}/pricing`,
          description: isZh ? "在生成频率稳定后比较 Credits 和订阅。" : "Compare credits and subscriptions when the workflow becomes repeatable.",
        },
      ],
    };
  }

  return {
    breadcrumbs: [
      { name: isZh ? "首页" : "Home", href: `/${locale}` },
      { name: hubLabel, href: hubHref },
      { name: workflowLabel, href: workflowHref },
      { name: isZh ? `${workflowLabel}入口` : `${workflowLabel} entry`, href: createHref },
    ],
    keyword: workflowLabel,
    introTitle: isZh ? `什么是 ${workflowLabel} 创作入口？` : `What is the ${workflowLabel} Studio entry?`,
    introBody: [
      isZh
        ? `当前页面会按 ${workflowLabel} 这个中间路由来组织内容，因此这里的标题、面包屑和正文都会围绕 ${workflowLabel} 的核心关键词展开。`
        : `This page is now organized around the ${workflowLabel} route, so the title, breadcrumbs, and body content all follow ${workflowLabel} keywords.`,
      isZh
        ? "如果你还没有锁定具体模型，先从任务类型进入会更高效，生成第一版后再决定是否切换模型。"
        : "If the model is not locked yet, starting from the workflow is more efficient. Generate a first pass first, then decide whether a model switch is necessary.",
    ],
    stepsTitle: isZh ? `如何开始 ${workflowLabel}` : `How to start ${workflowLabel}`,
    steps: [
      isZh ? `先保持当前模式为 ${workflowLabel}。` : `Keep the current mode on ${workflowLabel}.`,
      isZh ? "填写 prompt 或上传图片，再根据任务要求调整参数。" : "Write the prompt or upload an image, then tune settings based on the job.",
      isZh ? "生成第一版后，再根据结果决定是否切换模型或扩展更多版本。" : "Generate a first pass, then decide whether to switch models or expand into more versions.",
    ],
    useCasesTitle: isZh ? `${workflowLabel} 适合哪些场景？` : `When should creators use ${workflowLabel}?`,
    useCases: [
      isZh ? "已经知道任务类型，想尽快进入真实生成动作的用户。" : "Users who already know the task type and want to move into actual generation quickly.",
      isZh ? "希望先跑通 workflow，再决定具体模型的创作者。" : "Creators who want to get the workflow moving before locking the final model.",
      isZh ? "从 hub 页、首页或价格页进入后，准备直接开始创作的用户。" : "Visitors arriving from hubs, home, or pricing who are ready to create.",
      isZh ? "希望中间层页面也承接清晰关键词内容的高意图搜索用户。" : "High-intent search visitors who expect the workflow page itself to carry clear keyword coverage.",
    ],
    faqTitle: isZh ? `${workflowLabel} 常见问题` : `${workflowLabel} FAQ`,
    faqs: [
      {
        question: isZh ? `为什么这里先写 ${workflowLabel}，而不是固定写创作中心？` : `Why is this page using ${workflowLabel} instead of generic Studio copy?`,
        answer: isZh
          ? "因为中间路由本身就是一个搜索意图页，所以页面需要跟当前 workflow 保持一致，而不是一直停留在通用 Studio 介绍。"
          : "Because the workflow route is itself a search-intent page, the content needs to stay aligned with the current workflow instead of showing generic Studio messaging.",
      },
      {
        question: isZh ? "之后还能切换模型吗？" : "Can I still switch models later?",
        answer: isZh
          ? "可以。这里先承接 workflow 关键词，但生成器本身仍然支持继续切换模型。"
          : "Yes. The content layer starts from workflow keywords, but the generator still supports model switching.",
      },
    ],
    relatedTitle: isZh ? "继续浏览相关页面" : "Continue with related pages",
    relatedLinks: [
      {
        label: hubLabel,
        href: hubHref,
        description: isZh ? "回到中心页继续比较模型。" : "Return to the hub and compare models.",
      },
      {
        label: isZh ? "价格方案" : "Pricing",
        href: `/${locale}/pricing`,
        description: isZh ? "查看高频和低频使用的付费方式。" : "Compare payment options for casual and heavy usage.",
      },
    ],
  };
}

export function StudioContextContent({ locale }: StudioContextContentProps) {
  const searchParams = useSearchParams();
  const mode = normalizeStudioMode(searchParams.get("mode"));
  const modelSlug = searchParams.get("model");
  const model = modelSlug ? getImaveoModel(modelSlug, "video") ?? getImaveoModel(modelSlug, "image") : undefined;
  const content = getSeoContent(locale, mode, model);

  useEffect(() => {
    document.title = getPageTitle(locale, mode, model);
  }, [locale, mode, model]);

  return (
    <SeoRichContent
      locale={locale as "en" | "zh"}
      keyword={content.keyword}
      introTitle={content.introTitle}
      introBody={content.introBody}
      stepsTitle={content.stepsTitle}
      steps={content.steps}
      useCasesTitle={content.useCasesTitle}
      useCases={content.useCases}
      faqTitle={content.faqTitle}
      faqs={content.faqs}
      relatedTitle={content.relatedTitle}
      relatedLinks={content.relatedLinks}
    />
  );
}

export function StudioBreadcrumbTrail({ locale, className }: StudioBreadcrumbTrailProps) {
  const searchParams = useSearchParams();
  const mode = normalizeStudioMode(searchParams.get("mode"));
  const modelSlug = searchParams.get("model");
  const model = modelSlug ? getImaveoModel(modelSlug, "video") ?? getImaveoModel(modelSlug, "image") : undefined;
  const content = getSeoContent(locale, mode, model);

  return <Breadcrumbs items={content.breadcrumbs} className={className} />;
}
