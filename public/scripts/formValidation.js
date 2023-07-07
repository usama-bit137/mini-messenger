const user = document.getElementById('user');
const text = document.getElementById('text');
const errorElement = document.getElementById('error');

document.getElementById('form').addEventListener('submit', (e) => {
  const messages = [];
  if (user.value === '' || user.value === null)
    messages.push('Username required');
  if (user.value.length >= 15)
    messages.push('Username should be less than 15 characters');
  if (text.value === '' || text.value === null) messages.push('Text required');

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = `${messages.join('. ')}`;
    errorElement.classList.add('on-error');
    setTimeout(() => {
      errorElement.innerText = '';
      errorElement.classList.remove('on-error');
    }, 2000);
  }
});
