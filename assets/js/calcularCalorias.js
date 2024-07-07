const form = document.getElementById('calculator-form');
const weightInput = document.getElementById('weight');
const timeInput = document.getElementById('time');
const activityRadios = document.getElementsByName('activity');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('history-list');
const history = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const weight = parseFloat(weightInput.value);
    const time = parseFloat(timeInput.value);
    const activity = parseFloat(activityRadios[0].checked ? activityRadios[0].value : activityRadios[1].value);

    if (weight < 1 || weight > 120) {
        weightInput.classList.add('is-invalid');
        showAlert('danger', 'El peso debe estar entre 1 y 120 kg');
        return;
    }

    if (time < 5 || time > 150) {
        timeInput.classList.add('is-invalid');
        showAlert('danger', 'El tiempo debe estar entre 5 y 150 minutos');
        return;
    }

    const calories = activity * 3.5 * weight * (time / 200);
    const result = `Has quemado aproximadamente ${calories.toFixed(2)} calorías`;

    resultDiv.textContent = result;
    resultDiv.classList.add('alert-success');
    resultDiv.style.display = 'block';

    // Agregar cálculo al historial
    const calculation = {
        weight: weight,
        time: time,
        activity: activity,
        calories: calories
    };
    history.push(calculation);
    renderHistory();
});

function renderHistory() {
    historyList.innerHTML = '';
    history.forEach((calculation, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Cálculo ${index + 1}: ${calculation.weight} kg, ${calculation.time} min, ${calculation.activity} MET, ${calculation.calories.toFixed(2)} calorías`;
        historyList.appendChild(listItem);
    });
}

function showAlert(type, message) {
    const resultDiv = document.getElementById('result');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    resultDiv.appendChild(alertDiv);
}