export default class NotificationManager {
	constructor() {
		this.container = $('<div id="notification-container"></div>').appendTo(
			'body',
		);
	}

	showNotification(message, type = 'info', undoCallback) {
		const notification = $('<div></div>')
			.addClass(`notification ${type}`)
			.text(message);

		if (undoCallback) {
			const undoButton = $('<br><a href="#" class="undo-link">Undo</a>').click(
				function (e) {
					e.preventDefault();
					undoCallback();
					notification.fadeOut(50, function () {
						$(this).remove();
					});
				},
			);
			notification.append(undoButton);
		}

		notification.appendTo(this.container);

		setTimeout(
			() =>
				notification.fadeOut(300, function () {
					$(this).remove();
				}),
			5000,
		);
	}
}
