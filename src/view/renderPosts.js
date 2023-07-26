export default (elements, state, i18n) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('data.post.header');

  cardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.data.post.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.setAttribute('href', item.link);
    a.setAttribute('data-id', item.postID);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.setAttribute('class', 'fw-bold');
    a.textContent = item.title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', item.postID);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('data.post.button');

    li.append(a, button);
    ul.append(li);
  });

  cardContainer.append(cardBody, ul);
  elements.feed.postEl.append(cardContainer);

  elements.form.formEl.reset();
  elements.form.input.focus();
};
