function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs
   const tabs = document.querySelectorAll(tabsSelector),//названия вкладок
   tabsContent = document.querySelectorAll(tabsContentSelector),//описание таба
   tabsParent = document.querySelector(tabsParentSelector);

function hideTabContent () {//ф-я скрытия контента
  tabsContent.forEach(item => {
      item.classList.add('hide');//скрытие контента таба
      item.classList.remove('show', 'fade');
  });

      tabs.forEach(item => {
          item.classList.remove(activeClass);//у каждого из э-тов таба удалим класс активности
      });
}
//i = 0, если ф-ю вызвали без аргемента, он по умолчанию = 0
function showTabContent (i = 0) {//ф-я для показа табов
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add(activeClass);
}
//изначальное положение страницы при загрузке
hideTabContent();//все табы закрыты
showTabContent();//открыт 1-ый таб

//назначаем обработчик события клика
tabsParent.addEventListener('click', (event) => {
  const target = event.target;//event.target часто будем ис-ть, поэтому сделали переменную

  //мы должны определить номер таба, в который кликнули и по этому номеру выз-ть showTabContent
  //target - нажатие && target.classList.contains - мы точно кликнули в таб?
  if (target && target.classList.contains(tabsSelector.slice(1))) {
//переберем все табы в tabs
      tabs.forEach((item, i) => {
//если э-т массива совпадает с тем эл-том в который кликнул пользователь, мы берем его номер и показываем на странице
      if (target == item) {//если тот э-т в который кликнули будет совпадать с э-том который мы сейчас перебираем
          hideTabContent();//то взываем обе ф-и
          showTabContent(i);//i - номер эл-та, который совпал
      }
      });
  }
});
}

export default tabs;