export default function showMessage(messageType, message, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `<div class="message ${messageType}"> ${message}</div>`;
}
