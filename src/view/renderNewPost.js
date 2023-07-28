export default (state, i18n) => {
  const container = document.querySelector('ul.list-group');
  const newPost = state.feeds.data.newPosts.at(-1, 1);

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

  const a = document.createElement('a');
  a.setAttribute('href', newPost.link);
  a.setAttribute('data-id', newPost.id);
  a.setAttribute('rel', 'noopener noreferrer');
  a.setAttribute('target', '_blank');
  a.setAttribute('class', 'fw-bold');
  a.textContent = newPost.title;

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.setAttribute('data-id', newPost.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = i18n.t('data.post.button');

  li.append(a, button);
  container.prepend(li);
};
