function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        //slider 

        const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),

        width = window.getComputedStyle(slidesWrapper).width;//вытащили только ширину видной части

    let slideIndex = 1;//counter
    let offset = 0;//отступ

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;//у нас 4 слайда - покажет общее кол-во слайдов(вторая цифра)
        current.textContent = slideIndex;
    }

    //внутри inner слайды в полоску
    slidesField.style.width = 100 * slides.length + '%';//установили ширину чтобы все слайды поместились в inner
    slidesField.style.display = 'flex';//слайды оформились в линию
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';//скрываем все элементы кот не попадают в зону видимости

    slides.forEach(slide => {//переберу все слайды, установим ширину
        slide.style.width = width;
    });
   
    slider.style.position = 'relative';//чтобы точки внутри можно было абс-но спозиционировать

    const indicators = document.createElement('ol'),//создали обертку для точек в виде ордерлиста
        dots = [];

    indicators.classList.add('carousel-indicators');//добавляем класс
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;//стилизовали блок обертки
    slider.append(indicators);//добавили обертку в слайдер

    for (let i = 0; i < slides.length; i++) {//цикл закончится когда закончатся слайды
        const dot = document.createElement('li');//создаем точки
        dot.setAttribute('data-slide-to', i + 1);//установили атрибут
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;//стилизация точки

        if (i == 0) {
            dot.style.opacity = 1;//первая точка белая на 100% остальные на 50%
        }

        indicators.append(dot);//добавили точки в обертку точек
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {//обработчик для передвижения слайдера
        if (offset == deleteNotDigits(width) * (slides.length - 1)){//заменить все не числа на пустое место
            offset = 0;//вернуться в начало
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');//массиву с точками и назначили 50% проз-ть
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {//обработчик для передвижения слайдера
        if (offset == 0){//если первый слайд
            offset = deleteNotDigits(width) * (slides.length - 1);//вернуться в начало
        } else {
            offset -= deleteNotDigits(width);//в offset - зап-м пос слайд
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');//массиву с точками и назначили 50% проз-ть
        dots[slideIndex - 1].style.opacity = 1;

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {//на каждую точку - обработчик
            const slideTo = e.target.getAttribute('data-slide-to');//получили значение атрибута

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');//массиву с точками и назначили 50% проз-ть
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
    

 /*      showSlides(slideIndex);

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;//у нас 4 слайда - покажет общее кол-во слайдов(вторая цифра)
        }

        function showSlides(n) {
            if (n > slides.length) {//если n > кол-во слайдов - покажет 1-ый слайд
                slideIndex = 1;
            }

            if (n < 1) {//если n < кол-во слайдов - покажет последний слайд
                slideIndex = slides.length;
            }

            slides.forEach(item => item.style.display = 'none');//закрыли все слайды

            slides[slideIndex - 1].style.display = 'block';//открыли один из них

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;//добавлениие 0 перед числом если оно меньше 10
            } else {
                current.textContent = slideIndex;
            }
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);//ф-я увеличивает счетчик на 1
        }

        prev.addEventListener('click', () => {//при клике на левую стрелку ф-я уменьшает счетчик на 1
            plusSlides(-1);
        });

        next.addEventListener('click', () => {//при клике на правую стрелку ф-я увеличивает счетчик на 1
            plusSlides(1);
        }); */

}

export default slider;