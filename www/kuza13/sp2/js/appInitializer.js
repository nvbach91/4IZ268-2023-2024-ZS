// Import statements for manager classes
// (Assuming these classes are in separate modules)
import AuthManager from './authManager.js';
import EventHandler from './eventHandler.js';
import GraphManager from './graphManager.js';
import NotificationManager from './notificationManager.js';
import TaskManager from './taskManager.js';
import UIManager from './uiManager.js';
import UserManager from './userManager.js';

class AppInitializer {
	constructor(
		taskManager,
		notificationManager,
		uiManager,
		authManager,
		graphManager,
		userManager,
		eventHandler,
	) {
		this.taskManager = taskManager;
		this.notificationManager = notificationManager;
		this.uiManager = uiManager;
		this.authManager = authManager;
		this.graphManager = graphManager;
		this.userManager = userManager;
		this.eventHandler = eventHandler;
	}

	initialize() {
		this.eventHandler.setupEventListeners();
		console.log('Initialization..');
	}
}

// Creating instances of the manager classes
const notificationManager = new NotificationManager();
const taskManager = new TaskManager(notificationManager);
const authManager = new AuthManager(notificationManager);
const graphManager = new GraphManager(authManager, notificationManager);
const uiManager = new UIManager(graphManager, notificationManager, authManager);
const eventHandler = new EventHandler(taskManager, uiManager);
const userManager = new UserManager(uiManager);

// Creating an instance of AppInitializer with dependency injection
export default AppInitializer = new AppInitializer(
	taskManager,
	notificationManager,
	uiManager,
	authManager,
	graphManager,
	userManager,
	eventHandler,
);
