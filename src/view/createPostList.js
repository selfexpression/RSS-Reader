export default (post, i18n) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

  const a = document.createElement('a');
  a.setAttribute('href', post.link);
  a.setAttribute('data-id', post.id);
  a.setAttribute('rel', 'noopener noreferrer');
  a.setAttribute('target', '_blank');
  a.setAttribute('class', 'fw-bold');
  a.textContent = post.title;

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('data-id', post.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = i18n.t('data.post.button');

  li.replaceChildren(a, button);
  return li;
};
