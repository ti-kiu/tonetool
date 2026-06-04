import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
const parseMatter = (matter as any).default || matter;
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  contentHtml: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = parseMatter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseMatter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    contentHtml,
  };
}
