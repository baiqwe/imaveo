"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  Clock3,
  History,
  ImageIcon,
  Layers3,
  Monitor,
  Settings2,
  Shuffle,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { imaveoModels, type ImaveoModel } from "@/config/imaveo";
import { getModelPageProfile } from "@/config/model-page-content";
import { type StudioMode, normalizeStudioMode } from "@/utils/studio";

type StudioModelProfile = ReturnType<typeof getModelPageProfile>;

type ImaveoStudioProps = {
  locale: string;
  initialMode?: string;
  initialModel?: string;
  initialStyle?: string;
  initialPrompt?: string;
};

type StudioModeDefinition = {
  id: StudioMode;
  icon: React.ReactNode;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  promptPlaceholder: { en: string; zh: string };
};

type GeneratorChipGroup = {
  key: string;
  label: { en: string; zh: string };
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const studioModes: StudioModeDefinition[] = [
  {
    id: "text-to-image",
    icon: <ImageIcon className="h-4 w-4" />,
    title: { en: "Text to Image", zh: "文生图" },
    description: {
      en: "Generate posters, thumbnails, ads, and key visuals from prompts.",
      zh: "从提示词直接生成海报、缩略图、广告图和品牌主视觉。",
    },
    promptPlaceholder: {
      en: "Describe the campaign visual, poster, hero image, or key art you want to generate...",
      zh: "描述你想生成的海报、广告图、KV 主视觉或品牌图像...",
    },
  },
  {
    id: "image-to-image",
    icon: <Wand2 className="h-4 w-4" />,
    title: { en: "Image to Image", zh: "图生图" },
    description: {
      en: "Upload a source image and refine it into polished campaign visuals, covers, product shots, or new art directions.",
      zh: "上传原图，再把它推进成更完整的海报、封面、商品图或新的视觉方向。",
    },
    promptPlaceholder: {
      en: "Add optional notes about pose, expression, lighting, or finishing details...",
      zh: "补充姿态、表情、光线和后期处理等额外要求...",
    },
  },
  {
    id: "text-to-video",
    icon: <Clapperboard className="h-4 w-4" />,
    title: { en: "Text to Video", zh: "文生视频" },
    description: {
      en: "Turn prompt-driven scenes into short cinematic clips with motion-first models.",
      zh: "用偏镜头语言的模型，把提示词场景直接变成短视频。",
    },
    promptPlaceholder: {
      en: "Write the scene, subject, camera movement, pacing, and mood for the video...",
      zh: "写下场景、主体、镜头运动、节奏和氛围，用于视频生成...",
    },
  },
  {
    id: "image-to-video",
    icon: <Sparkles className="h-4 w-4" />,
    title: { en: "Image to Video", zh: "图生视频" },
    description: {
      en: "Animate a still image into motion with camera drift, loops, or cinematic beats.",
      zh: "把静态图像动画化，生成带镜头漂移、循环或戏剧节奏的短片。",
    },
    promptPlaceholder: {
      en: "Describe the motion, camera language, and pacing you want from the source image...",
      zh: "描述你希望原图产生的运动、镜头语言和节奏...",
    },
  },
];

const aspectRatioMap: Record<StudioMode, string[]> = {
  "text-to-image": ["1:1", "4:5", "16:9"],
  "image-to-image": ["1:1", "3:4", "4:5"],
  "text-to-video": ["16:9", "9:16", "1:1"],
  "image-to-video": ["16:9", "9:16", "1:1"],
};

const durationMap: Record<StudioMode, string[]> = {
  "text-to-image": ["HD", "2K", "Poster"],
  "image-to-image": ["HD", "Anime", "Portrait"],
  "text-to-video": ["4s", "8s", "12s"],
  "image-to-video": ["4s", "6s", "8s"],
};

const qualityMap: Record<StudioMode, string[]> = {
  "text-to-image": ["Draft", "Clean", "Pro"],
  "image-to-image": ["Subtle", "Balanced", "Strong"],
  "text-to-video": ["480p", "720p", "1080p"],
  "image-to-video": ["480p", "720p", "1080p"],
};

const quantityMap: Record<StudioMode, string[]> = {
  "text-to-image": ["1 Frame", "4 Frames", "8 Frames"],
  "image-to-image": ["1 Variant", "2 Variants", "4 Variants"],
  "text-to-video": ["1 Clip", "2 Clips", "4 Clips"],
  "image-to-video": ["Single Frame", "Start + End", "Loop"],
};

const recentSeeds = [
  {
    id: "A1",
    status: "Live",
    color: "from-[#f5c518]/30",
    kind: "Nano Banana Pro",
  },
  { id: "B4", status: "Queued", color: "from-cyan-400/20", kind: "Veo" },
  { id: "C7", status: "Draft", color: "from-pink-400/20", kind: "GPT Image" },
  { id: "D2", status: "Live", color: "from-emerald-400/20", kind: "Seedance" },
];

const studioSignals = {
  en: [
    { label: "Unified", value: "4 modes" },
    { label: "Models", value: "Veo / Sora / Seedance / GPT Image" },
    { label: "Surface", value: "One prompt + one control plane" },
  ],
  zh: [
    { label: "统一入口", value: "4 种模式" },
    { label: "模型矩阵", value: "Veo / Sora / Seedance / GPT Image" },
    { label: "工作面", value: "一个 Prompt + 一套控制平面" },
  ],
};

const promptExamples: Record<StudioMode, { en: string; zh: string }[]> = {
  "text-to-image": [
    {
      en: "luxury skincare product hero shot, editorial lighting, soft gold accents",
      zh: "高端护肤品主视觉，杂志感灯光，带柔和金色点缀",
    },
    {
      en: "cinematic sci-fi movie poster, neon haze, bold title composition",
      zh: "电影感科幻海报，霓虹雾气，大标题构图",
    },
  ],
  "image-to-image": [
    {
      en: "refine the uploaded portrait into polished editorial artwork, balanced shadows",
      zh: "把上传的人像优化成更精致的视觉成片，阴影更均衡",
    },
    {
      en: "transform the source image into a clean product campaign visual with better lighting",
      zh: "把原图转换成更干净的广告视觉，提升光线与质感",
    },
  ],
  "text-to-video": [
    {
      en: "a lone astronaut walking through a rain-soaked alley, slow push-in, moody blue light",
      zh: "孤独宇航员穿过雨夜小巷，镜头缓慢推进，蓝色冷光氛围",
    },
    {
      en: "fashion editorial scene, model turns toward camera, soft breeze, golden hour",
      zh: "时尚 editorial 场景，模特转向镜头，微风，黄金时刻",
    },
  ],
  "image-to-video": [
    {
      en: "subtle camera drift, character blink, hair motion, cinematic depth",
      zh: "轻微镜头漂移，角色眨眼，头发摆动，电影感景深",
    },
    {
      en: "animate the poster with parallax depth and slow reveal motion",
      zh: "让海报产生视差景深与缓慢揭示的运动",
    },
  ],
};

function getModeConfig(mode: StudioMode) {
  return studioModes.find((item) => item.id === mode) ?? studioModes[0];
}

function getWorkflowHeading(mode: StudioMode, isZh: boolean) {
  switch (mode) {
    case "text-to-video":
      return isZh ? "AI 文生视频生成器" : "AI Text to Video Generator";
    case "image-to-video":
      return isZh ? "AI 图生视频生成器" : "AI Image to Video Generator";
    case "image-to-image":
      return isZh ? "AI 图生图生成器" : "AI Image to Image Generator";
    case "text-to-image":
    default:
      return isZh ? "AI 文生图生成器" : "AI Text to Image Generator";
  }
}

function getWorkflowLabel(mode: StudioMode, isZh: boolean) {
  switch (mode) {
    case "text-to-video":
      return isZh ? "文生视频" : "text-to-video";
    case "image-to-video":
      return isZh ? "图生视频" : "image-to-video";
    case "image-to-image":
      return isZh ? "图生图" : "image-to-image";
    case "text-to-image":
    default:
      return isZh ? "文生图" : "text-to-image";
  }
}

function getCreateLandingTitle(
  model: ImaveoModel | undefined,
  mode: StudioMode,
  isZh: boolean,
) {
  const workflowLabel = getWorkflowLabel(mode, isZh);
  if (!model) return getWorkflowHeading(mode, isZh);
  return isZh
    ? `${model.labels.zh} AI ${workflowLabel}生成器`
    : `${model.labels.en} AI ${workflowLabel} Generator`;
}

function getGeneratorSurfaceTitle(mode: StudioMode, isZh: boolean) {
  return mode.includes("video")
    ? isZh
      ? "AI 视频生成器"
      : "AI Video Generator"
    : isZh
      ? "AI 图片生成器"
      : "AI Image Generator";
}

function modeNeedsSourceImage(mode: StudioMode) {
  return mode === "image-to-image" || mode === "image-to-video";
}

function getModelsForMode(mode: StudioMode) {
  const availableImageModels = imaveoModels.filter(
    (model) => model.category === "image",
  );
  const availableVideoModels = imaveoModels.filter(
    (model) => model.category === "video",
  );
  const supportsMode = (model: ImaveoModel, targetMode: StudioMode) =>
    model.supportedModes?.includes(targetMode) ?? model.mode === targetMode;

  switch (mode) {
    case "text-to-video":
      return availableVideoModels.filter((model) =>
        supportsMode(model, "text-to-video"),
      );
    case "image-to-video":
      return availableVideoModels.filter((model) =>
        supportsMode(model, "image-to-video"),
      );
    case "image-to-image":
      return availableImageModels.filter((model) =>
        supportsMode(model, "image-to-image"),
      );
    case "text-to-image":
    default:
      return availableImageModels.filter((model) =>
        supportsMode(model, "text-to-image"),
      );
  }
}

function StudioSidebar({
  locale,
  mode,
  model,
  modelProfile,
}: {
  locale: string;
  mode: StudioMode;
  model: ImaveoModel | undefined;
  modelProfile?: StudioModelProfile;
}) {
  const isZh = locale === "zh";
  const currentMode = getModeConfig(mode);
  const strengths = model?.strengths[isZh ? "zh" : "en"] ?? [];

  return (
    <div className="aurora-stage space-y-5 rounded-[30px] border border-zinc-800 bg-[#090909]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div>
        <div className="section-label">
          {isZh ? "使用说明" : "Studio Guide"}
        </div>
        <h2
          className={`display-serif mt-3 text-2xl font-medium text-white ${isZh ? "tracking-normal" : ""}`}
        >
          {isZh
            ? "从模式、提示词到模型都在一个面板里完成"
            : "Move from mode to prompt to model inside one surface"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          {isZh
            ? "先切换创作大类，再写 prompt，随后根据当前模式展开参数与模型。"
            : "Switch the creation mode first, then write the prompt and adjust parameters and model selection for the current job."}
        </p>
      </div>

      <div className="panel-lift rounded-[24px] border border-primary/20 bg-[linear-gradient(180deg,rgba(245,197,24,0.14),rgba(245,197,24,0.02))] p-4">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
          {isZh ? "当前模式" : "Current Mode"}
        </div>
        <div className="mt-3 flex items-center gap-2 text-base font-medium text-white">
          {currentMode.icon}
          {currentMode.title[isZh ? "zh" : "en"]}
        </div>
        <div className="mt-2 text-sm leading-6 text-zinc-300">
          {currentMode.description[isZh ? "zh" : "en"]}
        </div>
      </div>

      <div className="panel-lift rounded-[24px] border border-zinc-800 bg-black/25 p-4">
        <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {isZh ? "当前模型" : "Selected Model"}
        </div>
        <div className="mt-3 text-lg font-medium text-white">
          {model?.labels[isZh ? "zh" : "en"] ?? "Imaveo"}
        </div>
        <div className="mt-2 text-sm leading-6 text-zinc-400">
          {model?.descriptions[isZh ? "zh" : "en"]}
        </div>
      </div>

      <div className="panel-lift rounded-[24px] border border-zinc-800 bg-black/25 p-4">
        <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {isZh ? "模型优势" : "Strengths"}
        </div>
        <div className="mt-4 space-y-3">
          {strengths.map((strength) => (
            <div
              key={strength}
              className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
              <span>{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipRow({
  locale,
  groups,
}: {
  locale: string;
  groups: GeneratorChipGroup[];
}) {
  const isZh = locale === "zh";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.key}
          className="panel-lift rounded-[24px] border border-zinc-800 bg-black/25 p-4"
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {group.icon}
            {group.label[isZh ? "zh" : "en"]}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => group.onChange(option)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  group.value === option
                    ? "border-primary/40 bg-primary/10 text-white"
                    : "border-zinc-800 bg-white/[0.02] text-zinc-300 hover:border-primary/20 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GeneratorPanel({
  locale,
  mode,
  setMode,
  selectedModel,
  modelProfile,
  selectedModelId,
  availableModels,
  onModelChange,
  prompt,
  setPrompt,
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedDuration,
  setSelectedDuration,
  selectedQuality,
  setSelectedQuality,
  selectedQuantity,
  setSelectedQuantity,
  liveGeneration,
  sourcePreview,
  onPickSource,
  onClearSource,
}: {
  locale: string;
  mode: StudioMode;
  setMode: (mode: StudioMode) => void;
  selectedModel: ImaveoModel | undefined;
  modelProfile?: StudioModelProfile;
  selectedModelId: string;
  availableModels: ImaveoModel[];
  onModelChange: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  selectedAspectRatio: string;
  setSelectedAspectRatio: (value: string) => void;
  selectedDuration: string;
  setSelectedDuration: (value: string) => void;
  selectedQuality: string;
  setSelectedQuality: (value: string) => void;
  selectedQuantity: string;
  setSelectedQuantity: (value: string) => void;
  liveGeneration: boolean;
  sourcePreview: string;
  onPickSource: () => void;
  onClearSource: () => void;
}) {
  const isZh = locale === "zh";
  const currentMode = getModeConfig(mode);
  const localeKey = isZh ? "zh" : "en";
  const examples = modelProfile
    ? [
        modelProfile.starterPrompt,
        ...modelProfile.gallery.map((item) => item.prompt),
      ]
    : promptExamples[mode];
  const needsSourceImage = modeNeedsSourceImage(mode);
  const generatorTitle = getGeneratorSurfaceTitle(mode, isZh);
  const generatorDescription = currentMode.description[localeKey];
  const placeholder =
    modelProfile?.promptPlaceholder[localeKey] ??
    currentMode.promptPlaceholder[localeKey];
  const signals = studioSignals[localeKey];
  const chipGroups: GeneratorChipGroup[] = [
    {
      key: "ratio",
      label: { en: "Aspect Ratio", zh: "比例" },
      icon: <Layers3 className="h-3.5 w-3.5" />,
      options: aspectRatioMap[mode],
      value: selectedAspectRatio,
      onChange: setSelectedAspectRatio,
    },
    {
      key: "duration",
      label: {
        en: mode.includes("video") ? "Duration" : "Style Intent",
        zh: mode.includes("video") ? "时长" : "风格倾向",
      },
      icon: <Clock3 className="h-3.5 w-3.5" />,
      options: durationMap[mode],
      value: selectedDuration,
      onChange: setSelectedDuration,
    },
    {
      key: "quality",
      label: { en: "Quality", zh: "质量" },
      icon: <Monitor className="h-3.5 w-3.5" />,
      options: qualityMap[mode],
      value: selectedQuality,
      onChange: setSelectedQuality,
    },
    {
      key: "quantity",
      label: {
        en: mode.includes("video") ? "Output Count" : "Variants",
        zh: mode.includes("video") ? "输出数量" : "输出变体",
      },
      icon: <Clapperboard className="h-3.5 w-3.5" />,
      options: quantityMap[mode],
      value: selectedQuantity,
      onChange: setSelectedQuantity,
    },
  ];

  const randomPrompt = () => {
    const list = examples.map((item) => item[isZh ? "zh" : "en"]);
    const picked = list[Math.floor(Math.random() * list.length)];
    setPrompt(picked);
  };

  if (modelProfile) {
    const setupItems = [
      {
        label: isZh ? "当前模式" : "Mode",
        value: getWorkflowLabel(mode, isZh),
      },
      {
        label: isZh ? "当前模型" : "Model",
        value: selectedModel?.labels[localeKey] ?? "Imaveo",
      },
      {
        label: isZh ? "建议比例" : "Suggested ratio",
        value:
          selectedAspectRatio ||
          selectedModel?.generationDefaults?.aspectRatio ||
          aspectRatioMap[mode][0],
      },
      {
        label: mode.includes("video")
          ? isZh
            ? "建议时长"
            : "Suggested duration"
          : isZh
            ? "建议方向"
            : "Suggested intent",
        value:
          selectedDuration ||
          selectedModel?.generationDefaults?.style ||
          durationMap[mode][0],
      },
    ];

    return (
      <div className="rounded-[30px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(43,31,23,0.72),rgba(12,12,12,0.94))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="section-label">
              {isZh ? "建议生成配置" : "Suggested Setup"}
            </div>
            <h2
              className={`display-serif mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : ""}`}
            >
              {generatorTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
              {generatorDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={randomPrompt}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-primary/25 hover:text-white"
          >
            <Shuffle className="h-4 w-4" />
            {isZh ? "换一条建议" : "Try another"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {setupItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[18px] border border-white/10 bg-black/25 px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {item.label}
              </div>
              <div className="mt-2 text-sm font-medium text-zinc-100">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px]">
          <div className="rounded-[24px] border border-[#3e3026] bg-[#1d1510]/80 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                Prompt
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-primary">
                {modelProfile.visualDirection[localeKey]}
              </span>
            </div>
            <Textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={placeholder}
              className="min-h-[132px] rounded-[20px] border-[#4c392b] bg-[#120e0b] px-4 py-4 text-base leading-7 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-primary/40"
            />
          </div>

          <div className="space-y-3">
            {needsSourceImage ? (
              <button
                type="button"
                onClick={onPickSource}
                className="flex h-28 w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-zinc-700 bg-black/25 px-4 text-center transition-colors hover:border-primary/25"
              >
                <Upload className="h-5 w-5 text-primary" />
                <span className="mt-2 text-sm font-medium text-white">
                  {sourcePreview
                    ? isZh
                      ? "已上传参考图"
                      : "Source ready"
                    : isZh
                      ? "上传参考图"
                      : "Upload source"}
                </span>
              </button>
            ) : null}
            <Button className="h-12 w-full rounded-full shadow-[0_0_30px_rgba(245,197,24,0.18)]">
              {isZh ? "按建议生成" : "Generate with setup"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="w-full text-center text-sm text-zinc-500 transition-colors hover:text-white"
            >
              {isZh ? "清空 Prompt" : "Clear prompt"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aurora-stage rounded-[34px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(47,32,22,0.72),rgba(20,14,11,0.95))] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.34)] md:p-7">
      <div className="mx-auto max-w-3xl text-center">
        <div className="section-label">
          {isZh ? "Generator Surface" : "Generator Surface"}
        </div>
        <h2
          className={`display-serif mt-4 text-4xl font-medium text-[#ffb221] md:text-5xl ${isZh ? "tracking-normal" : ""}`}
        >
          {generatorTitle}
        </h2>
        <p className="mt-4 text-lg leading-8 text-zinc-300">
          {generatorDescription}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {signals.map((signal, index) => (
            <div
              key={signal.label}
              data-delay={index}
              className="delayed-rise rounded-full border border-white/10 bg-black/25 px-4 py-2 text-left"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                {signal.label}
              </div>
              <div className="mt-1 text-sm text-zinc-200">{signal.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border border-[#3e3026] bg-[#2a1f18]/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] subtle-orbit">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {studioModes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-[22px] px-4 py-4 text-sm transition-colors ${
                mode === item.id
                  ? "bg-[#18110d] text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                  : "text-zinc-400 hover:bg-zinc-900/70 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.title[isZh ? "zh" : "en"]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#3e3026] bg-[#32261f]/95 p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {isZh ? "Prompt" : "Prompt"}
          </div>
          <button
            type="button"
            onClick={randomPrompt}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-primary/25 hover:text-white"
          >
            <Shuffle className="h-4 w-4" />
            {isZh ? "随机 Prompt" : "Random Prompt"}
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
          {needsSourceImage ? (
            <div className="panel-lift rounded-[24px] border border-[#4c392b] bg-[#2a1f18]/80 p-4">
              {sourcePreview ? (
                <>
                  <img
                    src={sourcePreview}
                    alt="Source preview"
                    className="h-36 w-full rounded-[18px] object-cover"
                  />
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={onPickSource}
                      className="flex-1 rounded-full border border-zinc-700 px-3 py-2 text-xs text-zinc-200 transition-colors hover:border-primary/25 hover:text-white"
                    >
                      {isZh ? "更换" : "Change"}
                    </button>
                    <button
                      type="button"
                      onClick={onClearSource}
                      className="rounded-full border border-zinc-700 px-3 py-2 text-xs text-zinc-400 transition-colors hover:text-white"
                    >
                      {isZh ? "清空" : "Clear"}
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onPickSource}
                  className="flex h-36 w-full flex-col items-center justify-center rounded-[18px] border border-dashed border-zinc-700 bg-[#241a14] px-4 text-center transition-colors hover:border-primary/25 hover:bg-white/[0.02]"
                >
                  <Upload className="h-6 w-6 text-primary" />
                  <div className="mt-3 text-sm font-medium text-white">
                    {isZh ? "上传参考图" : "Upload source"}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-zinc-400">
                    {isZh
                      ? "图生图 / 图生视频可选"
                      : "Optional for image-based generation"}
                  </div>
                </button>
              )}
            </div>
          ) : null}

          <Textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={placeholder}
            className={`min-h-[190px] rounded-[26px] border-[#4c392b] bg-[#241a14] px-5 py-5 text-lg leading-8 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-primary/40 ${needsSourceImage ? "" : "lg:col-span-2"}`}
          />
        </div>

        <div className="mt-5">
          <ChipRow locale={locale} groups={chipGroups} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="panel-lift rounded-[24px] border border-[#3e3026] bg-[#2a1f18]/80 p-4">
            <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {isZh ? "模型切换" : "Model Switch"}
            </div>
            <Select value={selectedModelId} onValueChange={onModelChange}>
              <SelectTrigger className="h-16 rounded-[20px] border-zinc-700 bg-[#1a130f] px-4 text-left text-white focus:ring-primary/35 focus:ring-offset-0">
                <SelectValue
                  placeholder={isZh ? "选择模型" : "Choose a model"}
                />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-[#14100d] text-zinc-100">
                {availableModels.map((model) => (
                  <SelectItem
                    key={model.slug}
                    value={model.slug}
                    className="focus:bg-white/[0.06] focus:text-white"
                  >
                    {model.labels[isZh ? "zh" : "en"]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedModel ? (
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span>{selectedModel.provider}</span>
                <span>•</span>
                <span>{selectedQuality}</span>
                <span>•</span>
                <span>{selectedQuantity}</span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {isZh ? "清空" : "Clear"}
            </button>
            <Button className="h-14 rounded-full px-8 text-base shadow-[0_0_36px_rgba(245,197,24,0.22)]">
              {liveGeneration
                ? isZh
                  ? "继续进入真实编辑器"
                  : "Continue to live editor"
                : isZh
                  ? "生成"
                  : "Generate"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NonLivePanel({
  locale,
  mode,
  model,
  modelProfile,
  prompt,
}: {
  locale: string;
  mode: StudioMode;
  model: ImaveoModel | undefined;
  modelProfile?: StudioModelProfile;
  prompt: string;
}) {
  const isZh = locale === "zh";
  const localeKey = isZh ? "zh" : "en";
  const guidance = modelProfile?.guidance ?? [];
  const workflow = modelProfile?.workflow ?? [];

  return (
    <div className="aurora-stage rounded-[30px] border border-zinc-800 bg-[#090909]/92 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="section-label">{isZh ? "下一步" : "Next Step"}</div>
          <h3
            className={`display-serif mt-3 text-3xl font-medium text-white ${isZh ? "tracking-normal" : ""}`}
          >
            {modelProfile
              ? isZh
                ? `${model?.labels.zh ?? "当前模型"} 这次生成应该怎么判断`
                : `How to judge this ${model?.labels.en ?? "model"} generation`
              : isZh
                ? "先确定创意与参数，再进入对应生成链路"
                : "Lock the creative brief first, then continue into the right generation path"}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
            {modelProfile
              ? modelProfile.compare.bestFor[localeKey]
              : isZh
                ? "你可以先在这里确定模式、提示词、参数和模型，再进入更具体的工作流继续创作。"
                : "Use this Studio to set the mode, prompt, parameters, and model first, then continue into the most suitable workflow."}
          </p>
        </div>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
          {modelProfile
            ? modelProfile.visualDirection[localeKey]
            : isZh
              ? "逐步开放"
              : "Rolling Out"}
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel-lift rounded-[24px] border border-zinc-800 bg-black/25 p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            {isZh ? "当前创意概览" : "Current Brief"}
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-primary" />
              <span>
                {workflow[0]?.[localeKey] ??
                  (isZh
                    ? "先在这个统一生成器里完成模式切换和参数配置。"
                    : "Use this unified generator to lock the mode and parameters first.")}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-primary" />
              <span>
                {workflow[1]?.[localeKey] ??
                  (isZh
                    ? "当前 prompt 会直接成为你继续生成时的基础输入。"
                    : "The current prompt becomes the base input when you continue into generation.")}
              </span>
            </div>
            {prompt ? (
              <div className="rounded-[20px] border border-zinc-800 bg-zinc-950/80 p-4 text-zinc-200">
                {prompt}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel-lift rounded-[24px] border border-zinc-800 bg-black/25 p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {modelProfile
                ? isZh
                  ? "模型内容重点"
                  : "Model Content Focus"
                : isZh
                  ? "当前模型"
                  : "Current Model"}
            </div>
            <div className="mt-3 text-xl font-medium text-white">
              {guidance[0]?.title[localeKey] ??
                model?.labels[localeKey] ??
                "Imaveo"}
            </div>
            <p className="mt-2 text-sm leading-7 text-zinc-300">
              {guidance[0]?.body[localeKey] ?? model?.descriptions[localeKey]}
            </p>
          </div>

          <div className="panel-lift rounded-[24px] border border-zinc-800 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.12),rgba(0,0,0,0.92)_65%)] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary">
              {modelProfile
                ? isZh
                  ? "适合 / 不适合"
                  : "Fit / Watchout"
                : isZh
                  ? "建议路径"
                  : "Recommended Path"}
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-primary" />
                <span>
                  {modelProfile?.compare.bestFor[localeKey] ??
                    (isZh
                      ? "如果是视频模式，先保存当前创意和模型组合。"
                      : "If you are in a video mode, preserve this prompt and model combination first.")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-primary" />
                <span>
                  {modelProfile?.compare.watchOut[localeKey] ??
                    (isZh
                      ? "如果当前任务已经明确，直接进入对应模式继续生成即可。"
                      : "If your task is already clear, continue directly into the matching generation mode.")}
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-5">
                <Link href={`/${locale}/pricing`}>
                  {isZh ? "查看套餐与 Credits" : "Compare plans and credits"}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-zinc-700 bg-transparent text-zinc-200 hover:bg-white/[0.04]"
              >
                <Link
                  href={`/${locale}/${mode.includes("video") ? "ai-video" : "ai-image"}`}
                >
                  {isZh ? "查看模型文档" : "Browse model docs"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImaveoStudio({
  locale,
  initialMode,
  initialModel,
  initialStyle,
  initialPrompt,
}: ImaveoStudioProps) {
  const isZh = locale === "zh";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryMode = searchParams.get("mode");
  const queryModel = searchParams.get("model");
  const queryStyle = searchParams.get("style");
  const queryPrompt = searchParams.get("prompt");
  const querySource = searchParams.get("source");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<StudioMode>(
    normalizeStudioMode(queryMode ?? initialMode),
  );
  const [selectedModelId, setSelectedModelId] = useState(
    queryModel ?? initialModel ?? "",
  );
  const [hasExplicitModel, setHasExplicitModel] = useState(
    Boolean(queryModel ?? initialModel),
  );
  const [selectedStyle, setSelectedStyle] = useState(
    queryStyle ?? initialStyle ?? "",
  );
  const [prompt, setPrompt] = useState(queryPrompt ?? initialPrompt ?? "");
  const [sourcePreview, setSourcePreview] = useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const availableModels = useMemo(() => getModelsForMode(mode), [mode]);

  useEffect(() => {
    setMode(normalizeStudioMode(queryMode ?? initialMode));
  }, [initialMode, queryMode]);

  useEffect(() => {
    const nextModel = queryModel ?? initialModel ?? "";
    setSelectedModelId(nextModel);
    setHasExplicitModel(Boolean(queryModel ?? initialModel));
  }, [initialModel, queryModel]);

  useEffect(() => {
    setSelectedStyle(queryStyle ?? initialStyle ?? "");
  }, [initialStyle, queryStyle]);

  useEffect(() => {
    setPrompt(queryPrompt ?? initialPrompt ?? "");
  }, [initialPrompt, queryPrompt]);

  useEffect(() => {
    const currentModelIsValid = availableModels.some(
      (model) => model.slug === selectedModelId,
    );
    if (!currentModelIsValid) {
      const fallback = availableModels[0];
      setSelectedModelId(fallback?.slug ?? "");
      setSelectedStyle("");
    }
  }, [availableModels, mode, selectedModelId]);

  useEffect(() => {
    setSelectedAspectRatio(aspectRatioMap[mode][0]);
    setSelectedDuration(durationMap[mode][0]);
    setSelectedQuality(qualityMap[mode][0]);
    setSelectedQuantity(quantityMap[mode][0]);
    if (!modeNeedsSourceImage(mode)) {
      setSourcePreview("");
    }
  }, [mode]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (hasExplicitModel && selectedModelId)
      params.set("model", selectedModelId);
    if (selectedStyle) params.set("style", selectedStyle);
    if (queryPrompt) params.set("prompt", queryPrompt);
    if (querySource) params.set("source", querySource);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    hasExplicitModel,
    mode,
    pathname,
    queryPrompt,
    querySource,
    router,
    selectedModelId,
    selectedStyle,
  ]);

  const selectedModel =
    availableModels.find((model) => model.slug === selectedModelId) ??
    availableModels[0];
  const keywordModel = hasExplicitModel ? selectedModel : undefined;
  const modelProfile = keywordModel
    ? getModelPageProfile(keywordModel.slug)
    : undefined;
  const liveGeneration = false;
  const pageHeading = getCreateLandingTitle(keywordModel, mode, isZh);
  const pageDescription = keywordModel
    ? isZh
      ? `当前已锁定 ${keywordModel.labels.zh}，你可以在这个 ${getWorkflowLabel(mode, true)} 工作流里继续写 prompt、调整参数并直接开始生成。`
      : `${keywordModel.labels.en} is currently selected, so you can continue inside this ${getWorkflowLabel(mode, false)} workflow and refine prompts and settings before generating.`
    : isZh
      ? "先确定当前工作流，再根据结果继续切换模型和参数。"
      : "Start with the workflow first, then switch models and settings based on the result you want.";
  const docsHref = `/${locale}/${keywordModel?.category === "video" || mode.includes("video") ? "ai-video" : "ai-image"}`;

  useEffect(() => {
    const title = keywordModel
      ? `${getCreateLandingTitle(keywordModel, mode, isZh)} | Imaveo`
      : isZh
        ? `${getWorkflowHeading(mode, true)} | Imaveo 创作中心`
        : `${getWorkflowHeading(mode, false)} | Imaveo Studio`;
    document.title = title;
  }, [isZh, keywordModel, mode, modelProfile]);

  const handlePickSource = () => {
    fileInputRef.current?.click();
  };

  const handleSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSourcePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const mobileSidebar = (
    <StudioSidebar
      locale={locale}
      mode={mode}
      model={selectedModel}
      modelProfile={modelProfile}
    />
  );

  return (
    <section className="aurora-stage min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.12),transparent_20%),linear-gradient(180deg,#080808,#020202)] py-8 md:py-10">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/heic"
        className="hidden"
        aria-label={isZh ? "上传参考图" : "Upload a reference image"}
        onChange={handleSourceChange}
      />

      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="section-label">Imaveo Studio</div>
              <h1
                className={`display-serif mt-3 text-4xl font-medium text-white md:text-5xl ${isZh ? "tracking-normal" : ""}`}
              >
                {pageHeading}
              </h1>
              <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-300">
                {pageDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="hidden rounded-full border-zinc-700 bg-transparent text-zinc-200 hover:bg-white/[0.04] md:inline-flex"
              >
                <Link href={docsHref}>
                  {isZh ? "返回模型文档" : "Back to docs"}
                </Link>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-zinc-700 bg-transparent text-zinc-100 hover:bg-white/[0.04] xl:hidden"
                  >
                    <Settings2 className="mr-2 h-4 w-4" />
                    {isZh ? "查看说明" : "Guide"}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full max-w-md border-zinc-800 bg-[#050505] p-4 text-white sm:max-w-md"
                >
                  <SheetHeader className="mb-4">
                    <SheetTitle className="text-white">
                      {isZh ? "Studio 使用说明" : "Studio guide"}
                    </SheetTitle>
                    <SheetDescription className="text-zinc-400">
                      {isZh
                        ? "移动端把辅助说明折叠到这里，主区域保持生成器为核心。"
                        : "On mobile, guidance collapses here so the generator stays as the main focus."}
                    </SheetDescription>
                  </SheetHeader>
                  {mobileSidebar}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_280px]">
            <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start">
              {mobileSidebar}
            </aside>

            <main className="min-w-0 space-y-6">
              <GeneratorPanel
                locale={locale}
                mode={mode}
                setMode={setMode}
                selectedModel={selectedModel}
                modelProfile={modelProfile}
                selectedModelId={selectedModelId}
                availableModels={availableModels}
                onModelChange={(value) => {
                  setSelectedModelId(value);
                  setHasExplicitModel(true);
                }}
                prompt={prompt}
                setPrompt={setPrompt}
                selectedAspectRatio={selectedAspectRatio}
                setSelectedAspectRatio={setSelectedAspectRatio}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                selectedQuality={selectedQuality}
                setSelectedQuality={setSelectedQuality}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
                liveGeneration={liveGeneration}
                sourcePreview={sourcePreview}
                onPickSource={handlePickSource}
                onClearSource={() => setSourcePreview("")}
              />

              <NonLivePanel
                locale={locale}
                mode={mode}
                model={selectedModel}
                modelProfile={modelProfile}
                prompt={prompt}
              />
            </main>

            <aside className="hidden xl:block">
              <div className="aurora-stage sticky top-24 space-y-4 rounded-[30px] border border-zinc-800 bg-[#090909]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <History className="h-4 w-4 text-primary" />
                  {modelProfile
                    ? isZh
                      ? "实际案例"
                      : "Real examples"
                    : isZh
                      ? "最近创作"
                      : "Recent creations"}
                </div>
                <p className="text-sm leading-7 text-zinc-400">
                  {modelProfile
                    ? modelProfile.compare.bestFor[isZh ? "zh" : "en"]
                    : isZh
                      ? "右侧用于查看最近创作与复用参数，帮助你更快开启下一次生成。"
                      : "Use the right rail to revisit recent creations and reuse settings for the next run."}
                </p>
                <div className="space-y-3">
                  {modelProfile
                    ? modelProfile.gallery.map((item) => (
                        <div
                          key={item.title.en}
                          className="panel-lift rounded-[22px] border border-zinc-800 bg-black/30 p-3"
                        >
                          <div
                            className={`mb-3 h-24 rounded-[18px] bg-gradient-to-br ${item.accent} subtle-orbit`}
                          />
                          <div className="text-sm font-medium text-white">
                            {item.title[isZh ? "zh" : "en"]}
                          </div>
                          <p className="mt-2 text-xs leading-5 text-zinc-400">
                            {item.prompt[isZh ? "zh" : "en"]}
                          </p>
                        </div>
                      ))
                    : recentSeeds.map((item) => (
                        <div
                          key={item.id}
                          className="panel-lift rounded-[22px] border border-zinc-800 bg-black/30 p-3"
                        >
                          <div
                            className={`mb-3 h-24 rounded-[18px] bg-gradient-to-br ${item.color} to-transparent subtle-orbit`}
                          />
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm font-medium text-white">
                                {item.kind}
                              </div>
                              <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                                {item.status}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                            >
                              {isZh ? "复用" : "Reuse"}
                            </Button>
                          </div>
                        </div>
                      ))}
                </div>
                <Button asChild className="w-full rounded-full">
                  <Link href={`/${locale}/my-creations`}>
                    {isZh ? "打开创作资产库" : "Open creation library"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
