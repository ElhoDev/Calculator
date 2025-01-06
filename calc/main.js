let a = "";
let b = "";
let sign = "";
let finish = false;
const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
const action = ['-','+','X','/'];
const out = document.querySelector('.calc-screen p');

// Функция для очистки калькулятора
function clearAll(){
    a = "";
    b = "";
    sign = "";
    finish = false;
    out.textContent = 0;
}

// Обработчик для кнопки очистки
document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = function(event) {
    // Проверка на клик по кнопке
    if(!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;

    // Если нажата кнопка с цифрой или точкой
    if(digit.includes(key)) {
        // Если ничего не введено, начинаем с пустой строки
        if(b === '' && sign === '') {
            a += key; // Добавляем цифру в переменную a
            out.textContent = a;
        } else if(a !== "" && b !== "" && finish) {
            b = key; // Начинаем вводить новое число
            finish = false;
            out.textContent = b;
        } else {
            b += key; // Добавляем цифру в переменную b
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }

    // Если нажата кнопка с операцией
    if(action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a , b , sign);
        return;
    }

    // Если нажата кнопка равно
    if(key === '=') {
        if(b === '') b = a; // Если b пустое, присваиваем его значение a

        // Вычисления в зависимости от знака
        switch(sign) {
            case "+":
                a = parseFloat(a) + parseFloat(b);
                break;
            case "-":
                a = parseFloat(a) - parseFloat(b);
                break;
            case "X":
                a = parseFloat(a) * parseFloat(b);
                break;
            case "/":
                if(b === '0') {
                    out.textContent = "Error"; // Ошибка при делении на ноль
                    a = '';
                    b = '';
                    sign = '';
                    return; // Прерываем выполнение функции
                }
                a = parseFloat(a) / parseFloat(b);
                break;
        }

        // Завершаем вычисления
        finish = true;
        out.textContent = a;
        console.log(a, b, sign);
    }
};
