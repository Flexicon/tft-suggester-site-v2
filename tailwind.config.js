/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				sm: '600px',
				xl: '1216px',
			},
		},
	},
	plugins: [],
};
