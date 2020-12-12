import typescript from "@rollup/plugin-typescript";
import pcPrefix from "autoprefixer";
import pcImport from "postcss-import";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const isKnownIssue = ({ code, id }) =>
	(code === "THIS_IS_UNDEFINED" && id.includes("focus-visible")) || false;

/** @type {import("rollup").RollupOptions} */
const options = {
	input: "src/index.ts",
	output: [
		{ dir: "dist/cjs", format: "cjs" },
		{ dir: "dist/esm", format: "esm" },
	],
	external: ["react"],
	plugins: [
		postcss({
			plugins: [pcPrefix, pcImport],
			minimize: true,
			extract: true,
		}),
		copy({
			targets: [
				// The CSS extracted in all outputs are the same and should be
				// moved up to root so it's easier to import
				{ src: "dist/cjs/index.css", dest: "dist/" },
				// Font is not included by default (to allow users to use
				// either local or remote fonts)
				{ src: "font", dest: "dist/" },
				// To publish "dist" as a module on its own
				{ src: "package.json", dest: "dist/" },
			],
		}),
		// Only compile typescript files without generating declarations
		// because the Rollup plugin is quite buggy there. The declarations
		// are generated by TSC directly in a separated process.
		// See "npm run build" for detail.
		typescript(),
		terser(),
	],
	onwarn: (warning, warn) => {
		if (isKnownIssue) return;
		warn(warning);
	},
	watch: {
		include: "src/**",
	},
};

export default options;
