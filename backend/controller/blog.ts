import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import createError from "http-errors";

// Helper: auto-generate a URL slug from the title
const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);

// ─────────────────────────────────────────
// PUBLIC: Get all published posts (Blog Page)
// ─────────────────────────────────────────
export const getPublishedPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      select: {
        id: true,
        title: true,
        url: true,
        excerpt: true,
        imageUrl: true,
        category: true,
        content: true,
        sourceUrl: true,
        tags: true,
        readTime: true,
        views: true,
        featured: true,
        publishedAt: true,
        author: { select: { fullname: true, avatar: true } },
      },
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// PUBLIC: Get single post by slug + increment views
// ─────────────────────────────────────────
export const getPostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const post = await prisma.blogPost.findUnique({
      where: { url },
      include: { author: { select: { fullname: true, avatar: true } } },
    });
    if (!post || post.status !== "PUBLISHED") return next(createError(404, "Post not found"));

    // Increment views quietly in background
    prisma.blogPost.update({ where: { url }, data: { views: { increment: 1 } } }).catch(() => {});

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// ADMIN: Get ALL posts (including drafts)
// ─────────────────────────────────────────
export const getAllPostsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { fullname: true } } },
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// ADMIN: Create a new post
// ─────────────────────────────────────────
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, excerpt, content, imageUrl, category, tags, status, featured, readTime ,sourceUrl} = req.body;
    const authorId = (req as any).user?.id;

    if (!title || !excerpt || !content) {
      return next(createError(400, "Title, excerpt, and content are required"));
    }

    const url = generateSlug(title);

    const post = await prisma.blogPost.create({
      data: {
        title,
        url,
        excerpt,
        content,
        imageUrl: imageUrl || null,
        category: category || "General",
        sourceUrl: sourceUrl || null,
        tags: tags || [],
        status: status || "DRAFT",
        featured: featured || false,
        readTime: readTime || null,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        authorId,
      },
    });

    res.status(201).json({ success: true, message: "Post created", data: post });
  } catch (error: any) {
    if (error.code === "P2002") return next(createError(409, "A post with this title already exists"));
    next(error);
  }
};

// ─────────────────────────────────────────
// ADMIN: Update a post
// ─────────────────────────────────────────
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const { title, excerpt, content, imageUrl, category, tags, status, featured, readTime,sourceUrl } = req.body;
    if (!id) return next(createError(400, "Post ID is required"));
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return next(createError(404, "Post not found"));

    const wasPublished = existing.status !== "PUBLISHED" && status === "PUBLISHED";

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        url: title ? generateSlug(title) : existing.url,
        excerpt: excerpt ?? existing.excerpt,
        content: content ?? existing.content,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        sourceUrl: sourceUrl !== undefined ? sourceUrl : existing.sourceUrl,
        category: category ?? existing.category,
        tags: tags ?? existing.tags,
        status: status ?? existing.status,
        featured: featured !== undefined ? featured : existing.featured,
        readTime: readTime ?? existing.readTime,
        publishedAt: wasPublished ? new Date() : existing.publishedAt,
      },
    });

    res.json({ success: true, message: "Post updated", data: updated });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// ADMIN: Delete a post
// ─────────────────────────────────────────
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return next(createError(404, "Post not found"));

    await prisma.blogPost.delete({ where: { id } });
    res.json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
