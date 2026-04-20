#!/usr/bin/env node

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from 'fs';
import { extname, join, relative, resolve } from 'path';

const POSTS_DIR = resolve('_posts');
const PUBLIC_DIR = resolve('public', 'posts');

const IMAGE_EXTS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.avif',
]);

const IMAGES_DIR_NAME = 'images';

function isImageFile(filePath) {
  return IMAGE_EXTS.has(extname(filePath).toLowerCase());
}

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
}

function resetDir(dirPath) {
  rmSync(dirPath, { recursive: true, force: true });
  ensureDir(dirPath);
}

function copyAsset(src, dest) {
  ensureDir(resolve(dest, '..'));
  cpSync(src, dest, { force: true });
}

function walkImageFiles(dirPath) {
  const imageFiles = [];

  for (const entry of readdirSync(dirPath)) {
    const fullPath = join(dirPath, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      imageFiles.push(...walkImageFiles(fullPath));
      continue;
    }

    if (isImageFile(fullPath)) imageFiles.push(fullPath);
  }

  return imageFiles;
}

for (const entry of readdirSync(POSTS_DIR)) {
  const postDir = join(POSTS_DIR, entry);
  if (!statSync(postDir).isDirectory()) continue;

  const destDir = join(PUBLIC_DIR, entry);
  resetDir(destDir);

  const imagesDir = join(postDir, IMAGES_DIR_NAME);
  if (!existsSync(imagesDir) || !statSync(imagesDir).isDirectory()) continue;

  for (const src of walkImageFiles(imagesDir)) {
    const imageRelativePath = relative(imagesDir, src);
    copyAsset(src, join(destDir, IMAGES_DIR_NAME, imageRelativePath));
  }
}

console.log('[sync-post-assets] done');
