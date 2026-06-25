const ROW_H = 32;
const ATTRS_DEFAULT = [];

let globalAttrs = [...ATTRS_DEFAULT];
let visibleAttrs = new Set(ATTRS_DEFAULT);

let trees = [
  { nodes: new Map(), roots: [], expanded: new Set(), selected: null, flat: [], searchQuery: '' },
  { nodes: new Map(), roots: [], expanded: new Set(), selected: null, flat: [], searchQuery: '' }
];

let nextId = [1, 1];
let clipboard = null;
let ctxTree = -1;
let ctxNodeId = null;

let dragState = null;

const COL_DEFS = [
  { key: 'expand', css: 'cell-expand', thCss: 'th-expand', w: 30 },
  { key: 'level', css: 'cell-level', thCss: 'th-level', w: 40 },
  { key: 'nom', css: 'cell-nom', thCss: 'th-nom', w: 120 },
  { key: 'cfh', css: 'cell-cfh', thCss: 'th-cfh', w: 90 },
  { key: 'rev', css: 'cell-rev', thCss: 'th-rev', w: 50 },
  { key: 'name', css: 'cell-name', thCss: 'th-name', w: 200 },
  { key: 'qty', css: 'cell-qty', thCss: 'th-qty', w: 55 },
  { key: 'na', css: 'cell-na', thCss: 'th-na', w: 40 },
  { key: 'note', css: 'cell-note', thCss: 'th-note', w: 120 },
  { key: 'routeStatus', css: 'cell-route-status', thCss: 'th-route-status', w: 80 },
  { key: 'routeCode', css: 'cell-route-code', thCss: 'th-route-code', w: 80 },
  { key: 'routeName', css: 'cell-route-name', thCss: 'th-route-name', w: 150 }
];
let colWidths = [{}, {}];
COL_DEFS.forEach(c => { colWidths[0][c.key] = c.w; colWidths[1][c.key] = c.w; });

function makeNode(treeIdx, name, level, parentId, data) {
  const id = nextId[treeIdx]++;
  const d = data || {};
  const node = {
    id, name, level, parentId,
    nomenclature: d.nomenclature || '',
    codeCfh: d.codeCfh || '',
    revision: d.revision || '',
    quantity: d.quantity || '',
    note: d.note || '',
    routeStatus: d.routeStatus || '',
    routeCode: d.routeCode || '',
    routeName: d.routeName || '',
    attrs: d.attrs || {},
    _added: d._demo ? false : true,
    _modified: false
  };
  trees[treeIdx].nodes.set(id, node);
  if (parentId === null) trees[treeIdx].roots.push(id);
  return node;
}

function addChild(treeIdx, parentId) {
  const parent = trees[treeIdx].nodes.get(parentId);
  const level = parent ? parent.level + 1 : 0;
  return makeNode(treeIdx, 'Новый узел', level, parentId || null);
}

function addSibling(treeIdx, nodeId) {
  const node = trees[treeIdx].nodes.get(nodeId);
  if (!node) return null;
  return makeNode(treeIdx, 'Новый узел', node.level, node.parentId);
}

function deleteNode(treeIdx, nodeId) {
  const tree = trees[treeIdx];
  const node = tree.nodes.get(nodeId);
  if (!node) return;
  const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
  for (const ch of children) deleteNode(treeIdx, ch.id);
  tree.nodes.delete(nodeId);
  if (node.parentId === null) {
    tree.roots = tree.roots.filter(id => id !== nodeId);
  } else {
    const parent = tree.nodes.get(node.parentId);
    if (parent) {
      const siblings = [...tree.nodes.values()].filter(n => n.parentId === parent.id);
    }
  }
  if (tree.selected === nodeId) tree.selected = null;
}

function moveNode(srcTree, dstTree, nodeId, newParentId) {
  const tree = trees[srcTree];
  const node = tree.nodes.get(nodeId);
  if (!node) return;
  if (srcTree === dstTree && newParentId !== null) {
    let check = newParentId;
    while (check !== null) {
      if (check === nodeId) return;
      const p = tree.nodes.get(check);
      check = p ? p.parentId : null;
    }
  }
  if (srcTree !== dstTree) {
    const cloned = JSON.parse(JSON.stringify(node));
    cloneSubtree(srcTree, dstTree, nodeId, cloned.id, newParentId);
    deleteNode(srcTree, nodeId);
  } else {
    const oldParentId = node.parentId;
    node.parentId = newParentId;
    node._added = true;
    node._modified = false;
    const baseLevel = newParentId !== null ? tree.nodes.get(newParentId).level + 1 : 0;
    rebuildLevels(srcTree, nodeId, baseLevel);
  }
}

function cloneSubtree(srcTree, dstTree, srcId, newId, newParentId) {
  const src = trees[srcTree].nodes.get(srcId);
  if (!src) return;
  const dstParent = newParentId !== null ? trees[dstTree].nodes.get(newParentId) : null;
  const dstId = nextId[dstTree]++;
  const dstLevel = dstParent ? dstParent.level + 1 : 0;
  const newNode = {
    id: dstId, name: src.name, level: dstLevel, parentId: newParentId,
    nomenclature: src.nomenclature,
    codeCfh: src.codeCfh,
    revision: src.revision,
    quantity: src.quantity,
    note: src.note,
    routeStatus: src.routeStatus,
    routeCode: src.routeCode,
    routeName: src.routeName,
    attrs: { ...src.attrs },
    _added: true, _modified: false
  };
  trees[dstTree].nodes.set(dstId, newNode);
  const children = [...trees[srcTree].nodes.values()].filter(n => n.parentId === srcId);
  for (const ch of children) {
    cloneSubtree(srcTree, dstTree, ch.id, dstId, dstId);
  }
}

