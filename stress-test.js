// Performance test: 10000 components, 20 levels deep
// Component numbers format: XXXXXX-XXXXXXX-XX-XXX-X-XX

function loadStressTestData() {
  const tree = trees[0];
  tree.nodes.clear();
  tree.roots = [];
  tree.expanded.clear();
  tree.selected = null;
  nextId[0] = 1;

  const categories = [
    'Кузов', 'Двигатель', 'Трансмиссия', 'Ходовая часть',
    'Электрика', 'Освещение', 'Интерьер', 'Безопасность'
  ];

  const subComponents = [
    'Блок', 'Модуль', 'Узел', 'Датчик', 'Реле', 'Жгут',
    'Кронштейн', 'Крепёж', 'Прокладка', 'Подшипник',
    'Шестерня', 'Вал', 'Пружина', 'Клапан', 'Фильтр',
    'Насос', 'Цилиндр', 'Диск', 'Рычаг', 'Тяга'
  ];

  const materials = ['Сталь', 'Алюминий', 'Пластик', 'Резина', 'Медь'];
  const statuses = ['Серийный', 'Опытный', 'Консервированный'];

  let counter = 0;

  function buildSubtree(parentId, parentCode, depth, targetCount) {
    if (depth > 19 || counter >= targetCount) return;

    const childCount = Math.min(
      Math.floor(Math.random() * 5) + 2,
      targetCount - counter
    );

    for (let i = 0; i < childCount && counter < targetCount; i++) {
      counter++;
      const level = depth + 1;
      const funcCode = String(counter).padStart(7, '0');
      const subCode = String(i + 1).padStart(2, '0');
      const nomenclature = `412300-${funcCode}-${subCode}-011-6-01`;
      const name = subComponents[counter % subComponents.length] + ' ' + counter;

      const node = makeNode(0, name, level, parentId, {
        nomenclature: nomenclature,
        codeCfh: funcCode,
        revision: String.fromCharCode(65 + (counter % 4)),
        quantity: String(Math.floor(Math.random() * 50) + 1),
        na: counter % 100 === 0 ? 'Да' : '',
        note: counter % 50 === 0 ? 'Особое примечание' : '',
        routeStatus: statuses[counter % 3],
        routeCode: 'МР-' + String(counter).padStart(4, '0'),
        routeName: 'Операция ' + counter,
        attrs: {
          'Материал': materials[counter % 5],
          'Масса': String(Math.floor(Math.random() * 100) + 1) + ' кг'
        },
        _demo: true
      });

      // Expand first 3 levels
      if (depth < 3) tree.expanded.add(node.id);

      // Recurse deeper
      buildSubtree(node.id, funcCode, depth, targetCount);
    }
  }

  // Create root nodes
  for (const cat of categories) {
    if (counter >= 10000) break;

    counter++;
    const funcCode = String(counter).padStart(7, '0');
    const nomenclature = `412300-${funcCode}-00-011-6-01`;

    const node = makeNode(0, cat, 0, null, {
      nomenclature: nomenclature,
      codeCfh: funcCode,
      revision: 'A',
      quantity: '1',
      na: '',
      note: '',
      routeStatus: 'Серийный',
      routeCode: 'МР-0001',
      routeName: 'Сборка ' + cat,
      attrs: { 'Материал': 'Сталь', 'Масса': '50 кг' },
      _demo: true
    });

    tree.expanded.add(node.id);
    buildSubtree(node.id, funcCode, 0, 10000);
  }

  renderAll();
}
