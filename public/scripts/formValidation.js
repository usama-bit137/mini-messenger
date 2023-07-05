const user = document.getElementById('user');
// const text = document.getElementById('text');
const errorElement = document.getElementById('error');

document.getElementById('form').addEventListener('submit', (e) => {
  const messages = [];
  if (user.value === '' || user.value == null)
    messages.push('Name is required');

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(', ');
  }
});
