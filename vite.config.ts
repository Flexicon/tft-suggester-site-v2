import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				short_name: 'TFT Suggester',
				name: 'TFT Suggester',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#292524',
				background_color: '#f0f0f0',
			},
			pwaAssets: {
				image: 'static/logo.png',
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === 'image',
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'images-cache',
							expiration: {
								maxEntries: 120,
							},
						},
					},
				],
			},
		}),
	],
});
