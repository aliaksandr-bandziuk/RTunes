'use strict';

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    // блокирую кнопку play по умолчанию
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = (elem) => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };


    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        //добавляю выделение логотипа (ободок) при клике на канал
        selectItem(parrent);

        // ищу внутри parrent элемент с классом .radio-name
        const title = parrent.querySelector('.radio-name').textContent;
        // вставляю в заголовок имя выбранного канала
        radioHeaderBig.textContent = title;

        // ищу внутри parrent логотип радио
        const urlImg = parrent.querySelector('.radio-img').src;
        // передаю логотип на место пластинки вверх
        radioCoverImg.src = urlImg;


        // разблокирую кнопку play при клике на любой канал
        radioStop.disabled = false;

        console.log(target.dataset.radioStantion);
        // нашел по имени в инпуте место для клика
        audio.src = target.dataset.radioStantion;

        // запускаю радио
        audio.play();
        // меняю вид кноки при запуске
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

};