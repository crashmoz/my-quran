<template>
	<NuxtLoadingIndicator />
	<VitePwaManifest />
	<v-app id="inspire">
		<v-navigation-drawer v-if="route.path !== '/'" v-model="drawer" class="bg-grey-lighten-4">
			<!--  -->
			<Sidebar />
		</v-navigation-drawer>

		<ClientOnly>
			<v-app-bar class="bg-teal" density="compact" :scroll-behavior="route.path !== '/' ? 'elevate' : ''">
				<v-app-bar-nav-icon v-if="route.path !== '/'" @click="drawer = !drawer"></v-app-bar-nav-icon>

				<v-app-bar-title>
					<NuxtLink to="/" class="text-decoration-none text-white font-weight-bold">
						My Quran
					</NuxtLink>
				</v-app-bar-title>
			</v-app-bar>
		</ClientOnly>

		<v-main class="bg-grey-lighten-3">
			<NuxtPage />
		</v-main>
	</v-app>
</template>

<script setup>
const route = useRoute();
const drawer = ref(null);

useHead({
	title: 'My-Quran',
	meta: [
		{
			name: 'description',
			content: 'Baca Al-Quran online dengan mudah di platform kami. Sajikan diri Anda dengan bacaan suara indah, terjemahan, dan tafsir Al-Quran. Temukan pengalaman unik menjelajahi ayat-ayat suci dengan fitur pencarian, catatan pribadi, dan lebih banyak lagi. Mulailah perjalanan spiritual Anda sekarang.'
		},
		{
			name: 'keywords',
			content: 'Al-Quran online, Baca Al- Quran, Bacaan Al-Quran, Terjemahan Al-Quran,Tafsir Al-Quran,Ayat suci Al Quran, Bacaan suara Al-Quran,Fitur pencarian Al-Quran,Catatan pribadi Al-Quran,Ayat harian Al-Quran,Indeks Al-Quran.Al-Quran interaktif, Al- uran mobile,Kajian Al-Quran,Tadabbur Al-Quran,Memahami Al-Quran,Platform membaca Al-Quran online,Sumber Al-Quran terpercaya,Layanan baca Al-Quran terbaik,Al-Quran digital,Situs baca Al-Quran',
		},
		{
			name: 'og:title',
			content: '/icons/quran.png'
		}
	],
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/quran.ico' }
	]
});

</script>