// 1) Поміняти місцями тексти
const text1 = document.querySelector('.orange p'); 
const text2 = document.querySelector('.blue1 p'); 
// Міняємо тексти місцями
const temp = text1.textContent;
text1.textContent = text2.textContent;
text2.textContent = temp;



// 2) Розрахунок площі овала
const a = 7; // Велика піввісь
const b = 2; // Мала піввісь

// Функція для обчислення площі овала
function calculateOvalArea(a, b) {
    const area = Math.PI * a * b; // Формула площі овала
    return area.toFixed(2); // Округлення до 2 знаків після коми
}

// Додавання результату в кінець контенту сторінки
function appendAreaToBlock() {
    const block3 = document.querySelector('.picture'); // Вибір блоку "3"
    const area = calculateOvalArea(a, b); // Обчислення площі
    const resultDiv = document.createElement('div'); // Створюємо новий елемент
    resultDiv.textContent = `Площа овала: ${area}`; // Додаємо текст
    resultDiv.style.color = 'white';
    block3.appendChild(resultDiv);
}
// Виклик функції
appendAreaToBlock();




// 3-4)
// Отримання елементів форми
const form = document.createElement('form');
form.id = 'form-container';
form.style.display = 'none'; // Спочатку приховуємо форму
form.style.color = 'white'; // Задаємо початковий стиль

// Створення елементів форми
const label = document.createElement('label');
label.setAttribute('for', 'numberInput');
label.textContent = 'Введіть натуральне число (макс. 8 символів):';

const numberInput = document.createElement('input');
numberInput.id = 'numberInput';
numberInput.type = 'number';
numberInput.min = '1';
numberInput.maxLength ='8';


const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Знайти дільники';

// Додавання елементів у форму
form.appendChild(label);
form.appendChild(numberInput);
form.appendChild(submitButton);

// Додавання форми 
const targetElement = document.querySelector('.picture'); // Обрати елемент по селектору

targetElement.prepend(form);
// Ваша існуюча логіка для роботи з формою
// Функція для знаходження дільників числа
form.style.display = 'block';
function findDivisors(number) {
    const divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}

// Функції для роботи з cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// Перевірка наявності cookies при завантаженні сторінки
window.onload = () => {
    const storedData = getCookie('divisors');

    if (storedData) {
        const userResponse = confirm(`${storedData}. Бажаєте видалити ці дані?`);
    
        if (userResponse) {
            deleteCookie('divisors');
            location.reload(); // Перезавантаження сторінки

    }
    }
    const alignOrange = localStorage.getItem('alignOrange') === 'true';
    const alignBlue = localStorage.getItem('alignBlue') === 'true';

    document.getElementById('alignOrange').checked = alignOrange;
    document.getElementById('alignBlue').checked = alignBlue;

    if (alignOrange) {
        orangeDiv.style.textAlign = 'right';
    }

    if (alignBlue && blueDiv) {
        blueDiv.style.textAlign = 'right';
    }


    const savedList = localStorage.getItem('unorderedList');
    if (savedList) {
        const items = JSON.parse(savedList);
        ul.innerHTML = ''; // Очищення списку
        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            ul.appendChild(listItem);
        });
    }
    
};

// Обробка події відправлення форми
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Відміна стандартної поведінки форми

    const number = parseInt(numberInput.value, 10);
    if (isNaN(number) || number < 1||numberInput.value.length>8 ) {
        alert('Будь ласка, введіть коректне натуральне число.');
        return;
    }

    const divisors = findDivisors(number);
    const result = `Дільники числа ${number}: ${divisors.join(', ')}`;

    alert(result);
    setCookie('divisors', result, 1); // Збереження результату в cookies на 1 день
});


//4)
// Знаходимо необхідні елементи
const orangeDiv = document.querySelector('.orange p');
const blueDiv = document.querySelector('.blue1 p');

// Форма з галочками
const newform = document.createElement('form');
newform.innerHTML = `
    <label>
        <input type="checkbox" id="alignOrange"> Вирівняти блок 1 по правому краю
    </label>
    <br>
    <label>
        <input type="checkbox" id="alignBlue"> Вирівняти блок 2 по правому краю
    </label>
`;

