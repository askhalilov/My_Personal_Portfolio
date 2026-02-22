/* eslint-disable no-console */
const clockEl = document.getElementById('clock');
const toastEl = document.getElementById('toast');
const toastText = document.getElementById('toastText');

function pad(n){ return String(n).padStart(2, '0'); }

function tick(){
  const d = new Date();
  clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
tick();
setInterval(tick, 1000);

let toastTimer = null;
function toast(msg){
  toastText.textContent = msg;
  toastEl.classList.add('toast--show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('toast--show'), 1800);
}

document.getElementById('warningsBtn')?.addEventListener('click', () => {
  toast('Открытие списка предупреждений (демо)');
});

document.getElementById('createReportBtn')?.addEventListener('click', () => {
  toast('Создание отчёта… (демо)');
});

document.querySelectorAll('[data-quick]').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-quick');
    toast(`Быстрое создание: ${name} (демо)`);
  });
});

document.querySelectorAll('[data-download]').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-download');
    toast(`Скачивание: ${name} (демо)`);
  });
});

// Optional: show selected export formats
document.getElementById('formatsForm')?.addEventListener('change', (e) => {
  const form = e.currentTarget;
  const data = new FormData(form);
  const picked = [];
  for (const [k, v] of data.entries()) picked.push(k);
  if (picked.length === 0) toast('Форматы экспорта не выбраны');
  else toast(`Форматы: ${picked.join(', ')}`);
});
