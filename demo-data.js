// Demo data for tree-editor
// Component numbers format: XXXXXX-XXXXXXX-XX-XXX-X-XX
// Block 2 (functional code): unique per component type
// Block 3: execution variant (01, 02, etc.)
// Block 6: revision (01, 02, etc.)

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
    nomenclature: '412300-0000020-00-011-6-01',
    codeCfh: '0000020',
    revision: 'A'
  });

  const bodyFloor = addNode('Основание кузова', 2, body, {
    nomenclature: '412300-0000021-00-011-6-01',
    codeCfh: '0000021',
    revision: 'A'
  });
  addNode('Днище', 3, bodyFloor, { nomenclature: '412300-0000022-00-011-6-01', codeCfh: '0000022', revision: 'A' });
  addNode('Лонжероны передние', 3, bodyFloor, { nomenclature: '412300-0000023-00-011-6-01', codeCfh: '0000023', revision: 'A' });
  addNode('Лонжероны задние', 3, bodyFloor, { nomenclature: '412300-0000024-00-011-6-01', codeCfh: '0000024', revision: 'A' });
  addNode('Стойки боковые', 3, bodyFloor, { nomenclature: '412300-0000025-00-011-6-01', codeCfh: '0000025', revision: 'A' });
  addNode('Арки передних колёс', 3, bodyFloor, { nomenclature: '412300-0000026-00-011-6-01', codeCfh: '0000026', revision: 'A' });
  addNode('Арки задних колёс', 3, bodyFloor, { nomenclature: '412300-0000027-00-011-6-01', codeCfh: '0000027', revision: 'A' });

  const bodySide = addNode('Боковины', 2, body, {
    nomenclature: '412300-0000028-00-011-6-01',
    codeCfh: '0000028',
    revision: 'A'
  });
  addNode('Стойка A левая', 3, bodySide, { nomenclature: '412300-0000029-00-011-6-01', codeCfh: '0000029', revision: 'A' });
  addNode('Стойка A правая', 3, bodySide, { nomenclature: '412300-0000030-00-011-6-01', codeCfh: '0000030', revision: 'A' });
  addNode('Стойка B левая', 3, bodySide, { nomenclature: '412300-0000031-00-011-6-01', codeCfh: '0000031', revision: 'A' });
  addNode('Стойка B правая', 3, bodySide, { nomenclature: '412300-0000032-00-011-6-01', codeCfh: '0000032', revision: 'A' });
  addNode('Стойка C левая', 3, bodySide, { nomenclature: '412300-0000033-00-011-6-01', codeCfh: '0000033', revision: 'A' });
  addNode('Стойка C правая', 3, bodySide, { nomenclature: '412300-0000034-00-011-6-01', codeCfh: '0000034', revision: 'A' });
  addNode('Панель боковая левая', 3, bodySide, { nomenclature: '412300-0000035-00-011-6-01', codeCfh: '0000035', revision: 'A' });
  addNode('Панель боковая правая', 3, bodySide, { nomenclature: '412300-0000036-00-011-6-01', codeCfh: '0000036', revision: 'A' });

  const bodyRoof = addNode('Крыша', 2, body, {
    nomenclature: '412300-0000037-00-011-6-01',
    codeCfh: '0000037',
    revision: 'A'
  });
  addNode('Панель крыши', 3, bodyRoof, { nomenclature: '412300-0000038-00-011-6-01', codeCfh: '0000038', revision: 'A' });
  addNode('Дуги усиления', 3, bodyRoof, { nomenclature: '412300-0000039-00-011-6-01', codeCfh: '0000039', revision: 'A' });
  addNode('Стеклопакет люка', 3, bodyRoof, { nomenclature: '412300-0000040-00-011-6-01', codeCfh: '0000040', revision: 'A' });

  const bodyFront = addNode('Передняя часть', 2, body, {
    nomenclature: '412300-0000041-00-011-6-01',
    codeCfh: '0000041',
    revision: 'A'
  });
  addNode('Капот', 3, bodyFront, { nomenclature: '412300-0000042-00-011-6-01', codeCfh: '0000042', revision: 'A' });
  addNode('Передняя рамка', 3, bodyFront, { nomenclature: '412300-0000043-00-011-6-01', codeCfh: '0000043', revision: 'A' });
  addNode('Брызговики передние', 3, bodyFront, { nomenclature: '412300-0000044-00-011-6-01', codeCfh: '0000044', revision: 'A' });
  addNode('Решётка радиатора', 3, bodyFront, { nomenclature: '412300-0000045-00-011-6-01', codeCfh: '0000045', revision: 'A' });

  const bodyRear = addNode('Задняя часть', 2, body, {
    nomenclature: '412300-0000046-00-011-6-01',
    codeCfh: '0000046',
    revision: 'A'
  });
  addNode('Крышка багажника', 3, bodyRear, { nomenclature: '412300-0000047-00-011-6-01', codeCfh: '0000047', revision: 'A' });
  addNode('Задняя рамка', 3, bodyRear, { nomenclature: '412300-0000048-00-011-6-01', codeCfh: '0000048', revision: 'A' });
  addNode('Бампер задний', 3, bodyRear, { nomenclature: '412300-0000049-00-011-6-01', codeCfh: '0000049', revision: 'A' });
  addNode('Панель задняя', 3, bodyRear, { nomenclature: '412300-0000050-00-011-6-01', codeCfh: '0000050', revision: 'A' });

  const bodyDoors = addNode('Двери', 2, body, {
    nomenclature: '412300-0000051-00-011-6-01',
    codeCfh: '0000051',
    revision: 'A'
  });
  addNode('Дверь передняя левая', 3, bodyDoors, { nomenclature: '412300-0000052-00-011-6-01', codeCfh: '0000052', revision: 'A' });
  addNode('Дверь передняя правая', 3, bodyDoors, { nomenclature: '412300-0000053-00-011-6-01', codeCfh: '0000053', revision: 'A' });
  addNode('Дверь задняя левая', 3, bodyDoors, { nomenclature: '412300-0000054-00-011-6-01', codeCfh: '0000054', revision: 'A' });
  addNode('Дверь задняя правая', 3, bodyDoors, { nomenclature: '412300-0000055-00-011-6-01', codeCfh: '0000055', revision: 'A' });
  addNode('Петли передних дверей', 3, bodyDoors, { nomenclature: '412300-0000056-00-011-6-01', codeCfh: '0000056', revision: 'A' });
  addNode('Петли задних дверей', 3, bodyDoors, { nomenclature: '412300-0000057-00-011-6-01', codeCfh: '0000057', revision: 'A' });
  addNode('Замки дверные', 3, bodyDoors, { nomenclature: '412300-0000058-00-011-6-01', codeCfh: '0000058', revision: 'A' });
  addNode('Уплотнители дверей', 3, bodyDoors, { nomenclature: '412300-0000059-00-011-6-01', codeCfh: '0000059', revision: 'A' });

  const bodyBumper = addNode('Бампер передний', 2, body, {
    nomenclature: '412300-0000060-00-011-6-01',
    codeCfh: '0000060',
    revision: 'A'
  });
  addNode('Основание бампера', 3, bodyBumper, { nomenclature: '412300-0000061-00-011-6-01', codeCfh: '0000061', revision: 'A' });
  addNode('Накладка бампера', 3, bodyBumper, { nomenclature: '412300-0000062-00-011-6-01', codeCfh: '0000062', revision: 'A' });
  addNode('Крепления бампера', 3, bodyBumper, { nomenclature: '412300-0000063-00-011-6-01', codeCfh: '0000063', revision: 'A' });
  addNode('Датчик парковки передний', 3, bodyBumper, { nomenclature: '412300-0000064-00-011-6-01', codeCfh: '0000064', revision: 'A' });

  const bodyGlass = addNode('Стёкла', 2, body, {
    nomenclature: '412300-0000065-00-011-6-01',
    codeCfh: '0000065',
    revision: 'A'
  });
  addNode('Лобовое стекло', 3, bodyGlass, { nomenclature: '412300-0000066-00-011-6-01', codeCfh: '0000066', revision: 'A' });
  addNode('Заднее стекло', 3, bodyGlass, { nomenclature: '412300-0000067-00-011-6-01', codeCfh: '0000067', revision: 'A' });
  addNode('Стекло двери передней левой', 3, bodyGlass, { nomenclature: '412300-0000068-00-011-6-01', codeCfh: '0000068', revision: 'A' });
  addNode('Стекло двери передней правой', 3, bodyGlass, { nomenclature: '412300-0000069-00-011-6-01', codeCfh: '0000069', revision: 'A' });
  addNode('Стекло двери задней левой', 3, bodyGlass, { nomenclature: '412300-0000070-00-011-6-01', codeCfh: '0000070', revision: 'A' });
  addNode('Стекло двери задней правой', 3, bodyGlass, { nomenclature: '412300-0000071-00-011-6-01', codeCfh: '0000071', revision: 'A' });
  addNode('Стекло треугольное заднее левое', 3, bodyGlass, { nomenclature: '412300-0000072-00-011-6-01', codeCfh: '0000072', revision: 'A' });
  addNode('Стекло треугольное заднее правое', 3, bodyGlass, { nomenclature: '412300-0000073-00-011-6-01', codeCfh: '0000073', revision: 'A' });

  const bodyWipers = addNode('Дворники', 2, body, {
    nomenclature: '412300-0000074-00-011-6-01',
    codeCfh: '0000074',
    revision: 'A'
  });
  addNode('Дворник левый', 3, bodyWipers, { nomenclature: '412300-0000075-00-011-6-01', codeCfh: '0000075', revision: 'A' });
  addNode('Дворник правый', 3, bodyWipers, { nomenclature: '412300-0000076-00-011-6-01', codeCfh: '0000076', revision: 'A' });
  addNode('Моторедуктор стеклоочистителя', 3, bodyWipers, { nomenclature: '412300-0000077-00-011-6-01', codeCfh: '0000077', revision: 'A' });
  addNode('Насос омывателя', 3, bodyWipers, { nomenclature: '412300-0000078-00-011-6-01', codeCfh: '0000078', revision: 'A' });
  addNode('Бачок омывателя', 3, bodyWipers, { nomenclature: '412300-0000079-00-011-6-01', codeCfh: '0000079', revision: 'A' });

  // === ДВИГАТЕЛЬ ===
  const engine = addNode('Двигатель', 1, car, {
    nomenclature: '412300-0000100-00-011-6-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Бензиновый 2.0 TFSI'
  });

  const engineBlock = addNode('Блок цилиндров', 2, engine, {
    nomenclature: '412300-0000101-00-011-6-01',
    codeCfh: '0000101',
    revision: 'A'
  });
  addNode('Блок цилиндров чугунный', 3, engineBlock, { nomenclature: '412300-0000102-00-011-6-01', codeCfh: '0000102', revision: 'A' });
  addNode('Головка блока цилиндров', 3, engineBlock, { nomenclature: '412300-0000103-00-011-6-01', codeCfh: '0000103', revision: 'A' });
  addNode('Прокладка ГБЦ', 3, engineBlock, { nomenclature: '412300-0000104-00-011-6-01', codeCfh: '0000104', revision: 'A' });
  addNode('Крышка клапанов', 3, engineBlock, { nomenclature: '412300-0000105-00-011-6-01', codeCfh: '0000105', revision: 'A' });

  const enginePiston = addNode('Кривошипно-шатунный механизм', 2, engine, {
    nomenclature: '412300-0000106-00-011-6-01',
    codeCfh: '0000106',
    revision: 'A'
  });
  addNode('Коленчатый вал', 3, enginePiston, { nomenclature: '412300-0000107-00-011-6-01', codeCfh: '0000107', revision: 'A' });
  addNode('Маховик', 3, enginePiston, { nomenclature: '412300-0000108-00-011-6-01', codeCfh: '0000108', revision: 'A' });
  addNode('Поршень 1', 3, enginePiston, { nomenclature: '412300-0000109-00-011-6-01', codeCfh: '0000109', revision: 'A' });
  addNode('Поршень 2', 3, enginePiston, { nomenclature: '412300-0000110-00-011-6-01', codeCfh: '0000110', revision: 'A' });
  addNode('Поршень 3', 3, enginePiston, { nomenclature: '412300-0000111-00-011-6-01', codeCfh: '0000111', revision: 'A' });
  addNode('Поршень 4', 3, enginePiston, { nomenclature: '412300-0000112-00-011-6-01', codeCfh: '0000112', revision: 'A' });
  addNode('Шатун 1', 3, enginePiston, { nomenclature: '412300-0000113-00-011-6-01', codeCfh: '0000113', revision: 'A' });
  addNode('Шатун 2', 3, enginePiston, { nomenclature: '412300-0000114-00-011-6-01', codeCfh: '0000114', revision: 'A' });
  addNode('Шатун 3', 3, enginePiston, { nomenclature: '412300-0000115-00-011-6-01', codeCfh: '0000115', revision: 'A' });
  addNode('Шатун 4', 3, enginePiston, { nomenclature: '412300-0000116-00-011-6-01', codeCfh: '0000116', revision: 'A' });
  addNode('Поршневые кольца', 3, enginePiston, { nomenclature: '412300-0000117-00-011-6-01', codeCfh: '0000117', revision: 'A' });

  const engineValve = addNode('Газораспределительный механизм', 2, engine, {
    nomenclature: '412300-0000118-00-011-6-01',
    codeCfh: '0000118',
    revision: 'A'
  });
  addNode('Распредвал впускной', 3, engineValve, { nomenclature: '412300-0000119-00-011-6-01', codeCfh: '0000119', revision: 'A' });
  addNode('Распредвал выпускной', 3, engineValve, { nomenclature: '412300-0000120-00-011-6-01', codeCfh: '0000120', revision: 'A' });
  addNode('Клапан впускной', 3, engineValve, { nomenclature: '412300-0000121-00-011-6-01', codeCfh: '0000121', revision: 'A' });
  addNode('Клапан выпускной', 3, engineValve, { nomenclature: '412300-0000122-00-011-6-01', codeCfh: '0000122', revision: 'A' });
  addNode('Толкатель клапана', 3, engineValve, { nomenclature: '412300-0000123-00-011-6-01', codeCfh: '0000123', revision: 'A' });
  addNode('Ремень ГРМ', 3, engineValve, { nomenclature: '412300-0000124-00-011-6-01', codeCfh: '0000124', revision: 'A' });
  addNode('Натяжитель ремня ГРМ', 3, engineValve, { nomenclature: '412300-0000125-00-011-6-01', codeCfh: '0000125', revision: 'A' });
  addNode('Шкив распредвала', 3, engineValve, { nomenclature: '412300-0000126-00-011-6-01', codeCfh: '0000126', revision: 'A' });

  const engineLubrication = addNode('Система смазки', 2, engine, {
    nomenclature: '412300-0000127-00-011-6-01',
    codeCfh: '0000127',
    revision: 'A'
  });
  addNode('Масляный поддон', 3, engineLubrication, { nomenclature: '412300-0000128-00-011-6-01', codeCfh: '0000128', revision: 'A' });
  addNode('Масляный насос', 3, engineLubrication, { nomenclature: '412300-0000129-00-011-6-01', codeCfh: '0000129', revision: 'A' });
  addNode('Масляный фильтр', 3, engineLubrication, { nomenclature: '412300-0000130-00-011-6-01', codeCfh: '0000130', revision: 'A' });
  addNode('Датчик давления масла', 3, engineLubrication, { nomenclature: '412300-0000131-00-011-6-01', codeCfh: '0000131', revision: 'A' });
  addNode('Маслоприёмник', 3, engineLubrication, { nomenclature: '412300-0000132-00-011-6-01', codeCfh: '0000132', revision: 'A' });

  const engineCooling = addNode('Система охлаждения', 2, engine, {
    nomenclature: '412300-0000133-00-011-6-01',
    codeCfh: '0000133',
    revision: 'A'
  });
  addNode('Радиатор охлаждения', 3, engineCooling, { nomenclature: '412300-0000134-00-011-6-01', codeCfh: '0000134', revision: 'A' });
  addNode('Водяной насос', 3, engineCooling, { nomenclature: '412300-0000135-00-011-6-01', codeCfh: '0000135', revision: 'A' });
  addNode('Термостат', 3, engineCooling, { nomenclature: '412300-0000136-00-011-6-01', codeCfh: '0000136', revision: 'A' });
  addNode('Датчик температуры ОЖ', 3, engineCooling, { nomenclature: '412300-0000137-00-011-6-01', codeCfh: '0000137', revision: 'A' });
  addNode('Расширительный бачок', 3, engineCooling, { nomenclature: '412300-0000138-00-011-6-01', codeCfh: '0000138', revision: 'A' });
  addNode('Патрубки системы охлаждения', 3, engineCooling, { nomenclature: '412300-0000139-00-011-6-01', codeCfh: '0000139', revision: 'A' });

  const engineIntake = addNode('Система впуска', 2, engine, {
    nomenclature: '412300-0000140-00-011-6-01',
    codeCfh: '0000140',
    revision: 'A'
  });
  addNode('Воздушный фильтр', 3, engineIntake, { nomenclature: '412300-0000141-00-011-6-01', codeCfh: '0000141', revision: 'A' });
  addNode('Датчик массового расхода воздуха', 3, engineIntake, { nomenclature: '412300-0000142-00-011-6-01', codeCfh: '0000142', revision: 'A' });
  addNode('Дроссельная заслонка', 3, engineIntake, { nomenclature: '412300-0000143-00-011-6-01', codeCfh: '0000143', revision: 'A' });
  addNode('Впускной коллектор', 3, engineIntake, { nomenclature: '412300-0000144-00-011-6-01', codeCfh: '0000144', revision: 'A' });
  addNode('Ресивер', 3, engineIntake, { nomenclature: '412300-0000145-00-011-6-01', codeCfh: '0000145', revision: 'A' });

  const engineExhaust = addNode('Система выпуска', 2, engine, {
    nomenclature: '412300-0000146-00-011-6-01',
    codeCfh: '0000146',
    revision: 'A'
  });
  addNode('Выпускной коллектор', 3, engineExhaust, { nomenclature: '412300-0000147-00-011-6-01', codeCfh: '0000147', revision: 'A' });
  addNode('Катализатор', 3, engineExhaust, { nomenclature: '412300-0000148-00-011-6-01', codeCfh: '0000148', revision: 'A' });
  addNode('Резонатор', 3, engineExhaust, { nomenclature: '412300-0000149-00-011-6-01', codeCfh: '0000149', revision: 'A' });
  addNode('Глушитель', 3, engineExhaust, { nomenclature: '412300-0000150-00-011-6-01', codeCfh: '0000150', revision: 'A' });
  addNode('Лямбда-зонд', 3, engineExhaust, { nomenclature: '412300-0000151-00-011-6-01', codeCfh: '0000151', revision: 'A' });

  const engineFuel = addNode('Система питания', 2, engine, {
    nomenclature: '412300-0000152-00-011-6-01',
    codeCfh: '0000152',
    revision: 'A'
  });
  addNode('Топливный бак', 3, engineFuel, { nomenclature: '412300-0000153-00-011-6-01', codeCfh: '0000153', revision: 'A' });
  addNode('Топливный насос', 3, engineFuel, { nomenclature: '412300-0000154-00-011-6-01', codeCfh: '0000154', revision: 'A' });
  addNode('Топливный фильтр', 3, engineFuel, { nomenclature: '412300-0000155-00-011-6-01', codeCfh: '0000155', revision: 'A' });
  addNode('Топливная рампа', 3, engineFuel, { nomenclature: '412300-0000156-00-011-6-01', codeCfh: '0000156', revision: 'A' });
  addNode('Форсунка 1', 3, engineFuel, { nomenclature: '412300-0000157-00-011-6-01', codeCfh: '0000157', revision: 'A' });
  addNode('Форсунка 2', 3, engineFuel, { nomenclature: '412300-0000158-00-011-6-01', codeCfh: '0000158', revision: 'A' });
  addNode('Форсунка 3', 3, engineFuel, { nomenclature: '412300-0000159-00-011-6-01', codeCfh: '0000159', revision: 'A' });
  addNode('Форсунка 4', 3, engineFuel, { nomenclature: '412300-0000160-00-011-6-01', codeCfh: '0000160', revision: 'A' });
  addNode('Регулятор давления топлива', 3, engineFuel, { nomenclature: '412300-0000161-00-011-6-01', codeCfh: '0000161', revision: 'A' });
  addNode('Датчик положения дросселя', 3, engineFuel, { nomenclature: '412300-0000162-00-011-6-01', codeCfh: '0000162', revision: 'A' });

  const engineIgnition = addNode('Система зажигания', 2, engine, {
    nomenclature: '412300-0000163-00-011-6-01',
    codeCfh: '0000163',
    revision: 'A'
  });
  addNode('Катушка зажигания 1', 3, engineIgnition, { nomenclature: '412300-0000164-00-011-6-01', codeCfh: '0000164', revision: 'A' });
  addNode('Катушка зажигания 2', 3, engineIgnition, { nomenclature: '412300-0000165-00-011-6-01', codeCfh: '0000165', revision: 'A' });
  addNode('Катушка зажигания 3', 3, engineIgnition, { nomenclature: '412300-0000166-00-011-6-01', codeCfh: '0000166', revision: 'A' });
  addNode('Катушка зажигания 4', 3, engineIgnition, { nomenclature: '412300-0000167-00-011-6-01', codeCfh: '0000167', revision: 'A' });
  addNode('Свеча зажигания 1', 3, engineIgnition, { nomenclature: '412300-0000168-00-011-6-01', codeCfh: '0000168', revision: 'A' });
  addNode('Свеча зажигания 2', 3, engineIgnition, { nomenclature: '412300-0000169-00-011-6-01', codeCfh: '0000169', revision: 'A' });
  addNode('Свеча зажигания 3', 3, engineIgnition, { nomenclature: '412300-0000170-00-011-6-01', codeCfh: '0000170', revision: 'A' });
  addNode('Свеча зажигания 4', 3, engineIgnition, { nomenclature: '412300-0000171-00-011-6-01', codeCfh: '0000171', revision: 'A' });

  // === ТРАНСМИССИЯ ===
  const transmission = addNode('Трансмиссия', 1, car, {
    nomenclature: '412300-0000200-00-011-6-01',
    codeCfh: '0000200',
    revision: 'A',
    note: 'МКПП 6-ступенчатая'
  });

  const clutch = addNode('Сцепление', 2, transmission, {
    nomenclature: '412300-0000201-00-011-6-01',
    codeCfh: '0000201',
    revision: 'A'
  });
  addNode('Диск сцепления', 3, clutch, { nomenclature: '412300-0000202-00-011-6-01', codeCfh: '0000202', revision: 'A' });
  addNode('Нажимной диск', 3, clutch, { nomenclature: '412300-0000203-00-011-6-01', codeCfh: '0000203', revision: 'A' });
  addNode('Подшипник выжимной', 3, clutch, { nomenclature: '412300-0000204-00-011-6-01', codeCfh: '0000204', revision: 'A' });
  addNode('Маховик двойной массы', 3, clutch, { nomenclature: '412300-0000205-00-011-6-01', codeCfh: '0000205', revision: 'A' });

  const gearbox = addNode('Коробка передач', 2, transmission, {
    nomenclature: '412300-0000206-00-011-6-01',
    codeCfh: '0000206',
    revision: 'A'
  });
  addNode('Корпус КПП', 3, gearbox, { nomenclature: '412300-0000207-00-011-6-01', codeCfh: '0000207', revision: 'A' });
  addNode('Вал первичный', 3, gearbox, { nomenclature: '412300-0000208-00-011-6-01', codeCfh: '0000208', revision: 'A' });
  addNode('Вал вторичный', 3, gearbox, { nomenclature: '412300-0000209-00-011-6-01', codeCfh: '0000209', revision: 'A' });
  addNode('Шестерня 1-й передачи', 3, gearbox, { nomenclature: '412300-0000210-00-011-6-01', codeCfh: '0000210', revision: 'A' });
  addNode('Шестерня 2-й передачи', 3, gearbox, { nomenclature: '412300-0000211-00-011-6-01', codeCfh: '0000211', revision: 'A' });
  addNode('Шестерня 3-й передачи', 3, gearbox, { nomenclature: '412300-0000212-00-011-6-01', codeCfh: '0000212', revision: 'A' });
  addNode('Шестерня 4-й передачи', 3, gearbox, { nomenclature: '412300-0000213-00-011-6-01', codeCfh: '0000213', revision: 'A' });
  addNode('Шестерня 5-й передачи', 3, gearbox, { nomenclature: '412300-0000214-00-011-6-01', codeCfh: '0000214', revision: 'A' });
  addNode('Шестерня заднего хода', 3, gearbox, { nomenclature: '412300-0000215-00-011-6-01', codeCfh: '0000215', revision: 'A' });
  addNode('Синхронизаторы', 3, gearbox, { nomenclature: '412300-0000216-00-011-6-01', codeCfh: '0000216', revision: 'A' });
  addNode('Привод переключения', 3, gearbox, { nomenclature: '412300-0000217-00-011-6-01', codeCfh: '0000217', revision: 'A' });
  addNode('Масло КПП', 3, gearbox, { nomenclature: '412300-0000218-00-011-6-01', codeCfh: '0000218', revision: 'A' });

  const driveshaft = addNode('Привод', 2, transmission, {
    nomenclature: '412300-0000219-00-011-6-01',
    codeCfh: '0000219',
    revision: 'A'
  });
  addNode('Приводной вал левый', 3, driveshaft, { nomenclature: '412300-0000220-00-011-6-01', codeCfh: '0000220', revision: 'A' });
  addNode('Приводной вал правый', 3, driveshaft, { nomenclature: '412300-0000221-00-011-6-01', codeCfh: '0000221', revision: 'A' });
  addNode('ШРУС внутренний', 3, driveshaft, { nomenclature: '412300-0000222-00-011-6-01', codeCfh: '0000222', revision: 'A' });
  addNode('ШРУС наружный', 3, driveshaft, { nomenclature: '412300-0000223-00-011-6-01', codeCfh: '0000223', revision: 'A' });
  addNode('Пыльник ШРУС', 3, driveshaft, { nomenclature: '412300-0000224-00-011-6-01', codeCfh: '0000224', revision: 'A' });

  const differential = addNode('Дифференциал', 2, transmission, {
    nomenclature: '412300-0000225-00-011-6-01',
    codeCfh: '0000225',
    revision: 'A'
  });
  addNode('Корпус дифференциала', 3, differential, { nomenclature: '412300-0000226-00-011-6-01', codeCfh: '0000226', revision: 'A' });
  addNode('Сателлиты', 3, differential, { nomenclature: '412300-0000227-00-011-6-01', codeCfh: '0000227', revision: 'A' });
  addNode('Полуосевые шестерни', 3, differential, { nomenclature: '412300-0000228-00-011-6-01', codeCfh: '0000228', revision: 'A' });

  // === ХОДОВАЯ ЧАСТЬ ===
  const chassis = addNode('Ходовая часть', 1, car, {
    nomenclature: '412300-0000300-00-011-6-01',
    codeCfh: '0000300',
    revision: 'A'
  });

  const suspFront = addNode('Подвеска передняя', 2, chassis, {
    nomenclature: '412300-0000301-00-011-6-01',
    codeCfh: '0000301',
    revision: 'A'
  });
  addNode('Стойка амортизатора левая', 3, suspFront, { nomenclature: '412300-0000302-00-011-6-01', codeCfh: '0000302', revision: 'A' });
  addNode('Стойка амортизатора правая', 3, suspFront, { nomenclature: '412300-0000303-00-011-6-01', codeCfh: '0000303', revision: 'A' });
  addNode('Пружина подвески левая', 3, suspFront, { nomenclature: '412300-0000304-00-011-6-01', codeCfh: '0000304', revision: 'A' });
  addNode('Пружина подвески правая', 3, suspFront, { nomenclature: '412300-0000305-00-011-6-01', codeCfh: '0000305', revision: 'A' });
  addNode('Рычаг подвески нижний левый', 3, suspFront, { nomenclature: '412300-0000306-00-011-6-01', codeCfh: '0000306', revision: 'A' });
  addNode('Рычаг подвески нижний правый', 3, suspFront, { nomenclature: '412300-0000307-00-011-6-01', codeCfh: '0000307', revision: 'A' });
  addNode('Шаровая опора', 3, suspFront, { nomenclature: '412300-0000308-00-011-6-01', codeCfh: '0000308', revision: 'A' });
  addNode('Стабилизатор поперечной устойчивости', 3, suspFront, { nomenclature: '412300-0000309-00-011-6-01', codeCfh: '0000309', revision: 'A' });
  addNode('Сlinkи стабилизатора', 3, suspFront, { nomenclature: '412300-0000310-00-011-6-01', codeCfh: '0000310', revision: 'A' });
  addNode('Опора стойки левая', 3, suspFront, { nomenclature: '412300-0000311-00-011-6-01', codeCfh: '0000311', revision: 'A' });
  addNode('Опора стойки правая', 3, suspFront, { nomenclature: '412300-0000312-00-011-6-01', codeCfh: '0000312', revision: 'A' });

  const suspRear = addNode('Подвеска задняя', 2, chassis, {
    nomenclature: '412300-0000313-00-011-6-01',
    codeCfh: '0000313',
    revision: 'A'
  });
  addNode('Амортизатор задний левый', 3, suspRear, { nomenclature: '412300-0000314-00-011-6-01', codeCfh: '0000314', revision: 'A' });
  addNode('Амортизатор задний правый', 3, suspRear, { nomenclature: '412300-0000315-00-011-6-01', codeCfh: '0000315', revision: 'A' });
  addNode('Пружина задняя левая', 3, suspRear, { nomenclature: '412300-0000316-00-011-6-01', codeCfh: '0000316', revision: 'A' });
  addNode('Пружина задняя правая', 3, suspRear, { nomenclature: '412300-0000317-00-011-6-01', codeCfh: '0000317', revision: 'A' });
  addNode('Балка задней подвески', 3, suspRear, { nomenclature: '412300-0000318-00-011-6-01', codeCfh: '0000318', revision: 'A' });
  addNode('Рычаг задний продольный', 3, suspRear, { nomenclature: '412300-0000319-00-011-6-01', codeCfh: '0000319', revision: 'A' });

  const steering = addNode('Рулевое управление', 2, chassis, {
    nomenclature: '412300-0000320-00-011-6-01',
    codeCfh: '0000320',
    revision: 'A'
  });
  addNode('Рулевое колесо', 3, steering, { nomenclature: '412300-0000321-00-011-6-01', codeCfh: '0000321', revision: 'A' });
  addNode('Рулевая колонка', 3, steering, { nomenclature: '412300-0000322-00-011-6-01', codeCfh: '0000322', revision: 'A' });
  addNode('Рулевая рейка', 3, steering, { nomenclature: '412300-0000323-00-011-6-01', codeCfh: '0000323', revision: 'A' });
  addNode('Наконечник рулевой наружный', 3, steering, { nomenclature: '412300-0000324-00-011-6-01', codeCfh: '0000324', revision: 'A' });
  addNode('Наконечник рулевой внутренний', 3, steering, { nomenclature: '412300-0000325-00-011-6-01', codeCfh: '0000325', revision: 'A' });
  addNode('Усилитель руля электрический', 3, steering, { nomenclature: '412300-0000326-00-011-6-01', codeCfh: '0000326', revision: 'A' });
  addNode('Датчик угла поворота', 3, steering, { nomenclature: '412300-0000327-00-011-6-01', codeCfh: '0000327', revision: 'A' });

  const brakes = addNode('Тормозная система', 2, chassis, {
    nomenclature: '412300-0000328-00-011-6-01',
    codeCfh: '0000328',
    revision: 'A'
  });
  addNode('Главный тормозной цилиндр', 3, brakes, { nomenclature: '412300-0000329-00-011-6-01', codeCfh: '0000329', revision: 'A' });
  addNode('Вакуумный усилитель тормозов', 3, brakes, { nomenclature: '412300-0000330-00-011-6-01', codeCfh: '0000330', revision: 'A' });
  addNode('Тормозной суппорт передний левый', 3, brakes, { nomenclature: '412300-0000331-00-011-6-01', codeCfh: '0000331', revision: 'A' });
  addNode('Тормозной суппорт передний правый', 3, brakes, { nomenclature: '412300-0000332-00-011-6-01', codeCfh: '0000332', revision: 'A' });
  addNode('Тормозной суппорт задний левый', 3, brakes, { nomenclature: '412300-0000333-00-011-6-01', codeCfh: '0000333', revision: 'A' });
  addNode('Тормозной суппорт задний правый', 3, brakes, { nomenclature: '412300-0000334-00-011-6-01', codeCfh: '0000334', revision: 'A' });
  addNode('Тормозной диск передний левый', 3, brakes, { nomenclature: '412300-0000335-00-011-6-01', codeCfh: '0000335', revision: 'A' });
  addNode('Тормозной диск передний правый', 3, brakes, { nomenclature: '412300-0000336-00-011-6-01', codeCfh: '0000336', revision: 'A' });
  addNode('Тормозной диск задний левый', 3, brakes, { nomenclature: '412300-0000337-00-011-6-01', codeCfh: '0000337', revision: 'A' });
  addNode('Тормозной диск задний правый', 3, brakes, { nomenclature: '412300-0000338-00-011-6-01', codeCfh: '0000338', revision: 'A' });
  addNode('Колодка тормозная передняя', 3, brakes, { nomenclature: '412300-0000339-00-011-6-01', codeCfh: '0000339', revision: 'A' });
  addNode('Колодка тормозная задняя', 3, brakes, { nomenclature: '412300-0000340-00-011-6-01', codeCfh: '0000340', revision: 'A' });
  addNode('Тормозная магистраль', 3, brakes, { nomenclature: '412300-0000341-00-011-6-01', codeCfh: '0000341', revision: 'A' });
  addNode('Регулятор тормозных усилий', 3, brakes, { nomenclature: '412300-0000342-00-011-6-01', codeCfh: '0000342', revision: 'A' });

  const wheels = addNode('Колёса и шины', 2, chassis, {
    nomenclature: '412300-0000343-00-011-6-01',
    codeCfh: '0000343',
    revision: 'A'
  });
  addNode('Диск колёсный 1', 3, wheels, { nomenclature: '412300-0000344-00-011-6-01', codeCfh: '0000344', revision: 'A' });
  addNode('Диск колёсный 2', 3, wheels, { nomenclature: '412300-0000345-00-011-6-01', codeCfh: '0000345', revision: 'A' });
  addNode('Диск колёсный 3', 3, wheels, { nomenclature: '412300-0000346-00-011-6-01', codeCfh: '0000346', revision: 'A' });
  addNode('Диск колёсный 4', 3, wheels, { nomenclature: '412300-0000347-00-011-6-01', codeCfh: '0000347', revision: 'A' });
  addNode('Шина 1', 3, wheels, { nomenclature: '412300-0000348-00-011-6-01', codeCfh: '0000348', revision: 'A' });
  addNode('Шина 2', 3, wheels, { nomenclature: '412300-0000349-00-011-6-01', codeCfh: '0000349', revision: 'A' });
  addNode('Шина 3', 3, wheels, { nomenclature: '412300-0000350-00-011-6-01', codeCfh: '0000350', revision: 'A' });
  addNode('Шина 4', 3, wheels, { nomenclature: '412300-0000351-00-011-6-01', codeCfh: '0000351', revision: 'A' });
  addNode('Болты колёсные', 3, wheels, { nomenclature: '412300-0000352-00-011-6-01', codeCfh: '0000352', revision: 'A' });
  addNode('Датчик давления в шинах', 3, wheels, { nomenclature: '412300-0000353-00-011-6-01', codeCfh: '0000353', revision: 'A' });

  // === ЭЛЕКТРИКА ===
  const electrical = addNode('Электрооборудование', 1, car, {
    nomenclature: '412300-0000400-00-011-6-01',
    codeCfh: '0000400',
    revision: 'A'
  });

  const elecBattery = addNode('Система питания', 2, electrical, {
    nomenclature: '412300-0000401-00-011-6-01',
    codeCfh: '0000401',
    revision: 'A'
  });
  addNode('Аккумуляторная батарея', 3, elecBattery, { nomenclature: '412300-0000402-00-011-6-01', codeCfh: '0000402', revision: 'A' });
  addNode('Генератор', 3, elecBattery, { nomenclature: '412300-0000403-00-011-6-01', codeCfh: '0000403', revision: 'A' });
  addNode('Стартер', 3, elecBattery, { nomenclature: '412300-0000404-00-011-6-01', codeCfh: '0000404', revision: 'A' });
  addNode('Реле стартера', 3, elecBattery, { nomenclature: '412300-0000405-00-011-6-01', codeCfh: '0000405', revision: 'A' });
  addNode('Провода батареи', 3, elecBattery, { nomenclature: '412300-0000406-00-011-6-01', codeCfh: '0000406', revision: 'A' });

  const elecWiring = addNode('Жгуты проводов', 2, electrical, {
    nomenclature: '412300-0000407-00-011-6-01',
    codeCfh: '0000407',
    revision: 'A'
  });
  addNode('Жгут моторный', 3, elecWiring, { nomenclature: '412300-0000408-00-011-6-01', codeCfh: '0000408', revision: 'A' });
  addNode('Жгут салона', 3, elecWiring, { nomenclature: '412300-0000409-00-011-6-01', codeCfh: '0000409', revision: 'A' });
  addNode('Жгут задний', 3, elecWiring, { nomenclature: '412300-0000410-00-011-6-01', codeCfh: '0000410', revision: 'A' });
  addNode('Жгут дверной левый', 3, elecWiring, { nomenclature: '412300-0000411-00-011-6-01', codeCfh: '0000411', revision: 'A' });
  addNode('Жгут дверной правый', 3, elecWiring, { nomenclature: '412300-0000412-00-011-6-01', codeCfh: '0000412', revision: 'A' });

  const elecFuses = addNode('Блок предохранителей', 2, electrical, {
    nomenclature: '412300-0000413-00-011-6-01',
    codeCfh: '0000413',
    revision: 'A'
  });
  addNode('Блок предохранителей моторный', 3, elecFuses, { nomenclature: '412300-0000414-00-011-6-01', codeCfh: '0000414', revision: 'A' });
  addNode('Блок предохранителей салонный', 3, elecFuses, { nomenclature: '412300-0000415-00-011-6-01', codeCfh: '0000415', revision: 'A' });
  addNode('Предохранитель', 3, elecFuses, { nomenclature: '412300-0000416-00-011-6-01', codeCfh: '0000416', revision: 'A' });
  addNode('Реле', 3, elecFuses, { nomenclature: '412300-0000417-00-011-6-01', codeCfh: '0000417', revision: 'A' });

  const elecEcu = addNode('Блоки управления', 2, electrical, {
    nomenclature: '412300-0000418-00-011-6-01',
    codeCfh: '0000418',
    revision: 'A'
  });
  addNode('ЭБУ двигателя', 3, elecEcu, { nomenclature: '412300-0000419-00-011-6-01', codeCfh: '0000419', revision: 'A' });
  addNode('ЭБУ АКПП', 3, elecEcu, { nomenclature: '412300-0000420-00-011-6-01', codeCfh: '0000420', revision: 'A' });
  addNode('ЭБУ ABS', 3, elecEcu, { nomenclature: '412300-0000421-00-011-6-01', codeCfh: '0000421', revision: 'A' });
  addNode('ЭБУ подушки безопасности', 3, elecEcu, { nomenclature: '412300-0000422-00-011-6-01', codeCfh: '0000422', revision: 'A' });
  addNode('ЭБУ кузова', 3, elecEcu, { nomenclature: '412300-0000423-00-011-6-01', codeCfh: '0000423', revision: 'A' });
  addNode('Блок управления климатом', 3, elecEcu, { nomenclature: '412300-0000424-00-011-6-01', codeCfh: '0000424', revision: 'A' });

  const elecSensors = addNode('Датчики', 2, electrical, {
    nomenclature: '412300-0000425-00-011-6-01',
    codeCfh: '0000425',
    revision: 'A'
  });
  addNode('Датчик скорости', 3, elecSensors, { nomenclature: '412300-0000426-00-011-6-01', codeCfh: '0000426', revision: 'A' });
  addNode('Датчик угла поворота руля', 3, elecSensors, { nomenclature: '412300-0000427-00-011-6-01', codeCfh: '0000427', revision: 'A' });
  addNode('Датчик положения педали газа', 3, elecSensors, { nomenclature: '412300-0000428-00-011-6-01', codeCfh: '0000428', revision: 'A' });
  addNode('Датчик положения педали тормоза', 3, elecSensors, { nomenclature: '412300-0000429-00-011-6-01', codeCfh: '0000429', revision: 'A' });
  addNode('Датчик переключателя передач', 3, elecSensors, { nomenclature: '412300-0000430-00-011-6-01', codeCfh: '0000430', revision: 'A' });
  addNode('Датчик температуры наружного воздуха', 3, elecSensors, { nomenclature: '412300-0000431-00-011-6-01', codeCfh: '0000431', revision: 'A' });

  // === ОПТИКА ===
  const lighting = addNode('Освещение', 1, car, {
    nomenclature: '412300-0000500-00-011-6-01',
    codeCfh: '0000500',
    revision: 'A'
  });
  addNode('Фара передняя левая', 2, lighting, { nomenclature: '412300-0000501-00-011-6-01', codeCfh: '0000501', revision: 'A' });
  addNode('Фара передняя правая', 2, lighting, { nomenclature: '412300-0000502-00-011-6-01', codeCfh: '0000502', revision: 'A' });
  addNode('Противотуманная фара левая', 2, lighting, { nomenclature: '412300-0000503-00-011-6-01', codeCfh: '0000503', revision: 'A' });
  addNode('Противотуманная фара правая', 2, lighting, { nomenclature: '412300-0000504-00-011-6-01', codeCfh: '0000504', revision: 'A' });
  addNode('Блок-фара задняя левая', 2, lighting, { nomenclature: '412300-0000505-00-011-6-01', codeCfh: '0000505', revision: 'A' });
  addNode('Блок-фара задняя правая', 2, lighting, { nomenclature: '412300-0000506-00-011-6-01', codeCfh: '0000506', revision: 'A' });
  addNode('Повторитель поворота боковой', 2, lighting, { nomenclature: '412300-0000507-00-011-6-01', codeCfh: '0000507', revision: 'A' });
  addNode('Подсветка номерного знака', 2, lighting, { nomenclature: '412300-0000508-00-011-6-01', codeCfh: '0000508', revision: 'A' });
  addNode('Светильник салона', 2, lighting, { nomenclature: '412300-0000509-00-011-6-01', codeCfh: '0000509', revision: 'A' });
  addNode('Бардачок подсветка', 2, lighting, { nomenclature: '412300-0000510-00-011-6-01', codeCfh: '0000510', revision: 'A' });

  // === ИНТЕРЬЕР ===
  const interior = addNode('Интерьер', 1, car, {
    nomenclature: '412300-0000600-00-011-6-01',
    codeCfh: '0000600',
    revision: 'A'
  });

  const intDash = addNode('Приборная панель', 2, interior, {
    nomenclature: '412300-0000601-00-011-6-01',
    codeCfh: '0000601',
    revision: 'A'
  });
  addNode('Комбинация приборов', 3, intDash, { nomenclature: '412300-0000602-00-011-6-01', codeCfh: '0000602', revision: 'A' });
  addNode('Центральная консоль', 3, intDash, { nomenclature: '412300-0000603-00-011-6-01', codeCfh: '0000603', revision: 'A' });
  addNode('Мультимедиа дисплей', 3, intDash, { nomenclature: '412300-0000604-00-011-6-01', codeCfh: '0000604', revision: 'A' });
  addNode('Блок управления климатом', 3, intDash, { nomenclature: '412300-0000605-00-011-6-01', codeCfh: '0000605', revision: 'A' });
  addNode('Пепельница', 3, intDash, { nomenclature: '412300-0000606-00-011-6-01', codeCfh: '0000606', revision: 'A' });
  addNode('Панель кнопок', 3, intDash, { nomenclature: '412300-0000607-00-011-6-01', codeCfh: '0000607', revision: 'A' });

  const intSeats = addNode('Сиденья', 2, interior, {
    nomenclature: '412300-0000608-00-011-6-01',
    codeCfh: '0000608',
    revision: 'A'
  });
  addNode('Сиденье водителя', 3, intSeats, { nomenclature: '412300-0000609-00-011-6-01', codeCfh: '0000609', revision: 'A' });
  addNode('Сиденье пассажира', 3, intSeats, { nomenclature: '412300-0000610-00-011-6-01', codeCfh: '0000610', revision: 'A' });
  addNode('Задний диван', 3, intSeats, { nomenclature: '412300-0000611-00-011-6-01', codeCfh: '0000611', revision: 'A' });
  addNode('Подголовник передний левый', 3, intSeats, { nomenclature: '412300-0000612-00-011-6-01', codeCfh: '0000612', revision: 'A' });
  addNode('Подголовник передний правый', 3, intSeats, { nomenclature: '412300-0000613-00-011-6-01', codeCfh: '0000613', revision: 'A' });
  addNode('Подголовник задний левый', 3, intSeats, { nomenclature: '412300-0000614-00-011-6-01', codeCfh: '0000614', revision: 'A' });
  addNode('Подголовник задний центральный', 3, intSeats, { nomenclature: '412300-0000615-00-011-6-01', codeCfh: '0000615', revision: 'A' });
  addNode('Подголовник задний правый', 3, intSeats, { nomenclature: '412300-0000616-00-011-6-01', codeCfh: '0000616', revision: 'A' });
  addNode('Направляющая ремня безопасности', 3, intSeats, { nomenclature: '412300-0000617-00-011-6-01', codeCfh: '0000617', revision: 'A' });

  const intTrim = addNode('Обивка и отделка', 2, interior, {
    nomenclature: '412300-0000618-00-011-6-01',
    codeCfh: '0000618',
    revision: 'A'
  });
  addNode('Обивка двери передней левой', 3, intTrim, { nomenclature: '412300-0000619-00-011-6-01', codeCfh: '0000619', revision: 'A' });
  addNode('Обивка двери передней правой', 3, intTrim, { nomenclature: '412300-0000620-00-011-6-01', codeCfh: '0000620', revision: 'A' });
  addNode('Обивка двери задней левой', 3, intTrim, { nomenclature: '412300-0000621-00-011-6-01', codeCfh: '0000621', revision: 'A' });
  addNode('Обивка двери задней правой', 3, intTrim, { nomenclature: '412300-0000622-00-011-6-01', codeCfh: '0000622', revision: 'A' });
  addNode('Коврики салона', 3, intTrim, { nomenclature: '412300-0000623-00-011-6-01', codeCfh: '0000623', revision: 'A' });
  addNode('Ковёр багажника', 3, intTrim, { nomenclature: '412300-0000624-00-011-6-01', codeCfh: '0000624', revision: 'A' });
  addNode('Обивка потолка', 3, intTrim, { nomenclature: '412300-0000625-00-011-6-01', codeCfh: '0000625', revision: 'A' });
  addNode('Стойки внутренние', 3, intTrim, { nomenclature: '412300-0000626-00-011-6-01', codeCfh: '0000626', revision: 'A' });

  const intSafety = addNode('Системы безопасности', 2, interior, {
    nomenclature: '412300-0000627-00-011-6-01',
    codeCfh: '0000627',
    revision: 'A'
  });
  addNode('Ремень безопасности водителя', 3, intSafety, { nomenclature: '412300-0000628-00-011-6-01', codeCfh: '0000628', revision: 'A' });
  addNode('Ремень безопасности пассажира', 3, intSafety, { nomenclature: '412300-0000629-00-011-6-01', codeCfh: '0000629', revision: 'A' });
  addNode('Ремень безопасности задний левый', 3, intSafety, { nomenclature: '412300-0000630-00-011-6-01', codeCfh: '0000630', revision: 'A' });
  addNode('Ремень безопасности задний правый', 3, intSafety, { nomenclature: '412300-0000631-00-011-6-01', codeCfh: '0000631', revision: 'A' });
  addNode('Подушка безопасности водителя', 3, intSafety, { nomenclature: '412300-0000632-00-011-6-01', codeCfh: '0000632', revision: 'A' });
  addNode('Подушка безопасности пассажира', 3, intSafety, { nomenclature: '412300-0000633-00-011-6-01', codeCfh: '0000633', revision: 'A' });
  addNode('Подушка безопасности боковая левая', 3, intSafety, { nomenclature: '412300-0000634-00-011-6-01', codeCfh: '0000634', revision: 'A' });
  addNode('Подушка безопасности боковая правая', 3, intSafety, { nomenclature: '412300-0000635-00-011-6-01', codeCfh: '0000635', revision: 'A' });
  addNode('Шторка безопасности', 3, intSafety, { nomenclature: '412300-0000636-00-011-6-01', codeCfh: '0000636', revision: 'A' });
  addNode('Датчик удара передний', 3, intSafety, { nomenclature: '412300-0000637-00-011-6-01', codeCfh: '0000637', revision: 'A' });
  addNode('Датчик удара задний', 3, intSafety, { nomenclature: '412300-0000638-00-011-6-01', codeCfh: '0000638', revision: 'A' });
  addNode('Блок управления подушками', 3, intSafety, { nomenclature: '412300-0000639-00-011-6-01', codeCfh: '0000639', revision: 'A' });

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
    nomenclature: '412300-0000700-00-011-6-01',
    codeCfh: '0000700',
    revision: 'A',
    note: 'Варианты комплектации'
  });

  // Двигатели
  const engines = addNode('Варианты двигателей', 1, root, {
    nomenclature: '412300-0000701-00-011-6-01',
    codeCfh: '0000701',
    revision: 'A'
  });

  const e1 = addNode('1.6 MPI 123 л.с.', 2, engines, {
    nomenclature: '412300-0000100-01-011-6-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Базовый двигатель'
  });
  addNode('Блок управления MPI', 3, e1, { nomenclature: '412300-0000101-01-011-6-01', codeCfh: '0000101', revision: 'A' });
  addNode('Впускной коллектор MPI', 3, e1, { nomenclature: '412300-0000102-01-011-6-01', codeCfh: '0000102', revision: 'A' });
  addNode('Дроссель MPI', 3, e1, { nomenclature: '412300-0000103-01-011-6-01', codeCfh: '0000103', revision: 'A' });

  const e2 = addNode('2.0 TDI 150 л.с.', 2, engines, {
    nomenclature: '412300-0000100-02-011-6-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Турбодизель'
  });
  addNode('Турбонагнетатель', 3, e2, { nomenclature: '412300-0000101-02-011-6-01', codeCfh: '0000101', revision: 'A' });
  addNode('Интеркулер', 3, e2, { nomenclature: '412300-0000102-02-011-6-01', codeCfh: '0000102', revision: 'A' });
  addNode('Блок управления TDI', 3, e2, { nomenclature: '412300-0000103-02-011-6-01', codeCfh: '0000103', revision: 'A' });
  addNode('Охлаждение турбо', 3, e2, { nomenclature: '412300-0000104-02-011-6-01', codeCfh: '0000104', revision: 'A' });

  const e3 = addNode('2.5 V6 190 л.с.', 2, engines, {
    nomenclature: '412300-0000100-03-011-6-01',
    codeCfh: '0000100',
    revision: 'A',
    note: 'Бензиновый V6'
  });
  addNode('Блок V6', 3, e3, { nomenclature: '412300-0000101-03-011-6-01', codeCfh: '0000101', revision: 'A' });
  addNode('Распредвал V6', 3, e3, { nomenclature: '412300-0000102-03-011-6-01', codeCfh: '0000102', revision: 'A' });
  addNode('Выпускной коллектор V6', 3, e3, { nomenclature: '412300-0000103-03-011-6-01', codeCfh: '0000103', revision: 'A' });

  // Трансмиссия
  const trans = addNode('Варианты трансмиссии', 1, root, {
    nomenclature: '412300-0000702-00-011-6-01',
    codeCfh: '0000702',
    revision: 'A'
  });

  const t1 = addNode('МКПП 5-ступ.', 2, trans, {
    nomenclature: '412300-0000200-01-011-6-01',
    codeCfh: '0000200',
    revision: 'A'
  });
  addNode('Синхронизатор МКПП', 3, t1, { nomenclature: '412300-0000201-01-011-6-01', codeCfh: '0000201', revision: 'A' });
  addNode('Вилка переключения', 3, t1, { nomenclature: '412300-0000202-01-011-6-01', codeCfh: '0000202', revision: 'A' });

  const t2 = addNode('АКПП 6-ступ.', 2, trans, {
    nomenclature: '412300-0000200-02-011-6-01',
    codeCfh: '0000200',
    revision: 'A'
  });
  addNode('Гидротрансформатор', 3, t2, { nomenclature: '412300-0000201-02-011-6-01', codeCfh: '0000201', revision: 'A' });
  addNode('Блок управления АКПП', 3, t2, { nomenclature: '412300-0000202-02-011-6-01', codeCfh: '0000202', revision: 'A' });
  addNode('Фрикционы АКПП', 3, t2, { nomenclature: '412300-0000203-02-011-6-01', codeCfh: '0000203', revision: 'A' });
  addNode('Масло ATF', 3, t2, { nomenclature: '412300-0000204-02-011-6-01', codeCfh: '0000204', revision: 'A' });

  const t3 = addNode('CVT вариатор', 2, trans, {
    nomenclature: '412300-0000200-03-011-6-01',
    codeCfh: '0000200',
    revision: 'A'
  });
  addNode('Ремень вариатора', 3, t3, { nomenclature: '412300-0000201-03-011-6-01', codeCfh: '0000201', revision: 'A' });
  addNode('Шкив вариатора', 3, t3, { nomenclature: '412300-0000202-03-011-6-01', codeCfh: '0000202', revision: 'A' });

  // Колёса
  const wheels = addNode('Варианты колёс', 1, root, {
    nomenclature: '412300-0000703-00-011-6-01',
    codeCfh: '0000703',
    revision: 'A'
  });

  const w1 = addNode('16" стальные', 2, wheels, {
    nomenclature: '412300-0000343-01-011-6-01',
    codeCfh: '0000343',
    revision: 'A'
  });
  addNode('Диск стальной 16"', 3, w1, { nomenclature: '412300-0000344-01-011-6-01', codeCfh: '0000344', revision: 'A' });
  addNode('Колпак 16"', 3, w1, { nomenclature: '412300-0000345-01-011-6-01', codeCfh: '0000345', revision: 'A' });

  const w2 = addNode('17" легкосплавные', 2, wheels, {
    nomenclature: '412300-0000343-02-011-6-01',
    codeCfh: '0000343',
    revision: 'A'
  });
  addNode('Диск легкосплавный 17"', 3, w2, { nomenclature: '412300-0000344-02-011-6-01', codeCfh: '0000344', revision: 'A' });
  addNode('Шина 205/55 R17', 3, w2, { nomenclature: '412300-0000345-02-011-6-01', codeCfh: '0000345', revision: 'A' });

  const w3 = addNode('18" спортивные', 2, wheels, {
    nomenclature: '412300-0000343-03-011-6-01',
    codeCfh: '0000343',
    revision: 'A'
  });
  addNode('Диск спортивный 18"', 3, w3, { nomenclature: '412300-0000344-03-011-6-01', codeCfh: '0000344', revision: 'A' });
  addNode('Шина 225/45 R18', 3, w3, { nomenclature: '412300-0000345-03-011-6-01', codeCfh: '0000345', revision: 'A' });
  addNode('Датчик давления R18', 3, w3, { nomenclature: '412300-0000346-03-011-6-01', codeCfh: '0000346', revision: 'A' });

  // Опции салона
  const opts = addNode('Опции салона', 1, root, {
    nomenclature: '412300-0000704-00-011-6-01',
    codeCfh: '0000704',
    revision: 'A'
  });

  const o1 = addNode('Базовая', 2, opts, {
    nomenclature: '412300-0000600-01-011-6-01',
    codeCfh: '0000600',
    revision: 'A'
  });
  addNode('Тканевая обивка', 3, o1, { nomenclature: '412300-0000601-01-011-6-01', codeCfh: '0000601', revision: 'A' });
  addNode('Ручной кондиционер', 3, o1, { nomenclature: '412300-0000602-01-011-6-01', codeCfh: '0000602', revision: 'A' });
  addNode('Аудиосистема 4 динамика', 3, o1, { nomenclature: '412300-0000603-01-011-6-01', codeCfh: '0000603', revision: 'A' });
  addNode('Стеклоподъёмники мех.', 3, o1, { nomenclature: '412300-0000604-01-011-6-01', codeCfh: '0000604', revision: 'A' });

  const o2 = addNode('Комфорт', 2, opts, {
    nomenclature: '412300-0000600-02-011-6-01',
    codeCfh: '0000600',
    revision: 'A'
  });
  addNode('Ткань премиум', 3, o2, { nomenclature: '412300-0000601-02-011-6-01', codeCfh: '0000601', revision: 'A' });
  addNode('Климат-контроль', 3, o2, { nomenclature: '412300-0000602-02-011-6-01', codeCfh: '0000602', revision: 'A' });
  addNode('Аудиосистема 8 динамиков', 3, o2, { nomenclature: '412300-0000603-02-011-6-01', codeCfh: '0000603', revision: 'A' });
  addNode('Стеклоподъёмники эл.', 3, o2, { nomenclature: '412300-0000604-02-011-6-01', codeCfh: '0000604', revision: 'A' });
  addNode('Подогрев передних сидений', 3, o2, { nomenclature: '412300-0000605-02-011-6-01', codeCfh: '0000605', revision: 'A' });
  addNode('Кожаный руль', 3, o2, { nomenclature: '412300-0000606-02-011-6-01', codeCfh: '0000606', revision: 'A' });

  const o3 = addNode('Премиум', 2, opts, {
    nomenclature: '412300-0000600-03-011-6-01',
    codeCfh: '0000600',
    revision: 'A'
  });
  addNode('Кожаная обивка', 3, o3, { nomenclature: '412300-0000601-03-011-6-01', codeCfh: '0000601', revision: 'A' });
  addNode('Двухзонный климат', 3, o3, { nomenclature: '412300-0000602-03-011-6-01', codeCfh: '0000602', revision: 'A' });
  addNode('Аудиосистема Harman Kardon', 3, o3, { nomenclature: '412300-0000603-03-011-6-01', codeCfh: '0000603', revision: 'A' });
  addNode('Электропривод задней двери', 3, o3, { nomenclature: '412300-0000604-03-011-6-01', codeCfh: '0000604', revision: 'A' });
  addNode('Подогрев всех сидений', 3, o3, { nomenclature: '412300-0000605-03-011-6-01', codeCfh: '0000605', revision: 'A' });
  addNode('Вентиляция сидений', 3, o3, { nomenclature: '412300-0000606-03-011-6-01', codeCfh: '0000606', revision: 'A' });
  addNode('Панорамная крыша', 3, o3, { nomenclature: '412300-0000607-03-011-6-01', codeCfh: '0000607', revision: 'A' });
  addNode('Проекционный дисплей', 3, o3, { nomenclature: '412300-0000608-03-011-6-01', codeCfh: '0000608', revision: 'A' });

  // Опции безопасности
  const safety = addNode('Опции безопасности', 1, root, {
    nomenclature: '412300-0000705-00-011-6-01',
    codeCfh: '0000705',
    revision: 'A'
  });

  const s1 = addNode('Пакет Safety Basic', 2, safety, {
    nomenclature: '412300-0000627-01-011-6-01',
    codeCfh: '0000627',
    revision: 'A'
  });
  addNode('ESP', 3, s1, { nomenclature: '412300-0000628-01-011-6-01', codeCfh: '0000628', revision: 'A' });
  addNode('ABS', 3, s1, { nomenclature: '412300-0000629-01-011-6-01', codeCfh: '0000629', revision: 'A' });
  addNode('6 подушек', 3, s1, { nomenclature: '412300-0000630-01-011-6-01', codeCfh: '0000630', revision: 'A' });

  const s2 = addNode('Пакет Safety Pro', 2, safety, {
    nomenclature: '412300-0000627-02-011-6-01',
    codeCfh: '0000627',
    revision: 'A'
  });
  addNode('ESP+', 3, s2, { nomenclature: '412300-0000628-02-011-6-01', codeCfh: '0000628', revision: 'A' });
  addNode('8 подушек', 3, s2, { nomenclature: '412300-0000629-02-011-6-01', codeCfh: '0000629', revision: 'A' });
  addNode('Система контроля полосы', 3, s2, { nomenclature: '412300-0000630-02-011-6-01', codeCfh: '0000630', revision: 'A' });
  addNode('Автоматическое торможение', 3, s2, { nomenclature: '412300-0000631-02-011-6-01', codeCfh: '0000631', revision: 'A' });
  addNode('Камера заднего вида', 3, s2, { nomenclature: '412300-0000632-02-011-6-01', codeCfh: '0000632', revision: 'A' });

  // Опции внешние
  const exterior = addNode('Опции внешние', 1, root, {
    nomenclature: '412300-0000706-00-011-6-01',
    codeCfh: '0000706',
    revision: 'A'
  });

  const ex1 = addNode('Хром-пакет', 2, exterior, {
    nomenclature: '412300-0000500-01-011-6-01',
    codeCfh: '0000500',
    revision: 'A'
  });
  addNode('Хром решётка радиатора', 3, ex1, { nomenclature: '412300-0000501-01-011-6-01', codeCfh: '0000501', revision: 'A' });
  addNode('Хром молдинги дверей', 3, ex1, { nomenclature: '412300-0000502-01-011-6-01', codeCfh: '0000502', revision: 'A' });
  addNode('Хром ручки дверей', 3, ex1, { nomenclature: '412300-0000503-01-011-6-01', codeCfh: '0000503', revision: 'A' });

  const ex2 = addNode('SPORТ-пакет', 2, exterior, {
    nomenclature: '412300-0000500-02-011-6-01',
    codeCfh: '0000500',
    revision: 'A'
  });
  addNode('Спортивный бампер', 3, ex2, { nomenclature: '412300-0000501-02-011-6-01', codeCfh: '0000501', revision: 'A' });
  addNode('Спортивная решётка', 3, ex2, { nomenclature: '412300-0000502-02-011-6-01', codeCfh: '0000502', revision: 'A' });
  addNode('Спортивные пороги', 3, ex2, { nomenclature: '412300-0000503-02-011-6-01', codeCfh: '0000503', revision: 'A' });
  addNode('Спортивный спойлер', 3, ex2, { nomenclature: '412300-0000504-02-011-6-01', codeCfh: '0000504', revision: 'A' });

  tree.expanded.add(root);
  tree.expanded.add(engines);
  tree.expanded.add(trans);
  tree.expanded.add(wheels);
  tree.expanded.add(opts);
  tree.expanded.add(safety);
  tree.expanded.add(exterior);

  renderAll();
}