// Вставляємо форму у ".orange.flexbox" після списку <ul>
const orangeFlexboxDiv = document.querySelector('.orange.flexbox');
const ulElement = orangeFlexboxDiv.querySelector('p');
ulElement.insertAdjacentElement('afterend', newform);

// Додавання обробників події mouseover
orangeDiv.addEventListener('mouseover', () => {
    if (document.getElementById('alignOrange').checked) {
        orangeDiv.style.textAlign = 'right';
        localStorage.setItem('alignOrange', true);
    }
});

if (blueDiv) {
    blueDiv.addEventListener('mouseover', () => {
        if (document.getElementById('alignBlue').checked) {
            blueDiv.style.textAlign = 'right';
            localStorage.setItem('alignBlue', true);
        }
    });
}

// Обробка зняття галочки
newform.addEventListener('change', (event) => {
    if (event.target.id === 'alignOrange' && !event.target.checked) {
        orangeDiv.style.textAlign = '';
        localStorage.setItem('alignOrange', false);
    }

    if (event.target.id === 'alignBlue' && !event.target.checked) {
        if (blueDiv) blueDiv.style.textAlign = '';
        localStorage.setItem('alignBlue', false);
    }
});


//5)

// Знаходимо всі контейнери, які можуть містити блоки
const containers = document.querySelectorAll('.picture, .orange, .blue');

containers.forEach((listContainer) => {
    // Створюємо єдине посилання для створення списку
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Відкрити/Створити список';
    link.style.marginBottom = '10px';
    link.style.textDecoration = 'none';
    link.style.color = 'whitesmoke';
    link.style.alignSelf = 'center';

    listContainer.prepend(link);


    // Обробка кліку на посилання
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Перевірка, чи список і кнопки вже створені
        if (listContainer.querySelector('.dynamic-list-container')) {
            alert('Список уже створено/відкрито!');
            return;
        }

        // Створення контейнера для списку і кнопок
        const container = document.createElement('div');
        container.className = 'dynamic-list-container';
        container.style.marginTop = '20px';
        container.style.display='flex';
        container.style.flexDirection='column';
        container.style.alignItems='center';

        const ul = document.createElement('ul');
        ul.style.maxHeight = '100px';
        ul.style.width='200px';
        ul.style.overflowY = 'auto';
        ul.style.border = '1px solid #ccc';
        ul.style.padding = '10px';

        container.appendChild(ul);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Зберегти список';
        saveButton.style.marginBottom = '10px';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити список';

        container.appendChild(saveButton);
        container.appendChild(deleteButton);
        listContainer.prepend(container);

        // Завантаження списку з localStorage
        const savedItems = localStorage.getItem(`unorderedList-${listContainer.className}`);
        if (savedItems) {
            const items = JSON.parse(savedItems);
            items.forEach((item) => {
                const listItem = document.createElement('li');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = item;
                input.style.width = '100%';

                listItem.appendChild(input);
                ul.appendChild(listItem);
            });
        }

        // Додавання нового пункту до списку
        ul.addEventListener('dblclick', () => {
            const listItem = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Введіть дані';
            input.style.width = '100%';

            listItem.appendChild(input);
            ul.appendChild(listItem);
        });

        // Збереження списку в localStorage
        saveButton.addEventListener('click', () => {
            const items = Array.from(ul.children)
                .map((li) => {
                    const input = li.querySelector('input');
                    return input ? input.value : '';
                })
                .filter(value => value.trim() !== ''); 
            localStorage.setItem(`unorderedList-${listContainer.className}`, JSON.stringify(items));
            alert('Список збережено!');
        });
        

        // Видалення списку з localStorage
        deleteButton.addEventListener('click', () => {
            localStorage.removeItem(`unorderedList-${listContainer.className}`);
            ul.innerHTML = ''; 
            container.remove(); 
            alert('Список видалено!');
        });
    });
});

