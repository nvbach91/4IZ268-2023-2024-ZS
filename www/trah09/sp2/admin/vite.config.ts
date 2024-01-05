import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
	esbuild: {
		jsxFactory: '_jsx',
		jsxFragment: '_jsxFragment',
		jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`,
	},
	base: command === 'build' ? `./` : '/',
}))
