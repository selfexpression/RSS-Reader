import renderContainers from './renderContainers.js';

export default (elements, state, i18n) => {
  const type = 'feed';
  const { feedEl } = elements.feed;
  feedEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.data.feeds.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = item.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = item.description;

    li.append(h3, p);
    ul.append(li);
  });

  renderContainers(elements.feed.feedEl, ul, i18n, type);

  elements.form.formEl.reset();
  elements.form.input.focus();
};
