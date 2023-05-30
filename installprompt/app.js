navigator.serviceWorker.register("/sw.js");

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
	console.log("beforeinstallprompt fired");
	event.preventDefault();
	installPrompt = event;
	installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
	if (!installPrompt) {
		return;
	}
	const result = await installPrompt.prompt();
	console.log(`Install prompt was: ${result.outcome}`);
	disableInAppInstallPrompt();
});

window.addEventListener("appinstalled", () => {
	disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
	installPrompt = null;
	installButton.setAttribute("hidden", "");
}
