chrome.commands.onCommand.addListener(function(command) {
	if (command == '_execute_browser_action') {
		alert('Keyboard shortcut from extension worked!');
	}
});