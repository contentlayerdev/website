export const codeSnippets = [
  {
    file: 'utils/page-utils.tsx',
    lines: 106,
    content: `\
// @noErrors
import fs from "fs";
import glob from "glob";
import path from "path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import type { Page, PageFrontmatter } from "../types/Page";

const contentDir = path.join(process.cwd(), "../content");

/**
 * Full paths to all content source files.
 *
 * @returns an array of all content source files
 */
function allPageFilePaths(): string[] {
	return glob.sync(path.join(contentDir, "**/*.md"));
}

/**
 * Given the full path to a content source file, provide a relative path from
 * the content source directory, without the file extension.
 *
 * @param filePath Full path to the content source file
 * @returns Path that can be used as a urlPath for this piece of content
 */
function buildPageUrlPath(filePath: string): string {
	const relFilePath = filePath.replace(contentDir, "");
	return relFilePath.replace(/\.md$/, "");
}

/**
 * Read from a local file and convert it into a Page object.
 *
 * @param filePath Full path to the content source file
 * @returns processed Page object
 */
async function processPage(filePath: string): Promise<Page> {
	const rawContent = fs.readFileSync(filePath).toString();

	const { data, content } = matter(rawContent);
	const frontmatter = data as PageFrontmatter;

	const body = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(content);

	const urlPath = buildPageUrlPath(filePath);

	return {
		...frontmatter,
		urlPath,
		body: {
			raw: content,
			html: String(body),
		},
	};
}

/**
 * Process and rerturn all pages.
 *
 * @returns A list of all Page objects
 */
export async function allPages(): Promise<Page[]> {
	let pages = [];
	for (const filePath of allPageFilePaths()) {
		const page = await processPage(filePath);
		pages.push(page);
	}
	return pages;
}

/**
 * Get an array of all possible page paths, to be used with getStaticPaths().
 *
 * @returns array of all possible page paths
 */
export async function allPagePaths(): Promise<string[]> {
	return allPageFilePaths().map((filePath) => buildPageUrlPath(filePath));
}

/**
 * Given a current urlPath, process the appropriate content source file as a
 * page.
 *
 * @param urlPath path to the current path
 * @returns Page object
 */
export async function pageByUrlPath(urlPath: string): Promise<Page> {
	// Build an object when the keys are paths relative to the content source and
	// the values are the original full file paths.
	const pagePathMap = Object.fromEntries(
		allPageFilePaths().map((filePath) => [buildPageUrlPath(filePath), filePath])
	);
	const page = await processPage(pagePathMap[urlPath]);
	return page;
}
`,
  },
  {
    file: 'pages/index.tsx',
    lines: 22,
    content: `\
// @noErrors
import type { FC } from "react";

import type { Page } from "../types/Page";

import { allPages } from "../utils/page-utils";

export const getStaticProps = async () => {
  const pages = await allPages();
  return { props: { pages } };
};

const Page: FC<{ pages: Page[] }> = ({ pages }) => (
  <div>
    {pages.map((page) => (
      <a style={{ display: "block" }} key={page.urlPath} href={page.urlPath}>
        {page.title}
      </a>
    ))}
  </div>
);

export default Page;\
`,
  },
  {
    file: 'pages/[slug].tsx',
    lines: 27,
    content: `\
// @noErrors
import Head from "next/head";
import type { FC } from "react";

import type { Page } from "../types/Page";
import { pageByUrlPath, allPagePaths } from "../utils/page-utils";

export const getStaticPaths = async () => {
	const paths = await allPagePaths();
	return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
	const page = await pageByUrlPath(\`/\${params.id.join("/")}\`);
	return { props: { page } };
};

const Page: FC<{ page: Page }> = ({ page }) => (
	<>
		<Head>
			<title>{page.title}</title>
		</Head>
		<h1>{page.title}</h1>
		<div dangerouslySetInnerHTML={{ __html: page.body.html }} />
	</>
);

export default Page;
`,
  },
] as const

export type CodeSnippets = typeof codeSnippets
