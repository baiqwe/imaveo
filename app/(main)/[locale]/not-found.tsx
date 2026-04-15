import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20">
      <div className="w-full max-w-xl rounded-[28px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(18,18,22,0.96),rgba(10,10,12,0.94))] p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div className="section-label">404</div>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Page not found / 页面不存在</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          The page may have moved, expired, or never existed. You can return to the homepage and continue exploring
          AI image and video workflows.
        </p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          这个页面可能已经移动、失效，或从未存在。你可以返回首页，继续查看 AI 图片和 AI 视频工作流。
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-black transition-transform hover:translate-y-[-1px]"
          >
            Back Home / 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
