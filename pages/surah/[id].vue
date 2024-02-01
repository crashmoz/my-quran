<template>
	<div>
		<v-card class="pa-2 bg-teal rounded-0" flat width="100%">
			<v-row justify="center" class="py-2">
				<v-col class="text-right d-flex py-0 px-2 justify-end">
					<div class="bg-amber-lighten-4 align-self-center rounded-pill py-2 px-4 text-body-2 elevation-2">
						{{ data.tempatTurun }}
					</div>
				</v-col>
				<v-col class="d-flex align-center justify-center rounded-pill bg-amber-lighten-4 text-body-2 py-0 elevation-2">{{
					data.namaLatin
				}}</v-col>
				<v-col class="text-left d-flex py-0 px-2">
					<div class="bg-amber-lighten-4 align-self-center rounded-pill py-2 px-4 text-body-2 elevation-2">{{
						data.jumlahAyat }} Ayat
					</div>
				</v-col>
			</v-row>
		</v-card>

		<div v-if="route.params.id !== '1' && route.params.id !== '9'" class="bg-light-green-lighten-5 py-2">
			<v-img src="/bismillah2.png" height="40px" />
		</div>
		<div v-for="(ayat, index) in surah.data.ayat" class="px-2 py-4"
			:class="index % 2 == 0 ? 'bg-lime-lighten-4' : 'bg-white'">
			<div class="d-flex">
				<p>{{ surah.data.nomor }}:{{ ayat.nomorAyat }}</p>
				<div class="d-flex flex-grow-1 ml-4 ga-4">
					<v-icon size="small" color="grey"
						@click="openTafsir(ayat.nomorAyat)">mdi-book-open-blank-variant-outline</v-icon>
				</div>
			</div>
			<p class="majeed pb-2 pl-8 text-right" style="font-size: 24px;">{{ ayat.teksArab }}</p>
			<div class="pl-4 py-2 text-body-1 text-green-darken-4">
				{{ ayat.teksLatin }}
			</div>
			<div class="pl-4 text-body-1">
				{{ ayat.teksIndonesia }}
			</div>
		</div>

		<!-- Dialog for tafsir -->
		<v-dialog transition="dialog-bottom-transition" width="100%" v-model="isShow" scrollable
			:max-width="smAndDown ? '100%' : '1024px'">
			<v-card class="rounded-lg pb-2">
				<v-toolbar class="bg-white" elevation="4" :title="`Tafsir ${tafsir.data.namaLatin} Ayat ${tafsirAyat.ayat}`">
					<v-btn icon="mdi-close" size="small" class="bg-grey-lighten-4" @click="isShow = !isShow"></v-btn>
				</v-toolbar>

				<v-card-text class="px-2 pt-10" id="text" ref="scrollableElement">
					<div class="d-flex justify-end">
						<input type="text" id="arab" :value="arabTafsir" readonly class="text-right arabic textfieldArab">
					</div>
					<v-divider class="my-8"></v-divider>
					<div class="text-body-1 font-weight-light pa-2" style="white-space: pre-wrap">{{ tafsirAyat.teks }}
					</div>
					<div class="px-2 my-10"
						:class="tafsirAyat.ayat === 1 ? 'text-right' : tafsirAyat.ayat === data.jumlahAyat ? 'text-left' : 'd-flex justify-space-between'">
						<v-btn v-if="tafsirAyat.ayat !== 1" class="text-capitalize font-weight-regular" elevation="4"
							@click="beforeAyat(tafsirAyat.ayat - 1)">Sebelumnya</v-btn>

						<v-btn v-if="tafsirAyat.ayat !== data.jumlahAyat" class="text-capitalize font-weight-regular" elevation="4"
							@click="nextAyat(tafsirAyat.ayat + 1)">Berikutnya</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>

	</div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const route = useRoute();
const isShow = ref(null);
const { data: surah } = await useFetch(`https://equran.id/api/v2/surat/${route.params.id}`);
const data = surah.value.data;
const { data: tafsir } = await useFetch(`https://equran.id/api/v2/tafsir/${route.params.id}`);
const tafsirData = tafsir.value.data.tafsir;
const tafsirAyat = ref({});
const arabTafsir = ref('');

const { smAndDown } = useDisplay();

const selectTafsir = (nomor) => {
	tafsirAyat.value = tafsirData.find(i => i.ayat === nomor);
	const arab = surah.value.data.ayat.find(i => i.nomorAyat === nomor);
	arabTafsir.value = arab.teksArab;
};

const openTafsir = (nomor) => {
	selectTafsir(nomor);
	isShow.value = !isShow.value;
};

const beforeAyat = (ayat) => {
	selectTafsir(ayat);
	document.getElementById("arab").focus();
};

const nextAyat = (ayat) => {
	selectTafsir(ayat);
	document.getElementById("arab").focus();
};

useHead({
	title: `Surah ${data.namaLatin}`,
	meta: [
		{
			name: 'description',
			content: `${data.deskripsi}`
		},
		{
			name: 'keywords',
			content: 'Al-Quran online, Baca Al- Quran, Bacaan Al - Quran, Terjemahan Al - Quran,Tafsir Al - Quran,Ayat suci Al Quran, Bacaan suara Al-Quran,Fitur pencarian Al- Quran,Catatan pribadi Al - Quran,Ayat harian Al - Quran,Indeks Al - Quran.Al-Quran interaktif, Al- Quran mobile,Kajian Al-Quran,Tadabbur Al- Quran,Memahami Al - Quran,Platform membaca Al-Quran online,Sumber Al-Quran terpercaya,Layanan baca Al-Quran terbaik,Al-Quran digital,Situs baca Al-Quran',
		},
		{
			name: 'og:title',
			content: '/icons/quran.png'
		}
	],
});
</script>
<style>
.textfieldArab {
	font-size: 24px;
}

.textfieldArab:focus {
	outline: none;
}
</style>