<template>
	<div>
		<v-row no-gutters>
			<v-col v-for="item in surah.data" :key="item.nomor" cols="12" sm="6" md="4">
				<ClientOnly>
					<v-card class="cursor-pointer elevation-3 d-flex" :height="smAndDown ? 'auto' : '80px'"
						:class="smAndDown ? '' : 'ma-2'" :to="`/surah/${item.nomor}`">
						<div class="d-flex justify-center align-center text-amber-accent-2 pa-2">
							<svg width="28.5" height="32.25" viewBox="0 0 38 43" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17.3036 2.10426C18.0868 0.850113 19.9132 0.850113 20.6964 2.10426L24.5063 8.20509C25.2111 9.33361 26.4309 10.0378 27.7606 10.0839L34.949 10.333C36.4267 10.3842 37.3399 11.9659 36.6454 13.2712L33.2669 19.6212C32.642 20.7958 32.642 22.2042 33.2669 23.3788L36.6454 29.7288C37.3399 31.0341 36.4267 32.6158 34.949 32.667L27.7606 32.9161C26.4309 32.9622 25.2111 33.6664 24.5063 34.7949L20.6964 40.8957C19.9132 42.1499 18.0868 42.1499 17.3036 40.8957L13.4937 34.7949C12.7889 33.6664 11.5691 32.9622 10.2394 32.9161L3.05099 32.667C1.57325 32.6158 0.660093 31.0341 1.35461 29.7288L4.7331 23.3788C5.35804 22.2042 5.35805 20.7958 4.7331 19.6212L1.35461 13.2712C0.660093 11.9659 1.57325 10.3842 3.05099 10.333L10.2394 10.0839C11.5691 10.0378 12.7889 9.33361 13.4937 8.20509L17.3036 2.10426Z"
									stroke="currentColor" stroke-width="2"></path>
							</svg>
							<span style="position: absolute; font-family: Quicksand; font-size: 14px; font-weight: 600;"
								class="text-green-darken-2">{{ item.nomor }}</span>
						</div>
						<div class="flex-1-0 d-flex pa-2 align-center justify-space-between">
							<div>
								<div class="text-body-2 font-weight-bold">{{ item.namaLatin }}</div>
								<div class="text-caption text-grey-darken-1 font-weight-bold">{{ item.arti }} | {{ item.jumlahAyat }} Ayat
								</div>
							</div>
							<div class="majeed text-right" style="font-size: 24px;">
								{{ item.nama }}
							</div>
						</div>
					</v-card>
					<v-divider v-if="smAndDown"></v-divider>
				</ClientOnly>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const router = useRouter();
const { smAndDown, mdAndDown } = useDisplay();

const surah = await useSurah();

const toSurah = (id) => {
	router.push(`surah/${id}`);
};
</script>