import renderContainers from './renderContainers.js';

export default (elements, state, i18n) => {
  const type = 'post';
  const { postEl } = elements;
  postEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const lists = state.data.posts.map((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.setAttribute('href', item.link);
    a.setAttribute('data-id', item.id);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.setAttribute('class', 'fw-bold');
    a.textContent = item.title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', item.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('data.post.button');

    li.replaceChildren(a, button);
    return li;
  });
  ul.replaceChildren(...lists);

  renderContainers(postEl, ul, i18n, type);
};
