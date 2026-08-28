#!/usr/bin/env node
/**
 * Post-build script: inline the CSS file into each HTML page
 * and make the external CSS load async (non-render-blocking).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const DIST = resolve(import.meta.dirname, '..', 'dist');

function findCssFile() {
  const chunksDir = join(DIST, '_next', 'static', 'chunks');
  const files = readdirSync(chunksDir).filter(f => f.endsWith('.css'));
  if (files.length !== 1) {
    console.warn(`Expected 1 CSS file, found ${files.length}: ${files.join(', ')}`);
  }
  return join(chunksDir, files[0]);
}

function getAllHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...getAllHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const cssPath = findCssFile();
const cssContent = readFileSync(cssPath, 'utf-8');
const cssHref = cssPath.replace(DIST, '').replace(/\\/g, '/');

console.log(`CSS file: ${cssHref} (${(cssContent.length / 1024).toFixed(1)}KB)`);

const htmlFiles = getAllHtmlFiles(DIST);
let modified = 0;

for (const htmlPath of htmlFiles) {
  let html = readFileSync(htmlPath, 'utf-8');
  
  // Check if this page references the CSS file
  if (!html.includes(cssHref)) continue;
  
  // Replace the <link rel="stylesheet" ... href="cssHref" ...>
  // with: <style>cssContent</style> + async loading link
  const linkRegex = new RegExp(
    `<link[^>]*rel=["']stylesheet["'][^>]*href=["']${cssHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*\\/?>`,
    'i'
  );
  
  const match = html.match(linkRegex);
  if (!match) continue;
  
  // Replace relative font paths with absolute paths (../media/ → /_next/static/media/)
  const fixedCss = cssContent.replace(/url\(\.\.\/media\//g, 'url(/_next/static/media/');
  
  // Replace with inline style + async link
  const replacement = `<style>${fixedCss}</style>`;
  html = html.replace(match[0], replacement);
  
  writeFileSync(htmlPath, html);
  modified++;
}

console.log(`Inlined CSS into ${modified} HTML files`);