function cloneSubtreeWithId(srcTree, dstTree, srcId, newId, newParentId) {
  const src = trees[srcTree].nodes.get(srcId);
  if (!src) return;
  const dstParent = newParentId !== null ? trees[dstTree].nodes.get(newParentId) : null;
  const dstLevel = dstParent ? dstParent.level + 1 : 0;
  const dstId = nextId[dstTree]++;
  const newNode = {
    id: dstId, name: src.name, level: dstLevel, parentId: newParentId,
    nomenclature: src.nomenclature,
    codeCfh: src.codeCfh,
    revision: src.revision,
    quantity: src.quantity,
    note: src.note,
    routeStatus: src.routeStatus,
    routeCode: src.routeCode,
    routeName: src.routeName,
    attrs: { ...src.attrs },
    _added: true, _modified: false
  };
  trees[dstTree].nodes.set(dstId, newNode);
  const children = [...trees[srcTree].nodes.values()].filter(n => n.parentId === srcId);
  for (const ch of children) {
    cloneSubtreeWithId(srcTree, dstTree, ch.id, dstId, dstId);
  }
  return dstId;
}

function replaceNode(srcTree, srcId, dstTree, dstId) {
  const src = trees[srcTree].nodes.get(srcId);
  const dst = trees[dstTree].nodes.get(dstId);
  if (!src || !dst) return;
  
  const oldParentId = dst.parentId;
  
  // Find position among siblings before deleting
  const siblings = [...trees[dstTree].nodes.values()].filter(n => n.parentId === oldParentId);
  const oldIndex = siblings.findIndex(n => n.id === dstId);
  const prevSiblingId = oldIndex > 0 ? siblings[oldIndex - 1].id : 0;
  const nextSiblingId = oldIndex < siblings.length - 1 ? siblings[oldIndex + 1].id : prevSiblingId + 1000;
  
  // Delete old node and its children
  deleteNode(dstTree, dstId);
  
  // Calculate a fractional id between siblings for correct ordering
  const midId = prevSiblingId + (nextSiblingId - prevSiblingId) / 2;
  
  // Manually clone with calculated id
  const newNode = {
    id: midId, name: src.name, level: dst.level, parentId: oldParentId,
    nomenclature: src.nomenclature,
    codeCfh: src.codeCfh,
    revision: src.revision,
    quantity: src.quantity,
    note: src.note,
    routeStatus: src.routeStatus,
    routeCode: src.routeCode,
    routeName: src.routeName,
    attrs: { ...src.attrs },
    _added: true, _modified: false
  };
  trees[dstTree].nodes.set(midId, newNode);
  
  // Clone children with proper ids
  const children = [...trees[srcTree].nodes.values()].filter(n => n.parentId === srcId);
  for (const ch of children) {
    cloneSubtreeWithCalculatedId(srcTree, dstTree, ch.id, midId, midId);
  }
  
  // Rebuild levels for the new subtree
  rebuildLevels(dstTree, midId, dst.level);
  
  // Select the new node
  trees[dstTree].selected = midId;
}

function cloneSubtreeWithCalculatedId(srcTree, dstTree, srcId, newParentId, baseId) {
  const src = trees[srcTree].nodes.get(srcId);
  if (!src) return;
  const dstParent = trees[dstTree].nodes.get(newParentId);
  const dstLevel = dstParent ? dstParent.level + 1 : 0;
  const dstId = nextId[dstTree]++;
  const newNode = {
    id: dstId, name: src.name, level: dstLevel, parentId: newParentId,
    nomenclature: src.nomenclature,
    codeCfh: src.codeCfh,
    revision: src.revision,
    quantity: src.quantity,
    note: src.note,
    routeStatus: src.routeStatus,
    routeCode: src.routeCode,
    routeName: src.routeName,
    attrs: { ...src.attrs },
    _added: true, _modified: false
  };
  trees[dstTree].nodes.set(dstId, newNode);
  const children = [...trees[srcTree].nodes.values()].filter(n => n.parentId === srcId);
  for (const ch of children) {
    cloneSubtreeWithCalculatedId(srcTree, dstTree, ch.id, dstId, baseId);
  }
}
      siblingIdx++;
    }
    newNodes.set(id, node);
  }
  
  // If we didn't insert yet (node was last), insert at end
  if (!inserted) {
    newNodes.set(newId, newNode);
  }
  
  trees[dstTree].nodes = newNodes;
  
  // Select the new node
  trees[dstTree].selected = newId;
}

function rebuildLevels(treeIdx, nodeId, baseLevel) {
  const tree = trees[treeIdx];
  const node = tree.nodes.get(nodeId);
  if (!node) return;
  node.level = baseLevel;
  const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
  for (const ch of children) rebuildLevels(treeIdx, ch.id, baseLevel + 1);
}

function buildFlat(treeIdx) {
  const tree = trees[treeIdx];
  const flat = [];
  const query = tree.searchQuery.toLowerCase().trim();

  function matches(node) {
    if (!query) return true;
    if (node.name.toLowerCase().includes(query)) return true;
    if (String(node.level).includes(query)) return true;
    if (node.nomenclature && node.nomenclature.includes(query)) return true;
    if (node.revision && node.revision.toLowerCase().includes(query)) return true;
    if (node.codeCfh && node.codeCfh.toLowerCase().includes(query)) return true;
    if (node.quantity && String(node.quantity).includes(query)) return true;
    for (const a of globalAttrs) {
      const v = node.attrs[a];
      if (v && String(v).toLowerCase().includes(query)) return true;
    }
    return false;
  }

  function walk(nodeId, depth) {
    const node = tree.nodes.get(nodeId);
    if (!node) return;
    const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
    children.sort((a, b) => a.id - b.id);
    const hasChildren = children.length > 0;
    const expanded = tree.expanded.has(nodeId);
    const matched = matches(node);

    if (matched) {
      flat.push({ nodeId, depth, hasChildren, expanded, matched: true });
      if (hasChildren && expanded) {
        for (const ch of children) walk(ch.id, depth + 1);
      }
    } else if (hasChildren && expanded) {
      const startLen = flat.length;
      for (const ch of children) walk(ch.id, depth + 1);
      if (flat.length > startLen) {
        const subtree = flat.splice(startLen);
        flat.push({ nodeId, depth, hasChildren, expanded, matched: false });
        flat.push(...subtree);
      }
    }
  }

  for (const rootId of tree.roots) walk(rootId, 0);
  tree.flat = flat;
}

