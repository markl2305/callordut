import type { Metadata } from "next";
import Link from "next/link";
import { allArticles } from "../../lib/learn";

export const metadata: Metadata = {
  title: "Learn | CalLord Unified Technologies",
  description:
    "Practical guides on commercial AV integration, security systems, and smart rooms — from the CalLord Unified Technologies team.",
  alternates: { canonical: "/learn" },
};

export default function LearnIndex() {
  const articles = allArticles();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-3 font-[family-name:var(--font-newsreader)] text-4xl font-medium tracking-tight">Learn</h1>
      <p className="mb-10 text-lg opacity-75">
        Straight answers on commercial AV, security, and smart rooms.
      </p>
      {articles.length === 0 ? (
        <p className="opacity-60">New guides are on the way.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((a) => (
            <li key={a.url} className="border-b pb-6">
              <Link href={a.url} className="group block">
                <h2 className="font-[family-name:var(--font-newsreader)] text-xl font-medium tracking-tight group-hover:opacity-70">
                  {a.title}
                </h2>
                {a.description ? <p className="mt-1 text-sm opacity-70">{a.description}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
