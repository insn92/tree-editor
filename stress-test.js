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

  function addComp(name, level, parentId) {
    if (counter >= 10000) return null;
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
    return node;
  }

  // Корень
  const root = addComp('Автомобиль Sedan X7', 0, null);
  tree.expanded.add(root.id);

  // Уровень 1: 6 узлов
  const level1Names = ['Кузов', 'Двигатель', 'Трансмиссия', 'Ходовая', 'Электрика', 'Интерьер'];
  const level1 = [];
  for (const name of level1Names) {
    if (counter >= 10000) break;
    const n = addComp(name, 1, root.id);
    if (n) { level1.push(n); tree.expanded.add(n.id); }
  }

  // Уровень 2: 5-8 на каждый уровень 1
  const level2 = [];
  for (const p of level1) {
    if (counter >= 10000) break;
    for (let i = 0; i < 6 && counter < 10000; i++) {
      const n = addComp(names[i % names.length] + '-' + (i+1), 2, p.id);
      if (n) { level2.push(n); tree.expanded.add(n.id); }
    }
  }

  // Уровень 3: 3-5 на каждый уровень 2
  const level3 = [];
  for (const p of level2) {
    if (counter >= 10000) break;
    for (let i = 0; i < 4 && counter < 10000; i++) {
      const n = addComp(names[(i+3) % names.length] + '-' + (i+1), 3, p.id);
      if (n) { level3.push(n); tree.expanded.add(n.id); }
    }
  }

  // Уровень 4: 2-4 на каждый уровень 3
  const level4 = [];
  for (const p of level3) {
    if (counter >= 10000) break;
    for (let i = 0; i < 3 && counter < 10000; i++) {
      const n = addComp(names[(i+6) % names.length] + '-' + (i+1), 4, p.id);
      if (n) level4.push(n);
    }
  }

  // Уровни 5-20: цепочки по 1-3 узла от каждого уровня 4
  for (const start of level4) {
    if (counter >= 10000) break;
    let parent = start;
    for (let d = 5; d <= 15 && counter < 10000; d++) {
      const n = addComp(names[counter % names.length] + '-' + counter, d, parent.id);
      if (!n) break;
      parent = n;
      // Ветвим иногда
      if (d < 10 && counter % 7 === 0 && counter < 9990) {
        const extra = addComp(names[(counter+1) % names.length] + '-' + counter, d, parent.id);
      }
    }
  }

  renderAll();
}
