// metoda pro získání vhodného pro API jazykového kodu z vlastních názvů jazyků
export const getLanguageCode = (language) => {
	return language === "ENG" ? "en" : "cs"
}
