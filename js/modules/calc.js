function calc() {
        // Calculator

        const result = document.querySelector('.calculating__result span');

        let sex, height, weight, age, ratio;
    
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('sex');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        //ф-я для установки значений по умолчанию
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {// не может посчитать если какой то параметр не указан
                result.textContent = '____'; 
                return;
            }
            if (sex === 'female') {//формула зависит от пола
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    //ф-я обработает статические эл-ты - муж/жен и типы активности
        function getStaticInformation(selector, activeClass) {//получим род класс и класс ак-ти
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {//если в выбранном э-те
                    if (e.target.getAttribute('data-ratio')) {//есть data-ratio
                        ratio = +e.target.getAttribute('data-ratio');//то вытаскиваем его значение
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');//если нет - вытаскиваем пол
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);//удалим класс ак-ти у всех эл-тов
                    });
        
                    e.target.classList.add(activeClass);//добавим класс ак-ти к кликнутому
        
                    calcTotal();
                });
            });
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    /*  ф-я обрабатывает введенные значения
        получаем id, если это height - записываем в перменную height и тд */
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
    
                if (input.value.match(/\D/g)) {//проверка - если не число ввели
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
    
                calcTotal();    //вызывается при каждом изменении на странице
            });
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

export default calc;