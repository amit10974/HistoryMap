var urlToHighlight;

document.addEventListener('DOMContentLoaded', function () {
	chrome.browserAction.onClicked.addListener(function () {

		// change the extension icon to the coloured one, which should be used when SenseMap is active

		chrome.browserAction.setIcon({
			path: "/logo/sm-logo-19.png"
		});
		const url = chrome.extension.getURL('src/historyMap/historyMap.html');
		// Only allow a single instance of the history map
		if (getView(url)){
			return;
		} 
		
		// Adjust location and size of the current window, where the extension button is clicked
		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
			// left: Math.floor(screen.width * 0.33), top: 0, width: Math.floor(screen.width * 0.67), height: screen.height
			left: 0,
			top: 0,
			width: Math.floor(screen.width / 2),
			height: Math.floor(screen.height * 0.7)
		});

		// Create an instance of the history map
		// if (ProfileName = localStorage.getItem('ProfileName') !== null) {
			chrome.windows.create({
				url: url,
				type: 'popup',
				// left: 0,
				// top: 0,
				// width: Math.floor(screen.width * 0.33),
				// height: screen.height
				left: 0,
				top: Math.floor(screen.height * 0.7 + 25),
				width: Math.floor(screen.width / 2),
				height: Math.floor(screen.height * 0.3 - 25)
			}, function (w) {
				chrome.windows.update(w.id, {
					focused: true
				});
			});
		// }
		// else {
		// 	google_Login();
		// }

		// Listen to content script
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			//console.log("background got a message " + JSON.stringify(request));    
			if (request.type === 'backgroundOpened') { // To respond that the background page is currently active
				sendResponse(true);
			} else if (request.type === "noted") {
				console.log("need to update model with note")
				const typeUpdate = {
					classId: request.data.classId,
					text: request.data.text,
					type: 'note',
					url: sender.tab.url
				};
				chrome.tabs.sendMessage(sender.tab.id, {type: 'updateModel', innerType:'noted', typeUpdate}, response2 => {
					if (response2){
						console.log("model has been updated with note");
					}
				});
				//dispatch.typeUpdated(typeUpdate);
			}
		});
	});

	/**
	 * Returns an extension page by url.
	 */
	function getView(url) {
		const views = chrome.extension.getViews();

		for (let i = 0; i < views.length; i++) {
			if (views[i].location.href === url) return views[i];
		}

		return null;
	}
});