function renderTree(treeIdx) {
  buildFlat(treeIdx);
  const tree = trees[treeIdx];
  const container = document.getElementById(`tc-${treeIdx}`);
  const viewport = document.getElementById(`tv-${treeIdx}`);
  const totalH = tree.flat.length * ROW_H;
  viewport.style.height = totalH + 'px';

  // Calculate total width of all columns for horizontal scroll
  let totalW = 0;
  for (const k of Object.keys(colWidths[treeIdx])) {
    if (visibleCols.has(k)) totalW += colWidths[treeIdx][k];
  }
  const visibleAttrList = globalAttrs.filter(a => visibleAttrs.has(a));
  for (const a of visibleAttrList) totalW += (colWidths[treeIdx]['attr-' + a] || 100);
  viewport.style.width = totalW + 'px';

  const scrollTop = container.scrollTop;
  const viewH = container.clientHeight;
  const startIdx = Math.max(0, Math.floor(scrollTop / ROW_H) - 5);
  const endIdx = Math.min(tree.flat.length, Math.ceil((scrollTop + viewH) / ROW_H) + 5);

  const searchQuery = tree.searchQuery.toLowerCase().trim();
  const headerH = document.getElementById(`tree-header-${treeIdx}`).offsetHeight;

  let html = '';
  for (let i = startIdx; i < endIdx; i++) {
    const item = tree.flat[i];
    const node = tree.nodes.get(item.nodeId);
    if (!node) continue;
    const y = i * ROW_H;
    const sel = tree.selected === item.nodeId ? ' selected' : '';
    const modClass = node._added ? ' node-added' : (node._modified ? ' node-modified' : '');
    const indent = item.depth * 20;

    let expandIcon = '';
    if (item.hasChildren) {
      expandIcon = item.expanded ? '&#9660;' : '&#9654;';
    }

    let nameHtml = escapeHtml(node.name);
    if (searchQuery) {
      nameHtml = highlightText(node.name, searchQuery);
    }

    let cells = '';
    if (visibleCols.has('expand')) cells += `<div class="cell cell-expand" style="width:${colWidths[treeIdx].expand}px" onclick="event.stopPropagation();toggleExpand(${treeIdx},${item.nodeId})">${expandIcon}</div>`;
    if (visibleCols.has('level')) cells += `<div class="cell cell-level" style="width:${colWidths[treeIdx].level}px">${node.level}</div>`;
    if (visibleCols.has('nom')) cells += `<div class="cell cell-nom" style="width:${colWidths[treeIdx].nom}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'nomenclature')"><span class="node-indent" style="width:${indent}px"></span>${escapeHtml(node.nomenclature || '')}</div>`;
    if (visibleCols.has('cfh')) cells += `<div class="cell cell-cfh" style="width:${colWidths[treeIdx].cfh}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'codeCfh')">${escapeHtml(node.codeCfh || '')}</div>`;
    if (visibleCols.has('rev')) cells += `<div class="cell cell-rev" style="width:${colWidths[treeIdx].rev}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'revision')">${escapeHtml(node.revision || '')}</div>`;
    if (visibleCols.has('name')) cells += `<div class="cell cell-name" style="width:${colWidths[treeIdx].name}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'name')"><span class="node-indent" style="width:${indent}px"></span><span class="cell-name-text" title="${escapeHtml(node.name)}">${nameHtml}</span></div>`;
    if (visibleCols.has('qty')) cells += `<div class="cell cell-qty" style="width:${colWidths[treeIdx].qty}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'quantity')">${escapeHtml(String(node.quantity || ''))}</div>`;
    if (visibleCols.has('na')) cells += `<div class="cell cell-na" style="width:${colWidths[treeIdx].na}px"></div>`;
    if (visibleCols.has('note')) cells += `<div class="cell cell-note" style="width:${colWidths[treeIdx].note}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'note')">${escapeHtml(node.note || '')}</div>`;
    if (visibleCols.has('routeStatus')) cells += `<div class="cell cell-route-status" style="width:${colWidths[treeIdx].routeStatus}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'routeStatus')">${escapeHtml(node.routeStatus || '')}</div>`;
    if (visibleCols.has('routeCode')) cells += `<div class="cell cell-route-code" style="width:${colWidths[treeIdx].routeCode}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'routeCode')">${escapeHtml(node.routeCode || '')}</div>`;
    if (visibleCols.has('routeName')) cells += `<div class="cell cell-route-name" style="width:${colWidths[treeIdx].routeName}px" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'routeName')">${escapeHtml(node.routeName || '')}</div>`;
    for (const a of visibleAttrList) {
      const v = node.attrs[a] || '';
      let vHtml = escapeHtml(String(v));
      if (searchQuery && v && String(v).toLowerCase().includes(searchQuery)) {
        vHtml = highlightText(String(v), searchQuery);
      }
      cells += `<div class="cell cell-attr" ondblclick="startInlineEdit(event,${treeIdx},${item.nodeId},'attr','${a}')" title="${escapeHtml(String(v))}">${vHtml}</div>`;
    }

    html += `<div class="tree-row${sel}${modClass}" style="top:${y}px" data-id="${item.nodeId}" data-tree="${treeIdx}"
      onclick="selectNode(${treeIdx},${item.nodeId})"
      oncontextmenu="showCtx(event,${treeIdx},${item.nodeId})"
      draggable="true"
      ondragstart="onDragStart(event,${treeIdx},${item.nodeId})"
      ondragover="onDragOver(event,${treeIdx},${item.nodeId})"
      ondragleave="onDragLeave(event)"
      ondrop="onDrop(event,${treeIdx},${item.nodeId})"
    >${cells}</div>`;
  }

  viewport.innerHTML = html;
  updateStatus(treeIdx);
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlightText(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return escapeHtml(text);
  const before = escapeHtml(text.substring(0, idx));
  const match = escapeHtml(text.substring(idx, idx + query.length));
  const after = escapeHtml(text.substring(idx + query.length));
  return `${before}<span class="search-highlight">${match}</span>${after}`;
}

let activeInlineEdit = null;

function startInlineEdit(e, treeIdx, nodeId, field, attrName) {
  e.stopPropagation();
  e.preventDefault();
  if (activeInlineEdit) cancelInlineEdit();
  const cell = e.currentTarget;
  const node = trees[treeIdx].nodes.get(nodeId);
  if (!node) return;
  let val = '';
  if (field === 'name') val = node.name;
  else if (field === 'nomenclature') val = node.nomenclature || '';
  else if (field === 'codeCfh') val = node.codeCfh || '';
  else if (field === 'revision') val = node.revision || '';
  else if (field === 'quantity') val = String(node.quantity || '');
  else if (field === 'note') val = node.note || '';
  else if (field === 'routeStatus') val = node.routeStatus || '';
  else if (field === 'routeCode') val = node.routeCode || '';
  else if (field === 'routeName') val = node.routeName || '';
  else val = node.attrs[attrName] || '';
  cell.classList.add('cell-editing');
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.value = val;
  cell.appendChild(inp);
  inp.focus();
  inp.select();
  activeInlineEdit = { cell, inp, treeIdx, nodeId, field, attrName };
  inp.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { commitInlineEdit(); }
    else if (ev.key === 'Escape') { cancelInlineEdit(); }
    else if (ev.key === 'Tab') {
      ev.preventDefault();
      commitInlineEdit();
      focusNextCell(treeIdx, nodeId, field, attrName, ev.shiftKey ? -1 : 1);
    }
  });
  inp.addEventListener('blur', () => { setTimeout(() => { if (activeInlineEdit) commitInlineEdit(); }, 100); });
}

