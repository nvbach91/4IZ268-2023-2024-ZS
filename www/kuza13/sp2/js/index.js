import AppInitializer from './appInitializer.js';

$(document).ready(function () {
	function getDefaultDueDate() {
		const today = new Date();

		return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
	}

	const defaultDueDate = getDefaultDueDate();
	$('#taskDueDate').val(defaultDueDate);
	// Initialize the application
	AppInitializer.initialize();

	console.log('Application initialized successfully!');
	$('#loadingIndicator').hide();
});
