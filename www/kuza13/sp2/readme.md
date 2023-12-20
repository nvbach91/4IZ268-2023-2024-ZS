# ToDo App

This repository contains a simple ToDo app that enables users to add, remove, and mark tasks as done. The app leverages local storage to persist tasks, ensuring that your task list remains intact even if you close the browser window.

## Usage

1. Add tasks by entering text in the provided input field and either pressing Enter or clicking the "Add Task" button.
2. Use the checkmark button to mark tasks as done.
3. Utilize the cross button to delete unwanted tasks.

## Features

- **Add tasks:** Input your task in the provided field and press Enter or click the "Add Task" button.
- **Remove tasks:** Click the cross button next to a task to remove it from the list.
- **Mark tasks as done:** Toggle the completion status of a task by clicking the checkmark button.
- **Local Storage:** Tasks are stored in the browser's local storage, ensuring persistence across sessions.

## How It Works

- The app is structured using HTML, with JavaScript handling DOM manipulation.
- Tasks are stored in an array, and local storage is updated when tasks are added or removed.
- The DOM dynamically renders tasks based on the array.
- Completed tasks are visually distinguished through the application of a CSS class.

## Local Storage

Tasks are stored in the browser's local storage, facilitating retrieval even after closing the browser window.

## Contributors

- [Andrei Kuznetsov](mailto:smitandrei14@gmail.com)

Thank you for using the ToDo App!