function commitInlineEdit() {
  if (!activeInlineEdit) return;
  const { cell, inp, treeIdx, nodeId, field, attrName } = activeInlineEdit;
  const node = trees[treeIdx].nodes.get(nodeId);
  const newVal = inp.value;
  if (field === 'name') node.name = newVal;
  else if (field === 'nomenclature') node.nomenclature = newVal;
  else if (field === 'codeCfh') node.codeCfh = newVal;
  else if (field === 'revision') node.revision = newVal;
  else if (field === 'quantity') node.quantity = newVal;
  else if (field === 'note') node.note = newVal;
  else if (field === 'routeStatus') node.routeStatus = newVal;
  else if (field === 'routeCode') node.routeCode = newVal;
  else if (field === 'routeName') node.routeName = newVal;
  else node.attrs[attrName] = newVal;
  node._added = false;
  node._modified = true;
  cell.classList.remove('cell-editing');
  activeInlineEdit = null;
  renderTree(treeIdx);
}

function cancelInlineEdit() {
  if (!activeInlineEdit) return;
  const { cell } = activeInlineEdit;
  cell.classList.remove('cell-editing');
  activeInlineEdit = null;
}

function updateClipboardIndicator() {
  const el = document.getElementById('clipboard-indicator');
  const nameEl = document.getElementById('clipboard-name');
  if (clipboard) {
    const tree = trees[clipboard.treeIdx];
    const node = tree.nodes.get(clipboard.nodeId);
    if (node) {
      nameEl.textContent = node.name + (clipboard.action === 'cut' ? ' (вырезано)' : ' (скопировано)');
      el.style.display = '';
      return;
    }
  }
  el.style.display = 'none';
}

