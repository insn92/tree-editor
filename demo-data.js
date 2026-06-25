// Demo data for tree-editor
// Component numbers format: XXXXXX-XXXXXXX-XX-XXX-X-XX
// Block 2 (functional code): same code = similar components

function loadDemoData() {
  const tree = trees[0];
  tree.nodes.clear();
  tree.roots = [];
  tree.expanded.clear();
  tree.selected = null;
  nextId[0] = 1;

  function addNode(name, level, parent, data) {
    const d = data || {};
    const node = makeNode(0, name, level, parent, {
      nomenclature: d.nomenclature || '',
      codeCfh: d.codeCfh || '',
      revision: d.revision || 'A',
      quantity: d.quantity || '1',
      note: d.note || '',
      routeStatus: d.routeStatus || '',
      routeCode: d.routeCode || '',
      routeName: d.routeName || '',
      attrs: d.attrs || {},
      _demo: true
    });
    return node.id;
  }

  // Автомобиль
  const car = addNode('Автомобиль Sedan X7', 0, null, {
    nomenclature: '412300-0000010-00-011-6-01',
    codeCfh: '0000010',
    revision: 'A',
    note: 'Автомобиль в комплектации поставки'
  });

  // === КУЗОВ ===
  const body = addNode('Кузов', 1, car, {
    nomenclature: '412300-0000010-01-011-6-01',
    codeCfh: '0000010',
    revision: 'A'
  });

  const bodyFloor = addNode('Основание кузова', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-01',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Днище', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-01', codeCfh: '0000010', revision: 'A' });
  addNode('Лонжероны передние', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-02', codeCfh: '0000010', revision: 'A' });
  addNode('Лонжероны задние', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-03', codeCfh: '0000010', revision: 'A' });
  addNode('Стойки боковые', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-04', codeCfh: '0000010', revision: 'A' });
  addNode('Арки передних колёс', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-05', codeCfh: '0000010', revision: 'A' });
  addNode('Арки задних колёс', 3, bodyFloor, { nomenclature: '412300-0000010-01-011-6-01-01-06', codeCfh: '0000010', revision: 'A' });

  const bodySide = addNode('Боковины', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-02',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Стойка A левая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-01', codeCfh: '0000010', revision: 'A' });
  addNode('Стойка A правая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-02', codeCfh: '0000010', revision: 'A' });
  addNode('Стойка B левая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-03', codeCfh: '0000010', revision: 'A' });
  addNode('Стойка B правая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-04', codeCfh: '0000010', revision: 'A' });
  addNode('Стойка C левая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-05', codeCfh: '0000010', revision: 'A' });
  addNode('Стойка C правая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-06', codeCfh: '0000010', revision: 'A' });
  addNode('Панель боковая левая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-07', codeCfh: '0000010', revision: 'A' });
  addNode('Панель боковая правая', 3, bodySide, { nomenclature: '412300-0000010-01-011-6-01-02-08', codeCfh: '0000010', revision: 'A' });

  const bodyRoof = addNode('Крыша', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-03',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Панель крыши', 3, bodyRoof, { nomenclature: '412300-0000010-01-011-6-01-03-01', codeCfh: '0000010', revision: 'A' });
  addNode('Дуги усиления', 3, bodyRoof, { nomenclature: '412300-0000010-01-011-6-01-03-02', codeCfh: '0000010', revision: 'A' });
  addNode('Стеклопакет люка', 3, bodyRoof, { nomenclature: '412300-0000010-01-011-6-01-03-03', codeCfh: '0000010', revision: 'A' });

  const bodyFront = addNode('Передняя часть', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-04',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Капот', 3, bodyFront, { nomenclature: '412300-0000010-01-011-6-01-04-01', codeCfh: '0000010', revision: 'A' });
  addNode('Передняя рамка', 3, bodyFront, { nomenclature: '412300-0000010-01-011-6-01-04-02', codeCfh: '0000010', revision: 'A' });
  addNode('Брызговики передние', 3, bodyFront, { nomenclature: '412300-0000010-01-011-6-01-04-03', codeCfh: '0000010', revision: 'A' });
  addNode('Решётка радиатора', 3, bodyFront, { nomenclature: '412300-0000010-01-011-6-01-04-04', codeCfh: '0000010', revision: 'A' });

  const bodyRear = addNode('Задняя часть', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-05',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Крышка багажника', 3, bodyRear, { nomenclature: '412300-0000010-01-011-6-01-05-01', codeCfh: '0000010', revision: 'A' });
  addNode('Задняя рамка', 3, bodyRear, { nomenclature: '412300-0000010-01-011-6-01-05-02', codeCfh: '0000010', revision: 'A' });
  addNode('Бампер задний', 3, bodyRear, { nomenclature: '412300-0000010-01-011-6-01-05-03', codeCfh: '0000010', revision: 'A' });
  addNode('Панель задняя', 3, bodyRear, { nomenclature: '412300-0000010-01-011-6-01-05-04', codeCfh: '0000010', revision: 'A' });

  const bodyDoors = addNode('Двери', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-06',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Дверь передняя левая', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-01', codeCfh: '0000010', revision: 'A' });
  addNode('Дверь передняя правая', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-02', codeCfh: '0000010', revision: 'A' });
  addNode('Дверь задняя левая', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-03', codeCfh: '0000010', revision: 'A' });
  addNode('Дверь задняя правая', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-04', codeCfh: '0000010', revision: 'A' });
  addNode('Петли передних дверей', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-05', codeCfh: '0000010', revision: 'A' });
  addNode('Петли задних дверей', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-06', codeCfh: '0000010', revision: 'A' });
  addNode('Замки дверные', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-07', codeCfh: '0000010', revision: 'A' });
  addNode('Уплотнители дверей', 3, bodyDoors, { nomenclature: '412300-0000010-01-011-6-01-06-08', codeCfh: '0000010', revision: 'A' });

  const bodyBumper = addNode('Бампер передний', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-07',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Основание бампера', 3, bodyBumper, { nomenclature: '412300-0000010-01-011-6-01-07-01', codeCfh: '0000010', revision: 'A' });
  addNode('Накладка бампера', 3, bodyBumper, { nomenclature: '412300-0000010-01-011-6-01-07-02', codeCfh: '0000010', revision: 'A' });
  addNode('Крепления бампера', 3, bodyBumper, { nomenclature: '412300-0000010-01-011-6-01-07-03', codeCfh: '0000010', revision: 'A' });
  addNode('Датчик парковки передний', 3, bodyBumper, { nomenclature: '412300-0000010-01-011-6-01-07-04', codeCfh: '0000010', revision: 'A' });

  const bodyGlass = addNode('Стёкла', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-08',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Лобовое стекло', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-01', codeCfh: '0000010', revision: 'A' });
  addNode('Заднее стекло', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-02', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло двери передней левой', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-03', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло двери передней правой', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-04', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло двери задней левой', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-05', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло двери задней правой', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-06', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло треугольное заднее левое', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-07', codeCfh: '0000010', revision: 'A' });
  addNode('Стекло треугольное заднее правое', 3, bodyGlass, { nomenclature: '412300-0000010-01-011-6-01-08-08', codeCfh: '0000010', revision: 'A' });

  const bodyWipers = addNode('Дворники', 2, body, {
    nomenclature: '412300-0000010-01-011-6-01-09',
    codeCfh: '0000010',
    revision: 'A'
  });
  addNode('Дворник левый', 3, bodyWipers, { nomenclature: '412300-0000010-01-011-6-01-09-01', codeCfh: '0000010', revision: 'A' });
  addNode('Дворник правый', 3, bodyWipers, { nomenclature: '412300-0000010-01-011-6-01-09-02', codeCfh: '0000010', revision: 'A' });
  addNode('Моторедуктор стеклоочистителя', 3, bodyWipers, { nomenclature: '412300-0000010-01-011-6-01-09-03', codeCfh: '0000010', revision: 'A' });
  addNode('Насос омывателя', 3, bodyWipers, { nomenclature: '412300-0000010-01-011-6-01-09-04', codeCfh: '0000010', revision: 'A' });
  addNode('Бачок омывателя', 3, bodyWipers, { nomenclature: '412300-0000010-01-011-6-01-09-05', codeCfh: '0000010', revision: 'A' });

  // === ДВИГАТЕЛЬ ===
  const engine = addNode('Двигатель', 1, car, {
    nomenclature: '412300-0000020-00-011-6-01',
    codeCfh: '0000020',
    revision: 'A',
    note: 'Бензиновый 2.0 TFSI'
  });

  const engineBlock = addNode('Блок цилиндров', 2, engine, {
    nomenclature: '412300-0000020-01-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Блок цилиндров чугунный', 3, engineBlock, { nomenclature: '412300-0000020-01-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Головка блока цилиндров', 3, engineBlock, { nomenclature: '412300-0000020-01-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Прокладка ГБЦ', 3, engineBlock, { nomenclature: '412300-0000020-01-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Крышка клапанов', 3, engineBlock, { nomenclature: '412300-0000020-01-011-6-01-04', codeCfh: '0000020', revision: 'A' });

  const enginePiston = addNode('Кривошипно-шатунный механизм', 2, engine, {
    nomenclature: '412300-0000020-02-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Коленчатый вал', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Маховик', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Поршень 1', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Поршень 2', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Поршень 3', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-05', codeCfh: '0000020', revision: 'A' });
  addNode('Поршень 4', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-06', codeCfh: '0000020', revision: 'A' });
  addNode('Шатун 1', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-07', codeCfh: '0000020', revision: 'A' });
  addNode('Шатун 2', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-08', codeCfh: '0000020', revision: 'A' });
  addNode('Шатун 3', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-09', codeCfh: '0000020', revision: 'A' });
  addNode('Шатун 4', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-10', codeCfh: '0000020', revision: 'A' });
  addNode('Поршневые кольца', 3, enginePiston, { nomenclature: '412300-0000020-02-011-6-01-11', codeCfh: '0000020', revision: 'A' });

  const engineValve = addNode('Газораспределительный механизм', 2, engine, {
    nomenclature: '412300-0000020-03-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Распредвал впускной', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Распредвал выпускной', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Клапан впускной', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Клапан выпускной', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Толкатель клапана', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-05', codeCfh: '0000020', revision: 'A' });
  addNode('Ремень ГРМ', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-06', codeCfh: '0000020', revision: 'A' });
  addNode('Натяжитель ремня ГРМ', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-07', codeCfh: '0000020', revision: 'A' });
  addNode('Шкив распредвала', 3, engineValve, { nomenclature: '412300-0000020-03-011-6-01-08', codeCfh: '0000020', revision: 'A' });

  const engineLubrication = addNode('Система смазки', 2, engine, {
    nomenclature: '412300-0000020-04-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Масляный поддон', 3, engineLubrication, { nomenclature: '412300-0000020-04-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Масляный насос', 3, engineLubrication, { nomenclature: '412300-0000020-04-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Масляный фильтр', 3, engineLubrication, { nomenclature: '412300-0000020-04-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Датчик давления масла', 3, engineLubrication, { nomenclature: '412300-0000020-04-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Маслоприёмник', 3, engineLubrication, { nomenclature: '412300-0000020-04-011-6-01-05', codeCfh: '0000020', revision: 'A' });

  const engineCooling = addNode('Система охлаждения', 2, engine, {
    nomenclature: '412300-0000020-05-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Радиатор охлаждения', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Водяной насос', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Термостат', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Датчик температуры ОЖ', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Расширительный бачок', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-05', codeCfh: '0000020', revision: 'A' });
  addNode('Патрубки системы охлаждения', 3, engineCooling, { nomenclature: '412300-0000020-05-011-6-01-06', codeCfh: '0000020', revision: 'A' });

  const engineIntake = addNode('Система впуска', 2, engine, {
    nomenclature: '412300-0000020-06-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Воздушный фильтр', 3, engineIntake, { nomenclature: '412300-0000020-06-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Датчик массового расхода воздуха', 3, engineIntake, { nomenclature: '412300-0000020-06-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Дроссельная заслонка', 3, engineIntake, { nomenclature: '412300-0000020-06-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Впускной коллектор', 3, engineIntake, { nomenclature: '412300-0000020-06-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Ресивер', 3, engineIntake, { nomenclature: '412300-0000020-06-011-6-01-05', codeCfh: '0000020', revision: 'A' });

  const engineExhaust = addNode('Система выпуска', 2, engine, {
    nomenclature: '412300-0000020-07-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Выпускной коллектор', 3, engineExhaust, { nomenclature: '412300-0000020-07-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Катализатор', 3, engineExhaust, { nomenclature: '412300-0000020-07-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Резонатор', 3, engineExhaust, { nomenclature: '412300-0000020-07-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Глушитель', 3, engineExhaust, { nomenclature: '412300-0000020-07-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Лямбда-зонд', 3, engineExhaust, { nomenclature: '412300-0000020-07-011-6-01-05', codeCfh: '0000020', revision: 'A' });

  const engineFuel = addNode('Система питания', 2, engine, {
    nomenclature: '412300-0000020-08-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Топливный бак', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Топливный насос', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Топливный фильтр', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Топливная рампа', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Форсунка 1', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-05', codeCfh: '0000020', revision: 'A' });
  addNode('Форсунка 2', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-06', codeCfh: '0000020', revision: 'A' });
  addNode('Форсунка 3', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-07', codeCfh: '0000020', revision: 'A' });
  addNode('Форсунка 4', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-08', codeCfh: '0000020', revision: 'A' });
  addNode('Регулятор давления топлива', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-09', codeCfh: '0000020', revision: 'A' });
  addNode('Датчик положения дросселя', 3, engineFuel, { nomenclature: '412300-0000020-08-011-6-01-10', codeCfh: '0000020', revision: 'A' });

  const engineIgnition = addNode('Система зажигания', 2, engine, {
    nomenclature: '412300-0000020-09-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });
  addNode('Катушка зажигания 1', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-01', codeCfh: '0000020', revision: 'A' });
  addNode('Катушка зажигания 2', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-02', codeCfh: '0000020', revision: 'A' });
  addNode('Катушка зажигания 3', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-03', codeCfh: '0000020', revision: 'A' });
  addNode('Катушка зажигания 4', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-04', codeCfh: '0000020', revision: 'A' });
  addNode('Свеча зажигания 1', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-05', codeCfh: '0000020', revision: 'A' });
  addNode('Свеча зажигания 2', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-06', codeCfh: '0000020', revision: 'A' });
  addNode('Свеча зажигания 3', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-07', codeCfh: '0000020', revision: 'A' });
  addNode('Свеча зажигания 4', 3, engineIgnition, { nomenclature: '412300-0000020-09-011-6-01-08', codeCfh: '0000020', revision: 'A' });

  // === ТРАНСМИССИЯ ===
  const transmission = addNode('Трансмиссия', 1, car, {
    nomenclature: '412300-0000030-00-011-6-01',
    codeCfh: '0000030',
    revision: 'A',
    note: 'МКПП 6-ступенчатая'
  });

  const clutch = addNode('Сцепление', 2, transmission, {
    nomenclature: '412300-0000030-01-011-6-01',
    codeCfh: '0000030',
    revision: 'A'
  });
  addNode('Диск сцепления', 3, clutch, { nomenclature: '412300-0000030-01-011-6-01-01', codeCfh: '0000030', revision: 'A' });
  addNode('Нажимной диск', 3, clutch, { nomenclature: '412300-0000030-01-011-6-01-02', codeCfh: '0000030', revision: 'A' });
  addNode('Подшипник выжимной', 3, clutch, { nomenclature: '412300-0000030-01-011-6-01-03', codeCfh: '0000030', revision: 'A' });
  addNode('Маховик двойной массы', 3, clutch, { nomenclature: '412300-0000030-01-011-6-01-04', codeCfh: '0000030', revision: 'A' });

  const gearbox = addNode('Коробка передач', 2, transmission, {
    nomenclature: '412300-0000030-02-011-6-01',
    codeCfh: '0000030',
    revision: 'A'
  });
  addNode('Корпус КПП', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-01', codeCfh: '0000030', revision: 'A' });
  addNode('Вал первичный', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-02', codeCfh: '0000030', revision: 'A' });
  addNode('Вал вторичный', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-03', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня 1-й передачи', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-04', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня 2-й передачи', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-05', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня 3-й передачи', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-06', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня 4-й передачи', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-07', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня 5-й передачи', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-08', codeCfh: '0000030', revision: 'A' });
  addNode('Шестерня заднего хода', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-09', codeCfh: '0000030', revision: 'A' });
  addNode('Синхронизаторы', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-10', codeCfh: '0000030', revision: 'A' });
  addNode('Привод переключения', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-11', codeCfh: '0000030', revision: 'A' });
  addNode('Масло КПП', 3, gearbox, { nomenclature: '412300-0000030-02-011-6-01-12', codeCfh: '0000030', revision: 'A' });

  const driveshaft = addNode('Привод', 2, transmission, {
    nomenclature: '412300-0000030-03-011-6-01',
    codeCfh: '0000030',
    revision: 'A'
  });
  addNode('Приводной вал левый', 3, driveshaft, { nomenclature: '412300-0000030-03-011-6-01-01', codeCfh: '0000030', revision: 'A' });
  addNode('Приводной вал правый', 3, driveshaft, { nomenclature: '412300-0000030-03-011-6-01-02', codeCfh: '0000030', revision: 'A' });
  addNode('ШРУС внутренний', 3, driveshaft, { nomenclature: '412300-0000030-03-011-6-01-03', codeCfh: '0000030', revision: 'A' });
  addNode('ШРУС наружный', 3, driveshaft, { nomenclature: '412300-0000030-03-011-6-01-04', codeCfh: '0000030', revision: 'A' });
  addNode('Пыльник ШРУС', 3, driveshaft, { nomenclature: '412300-0000030-03-011-6-01-05', codeCfh: '0000030', revision: 'A' });

  const differential = addNode('Дифференциал', 2, transmission, {
    nomenclature: '412300-0000030-04-011-6-01',
    codeCfh: '0000030',
    revision: 'A'
  });
  addNode('Корпус дифференциала', 3, differential, { nomenclature: '412300-0000030-04-011-6-01-01', codeCfh: '0000030', revision: 'A' });
  addNode('Сателлиты', 3, differential, { nomenclature: '412300-0000030-04-011-6-01-02', codeCfh: '0000030', revision: 'A' });
  addNode('Полуосевые шестерни', 3, differential, { nomenclature: '412300-0000030-04-011-6-01-03', codeCfh: '0000030', revision: 'A' });

  // === ХОДОВАЯ ЧАСТЬ ===
  const chassis = addNode('Ходовая часть', 1, car, {
    nomenclature: '412300-0000040-00-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });

  const suspFront = addNode('Подвеска передняя', 2, chassis, {
    nomenclature: '412300-0000040-01-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });
  addNode('Стойка амортизатора левая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-01', codeCfh: '0000040', revision: 'A' });
  addNode('Стойка амортизатора правая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-02', codeCfh: '0000040', revision: 'A' });
  addNode('Пружина подвески левая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-03', codeCfh: '0000040', revision: 'A' });
  addNode('Пружина подвески правая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-04', codeCfh: '0000040', revision: 'A' });
  addNode('Рычаг подвески нижний левый', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-05', codeCfh: '0000040', revision: 'A' });
  addNode('Рычаг подвески нижний правый', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-06', codeCfh: '0000040', revision: 'A' });
  addNode('Шаровая опора', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-07', codeCfh: '0000040', revision: 'A' });
  addNode('Стабилизатор поперечной устойчивости', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-08', codeCfh: '0000040', revision: 'A' });
  addNode('Сlinkи стабилизатора', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-09', codeCfh: '0000040', revision: 'A' });
  addNode('Опора стойки левая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-10', codeCfh: '0000040', revision: 'A' });
  addNode('Опора стойки правая', 3, suspFront, { nomenclature: '412300-0000040-01-011-6-01-11', codeCfh: '0000040', revision: 'A' });

  const suspRear = addNode('Подвеска задняя', 2, chassis, {
    nomenclature: '412300-0000040-02-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });
  addNode('Амортизатор задний левый', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-01', codeCfh: '0000040', revision: 'A' });
  addNode('Амортизатор задний правый', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-02', codeCfh: '0000040', revision: 'A' });
  addNode('Пружина задняя левая', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-03', codeCfh: '0000040', revision: 'A' });
  addNode('Пружина задняя правая', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-04', codeCfh: '0000040', revision: 'A' });
  addNode('Балка задней подвески', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-05', codeCfh: '0000040', revision: 'A' });
  addNode('Рычаг задний продольный', 3, suspRear, { nomenclature: '412300-0000040-02-011-6-01-06', codeCfh: '0000040', revision: 'A' });

  const steering = addNode('Рулевое управление', 2, chassis, {
    nomenclature: '412300-0000040-03-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });
  addNode('Рулевое колесо', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-01', codeCfh: '0000040', revision: 'A' });
  addNode('Рулевая колонка', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-02', codeCfh: '0000040', revision: 'A' });
  addNode('Рулевая рейка', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-03', codeCfh: '0000040', revision: 'A' });
  addNode('Наконечник рулевой наружный', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-04', codeCfh: '0000040', revision: 'A' });
  addNode('Наконечник рулевой внутренний', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-05', codeCfh: '0000040', revision: 'A' });
  addNode('Усилитель руля электрический', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-06', codeCfh: '0000040', revision: 'A' });
  addNode('Датчик угла поворота', 3, steering, { nomenclature: '412300-0000040-03-011-6-01-07', codeCfh: '0000040', revision: 'A' });

  const brakes = addNode('Тормозная система', 2, chassis, {
    nomenclature: '412300-0000040-04-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });
  addNode('Главный тормозной цилиндр', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-01', codeCfh: '0000040', revision: 'A' });
  addNode('Вакуумный усилитель тормозов', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-02', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной суппорт передний левый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-03', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной суппорт передний правый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-04', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной суппорт задний левый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-05', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной суппорт задний правый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-06', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной диск передний левый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-07', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной диск передний правый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-08', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной диск задний левый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-09', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозной диск задний правый', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-10', codeCfh: '0000040', revision: 'A' });
  addNode('Колодка тормозная передняя', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-11', codeCfh: '0000040', revision: 'A' });
  addNode('Колодка тормозная задняя', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-12', codeCfh: '0000040', revision: 'A' });
  addNode('Тормозная магистраль', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-13', codeCfh: '0000040', revision: 'A' });
  addNode('Регулятор тормозных усилий', 3, brakes, { nomenclature: '412300-0000040-04-011-6-01-14', codeCfh: '0000040', revision: 'A' });

  const wheels = addNode('Колёса и шины', 2, chassis, {
    nomenclature: '412300-0000040-05-011-6-01',
    codeCfh: '0000040',
    revision: 'A'
  });
  addNode('Диск колёсный 1', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-01', codeCfh: '0000040', revision: 'A' });
  addNode('Диск колёсный 2', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-02', codeCfh: '0000040', revision: 'A' });
  addNode('Диск колёсный 3', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-03', codeCfh: '0000040', revision: 'A' });
  addNode('Диск колёсный 4', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-04', codeCfh: '0000040', revision: 'A' });
  addNode('Шина 1', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-05', codeCfh: '0000040', revision: 'A' });
  addNode('Шина 2', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-06', codeCfh: '0000040', revision: 'A' });
  addNode('Шина 3', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-07', codeCfh: '0000040', revision: 'A' });
  addNode('Шина 4', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-08', codeCfh: '0000040', revision: 'A' });
  addNode('Болты колёсные', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-09', codeCfh: '0000040', revision: 'A' });
  addNode('Датчик давления в шинах', 3, wheels, { nomenclature: '412300-0000040-05-011-6-01-10', codeCfh: '0000040', revision: 'A' });

  // === ЭЛЕКТРИКА ===
  const electrical = addNode('Электрооборудование', 1, car, {
    nomenclature: '412300-0000050-00-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });

  const elecBattery = addNode('Система питания', 2, electrical, {
    nomenclature: '412300-0000050-01-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });
  addNode('Аккумуляторная батарея', 3, elecBattery, { nomenclature: '412300-0000050-01-011-6-01-01', codeCfh: '0000050', revision: 'A' });
  addNode('Генератор', 3, elecBattery, { nomenclature: '412300-0000050-01-011-6-01-02', codeCfh: '0000050', revision: 'A' });
  addNode('Стартер', 3, elecBattery, { nomenclature: '412300-0000050-01-011-6-01-03', codeCfh: '0000050', revision: 'A' });
  addNode('Реле стартера', 3, elecBattery, { nomenclature: '412300-0000050-01-011-6-01-04', codeCfh: '0000050', revision: 'A' });
  addNode('Провода батареи', 3, elecBattery, { nomenclature: '412300-0000050-01-011-6-01-05', codeCfh: '0000050', revision: 'A' });

  const elecWiring = addNode('Жгуты проводов', 2, electrical, {
    nomenclature: '412300-0000050-02-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });
  addNode('Жгут моторный', 3, elecWiring, { nomenclature: '412300-0000050-02-011-6-01-01', codeCfh: '0000050', revision: 'A' });
  addNode('Жгут салона', 3, elecWiring, { nomenclature: '412300-0000050-02-011-6-01-02', codeCfh: '0000050', revision: 'A' });
  addNode('Жгут задний', 3, elecWiring, { nomenclature: '412300-0000050-02-011-6-01-03', codeCfh: '0000050', revision: 'A' });
  addNode('Жгут дверной левый', 3, elecWiring, { nomenclature: '412300-0000050-02-011-6-01-04', codeCfh: '0000050', revision: 'A' });
  addNode('Жгут дверной правый', 3, elecWiring, { nomenclature: '412300-0000050-02-011-6-01-05', codeCfh: '0000050', revision: 'A' });

  const elecFuses = addNode('Блок предохранителей', 2, electrical, {
    nomenclature: '412300-0000050-03-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });
  addNode('Блок предохранителей моторный', 3, elecFuses, { nomenclature: '412300-0000050-03-011-6-01-01', codeCfh: '0000050', revision: 'A' });
  addNode('Блок предохранителей салонный', 3, elecFuses, { nomenclature: '412300-0000050-03-011-6-01-02', codeCfh: '0000050', revision: 'A' });
  addNode('Предохранитель', 3, elecFuses, { nomenclature: '412300-0000050-03-011-6-01-03', codeCfh: '0000050', revision: 'A' });
  addNode('Реле', 3, elecFuses, { nomenclature: '412300-0000050-03-011-6-01-04', codeCfh: '0000050', revision: 'A' });

  const elecEcu = addNode('Блоки управления', 2, electrical, {
    nomenclature: '412300-0000050-04-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });
  addNode('ЭБУ двигателя', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-01', codeCfh: '0000050', revision: 'A' });
  addNode('ЭБУ АКПП', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-02', codeCfh: '0000050', revision: 'A' });
  addNode('ЭБУ ABS', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-03', codeCfh: '0000050', revision: 'A' });
  addNode('ЭБУ подушки безопасности', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-04', codeCfh: '0000050', revision: 'A' });
  addNode('ЭБУ кузова', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-05', codeCfh: '0000050', revision: 'A' });
  addNode('Блок управления климатом', 3, elecEcu, { nomenclature: '412300-0000050-04-011-6-01-06', codeCfh: '0000050', revision: 'A' });

  const elecSensors = addNode('Датчики', 2, electrical, {
    nomenclature: '412300-0000050-05-011-6-01',
    codeCfh: '0000050',
    revision: 'A'
  });
  addNode('Датчик скорости', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-01', codeCfh: '0000050', revision: 'A' });
  addNode('Датчик угла поворота руля', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-02', codeCfh: '0000050', revision: 'A' });
  addNode('Датчик положения педали газа', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-03', codeCfh: '0000050', revision: 'A' });
  addNode('Датчик положения педали тормоза', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-04', codeCfh: '0000050', revision: 'A' });
  addNode('Датчик переключателя передач', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-05', codeCfh: '0000050', revision: 'A' });
  addNode('Датчик температуры наружного воздуха', 3, elecSensors, { nomenclature: '412300-0000050-05-011-6-01-06', codeCfh: '0000050', revision: 'A' });

  // === ОПТИКА ===
  const lighting = addNode('Освещение', 1, car, {
    nomenclature: '412300-0000060-00-011-6-01',
    codeCfh: '0000060',
    revision: 'A'
  });
  addNode('Фара передняя левая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-01', codeCfh: '0000060', revision: 'A' });
  addNode('Фара передняя правая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-02', codeCfh: '0000060', revision: 'A' });
  addNode('Противотуманная фара левая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-03', codeCfh: '0000060', revision: 'A' });
  addNode('Противотуманная фара правая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-04', codeCfh: '0000060', revision: 'A' });
  addNode('Блок-фара задняя левая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-05', codeCfh: '0000060', revision: 'A' });
  addNode('Блок-фара задняя правая', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-06', codeCfh: '0000060', revision: 'A' });
  addNode('Повторитель поворота боковой', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-07', codeCfh: '0000060', revision: 'A' });
  addNode('Подсветка номерного знака', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-08', codeCfh: '0000060', revision: 'A' });
  addNode('Светильник салона', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-09', codeCfh: '0000060', revision: 'A' });
  addNode('Бардачок подсветка', 2, lighting, { nomenclature: '412300-0000060-00-011-6-01-10', codeCfh: '0000060', revision: 'A' });

  // === ИНТЕРЬЕР ===
  const interior = addNode('Интерьер', 1, car, {
    nomenclature: '412300-0000070-00-011-6-01',
    codeCfh: '0000070',
    revision: 'A'
  });

  const intDash = addNode('Приборная панель', 2, interior, {
    nomenclature: '412300-0000070-01-011-6-01',
    codeCfh: '0000070',
    revision: 'A'
  });
  addNode('Комбинация приборов', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-01', codeCfh: '0000070', revision: 'A' });
  addNode('Центральная консоль', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-02', codeCfh: '0000070', revision: 'A' });
  addNode('Мультимедиа дисплей', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-03', codeCfh: '0000070', revision: 'A' });
  addNode('Блок управления климатом', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-04', codeCfh: '0000070', revision: 'A' });
  addNode('Пепельница', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-05', codeCfh: '0000070', revision: 'A' });
  addNode('Панель кнопок', 3, intDash, { nomenclature: '412300-0000070-01-011-6-01-06', codeCfh: '0000070', revision: 'A' });

  const intSeats = addNode('Сиденья', 2, interior, {
    nomenclature: '412300-0000070-02-011-6-01',
    codeCfh: '0000070',
    revision: 'A'
  });
  addNode('Сиденье водителя', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-01', codeCfh: '0000070', revision: 'A' });
  addNode('Сиденье пассажира', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-02', codeCfh: '0000070', revision: 'A' });
  addNode('Задний диван', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-03', codeCfh: '0000070', revision: 'A' });
  addNode('Подголовник передний левый', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-04', codeCfh: '0000070', revision: 'A' });
  addNode('Подголовник передний правый', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-05', codeCfh: '0000070', revision: 'A' });
  addNode('Подголовник задний левый', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-06', codeCfh: '0000070', revision: 'A' });
  addNode('Подголовник задний центральный', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-07', codeCfh: '0000070', revision: 'A' });
  addNode('Подголовник задний правый', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-08', codeCfh: '0000070', revision: 'A' });
  addNode('Направляющая ремня безопасности', 3, intSeats, { nomenclature: '412300-0000070-02-011-6-01-09', codeCfh: '0000070', revision: 'A' });

  const intTrim = addNode('Обивка и отделка', 2, interior, {
    nomenclature: '412300-0000070-03-011-6-01',
    codeCfh: '0000070',
    revision: 'A'
  });
  addNode('Обивка двери передней левой', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-01', codeCfh: '0000070', revision: 'A' });
  addNode('Обивка двери передней правой', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-02', codeCfh: '0000070', revision: 'A' });
  addNode('Обивка двери задней левой', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-03', codeCfh: '0000070', revision: 'A' });
  addNode('Обивка двери задней правой', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-04', codeCfh: '0000070', revision: 'A' });
  addNode('Коврики салона', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-05', codeCfh: '0000070', revision: 'A' });
  addNode('Ковёр багажника', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-06', codeCfh: '0000070', revision: 'A' });
  addNode('Обивка потолка', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-07', codeCfh: '0000070', revision: 'A' });
  addNode('Стойки внутренние', 3, intTrim, { nomenclature: '412300-0000070-03-011-6-01-08', codeCfh: '0000070', revision: 'A' });

  const intSafety = addNode('Системы безопасности', 2, interior, {
    nomenclature: '412300-0000070-04-011-6-01',
    codeCfh: '0000070',
    revision: 'A'
  });
  addNode('Ремень безопасности водителя', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-01', codeCfh: '0000070', revision: 'A' });
  addNode('Ремень безопасности пассажира', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-02', codeCfh: '0000070', revision: 'A' });
  addNode('Ремень безопасности задний левый', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-03', codeCfh: '0000070', revision: 'A' });
  addNode('Ремень безопасности задний правый', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-04', codeCfh: '0000070', revision: 'A' });
  addNode('Подушка безопасности водителя', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-05', codeCfh: '0000070', revision: 'A' });
  addNode('Подушка безопасности пассажира', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-06', codeCfh: '0000070', revision: 'A' });
  addNode('Подушка безопасности боковая левая', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-07', codeCfh: '0000070', revision: 'A' });
  addNode('Подушка безопасности боковая правая', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-08', codeCfh: '0000070', revision: 'A' });
  addNode('Шторка безопасности', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-09', codeCfh: '0000070', revision: 'A' });
  addNode('Датчик удара передний', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-10', codeCfh: '0000070', revision: 'A' });
  addNode('Датчик удара задний', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-11', codeCfh: '0000070', revision: 'A' });
  addNode('Блок управления подушками', 3, intSafety, { nomenclature: '412300-0000070-04-011-6-01-12', codeCfh: '0000070', revision: 'A' });

  // Разворачиваем корень и основные узлы
  tree.expanded.add(car);
  tree.expanded.add(body);
  tree.expanded.add(engine);
  tree.expanded.add(transmission);
  tree.expanded.add(chassis);
  tree.expanded.add(electrical);
  tree.expanded.add(lighting);
  tree.expanded.add(interior);

  renderAll();
}

function loadDemoData2() {
  const tree = trees[1];
  tree.nodes.clear();
  tree.roots = [];
  tree.expanded.clear();
  tree.selected = null;
  nextId[1] = 1000;

  function addNode(name, level, parent, data) {
    const d = data || {};
    const node = makeNode(1, name, level, parent, {
      nomenclature: d.nomenclature || '',
      codeCfh: d.codeCfh || '',
      revision: d.revision || 'A',
      quantity: d.quantity || '1',
      note: d.note || '',
      routeStatus: d.routeStatus || '',
      routeCode: d.routeCode || '',
      routeName: d.routeName || '',
      attrs: d.attrs || {},
      _demo: true
    });
    return node.id;
  }

  const root = addNode('Опции Sedan X7', 0, null, {
    nomenclature: '412300-0000100-00-011-6-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Варианты комплектации'
  });

  // Двигатели
  const engines = addNode('Варианты двигателей', 1, root, {
    nomenclature: '412300-0000100-01-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const e1 = addNode('1.6 MPI 123 л.с.', 2, engines, {
    nomenclature: '412300-0000100-01-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Базовый двигатель'
  });
  addNode('Блок управления MPI', 3, e1, { nomenclature: '412300-0000100-01-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('Впускной коллектор MPI', 3, e1, { nomenclature: '412300-0000100-01-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });
  addNode('Дроссель MPI', 3, e1, { nomenclature: '412300-0000100-01-011-6-01-01-03', codeCfh: '0000100', revision: 'A' });

  const e2 = addNode('2.0 TDI 150 л.с.', 2, engines, {
    nomenclature: '412300-0000100-01-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Турбодизель'
  });
  addNode('Турбонагнетатель', 3, e2, { nomenclature: '412300-0000100-01-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('Интеркулер', 3, e2, { nomenclature: '412300-0000100-01-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });
  addNode('Блок управления TDI', 3, e2, { nomenclature: '412300-0000100-01-011-6-01-02-03', codeCfh: '0000100', revision: 'A' });
  addNode('Охлаждение турбо', 3, e2, { nomenclature: '412300-0000100-01-011-6-01-02-04', codeCfh: '0000100', revision: 'A' });

  const e3 = addNode('2.5 V6 190 л.с.', 2, engines, {
    nomenclature: '412300-0000100-01-011-6-01-03',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Бензиновый V6'
  });
  addNode('Блок V6', 3, e3, { nomenclature: '412300-0000100-01-011-6-01-03-01', codeCfh: '0000100', revision: 'A' });
  addNode('Распредвал V6', 3, e3, { nomenclature: '412300-0000100-01-011-6-01-03-02', codeCfh: '0000100', revision: 'A' });
  addNode('Выпускной коллектор V6', 3, e3, { nomenclature: '412300-0000100-01-011-6-01-03-03', codeCfh: '0000100', revision: 'A' });

  // Трансмиссия
  const trans = addNode('Варианты трансмиссии', 1, root, {
    nomenclature: '412300-0000100-02-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const t1 = addNode('МКПП 5-ступ.', 2, trans, {
    nomenclature: '412300-0000100-02-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Синхронизатор МКПП', 3, t1, { nomenclature: '412300-0000100-02-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('Вилка переключения', 3, t1, { nomenclature: '412300-0000100-02-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });

  const t2 = addNode('АКПП 6-ступ.', 2, trans, {
    nomenclature: '412300-0000100-02-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Гидротрансформатор', 3, t2, { nomenclature: '412300-0000100-02-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('Блок управления АКПП', 3, t2, { nomenclature: '412300-0000100-02-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });
  addNode('Фрикционы АКПП', 3, t2, { nomenclature: '412300-0000100-02-011-6-01-02-03', codeCfh: '0000100', revision: 'A' });
  addNode('Масло ATF', 3, t2, { nomenclature: '412300-0000100-02-011-6-01-02-04', codeCfh: '0000100', revision: 'A' });

  const t3 = addNode('CVT вариатор', 2, trans, {
    nomenclature: '412300-0000100-02-011-6-01-03',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Ремень вариатора', 3, t3, { nomenclature: '412300-0000100-02-011-6-01-03-01', codeCfh: '0000100', revision: 'A' });
  addNode('Шкив вариатора', 3, t3, { nomenclature: '412300-0000100-02-011-6-01-03-02', codeCfh: '0000100', revision: 'A' });

  // Колёса
  const wheels = addNode('Варианты колёс', 1, root, {
    nomenclature: '412300-0000100-03-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const w1 = addNode('16" стальные', 2, wheels, {
    nomenclature: '412300-0000100-03-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Диск стальной 16"', 3, w1, { nomenclature: '412300-0000100-03-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('Колпак 16"', 3, w1, { nomenclature: '412300-0000100-03-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });

  const w2 = addNode('17" легкосплавные', 2, wheels, {
    nomenclature: '412300-0000100-03-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Диск легкосплавный 17"', 3, w2, { nomenclature: '412300-0000100-03-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('Шина 205/55 R17', 3, w2, { nomenclature: '412300-0000100-03-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });

  const w3 = addNode('18" спортивные', 2, wheels, {
    nomenclature: '412300-0000100-03-011-6-01-03',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Диск спортивный 18"', 3, w3, { nomenclature: '412300-0000100-03-011-6-01-03-01', codeCfh: '0000100', revision: 'A' });
  addNode('Шина 225/45 R18', 3, w3, { nomenclature: '412300-0000100-03-011-6-01-03-02', codeCfh: '0000100', revision: 'A' });
  addNode('Датчик давления R18', 3, w3, { nomenclature: '412300-0000100-03-011-6-01-03-03', codeCfh: '0000100', revision: 'A' });

  // Опции салона
  const opts = addNode('Опции салона', 1, root, {
    nomenclature: '412300-0000100-04-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const o1 = addNode('Базовая', 2, opts, {
    nomenclature: '412300-0000100-04-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Тканевая обивка', 3, o1, { nomenclature: '412300-0000100-04-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('Ручной кондиционер', 3, o1, { nomenclature: '412300-0000100-04-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });
  addNode('Аудиосистема 4 динамика', 3, o1, { nomenclature: '412300-0000100-04-011-6-01-01-03', codeCfh: '0000100', revision: 'A' });
  addNode('Стеклоподъёмники мех.', 3, o1, { nomenclature: '412300-0000100-04-011-6-01-01-04', codeCfh: '0000100', revision: 'A' });

  const o2 = addNode('Комфорт', 2, opts, {
    nomenclature: '412300-0000100-04-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Ткань премиум', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('Климат-контроль', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });
  addNode('Аудиосистема 8 динамиков', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-03', codeCfh: '0000100', revision: 'A' });
  addNode('Стеклоподъёмники эл.', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-04', codeCfh: '0000100', revision: 'A' });
  addNode('Подогрев передних сидений', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-05', codeCfh: '0000100', revision: 'A' });
  addNode('Кожаный руль', 3, o2, { nomenclature: '412300-0000100-04-011-6-01-02-06', codeCfh: '0000100', revision: 'A' });

  const o3 = addNode('Премиум', 2, opts, {
    nomenclature: '412300-0000100-04-011-6-01-03',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Кожаная обивка', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-01', codeCfh: '0000100', revision: 'A' });
  addNode('Двухзонный климат', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-02', codeCfh: '0000100', revision: 'A' });
  addNode('Аудиосистема Harman Kardon', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-03', codeCfh: '0000100', revision: 'A' });
  addNode('Электропривод задней двери', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-04', codeCfh: '0000100', revision: 'A' });
  addNode('Подогрев всех сидений', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-05', codeCfh: '0000100', revision: 'A' });
  addNode('Вентиляция сидений', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-06', codeCfh: '0000100', revision: 'A' });
  addNode('Панорамная крыша', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-07', codeCfh: '0000100', revision: 'A' });
  addNode('Проекционный дисплей', 3, o3, { nomenclature: '412300-0000100-04-011-6-01-03-08', codeCfh: '0000100', revision: 'A' });

  // Опции безопасности
  const safety = addNode('Опции безопасности', 1, root, {
    nomenclature: '412300-0000100-05-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const s1 = addNode('Пакет Safety Basic', 2, safety, {
    nomenclature: '412300-0000100-05-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('ESP', 3, s1, { nomenclature: '412300-0000100-05-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('ABS', 3, s1, { nomenclature: '412300-0000100-05-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });
  addNode('6 подушек', 3, s1, { nomenclature: '412300-0000100-05-011-6-01-01-03', codeCfh: '0000100', revision: 'A' });

  const s2 = addNode('Пакет Safety Pro', 2, safety, {
    nomenclature: '412300-0000100-05-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('ESP+', 3, s2, { nomenclature: '412300-0000100-05-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('8 подушек', 3, s2, { nomenclature: '412300-0000100-05-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });
  addNode('Система контроля полосы', 3, s2, { nomenclature: '412300-0000100-05-011-6-01-02-03', codeCfh: '0000100', revision: 'A' });
  addNode('Автоматическое торможение', 3, s2, { nomenclature: '412300-0000100-05-011-6-01-02-04', codeCfh: '0000100', revision: 'A' });
  addNode('Камера заднего вида', 3, s2, { nomenclature: '412300-0000100-05-011-6-01-02-05', codeCfh: '0000100', revision: 'A' });

  // Опции внешние
  const exterior = addNode('Опции внешние', 1, root, {
    nomenclature: '412300-0000100-06-011-6-01',
    codeCfh: '0000100',
    revision: 'A'
  });

  const ex1 = addNode('Хром-пакет', 2, exterior, {
    nomenclature: '412300-0000100-06-011-6-01-01',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Хром решётка радиатора', 3, ex1, { nomenclature: '412300-0000100-06-011-6-01-01-01', codeCfh: '0000100', revision: 'A' });
  addNode('Хром молдинги дверей', 3, ex1, { nomenclature: '412300-0000100-06-011-6-01-01-02', codeCfh: '0000100', revision: 'A' });
  addNode('Хром ручки дверей', 3, ex1, { nomenclature: '412300-0000100-06-011-6-01-01-03', codeCfh: '0000100', revision: 'A' });

  const ex2 = addNode('SPORТ-пакет', 2, exterior, {
    nomenclature: '412300-0000100-06-011-6-01-02',
    codeCfh: '0000100',
    revision: 'A'
  });
  addNode('Спортивный бампер', 3, ex2, { nomenclature: '412300-0000100-06-011-6-01-02-01', codeCfh: '0000100', revision: 'A' });
  addNode('Спортивная решётка', 3, ex2, { nomenclature: '412300-0000100-06-011-6-01-02-02', codeCfh: '0000100', revision: 'A' });
  addNode('Спортивные пороги', 3, ex2, { nomenclature: '412300-0000100-06-011-6-01-02-03', codeCfh: '0000100', revision: 'A' });
  addNode('Спортивный спойлер', 3, ex2, { nomenclature: '412300-0000100-06-011-6-01-02-04', codeCfh: '0000100', revision: 'A' });

  tree.expanded.add(root);
  tree.expanded.add(engines);
  tree.expanded.add(trans);
  tree.expanded.add(wheels);
  tree.expanded.add(opts);
  tree.expanded.add(safety);
  tree.expanded.add(exterior);

  renderAll();
}
