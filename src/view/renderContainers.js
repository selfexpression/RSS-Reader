export default (element, list, i18n, type) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t(`data.${type}.header`);

  cardBody.replaceChildren(h2);
  cardContainer.replaceChildren(cardBody, list);
  element.replaceChildren(cardContainer);
};
