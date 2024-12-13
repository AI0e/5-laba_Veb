// 1) Поміняти місцями тексти
const text1 = document.querySelector('.orange p'); 
const text2 = document.querySelector('.blue1 p'); 
const temp = text1.textContent;
text1.textContent = text2.textContent;
text2.textContent = temp;



// 2) Розрахунок площі овала
const a = 7; // Велика піввісь
const b = 2; // Мала піввісь

// Функція для обчислення площі овала
function calculateOvalArea(a, b) {
    const area = Math.PI * a * b; 
    return area.toFixed(2); 
}
function appendAreaToBlock() {
    const block3 = document.querySelector('.picture'); 
    const area = calculateOvalArea(a, b); 
    const resultDiv = document.createElement('div'); 
    resultDiv.textContent = `Площа овала: ${area}`; 
    resultDiv.style.color = 'white';
    block3.appendChild(resultDiv);
}
appendAreaToBlock();




// 3-4)

const form = document.createElement('form');
form.id = 'form-container';
form.style.color = 'white'; 


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


form.appendChild(label);
form.appendChild(numberInput);
form.appendChild(submitButton);


const targetElement = document.querySelector('.picture');

targetElement.prepend(form);

function findDivisors(number) {
    const divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}


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


window.onload = () => {
    const storedData = getCookie('divisors');

    if (storedData) {
        const userResponse = confirm(`${storedData}. Бажаєте видалити ці дані?`);
    
        if (userResponse) {
            deleteCookie('divisors');
            location.reload(); 

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
        ul.innerHTML = '';
        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            ul.appendChild(listItem);
        });
    }
    
};


form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const number = parseInt(numberInput.value, 10);
    if (isNaN(number) || number < 1||numberInput.value.length>8 ) {
        alert('Будь ласка, введіть коректне натуральне число.');
        return;
    }

    const divisors = findDivisors(number);
    const result = `Дільники числа ${number}: ${divisors.join(', ')}`;

    alert(result);
    setCookie('divisors', result, 1); 
});


//4)

const orangeDiv = document.querySelector('.orange p');
const blueDiv = document.querySelector('.blue1 p');


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


const orangeFlexboxDiv = document.querySelector('.orange.flexbox');
const ulElement = orangeFlexboxDiv.querySelector('p');
ulElement.insertAdjacentElement('afterend', newform);


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


const containers = document.querySelectorAll('.picture, .orange, .blue');

containers.forEach((listContainer) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Відкрити/Створити список';
    link.style.marginBottom = '10px';
    link.style.textDecoration = 'none';
    link.style.color = 'whitesmoke';
    link.style.alignSelf = 'center';

    listContainer.prepend(link);



    link.addEventListener('click', (event) => {
        event.preventDefault();

    
        if (listContainer.querySelector('.dynamic-list-container')) {
            alert('Список уже створено/відкрито!');
            return;
        }

    
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

   
        ul.addEventListener('dblclick', () => {
            const listItem = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Введіть дані';
            input.style.width = '100%';

            listItem.appendChild(input);
            ul.appendChild(listItem);
        });


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
        

        deleteButton.addEventListener('click', () => {
            localStorage.removeItem(`unorderedList-${listContainer.className}`);
            ul.innerHTML = ''; 
            container.remove(); 
            alert('Список видалено!');
        });
    });
});

