import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyBIPpDqKfnI0EIHZTzokAenwLNLXHCHCSY",
    authDomain: "leads-tracker-app-82e1d.firebaseapp.com",
    databaseURL: "https://leads-tracker-app-82e1d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "leads-tracker-app-82e1d",
    storageBucket: "leads-tracker-app-82e1d.firebasestorage.app",
    messagingSenderId: "1013934080056",
    appId: "1:1013934080056:web:b5718052cba208ab88a6cd",
    measurementId: "G-YC8QSJBEFG"
  };

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})