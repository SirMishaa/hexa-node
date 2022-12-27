import * as path from 'node:path'
import * as url from 'node:url'
import { defineConfig } from 'vitest/config'

/**
 * We get the path of the current file (in format file://)
 * We convert it to a file path (in format /opt/app/vitest.config.ts for example)
 * Then we get the path of the parent directory (/opt/app)
 */
const ROOT_PATH = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(ROOT_PATH, './src'),
		},
	},
})
