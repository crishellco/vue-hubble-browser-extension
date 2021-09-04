import tailwind from 'rollup-plugin-tailwind';
import sveltePreprocess from "svelte-preprocess";
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';


const production = !process.env.ROLLUP_WATCH;

const base_config = {
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		dir: 'dist/'
	},
	plugins: [
		tailwind(),
		json(),
		svelte({
			dev: !production,
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
				  plugins: [require('tailwindcss'), require('autoprefixer')()],
				},
			}),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			preferBuiltins: true
		}),
		commonjs(),


		// If we're building for production minify
		!production && terser(),

		copy({
			targets: [
				{ src: 'static/*', dest: 'dist'}
			],
			copyOnce: true
		}),
	],
	watch: {
		clearScreen: false
	}
}


export default [
	{
		input: 'src/background.js',
		...base_config
	},
	{
		input: 'src/popup.js',
		...base_config
	},
	{
		input: 'src/content.js',
		...base_config
	},
];
