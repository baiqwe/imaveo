'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight, ImageIcon, PlaySquare, Sparkles } from 'lucide-react';
import { AnimeImageEditor } from '@/components/feature/anime-image-editor';
import type { AnimeStyleId } from '@/config/landing-pages';
import { imaveoModels } from '@/config/imaveo';
import { Link } from '@/i18n/routing';
import { buildStudioPath } from '@/utils/studio';

interface HomeInteractiveProps {
  onShowStaticContent: (show: boolean) => void;
  user?: any;
}

export default function HomeInteractive({ onShowStaticContent, user }: HomeInteractiveProps) {
  return <HeroWithUploadSection onShowStaticContent={onShowStaticContent} user={user} />;
}

function HeroWithUploadSection({
  onShowStaticContent,
  user,
}: {
  onShowStaticContent: (show: boolean) => void;
  user?: any;
}) {
  const t = useTranslations('hero');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathParts = pathname?.split('/') || [];
  const locale = pathParts[1] === 'en' || pathParts[1] === 'zh' ? pathParts[1] : 'en';
  const localeKey = locale as 'en' | 'zh';
  const isZh = locale === 'zh';
  const [activeMode, setActiveMode] = useState<'video' | 'image' | 'anime'>('anime');
  const modeFromQuery = searchParams?.get('mode');

  useEffect(() => {
    if (modeFromQuery === 'video' || modeFromQuery === 'image' || modeFromQuery === 'anime') {
      setActiveMode(modeFromQuery);
    }
  }, [modeFromQuery]);
  const activeModels = imaveoModels.filter((model) =>
    activeMode === 'video' ? model.category === 'video' : model.category === 'image'
  );
  const activeLabel = activeMode === 'video' ? (isZh ? 'AI 视频工作台' : 'AI Video Console') : activeMode === 'image' ? (isZh ? 'AI 图片工作台' : 'AI Image Console') : 'Animeify Studio';
  const activeDescription = activeMode === 'video'
    ? (isZh ? '适合文生视频、图生视频与电影感镜头实验。' : 'Built for text-to-video, image-to-video, and cinematic motion experiments.')
    : activeMode === 'image'
      ? (isZh ? '适合封面、海报、品牌主视觉和商品图。' : 'Built for covers, posters, hero art, and product visuals.')
      : (isZh ? '最快拿到第一张可用成片的二次元专属入口。' : 'The fastest route to a usable first result for anime portraits.');

  return (
    <section className="hero-backdrop relative min-h-[92vh] border-b border-white/10">
      <div className="absolute inset-0 bg-black/35" />
      <div className="container relative px-4 pb-16 pt-16 md:px-6 md:pb-24 md:pt-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-black/35 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t('badge')}
          </div>

          <h1 className="headline-tight mt-8 max-w-5xl text-5xl font-medium text-white sm:text-6xl xl:text-7xl">
            {t('title')} <span className="text-primary">{t('title_highlight')}</span>
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-9 text-zinc-300 md:text-[1.9rem] md:leading-[1.45]">
            {t('subtitle')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {imaveoModels.map((model) => (
              <Link
                key={model.slug}
                href={buildStudioPath({
                  mode: model.category === 'video' ? (model.mode === 'image-to-video' ? 'image-to-video' : 'text-to-video') : model.slug === 'animeify' ? 'image-to-image' : 'text-to-image',
                  model: model.slug,
                  style: model.slug === 'animeify' ? 'anime' : undefined,
                  source: 'home-chip',
                })}
                className="rounded-full border border-zinc-800 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {model.labels[localeKey]}
              </Link>
            ))}
          </div>

            <div id="hero-console" className="mt-12 w-full max-w-4xl scroll-mt-24 rounded-[28px] border border-zinc-800 bg-[#09090d]/94 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-5">
              <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4 text-left">
              <HeroTab icon={<PlaySquare className="h-4 w-4" />} label={isZh ? 'AI 视频' : 'AI Video'} active={activeMode === 'video'} onClick={() => setActiveMode('video')} />
              <HeroTab icon={<ImageIcon className="h-4 w-4" />} label={isZh ? 'AI 图片' : 'AI Image'} active={activeMode === 'image'} onClick={() => setActiveMode('image')} />
              <HeroTab icon={<Sparkles className="h-4 w-4" />} label="Animeify" hot active={activeMode === 'anime'} onClick={() => setActiveMode('anime')} />
              </div>

              <div className="grid gap-4 pt-4 md:grid-cols-[1fr_auto]">
              <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-left">
                <div className="text-xs uppercase tracking-[0.2em] text-white/35">
                  {isZh ? '快速生成入口' : 'Prompt Console'}
                </div>
                <div className="mt-3 text-base text-white/88">
                  {activeDescription}
                </div>
                <div className="mt-4 rounded-[18px] border border-white/8 bg-black/35 px-4 py-4 text-sm leading-7 text-white/52">
                  {activeMode === 'video'
                    ? (isZh
                      ? '示例：输入一句角色动作提示词，切到 Veo 或 Kling，生成 5-8 秒短片。'
                      : 'Example: write a motion prompt, switch between Veo and Kling, and generate a 5-8 second clip.')
                    : activeMode === 'image'
                      ? (isZh
                        ? '示例：输入品牌视觉需求，切到 Flux，生成海报、广告图或封面。'
                        : 'Example: write a branding prompt, switch to Flux, and generate a poster, ad visual, or hero image.')
                      : (isZh
                        ? '示例：上传一张人像，先生成动漫头像；再切到图生视频，把同一角色做成动态短片。'
                        : 'Example: upload a portrait, generate an anime avatar, then animate that same character into a short video.')}
                </div>
              </div>

              <div className="flex flex-col gap-3 text-left md:min-w-[220px]">
                  <div className="rounded-[22px] border border-zinc-800 bg-white/[0.03] p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {isZh ? '默认模型' : 'Default Model'}
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">{activeLabel}</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-400">
                    {isZh ? '点击标签切换模式，后续会接更细的参数面板。' : 'Switch modes with tabs. A deeper parameter sheet can plug in later.'}
                  </div>
                </div>
                <div className="rounded-[22px] border border-zinc-800 bg-white/[0.03] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {isZh ? '快速参数' : 'Quick Params'}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(activeMode === 'video' ? ['16:9', '9:16', '5s', '8s'] : activeMode === 'image' ? ['1:1', '4:5', 'HD', 'Prompt'] : ['Anime', 'Portrait', 'Style', 'HD']).map((item) => (
                      <span key={item} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={activeMode === 'video'
                    ? buildStudioPath({ mode: 'text-to-video', model: 'veo-3', source: 'home-hero' })
                    : activeMode === 'image'
                      ? buildStudioPath({ mode: 'text-to-image', model: 'flux-pro', source: 'home-hero' })
                      : buildStudioPath({ mode: 'image-to-image', model: 'animeify', style: 'anime', source: 'home-hero' })}
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-primary px-5 py-4 text-sm font-medium text-black transition-transform hover:translate-y-[-1px]"
                >
                  {activeMode === 'video'
                    ? (isZh ? '进入 AI 视频' : 'Open AI Video')
                    : activeMode === 'image'
                      ? (isZh ? '进入 AI 图片' : 'Open AI Image')
                      : (isZh ? '进入 Animeify Studio' : 'Open Animeify Studio')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <span>{t('feature_1')}</span>
            <span>{t('feature_2')}</span>
            <span>{t('feature_3')}</span>
          </div>
        </div>

        <div id="animeify-studio" className="mx-auto mt-14 max-w-6xl scroll-mt-24 rounded-[30px] border border-zinc-800 bg-black/55 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-left">
              <div className="section-label">Animeify Studio</div>
              <h2 className={`mt-2 text-3xl font-medium text-white ${isZh ? 'tracking-normal' : 'tracking-[-0.04em]'}`}>{t('tool_title')}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">{t('tool_subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeModels.map((model) => (
                <Link
                  key={model.slug}
                  href={buildStudioPath({
                    mode: model.slug === 'animeify' ? 'image-to-image' : 'text-to-image',
                    model: model.slug,
                    style: model.slug === 'animeify' ? 'anime' : undefined,
                    source: 'home-animeify',
                  })}
                  className="rounded-full border border-zinc-800 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-primary/45 hover:text-primary"
                >
                  #{model.labels[localeKey]}
                </Link>
              ))}
            </div>
          </div>

          <AnimeImageEditor
            locale={locale}
            user={user}
            title={isZh ? '生成你的第一张 Animeify 成片' : 'Generate your first Animeify result'}
            subtitle={
              isZh
                ? '这里保留真正可用的上传与生成工作流，首屏框架则参考 Artta 的信息组织方式。'
                : 'This keeps the real upload and generation workflow intact while the hero adopts the Artta-style framing.'
            }
            defaultStyle={'standard' as AnimeStyleId}
            hideStyleSelector={false}
            compact={false}
            onImageUploaded={(uploaded) => onShowStaticContent(!uploaded)}
          />
        </div>
      </div>
    </section>
  );
}

function HeroTab({
  icon,
  label,
  active = false,
  hot = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hot?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
        active ? 'bg-white/[0.06] text-white' : 'text-zinc-400'
      }`}
    >
      {icon}
      <span>{label}</span>
      {hot ? (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black">
          HOT
        </span>
      ) : null}
    </button>
  );
}

export function useHomeInteractive() {
  const [showStaticContent, setShowStaticContent] = useState(true);
  return { showStaticContent, setShowStaticContent };
}
