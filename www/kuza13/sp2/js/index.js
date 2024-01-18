import AppInitializer from './appInitializer.js';
$(document).ready(function () {
	// Any pre-initialization code can go here
	// This might include configuring global settings,
	// loading initial data, setting up environment variables, etc.

	// Initialize the application
	AppInitializer.initialize();

	// Post-initialization code can go here
	// This could include setting up global event listeners,
	// starting background jobs, or anything that should happen
	// after the app has been initialized.

	console.log('Application initialized successfully!');
});
