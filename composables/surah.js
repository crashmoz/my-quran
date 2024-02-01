export const useSurah = async () => {
  const { data: surah } = await useFetch("https://equran.id/api/v2/surat");
  return surah;
};