function focusNextCell(treeIdx, nodeId, field, attrName, dir) {
  const tree = trees[treeIdx];
  const flatIdx = tree.flat.findIndex(f => f.nodeId === nodeId);
  if (flatIdx === -1) return;
  const visibleAttrList = globalAttrs.filter(a => visibleAttrs.has(a));
  if (field === 'name') {
    if (dir > 0 && visibleAttrList.length > 0) {
      setTimeout(() => {
        const row = document.querySelector(`.tree-row[data-id="${nodeId}"][data-tree="${treeIdx}"]`);
        if (row) {
          const cells = row.querySelectorAll('.cell-attr');
          if (cells.length > 0) cells[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        }
      }, 50);
    }
  } else if (field === 'attr') {
    const ai = visibleAttrList.indexOf(attrName);
    const nextAi = ai + dir;
    if (nextAi >= 0 && nextAi < visibleAttrList.length) {
      const nextAttr = visibleAttrList[nextAi];
      setTimeout(() => {
        const row = document.querySelector(`.tree-row[data-id="${nodeId}"][data-tree="${treeIdx}"]`);
        if (row) {
          const cells = row.querySelectorAll('.cell-attr');
          if (cells[nextAi]) cells[nextAi].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        }
      }, 50);
    } else {
      const nextFlatIdx = flatIdx + dir;
      if (nextFlatIdx >= 0 && nextFlatIdx < tree.flat.length) {
        const nextNodeId = tree.flat[nextFlatIdx].nodeId;
        setTimeout(() => {
          const row = document.querySelector(`.tree-row[data-id="${nextNodeId}"][data-tree="${treeIdx}"]`);
          if (row) {
            if (dir > 0) {
              row.querySelector('.cell-name').dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            } else {
              const lastAi = visibleAttrList.length - 1;
              const cells = row.querySelectorAll('.cell-attr');
              if (cells.length > 0 && lastAi >= 0) cells[Math.min(lastAi, cells.length - 1)].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            }
          }
        }, 50);
      }
    }
  }
}

function onColResizeStart(e) {
  e.preventDefault();
  e.stopPropagation();
  const colKey = e.target.dataset.col;
  const panel = e.target.closest('.panel');
  const treeIdx = panel.id === 'panel-0' ? 0 : 1;
  const startX = e.clientX;
  const startW = e.target.parentElement.offsetWidth;
  const thCell = e.target.parentElement;
  function onMove(ev) {
    const newW = Math.max(30, startW + (ev.clientX - startX));
    thCell.style.width = newW + 'px';
    colWidths[treeIdx][colKey] = newW;
    const cells = panel.querySelectorAll('.cell-' + colKey);
    cells.forEach(el => el.style.width = newW + 'px');
    // Update header total width
    const hdr = document.getElementById(`tree-header-${treeIdx}`);
    let totalW = 0;
    const keys = Object.keys(colWidths[treeIdx]);
    for (const k of keys) totalW += colWidths[treeIdx][k];
    const visibleAttrList = globalAttrs.filter(a => visibleAttrs.has(a));
    for (const a of visibleAttrList) totalW += (colWidths[treeIdx]['attr-' + a] || 100);
    hdr.style.width = totalW + 'px';
    // Update viewport total width
    const viewport = document.getElementById(`tv-${treeIdx}`);
    viewport.style.width = totalW + 'px';
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
}

function renderHeaders(treeIdx) {
  const visibleAttrList = globalAttrs.filter(a => visibleAttrs.has(a));
  const hdr = document.getElementById(`tree-header-${treeIdx}`);
  function rh(key, label) {
    if (!visibleCols.has(key)) return '';
    return `<div class="th ${key}" style="width:${colWidths[treeIdx][key]}px">${label}<div class="resize-handle" data-col="${key}"></div></div>`;
  }
  let html = rh('expand', '') + rh('level', 'Ур.') + rh('nom', 'Номенклатура') + rh('cfh', 'Код ЦФХ') + rh('rev', 'Рев.') + rh('name', 'Наименование') + rh('qty', 'Кол-во') + rh('na', 'n/a') + rh('note', 'Примечание') + rh('routeStatus', 'Маршрут.Статус') + rh('routeCode', 'Маршрут.Код') + rh('routeName', 'Маршрут.Полное наименование');
  for (const a of visibleAttrList) {
    html += `<div class="th th-attr" title="${escapeHtml(a)}">${escapeHtml(a)}<div class="resize-handle" data-col="attr-${a}"></div></div>`;
  }
  hdr.innerHTML = html;

  // Set header width to match viewport
  let totalW = 0;
  for (const k of Object.keys(colWidths[treeIdx])) {
    if (visibleCols.has(k)) totalW += colWidths[treeIdx][k];
  }
  for (const a of visibleAttrList) totalW += (colWidths[treeIdx]['attr-' + a] || 100);
  hdr.style.width = totalW + 'px';

  hdr.querySelectorAll('.resize-handle').forEach(handle => {
    handle.addEventListener('mousedown', onColResizeStart);
  });
}

function renderAttrFilters(treeIdx) {
  const el = document.getElementById(`attr-filter-${treeIdx}`);
  let html = '<span style="font-size:11px;color:var(--fg2);margin-right:4px">Атрибуты:</span>';
  for (const a of globalAttrs) {
    const checked = visibleAttrs.has(a) ? 'checked' : '';
    html += `<label><input type="checkbox" ${checked} onchange="toggleAttr('${a}',this.checked)"> ${escapeHtml(a)}</label>`;
  }
  el.innerHTML = html;
}

function renderAll() {
  for (let i = 0; i < 2; i++) {
    renderHeaders(i);
    renderAttrFilters(i);
    renderTree(i);
  }
}

function updateStatus(treeIdx) {
  const tree = trees[treeIdx];
  const total = tree.nodes.size;
  const shown = tree.flat.length;
  const el = document.getElementById(`status-${treeIdx}`);
  el.textContent = `${total} узлов${tree.searchQuery ? ` (найдено: ${shown})` : ''}`;
}

function onScroll(treeIdx) {
  renderTree(treeIdx);
}

function selectNode(treeIdx, nodeId) {
  const tree = trees[treeIdx];
  const prev = tree.selected;
  tree.selected = nodeId;
  if (prev !== null) {
    const prevRow = document.querySelector(`.tree-row[data-id="${prev}"][data-tree="${treeIdx}"]`);
    if (prevRow) prevRow.classList.remove('selected');
  }
  if (nodeId !== null) {
    const row = document.querySelector(`.tree-row[data-id="${nodeId}"][data-tree="${treeIdx}"]`);
    if (row) row.classList.add('selected');
  }
}

function toggleExpand(treeIdx, nodeId) {
  const tree = trees[treeIdx];
  if (tree.expanded.has(nodeId)) {
    tree.expanded.delete(nodeId);
    collapseDescendants(treeIdx, nodeId);
  } else {
    tree.expanded.add(nodeId);
  }
  renderTree(treeIdx);
}

function collapseDescendants(treeIdx, nodeId) {
  const tree = trees[treeIdx];
  const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
  for (const ch of children) {
    tree.expanded.delete(ch.id);
    collapseDescendants(treeIdx, ch.id);
  }
}

function expandAll(treeIdx) {
  const tree = trees[treeIdx];
  for (const id of tree.nodes.keys()) {
    const hasChildren = [...tree.nodes.values()].some(n => n.parentId === id);
    if (hasChildren) tree.expanded.add(id);
  }
  renderTree(treeIdx);
}

function collapseAll(treeIdx) {
  trees[treeIdx].expanded.clear();
  renderTree(treeIdx);
}

function addRootNode(treeIdx) {
  const node = addChild(treeIdx, null);
  trees[treeIdx].expanded.add(node.id);
  trees[treeIdx].selected = node.id;
  renderTree(treeIdx);
  startRename(treeIdx, node.id);
}

function onSearch(treeIdx) {
  trees[treeIdx].searchQuery = document.getElementById(`search-${treeIdx}`).value;
  renderTree(treeIdx);
}

function toggleAttr(name, checked) {
  if (checked) visibleAttrs.add(name);
  else visibleAttrs.delete(name);
  renderAll();
}

function showCtx(e, treeIdx, nodeId) {
  e.preventDefault();
  e.stopPropagation();
  ctxTree = treeIdx;
  ctxNodeId = nodeId;
  selectNode(treeIdx, nodeId);
  const menu = document.getElementById('ctx-menu');
  menu.style.left = '-9999px';
  menu.style.top = '-9999px';
  menu.classList.add('visible');

  const mw = menu.offsetWidth;
  const mh = menu.offsetHeight;
  let x = e.clientX;
  let y = e.clientY;
  if (x + mw > window.innerWidth) x = window.innerWidth - mw - 4;
  if (y + mh > window.innerHeight) y = window.innerHeight - mh - 4;
  if (x < 0) x = 4;
  if (y < 0) y = 4;
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  const pasteItem = menu.querySelector('[data-action="paste"]');
  pasteItem.style.display = clipboard ? '' : 'none';
  
  const replaceItem = menu.querySelector('[data-action="replace"]');
  replaceItem.style.display = clipboard ? '' : 'none';
}

document.addEventListener('click', () => {
  document.getElementById('ctx-menu').classList.remove('visible');
});

document.getElementById('ctx-menu').addEventListener('click', (e) => {
  const item = e.target.closest('.cm-item');
  if (!item) return;
  const action = item.dataset.action;
  handleCtxAction(action);
  document.getElementById('ctx-menu').classList.remove('visible');
});

function handleCtxAction(action) {
  const treeIdx = ctxTree;
  const nodeId = ctxNodeId;
  const tree = trees[treeIdx];

  switch (action) {
    case 'add-child': {
      const node = addChild(treeIdx, nodeId);
      tree.expanded.add(nodeId);
      tree.selected = node.id;
      renderTree(treeIdx);
      startRename(treeIdx, node.id);
      break;
    }
    case 'add-sibling': {
      const node = addSibling(treeIdx, nodeId);
      if (node) {
        tree.selected = node.id;
        renderTree(treeIdx);
        startRename(treeIdx, node.id);
      }
      break;
    }
    case 'edit':
      openEditModal(treeIdx, nodeId);
      break;
    case 'cut':
      clipboard = { action: 'cut', treeIdx, nodeId };
      updateClipboardIndicator();
      break;
    case 'copy':
      clipboard = { action: 'copy', treeIdx, nodeId };
      updateClipboardIndicator();
      break;
    case 'paste':
      if (!clipboard) break;
      if (clipboard.action === 'cut') {
        moveNode(clipboard.treeIdx, treeIdx, clipboard.nodeId, nodeId);
        trees[treeIdx].expanded.add(nodeId);
      } else {
        cloneSubtree(clipboard.treeIdx, treeIdx, clipboard.nodeId, 0, nodeId);
        trees[treeIdx].expanded.add(nodeId);
      }
      clipboard = null;
      updateClipboardIndicator();
      renderAll();
      break;
    case 'replace':
      if (!clipboard) break;
      replaceNode(clipboard.treeIdx, clipboard.nodeId, treeIdx, nodeId);
      clipboard = null;
      updateClipboardIndicator();
      renderAll();
      break;
    case 'expand-children':
      expandSubtree(treeIdx, nodeId);
      renderTree(treeIdx);
      break;
    case 'collapse-children':
      collapseDescendants(treeIdx, nodeId);
      tree.expanded.delete(nodeId);
      renderTree(treeIdx);
      break;
    case 'delete':
      if (confirm('Удалить узел и все подузлы?')) {
        deleteNode(treeIdx, nodeId);
        renderTree(treeIdx);
      }
      break;
  }
}

function expandSubtree(treeIdx, nodeId) {
  const tree = trees[treeIdx];
  tree.expanded.add(nodeId);
  const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
  for (const ch of children) expandSubtree(treeIdx, ch.id);
}

function openEditModal(treeIdx, nodeId) {
  const node = trees[treeIdx].nodes.get(nodeId);
  if (!node) return;
  document.getElementById('modal-title').textContent = `Редактирование: ${node.name}`;

  let html = '';
  html += `<label>Номенклатура</label><input type="text" id="m-nom" value="${escapeHtml(node.nomenclature || '')}">`;
  html += `<label>Код ЦФХ</label><input type="text" id="m-codeCfh" value="${escapeHtml(node.codeCfh || '')}">`;
  html += `<label>Ревизия</label><input type="text" id="m-revision" value="${escapeHtml(node.revision || '')}">`;
  html += `<label>Наименование</label><input type="text" id="m-name" value="${escapeHtml(node.name)}">`;
  html += `<label>Количество</label><input type="text" id="m-quantity" value="${escapeHtml(String(node.quantity || ''))}">`;
  html += `<label>Примечание</label><input type="text" id="m-note" value="${escapeHtml(node.note || '')}">`;
  html += `<label>Маршрут.Статус</label><input type="text" id="m-routeStatus" value="${escapeHtml(node.routeStatus || '')}">`;
  html += `<label>Маршрут.Код</label><input type="text" id="m-routeCode" value="${escapeHtml(node.routeCode || '')}">`;
  html += `<label>Маршрут.Полное наименование</label><input type="text" id="m-routeName" value="${escapeHtml(node.routeName || '')}">`;
  for (const a of globalAttrs) {
    const v = node.attrs[a] || '';
    html += `<label>${escapeHtml(a)}</label><input type="text" id="m-attr-${a.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g,'_')}" value="${escapeHtml(String(v))}">`;
  }

  document.getElementById('modal-fields').innerHTML = html;
  document.getElementById('node-modal').classList.add('visible');
  document.getElementById('node-modal').dataset.treeIdx = treeIdx;
  document.getElementById('node-modal').dataset.nodeId = nodeId;
  document.getElementById('m-name').focus();
  document.getElementById('m-name').select();
}

function saveModal() {
  const overlay = document.getElementById('node-modal');
  const treeIdx = parseInt(overlay.dataset.treeIdx);
  const nodeId = parseInt(overlay.dataset.nodeId);
  const node = trees[treeIdx].nodes.get(nodeId);
  if (!node) return;

  node.nomenclature = document.getElementById('m-nom').value;
  node.codeCfh = document.getElementById('m-codeCfh').value;
  node.revision = document.getElementById('m-revision').value;
  node.name = document.getElementById('m-name').value || 'Без названия';
  node.quantity = document.getElementById('m-quantity').value;
  node.note = document.getElementById('m-note').value;
  node.routeStatus = document.getElementById('m-routeStatus').value;
  node.routeCode = document.getElementById('m-routeCode').value;
  node.routeName = document.getElementById('m-routeName').value;
  node._added = false;
  node._modified = true;

  for (const a of globalAttrs) {
    const el = document.getElementById(`m-attr-${a.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g,'_')}`);
    if (el) node.attrs[a] = el.value;
  }

  closeModal();
  renderTree(treeIdx);
}

function adjustDescendantLevels(treeIdx, nodeId, diff) {
  const tree = trees[treeIdx];
  const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
  for (const ch of children) {
    ch.level += diff;
    adjustDescendantLevels(treeIdx, ch.id, diff);
  }
}

function closeModal() {
  document.getElementById('node-modal').classList.remove('visible');
}

function startRename(treeIdx, nodeId) {
  openEditModal(treeIdx, nodeId);
}

function addAttr() {
  const name = document.getElementById('new-attr-name').value.trim();
  if (!name || globalAttrs.includes(name)) return;
  globalAttrs.push(name);
  visibleAttrs.add(name);
  document.getElementById('new-attr-name').value = '';
  renderAll();
  renderAttrManager();
}

function removeAttr(name) {
  if (!confirm(`Удалить атрибут "${name}"?`)) return;
  globalAttrs = globalAttrs.filter(a => a !== name);
  visibleAttrs.delete(name);
  renderAll();
  renderAttrManager();
}

function renameAttr(oldName) {
  const newName = prompt('Новое название:', oldName);
  if (!newName || newName === oldName || globalAttrs.includes(newName)) return;
  const idx = globalAttrs.indexOf(oldName);
  globalAttrs[idx] = newName;
  if (visibleAttrs.has(oldName)) {
    visibleAttrs.delete(oldName);
    visibleAttrs.add(newName);
  }
  for (const tree of trees) {
    for (const node of tree.nodes.values()) {
      if (node.attrs[oldName] !== undefined) {
        node.attrs[newName] = node.attrs[oldName];
        delete node.attrs[oldName];
      }
    }
  }
  renderAll();
  renderAttrManager();
}

function showAttrManager() {
  renderAttrManager();
  document.getElementById('attr-modal').classList.add('visible');
}

function renderAttrManager() {
  let html = '';
  for (const a of globalAttrs) {
    html += `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-size:12px">${escapeHtml(a)}</span>
      <button onclick="renameAttr('${escapeHtml(a)}')" style="padding:2px 8px;font-size:11px">Переименовать</button>
      <button onclick="removeAttr('${escapeHtml(a)}')" class="danger" style="padding:2px 8px;font-size:11px;border-color:var(--danger)">Удалить</button>
    </div>`;
  }
  document.getElementById('attr-list').innerHTML = html;
}

function closeAttrModal() {
  document.getElementById('attr-modal').classList.remove('visible');
}

const COL_LABELS = {
  expand: 'Разворот',
  level: 'Уровень',
  nom: 'Номенклатура',
  cfh: 'Код ЦФХ',
  rev: 'Ревизия',
  name: 'Наименование',
  qty: 'Кол-во',
  na: 'n/a',
  note: 'Примечание',
  routeStatus: 'Маршрут.Статус',
  routeCode: 'Маршрут.Код',
  routeName: 'Маршрут.Полное наименование'
};

let visibleCols = new Set(Object.keys(COL_LABELS));

function showColManager() {
  renderColManager();
  document.getElementById('col-modal').classList.add('visible');
}

function renderColManager() {
  let html = '';
  for (const [key, label] of Object.entries(COL_LABELS)) {
    const checked = visibleCols.has(key) ? 'checked' : '';
    html += `<label>
      <input type="checkbox" ${checked} onchange="toggleCol('${key}',this.checked)">
      <span>${label}</span>
    </label>`;
  }
  document.getElementById('col-list').innerHTML = html;
}

function toggleCol(key, checked) {
  if (checked) visibleCols.add(key);
  else visibleCols.delete(key);
  renderAll();
}

function closeColModal() {
  document.getElementById('col-modal').classList.remove('visible');
}

function clearAll(treeIdx) {
  if (!confirm(`Очистить дерево ${treeIdx + 1}?`)) return;
  trees[treeIdx].nodes.clear();
  trees[treeIdx].roots = [];
  trees[treeIdx].expanded.clear();
  trees[treeIdx].selected = null;
  renderTree(treeIdx);
}

function importXlsx(treeIdx) {
  const input = document.getElementById('file-input');
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const wb = XLSX.read(ev.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws);
        loadXlsxData(treeIdx, data);
      } catch (err) {
        alert('Ошибка чтения xlsx: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
    input.value = '';
  };
  input.click();
}

function loadXlsxData(treeIdx, data) {
  const tree = trees[treeIdx];
  tree.nodes.clear();
  tree.roots = [];
  tree.expanded.clear();
  tree.selected = null;
  nextId[treeIdx] = 1;

  const cols = data.length > 0 ? Object.keys(data[0]) : [];
  const fixedCols = ['№ п/п', 'Уровень', 'Номенклатура', 'Код ЦФХ', 'Ревизия', 'Наименование', 'Кол-во', 'N/A', 'Примечание', 'Маршрут.Статус', 'Маршрут.Код', 'Маршрут.Полное наименование'];
  const attrCols = cols.filter(c => !fixedCols.includes(c));

  for (const a of attrCols) {
    if (!globalAttrs.includes(a)) {
      globalAttrs.push(a);
      visibleAttrs.add(a);
    }
  }

  const parentStack = [];

  for (const row of data) {
    const level = parseInt(row['Уровень']) || 0;
    const name = row['Наименование'] || 'Без названия';
    const nomenclature = row['Номенклатура'] || '';
    const codeCfh = row['Код ЦФХ'] || '';
    const revision = row['Ревизия'] || '';
    const quantity = row['Кол-во'] || '';
    const note = row['Примечание'] || '';
    const routeStatus = row['Маршрут.Статус'] || '';
    const routeCode = row['Маршрут.Код'] || '';
    const routeName = row['Маршрут.Полное наименование'] || '';

    while (parentStack.length > 0 && parentStack[parentStack.length - 1].level >= level) {
      parentStack.pop();
    }
    const parentId = parentStack.length > 0 ? parentStack[parentStack.length - 1].id : null;

    const attrs = {};
    for (const a of attrCols) {
      if (row[a] !== undefined && row[a] !== null && row[a] !== '') attrs[a] = row[a];
    }

    const node = makeNode(treeIdx, String(name), level, parentId, { nomenclature, codeCfh, revision, quantity, note, routeStatus, routeCode, routeName, attrs, _demo: true });
    parentStack.push({ id: node.id, level });
  }

  for (const rootId of tree.roots) {
    tree.expanded.add(rootId);
    const children1 = [...tree.nodes.values()].filter(n => n.parentId === rootId);
    for (const ch of children1) tree.expanded.add(ch.id);
  }
  renderAll();
}

function exportXlsx(treeIdx) {
  const tree = trees[treeIdx];
  const rows = [];

  function walk(nodeId) {
    const node = tree.nodes.get(nodeId);
    if (!node) return;
    const row = {
      'Уровень': node.level,
      'Номенклатура': node.nomenclature || '',
      'Код ЦФХ': node.codeCfh || '',
      'Ревизия': node.revision || '',
      'Наименование': node.name,
      'Кол-во': node.quantity || '',
      'N/A': '',
      'Примечание': node.note || '',
      'Маршрут.Статус': node.routeStatus || '',
      'Маршрут.Код': node.routeCode || '',
      'Маршрут.Полное наименование': node.routeName || ''
    };
    for (const a of globalAttrs) {
      row[a] = node.attrs[a] || '';
    }
    rows.push(row);
    const children = [...tree.nodes.values()].filter(n => n.parentId === nodeId);
    for (const ch of children) walk(ch.id);
  }

  for (const rootId of tree.roots) walk(rootId);

  if (rows.length === 0) {
    alert('Дерево пустое');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Дерево');
  XLSX.writeFile(wb, `tree-${treeIdx + 1}.xlsx`);
}

function onDragStart(e, treeIdx, nodeId) {
  dragState = { srcTree: treeIdx, nodeId };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', String(nodeId));
  e.target.style.opacity = '0.4';
  setTimeout(() => { if (e.target) e.target.style.opacity = ''; }, 0);
}

function onDragOver(e, treeIdx, nodeId) {
  e.preventDefault();
  if (!dragState) return;
  e.dataTransfer.dropEffect = 'move';

  const row = e.target.closest('.tree-row');
  if (!row) return;

  document.querySelectorAll('.tree-row.drag-over').forEach(r => r.classList.remove('drag-over'));
  row.classList.add('drag-over');
}

function onDragLeave(e) {
  const row = e.target.closest('.tree-row');
  if (row) row.classList.remove('drag-over');
}

function onDrop(e, treeIdx, nodeId) {
  e.preventDefault();
  document.querySelectorAll('.tree-row.drag-over').forEach(r => r.classList.remove('drag-over'));
  if (!dragState) return;

  const { srcTree, nodeId: srcId } = dragState;
  if (srcId === nodeId) { dragState = null; return; }

  moveNode(srcTree, treeIdx, srcId, nodeId);
  trees[treeIdx].expanded.add(nodeId);
  dragState = null;
  renderAll();
}

document.addEventListener('dragend', () => {
  dragState = null;
  document.querySelectorAll('.tree-row.drag-over').forEach(r => r.classList.remove('drag-over'));
});

// Split handle
(function() {
  const handle = document.getElementById('split-handle');
  const panels = document.getElementById('panels');
  const panel0 = document.getElementById('panel-0');
  let dragging = false;

  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    handle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = panels.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(20, Math.min(80, pct));
    panel0.style.flex = 'none';
    panel0.style.width = clamped + '%';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    for (let i = 0; i < 2; i++) renderTree(i);
  });
})();

// Init
loadDemoData();
loadDemoData2();
