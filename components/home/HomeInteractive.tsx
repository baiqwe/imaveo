'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ArrowRight, ImageIcon, PlaySquare, Sparkles } from 'lucide-react';
import { AnimeImageEditor } from '@/components/feature/anime-image-editor';
import type { AnimeStyleId } from '@/config/landing-pages';
import { imaveoModels } from '@/config/imaveo';
import { Link } from '@/i18n/routing';

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
  const pathParts = pathname?.split('/') || [];
  const locale = pathParts[1] === 'en' || pathParts[1] === 'zh' ? pathParts[1] : 'en';
  const localeKey = locale as 'en' | 'zh';
  const isZh = locale === 'zh';

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

          <p className="mt-6 max-w-4xl text-lg leading-9 text-white/72 md:text-[1.9rem] md:leading-[1.45]">
            {t('subtitle')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {imaveoModels.map((model) => (
              <Link
                key={model.slug}
                href={model.href}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {model.labels[localeKey]}
              </Link>
            ))}
          </div>

          <div className="mt-12 w-full max-w-4xl rounded-[28px] border border-[#3b2910] bg-[#09090d]/88 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-5">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/8 pb-4 text-left">
              <HeroTab icon={<PlaySquare className="h-4 w-4" />} label={isZh ? 'AI 视频' : 'AI Video'} active />
              <HeroTab icon={<ImageIcon className="h-4 w-4" />} label={isZh ? 'AI 图片' : 'AI Image'} />
              <HeroTab icon={<Sparkles className="h-4 w-4" />} label="Animeify" hot />
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-[1fr_auto]">
              <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-left">
                <div className="text-xs uppercase tracking-[0.2em] text-white/35">
                  {isZh ? '快速生成入口' : 'Prompt Console'}
                </div>
                <div className="mt-3 text-base text-white/88">
                  {isZh
                    ? '把 Animeify 作为默认首屏入口，继续承接 Veo、Kling、Flux 等模型的统一切换。'
                    : 'Use Animeify as the first launch path, while keeping Veo, Kling, and Flux inside the same frame.'}
                </div>
                <div className="mt-4 rounded-[18px] border border-white/8 bg-black/35 px-4 py-4 text-sm leading-7 text-white/52">
                  {isZh
                    ? '示例：上传一张人像，先生成动漫头像；接着切到图生视频，把同一张角色图继续做成动态短片。'
                    : 'Example: upload one portrait, generate an anime avatar first, then switch to image-to-video and animate the same character into a short cinematic clip.'}
                </div>
              </div>

              <div className="flex flex-col gap-3 text-left md:min-w-[220px]">
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {isZh ? '默认模型' : 'Default Model'}
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">Animeify</div>
                  <div className="mt-2 text-sm leading-6 text-white/45">
                    {isZh ? '首屏负责最快拿到第一张成片。' : 'Optimized for the fastest first success.'}
                  </div>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {isZh ? '快速参数' : 'Quick Params'}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['16:9', '9:16', '5s', 'HD'].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/ai-image/animeify"
                  className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-primary px-5 py-4 text-sm font-medium text-black transition-transform hover:translate-y-[-1px]"
                >
                  {isZh ? '进入 Animeify Studio' : 'Open Animeify Studio'} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/55">
            <span>{t('feature_1')}</span>
            <span>{t('feature_2')}</span>
            <span>{t('feature_3')}</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl rounded-[30px] border border-white/10 bg-black/55 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-left">
              <div className="section-label">Animeify Studio</div>
              <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-white">{t('tool_title')}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">{t('tool_subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {imaveoModels.map((model) => (
                <Link
                  key={model.slug}
                  href={model.href}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:border-primary/45 hover:text-primary"
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
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hot?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
        active ? 'bg-white/[0.06] text-white' : 'text-white/55'
      }`}
    >
      {icon}
      <span>{label}</span>
      {hot ? (
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black">
          HOT
        </span>
      ) : null}
    </div>
  );
}

export function useHomeInteractive() {
  const [showStaticContent, setShowStaticContent] = useState(true);
  return { showStaticContent, setShowStaticContent };
}
