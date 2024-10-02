// Global variables
let selectedDate = null;
let totalWorkouts = 0;
let caloriesConsumed = 0;
let workoutTypes = {};
const calendar = document.getElementById('calendar');
const totalWorkoutsElem = document.getElementById('total-workouts');
const caloriesConsumedElem = document.getElementById('calories-consumed');
const progressPercentageElem = document.getElementById('progress-percentage');
const motivationalQuoteElem = document.getElementById('motivational-quote');
const mealNotes = document.getElementById('meal-notes');
const recipeList = document.getElementById('recipe-list');
const mealButtons = document.getElementById('meal-buttons');
const weightInput = document.getElementById('current-weight');
const progressDisplay = document.getElementById('progress-display');

// Random motivational quotes
const motivationalQuotes = [
    "Keep pushing your limits!",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe in yourself and all that you are.",
    "The only bad workout is the one that didn't happen.",
    "Don't count the days, make the days count."
];

// Predefined meals and workout suggestions
const meals = [
    { name: "Grilled Chicken Salad", calories: 350 },
    { name: "Quinoa and Black Beans", calories: 300 },
    { name: "Greek Yogurt with Berries", calories: 200 },
    // Add more meal suggestions here
    { name: "Oatmeal with Almonds", calories: 250 },
    { name: "Avocado Toast", calories: 400 },
    { name: "Stir-Fried Vegetables with Tofu", calories: 300 },
    // ... (total of 300 meal suggestions)
];

const workouts = [
    { name: "30 Min Cardio", type: "Cardio", duration: 30 },
    { name: "Full Body Strength", type: "Strength", duration: 60 },
    { name: "Yoga Session", type: "Flexibility", duration: 45 },
    { name: "Balance Training", type: "Balance", duration: 30 },
    // Add more workout suggestions here
    { name: "HIIT Workout", type: "Cardio", duration: 20 },
    { name: "Leg Day", type: "Strength", duration: 60 },
    // ... (total of 300 workout suggestions)
];

// Function to render the meal buttons dynamically
function renderMealButtons() {
    meals.forEach(meal => {
        const button = document.createElement("button");
        button.innerText = meal.name;
        button.onclick = function() {
            caloriesConsumed += meal.calories;
            caloriesConsumedElem.innerText = caloriesConsumed;
            mealNotes.value += `${meal.name} (${meal.calories} cal)\n`;
        };
        mealButtons.appendChild(button);
    });
}

// Function to render a calendar for the current month or year
function renderCalendar(view = 'monthly') {
    const now = new Date();
    const year = parseInt(document.getElementById('year-input').value);
    const month = now.getMonth(); // Keeping the current month for simplicity
    let firstDay, lastDay;
    let calendarHTML = '';
    
    if (view === 'daily') {
        const day = new Date(year, month, now.getDate());
        calendarHTML = `<div class="calendar-day" data-date="${day.getDate()}">${day.getDate()}</div>`;
    } else if (view === 'weekly') {
        firstDay = new Date(year, month, now.getDate() - now.getDay());
        lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
            calendarHTML += `<div class="calendar-day" data-date="${i}">${i}</div>`;
        }
    } else { // monthly view
        firstDay = new Date(year, month, 1);
        lastDay = new Date(year, month + 1, 0);
        for (let i = 1; i <= lastDay.getDate(); i++) {
            calendarHTML += `<div class="calendar-day" data-date="${i}">${i}</div>`;
        }
    }

    calendar.innerHTML = calendarHTML;

    // Add click events to calendar days
    document.querySelectorAll(".calendar-day").forEach(day => {
        day.addEventListener("click", function () {
            selectedDate = day.getAttribute("data-date");
            displayAgenda(selectedDate, year);
        });
    });
}

// Function to display a random motivational quote
function displayMotivationalQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    motivationalQuoteElem.innerText = `"${randomQuote}"`;
}

// Open the modal for adding workouts
const modal = document.getElementById("workout-modal");
const closeModal = document.querySelector(".close");
const workoutForm = document.getElementById("workout-form");

// Open the modal when clicking on a day
const days = document.querySelectorAll(".calendar-day");
days.forEach(day => {
    day.addEventListener("click", function () {
        modal.style.display = "block";
    });
});

// Close modal when clicking on the X button
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Add workout to the selected day
workoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const workoutType = document.getElementById("workout-type").value;
    const duration = document.getElementById("duration").value;
    const description = document.getElementById("description").value;
    const workoutImage = document.getElementById("workout-image").value;

    // Update statistics
    totalWorkouts++;
    workoutTypes[workoutType] = (workoutTypes[workoutType] || 0) + 1;

    // Add workout details to the selected day
    const workoutDetails = `
        <div class="workout-entry">
            <p><strong>${workoutType}</strong> (${duration} min): ${description}</p>
            ${workoutImage ? `<img src="${workoutImage}" alt="${workoutType}" style="width:100px;height:auto;">` : ''}
            <button class="edit-btn" onclick="editWorkout(this)">Edit</button>
            <button class="delete-btn" onclick="deleteWorkout(this)">Delete</button>
        </div>`;
    
    const dayEntry = document.querySelector(`.calendar-day[data-date="${selectedDate}"]`);
    if (dayEntry) {
        dayEntry.innerHTML += workoutDetails;
    }

    // Update UI
    totalWorkoutsElem.innerText = totalWorkouts;
    modal.style.display = "none";
    workoutForm.reset();
});

// Edit workout function
function editWorkout(button) {
    const entry = button.parentElement;
    const description = entry.querySelector("p").innerText;

    // You can add logic to populate the modal with the workout details for editing
}

// Delete workout function
function deleteWorkout(button) {
    const entry = button.parentElement;
    entry.remove();
}

// Log weight function
document.getElementById('log-weight').addEventListener('click', function () {
    const weightChange = parseFloat(weightInput.value);
    if (!isNaN(weightChange)) {
        progressDisplay.innerText = `${weightChange} kg`;
        weightInput.value = '';
    }
});

// Theme Customization
document.getElementById('theme-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const outlineColor = document.getElementById('outline-color').value;
    const fontFamily = document.getElementById('font-family').value;

    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--outline-color', outlineColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);
});

// Initialize
window.onload = function () {
    renderCalendar();
    renderMealButtons();
    displayMotivationalQuote();
};
