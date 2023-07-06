const user = document.getElementById('user');
const text = document.getElementById('text');
const errorElement = document.getElementById('error');

document.getElementById('form').addEventListener('submit', (e) => {
  const messages = [];
  if (user.value === '' || user.value === null) messages.push('username');
  if (text.value === '' || text.value === null) messages.push('text');

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = `${messages.join(' and ')} required`;
    errorElement.classList.add('on-error');
    setTimeout(() => {
      errorElement.innerText = '';
      errorElement.classList.remove('on-error');
    }, 2000);
  }
});
