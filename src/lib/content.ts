import * as mock from "./mock";
import * as q from "./queries";
import { fetchFromSanity, usingSanity } from "./sanity";
import type { Category, NewsItem, Post, Project } from "./types";

/* The single entry point every page uses. Mock mode reads src/lib/mock.ts;
   once NEXT_PUBLIC_SANITY_PROJECT_ID is set the same functions read Sanity,
   and the return types do not change. */

export async function getProjects(): Promise<Project[]> {
  if (usingSanity) return fetchFromSanity<Project[]>(q.projectListQuery);
  return mock.projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  if (usingSanity) return fetchFromSanity<Project | null>(q.projectBySlugQuery, { slug });
  return mock.projects.find((p) => p.slug === slug) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  if (usingSanity) return fetchFromSanity<Post[]>(q.postListQuery);
  return mock.posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  if (usingSanity) return fetchFromSanity<Post | null>(q.postBySlugQuery, { slug });
  return mock.posts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  if (usingSanity) return fetchFromSanity<Category[]>(q.categoryListQuery);
  return mock.categories;
}

export async function getNews(): Promise<NewsItem[]> {
  if (usingSanity) return fetchFromSanity<NewsItem[]>(q.newsListQuery);
  return mock.news;
}

/** Two other pieces to read next, excluding the one on screen. */
export function pickRelated<T extends { slug: string }>(all: T[], current: string, count = 2) {
  return all.filter((item) => item.slug !== current).slice(0, count);
}
