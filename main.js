// Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  
  firebase.initializeApp(firebaseConfig);
  
  
  // Get a reference to the database service
  var db = firebase.firestore();
  
  // Function to add a task to Firestore
  function addTask() {
      var taskInput = document.getElementById('task-input');
      var taskDescription = taskInput.value;
  
      if (taskDescription === "") {
          alert("Task cannot be empty");
          return;
      }
  
      var newTask = {
          description: taskDescription,
          completed: false
      };
  
      // Add the task to Firestore
      db.collection('tasks').add(newTask)
          .then(function() {
              console.log("Task added to Firestore!");
              taskInput.value = '';  // Clear input after adding
              renderTasks();  // Re-render tasks after adding new one
          })
          .catch(function(error) {
              console.error("Error adding task: ", error);
          });
  }
  
  // Function to render tasks from Firestore
  function renderTasks() {
      var taskList = document.getElementById('task-list');
      taskList.innerHTML = ''; // Clear the current list
  
      // Fetch tasks from Firestore
      db.collection('tasks').get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  var task = doc.data();
                  var taskItem = document.createElement('li');
                  taskItem.textContent = task.description;
  
                  var removeButton = document.createElement('button');
                  removeButton.textContent = 'Remove';
                  removeButton.onclick = function() { removeTask(doc.id); };
  
                  taskItem.appendChild(removeButton);
                  taskList.appendChild(taskItem);
              });
          })
          .catch(function(error) {
              console.error("Error fetching tasks: ", error);
          });
  }
  
  // Function to remove a task from Firestore
  function removeTask(taskId) {
      db.collection('tasks').doc(taskId).delete()
          .then(function() {
              console.log("Task successfully deleted!");
              renderTasks();  // Re-render tasks after deletion
          })
          .catch(function(error) {
              console.error("Error removing task: ", error);
          });
  }
  
  // Add event listener to the Add Task button
  document.getElementById('add-task').addEventListener('click', addTask);
  
  // Initial render of tasks when the page loads
  renderTasks();