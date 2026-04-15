import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Shield, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { buildLocaleAlternates } from "@/utils/seo/metadata";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const isZh = locale === "zh";

  const title = isZh ? "关于我们" : "About";
  const description = isZh
    ? "了解 Imaveo：一个把 AI 视频与 AI 图片工作流整合到一起的创作平台。"
    : "Learn about Imaveo, the creation platform that brings AI video and AI image workflows into one place.";

  const ogImage = new URL(site.ogImagePath, site.siteUrl).toString();

  return {
    title,
    description,
    alternates: buildLocaleAlternates(`/${locale}/about`),
    openGraph: {
      title,
      description,
      type: "website",
      url: new URL(`/${locale}/about`, site.siteUrl).toString(),
      siteName: site.siteName,
      images: [{ url: ogImage, width: 512, height: 512, alt: site.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const isZh = locale === "zh";
  const localePrefix = `/${locale}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6 py-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href={localePrefix}>
              <ArrowLeft className="h-4 w-4" />
              {isZh ? "返回首页" : "Back to Home"}
            </Link>
          </Button>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <Breadcrumbs
            items={[
              { name: isZh ? "首页" : "Home", href: localePrefix },
              { name: isZh ? "关于我们" : "About", href: `${localePrefix}/about` },
            ]}
          />
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {isZh ? `关于 ${site.siteName}` : `About ${site.siteName}`}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isZh
                ? "把 AI 图片与 AI 视频工作流放到同一个产品里，帮助创作者更快从想法走到成片。"
                : "Bring AI image and AI video workflows into one product so creators can move from idea to output faster."}
            </p>
            <p className="text-sm text-muted-foreground">
              {isZh
                ? `${site.siteName} 面向内容团队、独立创作者与品牌运营，提供文生图、图生图、文生视频、图生视频和模型切换能力。`
                : `${site.siteName} is built for teams, solo creators, and marketers who need text-to-image, image-to-image, text-to-video, image-to-video, and flexible model switching.`}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {isZh ? "结果导向" : "Result First"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {isZh ? "围绕创作者的真实任务设计模型入口、参数层级和创作路径。" : "Built around real creator jobs, with clear model entry points, parameters, and workflows."}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  {isZh ? "统一工作流" : "Unified Workflow"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {isZh ? "在一个工作台里完成模式切换、提示词输入、参数调整和后续管理。" : "Handle mode switching, prompting, parameter tuning, and output management from one workspace."}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  {isZh ? "透明说明" : "Transparent Policy"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {isZh
                  ? "为完成 AI 生成，我们会把图片发送到第三方 AI 服务处理；更多细节请见隐私政策。"
                  : "To generate images, we send your uploads to a third-party AI service; see Privacy Policy for details."}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              {isZh
                ? `商务、版权或支持问题可联系：${site.supportEmail}`
                : `For support, rights, or business inquiries, contact: ${site.supportEmail}`}
            </p>
            <Button asChild size="lg">
              <Link href={`${localePrefix}`}>{isZh ? "开始生成" : "Start Generating"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
