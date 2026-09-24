'use strict';
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyGr9aFKMd3wfSEOlXEg3ADLmWrNVwjlqcDM8P2SAbN3mUqoMFkMXgMHI2GFIGALGgXZA/exec';
const form = document.getElementById('contact-form');
const button = document.getElementById('submit-btn');
const message = document.getElementById('form-message');
const today = new Date();
const localDate = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
document.querySelectorAll('input[type="date"]').forEach(input => { input.min = localDate; });
form.addEventListener('submit', async event => {
 event.preventDefault();
 if (button.disabled) return;
 button.disabled = true;
 button.textContent = '送信中…';
 message.hidden = true;
 try {
  const response = await fetch(GAS_URL, {method:'POST', body:new FormData(form)});
  if (!response.ok) throw new Error('Request failed');
  message.textContent = 'お問い合わせを送信しました。内容を確認のうえ、順次ご連絡いたします。';
  form.reset();
 } catch (error) {
  message.textContent = '送信完了を確認できませんでした。時間をおいて再度お試しいただくか、LINEからご連絡ください。';
 } finally {
  message.hidden = false;
  button.disabled = false;
  button.textContent = 'この内容で送信する ↗';
 }
});

