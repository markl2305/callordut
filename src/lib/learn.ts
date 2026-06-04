import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Clio publishes GEO articles as content/learn/{vertical}/{slug}.mdx with YAML
// frontmatter (title, description, vertical, schema_type, published_at).
const ROOT = path.join(process.cwd(), "content", "learn");

export type LearnArticle = {
  slug: string[];
  url: string;
  title: string;
  description: string;
  vertical: string;
  schemaType: string;
  publishedAt: string | null;
  body: string;
};

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

export function allArticles(): LearnArticle[] {
  return walk(ROOT)
    .map((file) => {
      const rel = path.relative(ROOT, file).replace(/\.mdx?$/, "");
      const slug = rel.split(path.sep);
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      return {
        slug,
        url: "/learn/" + slug.join("/"),
        title: String(data.title || slug[slug.length - 1]),
        description: String(data.description || ""),
        vertical: String(data.vertical || slug[0] || "learn"),
        schemaType: String(data.schema_type || "Article"),
        publishedAt: data.published_at ? String(data.published_at) : null,
        body: content,
      };
    })
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

export function getArticle(slug: string[]): LearnArticle | null {
  const key = slug.join("/");
  return allArticles().find((a) => a.slug.join("/") === key) || null;
}
