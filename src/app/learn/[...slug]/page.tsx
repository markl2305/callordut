import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { allArticles, getArticle } from "../../../lib/learn";
import { siteConfig } from "../../../config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: `${a.title} | CalLord Unified Technologies`,
    description: a.description,
    alternates: { canonical: a.url },
    openGraph: { title: a.title, description: a.description, url: a.url, type: "article" },
  };
}

const mdxComponents = {
  h1: (p: React.ComponentProps<"h1">) => <h1 className="mt-10 mb-4 font-[family-name:var(--font-newsreader)] text-3xl font-medium tracking-tight" {...p} />,
  h2: (p: React.ComponentProps<"h2">) => <h2 className="mt-10 mb-3 font-[family-name:var(--font-newsreader)] text-2xl font-medium tracking-tight" {...p} />,
  h3: (p: React.ComponentProps<"h3">) => <h3 className="mt-8 mb-2 text-xl font-semibold" {...p} />,
  p: (p: React.ComponentProps<"p">) => <p className="my-4 leading-relaxed text-[var(--ink-2,#3a3a3a)]" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => <ul className="my-4 list-disc space-y-2 pl-6" {...p} />,
  ol: (p: React.ComponentProps<"ol">) => <ol className="my-4 list-decimal space-y-2 pl-6" {...p} />,
  li: (p: React.ComponentProps<"li">) => <li className="leading-relaxed" {...p} />,
  a: (p: React.ComponentProps<"a">) => <a className="underline underline-offset-2 hover:opacity-70" {...p} />,
  strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold" {...p} />,
  blockquote: (p: React.ComponentProps<"blockquote">) => <blockquote className="my-6 border-l-2 pl-4 italic opacity-80" {...p} />,
  table: (p: React.ComponentProps<"table">) => <div className="my-6 overflow-x-auto"><table className="w-full border-collapse text-sm" {...p} /></div>,
  th: (p: React.ComponentProps<"th">) => <th className="border-b px-3 py-2 text-left font-semibold" {...p} />,
  td: (p: React.ComponentProps<"td">) => <td className="border-b px-3 py-2 align-top" {...p} />,
};

export default async function LearnArticlePage(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const base = siteConfig.website.replace(/\/$/, "");
  const ld =
    a.schemaType === "FAQPage"
      ? { "@context": "https://schema.org", "@type": "WebPage", name: a.title, description: a.description, url: base + a.url,
          publisher: { "@type": "Organization", name: siteConfig.shortName, url: base } }
      : { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description,
          mainEntityOfPage: base + a.url, datePublished: a.publishedAt || undefined,
          author: { "@type": "Organization", name: siteConfig.shortName },
          publisher: { "@type": "Organization", name: siteConfig.shortName, url: base } };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/learn" className="text-sm opacity-60 hover:opacity-100">← Learn</Link>
      <h1 className="mt-4 mb-6 font-[family-name:var(--font-newsreader)] text-4xl font-medium tracking-tight">{a.title}</h1>
      {a.description ? <p className="mb-8 text-lg opacity-75">{a.description}</p> : null}
      <article className="text-[15px]">
        <MDXRemote source={a.body} components={mdxComponents} />
      </article>
      <div className="mt-14 border-t pt-8">
        <Link href="/contact" className="inline-block rounded-full border px-6 py-3 text-sm font-medium hover:opacity-70">
          Talk to CalLord about your project →
        </Link>
      </div>
    </main>
  );
}
