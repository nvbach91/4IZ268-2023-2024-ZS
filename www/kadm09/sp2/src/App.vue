<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const DB_NAME = 'todoAppDB';
const TODO_STORE_NAME = 'todos';
const NAME_STORE_NAME = 'name';

let db;

const todos = ref([]);
const name = ref('');

const input_content = ref('');
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const addTodo = async () => {
  if (input_content.value.trim() === '' || input_category === null) {
    return;
  }

  const todo = {
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  };

  await addToIndexedDB(TODO_STORE_NAME, todo);

  todos.value.push(todo);

  input_content.value = '';
  input_category.value = null;
};

const removeTodo = async (todo) => {
  await removeFromIndexedDB(TODO_STORE_NAME, todo.createdAt);
  todos.value = todos.value.filter((t) => t !== todo);
};

const addToIndexedDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.add(data);
};

const removeFromIndexedDB = async (storeName, key) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.delete(key);
};

watch(todos, (newVal) => {
  // Use a debounce function to prevent multiple rapid writes to IndexedDB
  debounce(() => {
    updateIndexedDB(TODO_STORE_NAME, newVal);
  }, 1000)();
}, { deep: true });

watch(name, (newVal) => {
  debounce(() => {
    updateNameIDB(NAME_STORE_NAME,newVal)
  }, 1000)();
}, { deep: true });

onMounted(async () => {
  name.value = localStorage.getItem('name') || '';

  // Open IndexedDB
  db = await openIndexedDB();

  // Load todos from IndexedDB
  const todosFromDB = await getAllFromIndexedDB(TODO_STORE_NAME);
  const savedNameDB = await getSingleFromIndexedDB(NAME_STORE_NAME);
  todos.value = todosFromDB || [];
  if (savedNameDB === null) {
    return;
  }
  name.value = savedNameDB.name || '';
});

const openIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(TODO_STORE_NAME)) {
        db.createObjectStore(TODO_STORE_NAME, { keyPath: 'createdAt' });
      }

      if (!db.objectStoreNames.contains(NAME_STORE_NAME)) {
        db.createObjectStore(NAME_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const getAllFromIndexedDB = async (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const getSingleFromIndexedDB = async (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result;
      if (result && result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

const updateNameIDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  // Clear existing data
  const clearRequest = store.clear();

  const parsedNameObject = {
    updatedAt: new Date().getTime(),
    name: data
  }

  clearRequest.onsuccess = async () => {

    await addToIndexedDB(storeName, parsedNameObject);
  };
};

const updateIndexedDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  for (const item of data) {
    // Get the existing item from the database
    const getRequest = store.get(item.createdAt);

    getRequest.onsuccess = async () => {
      const existingItem = getRequest.result;

      // Update the existing item with the new values
      const updateRequest = store.put({
        ...existingItem,
        ...item,
      });

      updateRequest.onerror = (event) => {
        console.error('Error updating item in IndexedDB:', event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.error('Error retrieving item from IndexedDB:', event.target.error);
    };
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
</script>

<template>

  <main class="app">
    <section class="greeting">
      <h2 class="title">
        Hello there, <input type="text" placeholder="Name here" v-model="name"/>
      </h2>
      
    </section>

    <section class="create-todo">
      <h3>Create a todo</h3>

      <form @submit.prevent="addTodo">
        <h4>What needs to get done?</h4>
        <input type="text" placeholder="eg. shoot a hole in the surface of mars" v-model="input_content">

        <h4>Pick a category</h4>

        <div class="options">

          <label>
            <input type="radio" name="category" id="category1" value="work" v-model="input_category"/>
            <span class="bubble primary"></span>
            <div>Work</div>
          </label>

          <label>
            <input type="radio" name="category" id="category1" value="school" v-model="input_category"/>
            <span class="bubble primary"></span>
            <div>School</div>
          </label> 

          <label>
            <input type="radio" name="category" id="category1" value="personal" v-model="input_category"/>
            <span class="bubble secondary"></span>
            <div>Personal</div>
          </label>

          <!-- {{ input_category }} -->

        </div>

        <input type="submit" value="Add todo">

      </form>
 
    </section>


    <section class = "todo-list">
      <h3> TODO LIST</h3>

      <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">

        <label>
          <input type="checkbox" v-model="todo.done" />
          <span :class="`bubble ${todo.category}`"></span>
        </label>

        <div class ="todo-content">
          <input type="text" v-model="todo.content">
        </div>

        <div class = "actions">
          <button class="delete" @click="removeTodo(todo)">DELETE</button> 
        </div>

      </div>
    


    </section>

  </main>

</template>


