(function(){
  const list = document.getElementById('list');
  const addBtn = document.getElementById('addRow');
  const saveBtn = document.getElementById('save');
  const result = document.getElementById('result');
  const tpl = document.getElementById('rowTemplate');

  function createRow(name = '', value = ''){
    const node = tpl.content.firstElementChild.cloneNode(true);
    const nameInput = node.querySelector('.name');
    const valueInput = node.querySelector('.value');
    const up = node.querySelector('.up');
    const down = node.querySelector('.down');
    const del = node.querySelector('.del');

    nameInput.value = name;
    valueInput.value = value;

    up.addEventListener('click', () => {
      const prev = node.previousElementSibling;
      if (prev) list.insertBefore(node, prev);
    });

    down.addEventListener('click', () => {
      const next = node.nextElementSibling;
      if (next) list.insertBefore(next, node);
    });

    del.addEventListener('click', () => {
      node.remove();
    });

    return node;
  }

  addBtn?.addEventListener('click', () => {
    list.appendChild(createRow());
  });

  function buildOrderedJsonText(rows){
    const parts = [];
    for (const r of rows){
      const k = r.querySelector('.name').value;
      const v = r.querySelector('.value').value;
      parts.push(String(JSON.stringify(k)) + ':' + String(JSON.stringify(v)));
    }
    return '{' + parts.join(',') + '}';
  }

  saveBtn?.addEventListener('click', () => {
    const rows = Array.from(list.children);
    result.textContent = buildOrderedJsonText(rows);
  });

  if (list && tpl) list.appendChild(createRow());
})();