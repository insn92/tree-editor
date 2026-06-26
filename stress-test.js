// Performance test: 10000 components, 20 levels deep
// Component numbers format: XXXXXX-XXXXXXX-XX-XXX-X-XX

function loadStressTestData() {
  const tree = trees[0];
  tree.nodes.clear();
  tree.roots = [];
  tree.expanded.clear();
  tree.selected = null;
  nextId[0] = 1;

  const materials = ['Сталь', 'Алюминий', 'Пластик', 'Резина', 'Медь'];
  const statuses = ['Серийный', 'Опытный', 'Консервированный'];
  const names = ['Блок', 'Модуль', 'Узел', 'Датчик', 'Реле', 'Жгут', 'Кронштейн', 'Крепёж', 'Прокладка', 'Подшипник'];

  let counter = 0;

  function addComp(name, level, parentId, depth) {
    if (counter >= 10000) return;
    counter++;
    const funcCode = String(counter).padStart(7, '0');
    const node = makeNode(0, name, level, parentId, {
      nomenclature: `412300-${funcCode}-${String(level).padStart(2,'0')}-011-6-01`,
      codeCfh: funcCode,
      revision: String.fromCharCode(65 + (counter % 4)),
      quantity: String(Math.floor(Math.random() * 50) + 1),
      na: counter % 100 === 0 ? 'Да' : '',
      note: '',
      routeStatus: statuses[counter % 3],
      routeCode: 'МР-' + String(counter).padStart(4, '0'),
      routeName: 'Операция ' + counter,
      attrs: { 'Материал': materials[counter % 5] },
      _demo: true
    });
    if (depth < 3) tree.expanded.add(node.id);
    return node;
  }

  // Уровень 0: 8 корней
  const roots = ['Кузов', 'Двигатель', 'Трансмиссия', 'Ходовая часть', 'Электрика', 'Освещение', 'Интерьер', 'Безопасность'];
  for (const r of roots) {
    if (counter >= 10000) break;
    const root = addComp(r, 0, null, 0);
    if (!root) break;

    // Уровень 1: 3-6 подузлов на каждый корень
    for (let i = 0; i < 5 && counter < 10000; i++) {
      const n1 = addComp(names[i % names.length] + ' ' + (i+1), 1, root.id, 1);
      if (!n1) break;

      // Уровень 2: 3-8 подузлов
      for (let j = 0; j < 5 && counter < 10000; j++) {
        const n2 = addComp(names[(i+j) % names.length] + ' ' + (i+1) + '.' + (j+1), 2, n1.id, 2);
        if (!n2) break;

        // Уровень 3: 2-5 подузлов
        for (let k = 0; k < 3 && counter < 10000; k++) {
          const n3 = addComp(names[(i+j+k) % names.length] + ' ' + (i+1) + '.' + (j+1) + '.' + (k+1), 3, n2.id, 3);
          if (!n3) break;

          // Уровень 4-20: по 1-2 узла глубину
          let parent = n3;
          for (let d = 4; d <= 12 && counter < 10000; d++) {
            const child = addComp(names[(counter) % names.length] + ' ' + counter, d, parent.id, d);
            if (!child) break;
            if (d <= 5) tree.expanded.add(child.id);
            parent = child;
          }
        }
      }
    }
  }

  renderAll();
}
