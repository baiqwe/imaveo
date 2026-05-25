"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SeoRichContent } from "@/components/seo/seo-rich-content";
import { getImaveoModel, type ImaveoModel } from "@/config/imaveo";
import { getModelPageProfile } from "@/config/model-page-content";
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

function getHubLabel(
  model: ImaveoModel | undefined,
  mode: StudioMode,
  isZh: boolean,
) {
  if (
    model?.category === "video" ||
    mode === "text-to-video" ||
    mode === "image-to-video"
  ) {
    return isZh ? "AI 视频中心" : "AI Video Hub";
  }
  return isZh ? "AI 图片中心" : "AI Image Hub";
}

function getHubHref(locale: string, model?: ImaveoModel, mode?: StudioMode) {
  if (model)
    return `/${locale}/${model.category === "video" ? "ai-video" : "ai-image"}`;
  if (mode === "text-to-video" || mode === "image-to-video")
    return `/${locale}/ai-video`;
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
      ? `${model.labels.zh} AI ${workflowLabel}生成器 | Imaveo`
      : `${model.labels.en} AI ${workflowLabel} Generator | Imaveo`;
  }

  return isZh
    ? `${workflowLabel} | Imaveo 创作中心`
    : `${workflowLabel} | Imaveo Studio`;
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
    const profile = getModelPageProfile(model.slug);
    return {
      breadcrumbs: [
        { name: isZh ? "首页" : "Home", href: `/${locale}` },
        { name: hubLabel, href: hubHref },
        { name: workflowLabel, href: workflowHref },
        { name: modelName, href: `/${locale}${model.href}` },
        {
          name: isZh
            ? `${modelName}${workflowLabel}入口`
            : `${modelName} ${workflowLabel}`,
          href: createHref,
        },
      ],
      keyword: modelName,
      introTitle: profile.generatorTitle[localeKey],
      introBody: [
        profile.generatorHint[localeKey],
        isZh
          ? `这个具体入口围绕「${profile.visualDirection.zh}」展开，不再只是通用创作中心：你可以直接用当前模型、当前 ${workflowLabel} 工作流和页面里的案例 prompt 开始第一版。`
          : `This concrete entry is organized around ${profile.visualDirection.en}, not generic Studio copy. Use the current model, current ${workflowLabel} workflow, and the page examples to start the first pass.`,
      ],
      stepsTitle: isZh
        ? `如何用 ${modelName} 开始 ${workflowLabel}`
        : `How to start ${workflowLabel} with ${modelName}`,
      steps: profile.workflow.map((step) => step[localeKey]),
      useCasesTitle: isZh
        ? `${modelName} 适合哪些场景？`
        : `When should creators use ${modelName}?`,
      useCases: [
        profile.compare.bestFor[localeKey],
        ...profile.guidance.map(
          (entry) => `${entry.title[localeKey]}：${entry.body[localeKey]}`,
        ),
      ],
      faqTitle: isZh
        ? `${modelName} 创作入口常见问题`
        : `${modelName} Studio FAQ`,
      faqs: [
        {
          question: isZh
            ? `${modelName} 这个入口和普通创作中心有什么区别？`
            : `How is this ${modelName} entry different from the generic Studio?`,
          answer: isZh
            ? `这个入口会使用 ${modelName} 的模型定位、案例 prompt、推荐步骤和适用/不适用说明来组织内容，更接近一个具体落地页。`
            : `This entry uses ${modelName}-specific positioning, example prompts, recommended steps, and fit/watchout notes, so it behaves like a concrete landing page.`,
        },
        {
          question: isZh
            ? `什么时候不应该优先用 ${modelName}？`
            : `When should I choose another model instead of ${modelName}?`,
          answer: profile.compare.watchOut[localeKey],
        },
      ],
      relatedTitle: isZh ? "继续浏览相关页面" : "Continue with related pages",
      relatedLinks: [
        {
          label: hubLabel,
          href: hubHref,
          description: isZh
            ? "回到中心页继续横向比较模型。"
            : "Return to the hub and compare more models.",
        },
        {
          label: workflowLabel,
          href: workflowHref,
          description: isZh
            ? "查看当前任务类型的独立 workflow 页面。"
            : "Open the dedicated workflow page for this task type.",
        },
        {
          label: isZh ? "价格方案" : "Pricing",
          href: `/${locale}/pricing`,
          description: isZh
            ? "在生成频率稳定后比较 Credits 和订阅。"
            : "Compare credits and subscriptions when the workflow becomes repeatable.",
        },
      ],
    };
  }

  return {
    breadcrumbs: [
      { name: isZh ? "首页" : "Home", href: `/${locale}` },
      { name: hubLabel, href: hubHref },
      { name: workflowLabel, href: workflowHref },
      {
        name: isZh ? `${workflowLabel}入口` : `${workflowLabel} entry`,
        href: createHref,
      },
    ],
    keyword: workflowLabel,
    introTitle: isZh
      ? `什么是 ${workflowLabel} 创作入口？`
      : `What is the ${workflowLabel} Studio entry?`,
    introBody: [
      isZh
        ? `当前页面会按 ${workflowLabel} 这个中间路由来组织内容，因此这里的标题、面包屑和正文都会围绕 ${workflowLabel} 的核心关键词展开。`
        : `This page is now organized around the ${workflowLabel} route, so the title, breadcrumbs, and body content all follow ${workflowLabel} keywords.`,
      isZh
        ? "如果你还没有锁定具体模型，先从任务类型进入会更高效，生成第一版后再决定是否切换模型。"
        : "If the model is not locked yet, starting from the workflow is more efficient. Generate a first pass first, then decide whether a model switch is necessary.",
    ],
    stepsTitle: isZh
      ? `如何开始 ${workflowLabel}`
      : `How to start ${workflowLabel}`,
    steps: [
      isZh
        ? `先保持当前模式为 ${workflowLabel}。`
        : `Keep the current mode on ${workflowLabel}.`,
      isZh
        ? "填写 prompt 或上传图片，再根据任务要求调整参数。"
        : "Write the prompt or upload an image, then tune settings based on the job.",
      isZh
        ? "生成第一版后，再根据结果决定是否切换模型或扩展更多版本。"
        : "Generate a first pass, then decide whether to switch models or expand into more versions.",
    ],
    useCasesTitle: isZh
      ? `${workflowLabel} 适合哪些场景？`
      : `When should creators use ${workflowLabel}?`,
    useCases: [
      isZh
        ? "已经知道任务类型，想尽快进入真实生成动作的用户。"
        : "Users who already know the task type and want to move into actual generation quickly.",
      isZh
        ? "希望先跑通 workflow，再决定具体模型的创作者。"
        : "Creators who want to get the workflow moving before locking the final model.",
      isZh
        ? "从 hub 页、首页或价格页进入后，准备直接开始创作的用户。"
        : "Visitors arriving from hubs, home, or pricing who are ready to create.",
      isZh
        ? "希望中间层页面也承接清晰关键词内容的高意图搜索用户。"
        : "High-intent search visitors who expect the workflow page itself to carry clear keyword coverage.",
    ],
    faqTitle: isZh ? `${workflowLabel} 常见问题` : `${workflowLabel} FAQ`,
    faqs: [
      {
        question: isZh
          ? `为什么这里先写 ${workflowLabel}，而不是固定写创作中心？`
          : `Why is this page using ${workflowLabel} instead of generic Studio copy?`,
        answer: isZh
          ? "因为中间路由本身就是一个搜索意图页，所以页面需要跟当前 workflow 保持一致，而不是一直停留在通用 Studio 介绍。"
          : "Because the workflow route is itself a search-intent page, the content needs to stay aligned with the current workflow instead of showing generic Studio messaging.",
      },
      {
        question: isZh
          ? "之后还能切换模型吗？"
          : "Can I still switch models later?",
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
        description: isZh
          ? "回到中心页继续比较模型。"
          : "Return to the hub and compare models.",
      },
      {
        label: isZh ? "价格方案" : "Pricing",
        href: `/${locale}/pricing`,
        description: isZh
          ? "查看高频和低频使用的付费方式。"
          : "Compare payment options for casual and heavy usage.",
      },
    ],
  };
}

export function StudioContextContent({ locale }: StudioContextContentProps) {
  const searchParams = useSearchParams();
  const mode = normalizeStudioMode(searchParams.get("mode"));
  const modelSlug = searchParams.get("model");
  const model = modelSlug
    ? (getImaveoModel(modelSlug, "video") ?? getImaveoModel(modelSlug, "image"))
    : undefined;
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

export function StudioBreadcrumbTrail({
  locale,
  className,
}: StudioBreadcrumbTrailProps) {
  const searchParams = useSearchParams();
  const mode = normalizeStudioMode(searchParams.get("mode"));
  const modelSlug = searchParams.get("model");
  const model = modelSlug
    ? (getImaveoModel(modelSlug, "video") ?? getImaveoModel(modelSlug, "image"))
    : undefined;
  const content = getSeoContent(locale, mode, model);

  return <Breadcrumbs items={content.breadcrumbs} className={className} />;
}
