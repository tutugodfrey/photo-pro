module.exports = el => {
  if (el.classList.contains('is-flashing'))
    el.classList.remove('is-flashing');
  let timer;
  clearTimeout(timer);
  el.classList.add('is-flashing');
  timer = setTimeout(_ => el.classList.remove('is-flashing'), 200);
}