import React from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button,
  DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Chip, User, Pagination,
} from "@heroui/react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlusIcon = ({ size = 24, ...p }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...p}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <path d="M6 12h12" /><path d="M12 18V6" />
    </g>
  </svg>
);
const VerticalDotsIcon = ({ size = 24, ...p }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...p}>
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
  </svg>
);
const SearchIcon = (p) => (
  <svg fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...p}>
    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronDownIcon = ({ strokeWidth = 1.5, ...p }) => (
  <svg fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...p}>
    <path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
  </svg>
);
const GripIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
    <circle cx="3" cy="2" r="1.3" fill="currentColor" />
    <circle cx="7" cy="2" r="1.3" fill="currentColor" />
    <circle cx="3" cy="7" r="1.3" fill="currentColor" />
    <circle cx="7" cy="7" r="1.3" fill="currentColor" />
    <circle cx="3" cy="12" r="1.3" fill="currentColor" />
    <circle cx="7" cy="12" r="1.3" fill="currentColor" />
  </svg>
);

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

// ─── TABLE STYLES ─────────────────────────────────────────────────────────────
const TABLE_STYLES = `
  .ht-rh {
    position: absolute; top: 0; right: -4px;
    width: 8px; height: 100%; cursor: col-resize; z-index: 40;
    display: flex; align-items: center; justify-content: center;
  }
  .ht-rh::after {
    content: ''; width: 3px; height: 60%; border-radius: 2px;
    background: hsl(var(--heroui-divider));
    transition: background 0.15s, height 0.15s; display: block;
  }
  .ht-rh:hover::after, .ht-rh:active::after {
    background: hsl(var(--heroui-primary)); height: 80%;
  }
  th:hover .ht-grip { opacity: 1 !important; }
  .ht-zones {
    display: flex; align-items: stretch;
    border: 1px solid hsl(var(--heroui-divider));
    border-radius: 12px; overflow: hidden;
  }
  .ht-zone-left {
    flex: 0 0 auto; overflow: hidden;
    border-right: 1px solid hsl(var(--heroui-divider));
    box-shadow: 4px 0 8px -2px rgba(0,0,0,0.10); z-index: 2;
  }
  .ht-zone-mid {
    flex: 1 1 auto; min-width: 0;
    overflow-x: auto; overflow-y: hidden;
  }
  .ht-zone-mid::-webkit-scrollbar { height: 6px; }
  .ht-zone-mid::-webkit-scrollbar-track  { background: hsl(var(--heroui-default-100)); }
  .ht-zone-mid::-webkit-scrollbar-thumb  { background: hsl(var(--heroui-default-300)); border-radius: 3px; }
  .ht-zone-mid::-webkit-scrollbar-thumb:hover { background: hsl(var(--heroui-default-400)); }
  .ht-zone-right {
    flex: 0 0 auto; overflow: hidden;
    border-left: 1px solid hsl(var(--heroui-divider));
    box-shadow: -4px 0 8px -2px rgba(0,0,0,0.08); z-index: 2;
  }
  .ht-zone-left table, .ht-zone-mid table, .ht-zone-right table {
    border-collapse: separate !important; border-spacing: 0 !important;
    table-layout: fixed !important; width: max-content !important;
  }
  .ht-zone-mid table { min-width: 100%; }
  .ht-zone-left table th, .ht-zone-mid table th, .ht-zone-right table th {
    border-right: 1px solid hsl(var(--heroui-divider)) !important;
    border-bottom: 1px solid hsl(var(--heroui-divider)) !important;
  }
  .ht-zone-left table td, .ht-zone-mid table td, .ht-zone-right table td {
    border-right: 1px solid hsl(var(--heroui-divider)) !important;
    border-bottom: 1px solid hsl(var(--heroui-divider)) !important;
  }
  .ht-zone-left table th:last-child, .ht-zone-left table td:last-child,
  .ht-zone-mid table th:last-child, .ht-zone-mid table td:last-child,
  .ht-zone-right table th:last-child, .ht-zone-right table td:last-child {
    border-right: none !important;
  }
  .ht-zone-left table tbody tr:last-child td,
  .ht-zone-mid table tbody tr:last-child td,
  .ht-zone-right table tbody tr:last-child td {
    border-bottom: none !important;
  }
  .ht-zone-left thead tr th, .ht-zone-mid thead tr th, .ht-zone-right thead tr th {
    position: sticky !important; top: 0 !important; z-index: 10;
    background: hsl(var(--heroui-default-100)) !important;
    white-space: nowrap; overflow: visible !important;
  }
  .ht-zone-left tbody tr td, .ht-zone-mid tbody tr td, .ht-zone-right tbody tr td {
    background: hsl(var(--heroui-background));
  }
  .ht-zone-mid::-webkit-scrollbar-corner { background: hsl(var(--heroui-default-100)); }
`;

// ─────────────────────────────────────────────────────────────────────────────
/**
 * HeroUIDataTable — Reusable 3-zone sticky table
 *
 * Props:
 * ┌─────────────────┬──────────────────────────────────────────────────────────────┐
 * │ columns         │ Array of column definitions (see ColumnDef below)            │
 * │ data            │ Array of row objects (each must have a unique `id` field)     │
 * │ searchKey       │ (optional) Row field to search on. Default: first left col   │
 * │ filterOptions   │ (optional) { field, options: [{name, uid}] } for filter btn  │
 * │ onAddNew        │ (optional) callback for "Add New" button click                │
 * │ addNewLabel     │ (optional) string. Default: "Add New"                        │
 * │ totalLabel      │ (optional) string. Default: "Total {n} items"               │
 * │ rowsPerPageOptions │ (optional) number[]. Default: [5, 10, 15]                │
 * │ defaultSortCol  │ (optional) uid of column to sort by default                  │
 * │ defaultSortDir  │ (optional) "ascending" | "descending". Default: "ascending" │
 * └─────────────────┴──────────────────────────────────────────────────────────────┘
 *
 * ColumnDef shape:
 * {
 *   uid:       string           — unique key matching row data field (or "actions")
 *   label:     string           — header display text
 *   zone:      "left" | "mid" | "right"  — which zone to pin to
 *   sortable:  boolean          — whether column is sortable
 *   width:     number           — initial pixel width
 *   render:    (row) => ReactNode  — (optional) custom cell renderer
 *              if omitted, renders row[uid] as plain text
 * }
 *
 * Example usage:
 * ──────────────
 * const COLUMNS = [
 *   { uid: "name",    label: "NAME",    zone: "left",  sortable: true,  width: 240,
 *     render: (row) => <User name={row.name} description={row.email} avatarProps={{ src: row.avatar }} /> },
 *   { uid: "role",    label: "ROLE",    zone: "left",  sortable: true,  width: 160 },
 *   { uid: "status",  label: "STATUS",  zone: "left",  sortable: true,  width: 130,
 *     render: (row) => <Chip color={colorMap[row.status]}>{row.status}</Chip> },
 *   { uid: "team",    label: "TEAM",    zone: "mid",   sortable: false, width: 160 },
 *   { uid: "age",     label: "AGE",     zone: "mid",   sortable: true,  width: 80  },
 *   { uid: "email",   label: "EMAIL",   zone: "mid",   sortable: false, width: 240 },
 *   { uid: "actions", label: "ACTIONS", zone: "right", sortable: false, width: 80,
 *     render: (row) => <ActionsDropdown row={row} /> },
 * ];
 *
 * <HeroUIDataTable
 *   columns={COLUMNS}
 *   data={users}
 *   searchKey="name"
 *   filterOptions={{ field: "status", options: statusOptions }}
 * />
 */
export default function HeroUIDataTable({
  columns = [],
  data = [],
  searchKey,
  filterOptions,       // { field: string, options: [{name, uid}] }
  onAddNew,
  addNewLabel = "Add New",
  totalLabel,
  rowsPerPageOptions = [5, 10, 15],
  defaultSortCol,
  defaultSortDir = "ascending",
}) {

  // ── Derived zone column groups ─────────────────────────────────────────────
  const leftCols  = React.useMemo(() => columns.filter(c => c.zone === "left"),  [columns]);
  const midColsInit = React.useMemo(() => columns.filter(c => c.zone === "mid"), [columns]);
  const rightCols = React.useMemo(() => columns.filter(c => c.zone === "right"), [columns]);

  // Fallback: searchKey defaults to first left column uid
  const resolvedSearchKey = searchKey ?? leftCols[0]?.uid ?? "id";

  // ── Core state ─────────────────────────────────────────────────────────────
  const [filterValue, setFilterValue]     = React.useState("");
  const [selectedKeys, setSelectedKeys]   = React.useState(new Set([]));
  const [activeFilter, setActiveFilter]   = React.useState("all");
  const [rowsPerPage, setRowsPerPage]     = React.useState(rowsPerPageOptions[0]);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: defaultSortCol ?? leftCols[0]?.uid ?? columns[0]?.uid ?? "id",
    direction: defaultSortDir,
  });
  const [page, setPage] = React.useState(1);

  // ── Column widths ──────────────────────────────────────────────────────────
  const [widths, setWidths] = React.useState(
    () => Object.fromEntries(columns.map(c => [c.uid, c.width ?? 120]))
  );

  // ── Middle column order + visibility ──────────────────────────────────────
  const [midOrder, setMidOrder] = React.useState(() => midColsInit.map(c => c.uid));
  const [visibleMidSet, setVisibleMidSet] = React.useState(() => new Set(midColsInit.map(c => c.uid)));

  const midCols = React.useMemo(
    () => midOrder.map(uid => midColsInit.find(c => c.uid === uid)).filter(Boolean),
    [midOrder, midColsInit]
  );
  const visibleMidCols = React.useMemo(
    () => midCols.filter(c => visibleMidSet.has(c.uid)),
    [midCols, visibleMidSet]
  );

  // ── Drag state ─────────────────────────────────────────────────────────────
  const dragSrc     = React.useRef(null);
  const isResizing  = React.useRef(false);
  const [dragOver, setDragOver]       = React.useState(null);
  const [draggingUid, setDraggingUid] = React.useState(null);

  const handleDragStart = React.useCallback((e, uid) => {
    if (isResizing.current) { e.preventDefault(); return; }
    dragSrc.current = uid;
    setDraggingUid(uid);
    const ghost = document.createElement("div");
    ghost.style.cssText = "position:fixed;top:-200px;left:-200px;width:1px;height:1px;opacity:0";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    e.dataTransfer.effectAllowed = "move";
    requestAnimationFrame(() => document.body.removeChild(ghost));
  }, []);

  const handleDragOver  = React.useCallback((e, uid) => {
    e.preventDefault(); e.dataTransfer.dropEffect = "move";
    if (uid !== dragSrc.current) setDragOver(uid);
  }, []);
  const handleDragLeave = React.useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null);
  }, []);
  const handleDrop      = React.useCallback((e, targetUid) => {
    e.preventDefault();
    const srcUid = dragSrc.current;
    if (!srcUid || srcUid === targetUid) {
      dragSrc.current = null; setDragOver(null); setDraggingUid(null); return;
    }
    setMidOrder(prev => {
      const next = [...prev];
      const si = next.indexOf(srcUid), ti = next.indexOf(targetUid);
      if (si < 0 || ti < 0) return prev;
      next.splice(si, 1); next.splice(ti, 0, srcUid);
      return next;
    });
    dragSrc.current = null; setDragOver(null); setDraggingUid(null);
  }, []);
  const handleDragEnd   = React.useCallback(() => {
    dragSrc.current = null; setDragOver(null); setDraggingUid(null);
  }, []);

  // ── Resize ─────────────────────────────────────────────────────────────────
  const handleResizeMouseDown = React.useCallback((e, uid) => {
    e.preventDefault(); e.stopPropagation();
    isResizing.current = true;
    const startX = e.clientX, startW = widths[uid] ?? 100;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) =>
      setWidths(prev => ({ ...prev, [uid]: Math.max(60, startW + (ev.clientX - startX)) }));
    const onUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      isResizing.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [widths]);

  // ── Data processing ────────────────────────────────────────────────────────
  const hasSearch = Boolean(filterValue);

  const filtered = React.useMemo(() => {
    let res = [...data];
    if (hasSearch) {
      const q = filterValue.toLowerCase();
      res = res.filter(row => String(row[resolvedSearchKey] ?? "").toLowerCase().includes(q));
    }
    if (filterOptions && activeFilter !== "all") {
      const selected = Array.from(activeFilter);
      if (selected.length > 0 && selected.length !== (filterOptions.options?.length ?? 0)) {
        res = res.filter(row => selected.includes(String(row[filterOptions.field])));
      }
    }
    return res;
  }, [filterValue, activeFilter, data, resolvedSearchKey, filterOptions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const pageRows = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [page, filtered, rowsPerPage]);

  const sorted = React.useMemo(() =>
    [...pageRows].sort((a, b) => {
      const fa = a[sortDescriptor.column], fb = b[sortDescriptor.column];
      const c = fa < fb ? -1 : fa > fb ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -c : c;
    }),
    [sortDescriptor, pageRows]
  );

  // ── Row-height sync ────────────────────────────────────────────────────────
  const leftRef  = React.useRef(null);
  const midRef   = React.useRef(null);
  const rightRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const sync = () => {
      const zones = [leftRef.current, midRef.current, rightRef.current].filter(Boolean);
      if (zones.length < 2) return;
      const headers = zones.map(z => z.querySelector("thead tr:first-child"));
      const headerH = Math.max(...headers.map(h => h?.getBoundingClientRect().height ?? 0));
      headers.forEach(h => { if (h) h.style.height = headerH + "px"; });
      const bodies = zones.map(z => Array.from(z.querySelectorAll("tbody tr")));
      const rowCount = Math.max(...bodies.map(b => b.length));
      for (let i = 0; i < rowCount; i++) {
        const rowH = Math.max(...bodies.map(b => b[i]?.getBoundingClientRect().height ?? 0));
        bodies.forEach(b => { if (b[i]) b[i].style.height = rowH + "px"; });
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    [leftRef, midRef, rightRef].forEach(r => { if (r.current) ro.observe(r.current); });
    return () => ro.disconnect();
  }, [sorted, widths, midOrder]);

  // ── Cell renderer: uses col.render(row) if provided, else row[col.uid] ─────
  const renderCell = React.useCallback((row, col) => {
    if (typeof col.render === "function") return col.render(row);
    const val = row[col.uid];
    return val == null ? "" : String(val);
  }, []);

  // ── Column header builder ──────────────────────────────────────────────────
  const sharedClassNames = {
    th: ["bg-transparent", "text-default-500", "!px-0"],
    td: [
      "first:group-data-[first=true]/tr:before:rounded-none",
      "last:group-data-[first=true]/tr:before:rounded-none",
      "group-data-[middle=true]/tr:before:rounded-none",
      "first:group-data-[last=true]/tr:before:rounded-none",
      "last:group-data-[last=true]/tr:before:rounded-none",
    ],
  };

  const buildColumnHeader = React.useCallback((col, { draggable = false } = {}) => {
    const isDragOver    = dragOver === col.uid;
    const isDraggingMe  = draggingUid === col.uid;
    return (
      <TableColumn
        key={col.uid}
        align={col.uid === "actions" ? "center" : "start"}
        allowsSorting={col.sortable}
        draggable={draggable}
        onDragStart={draggable ? (e) => handleDragStart(e, col.uid) : undefined}
        onDragOver={draggable ? (e) => handleDragOver(e, col.uid) : undefined}
        onDragLeave={draggable ? handleDragLeave : undefined}
        onDrop={draggable ? (e) => handleDrop(e, col.uid) : undefined}
        onDragEnd={draggable ? handleDragEnd : undefined}
        style={{
          width: widths[col.uid], minWidth: widths[col.uid], maxWidth: widths[col.uid],
          background: isDragOver ? "hsl(var(--heroui-primary-100))" : undefined,
          borderLeft: isDragOver ? "2px solid hsl(var(--heroui-primary))" : undefined,
          opacity: isDraggingMe ? 0.4 : 1,
          overflow: "visible", padding: 0,
          transition: "background 0.1s, opacity 0.12s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", position: "relative", height: "100%", padding: "0 12px", gap: 0 }}>
          {draggable && (
            <span
              style={{ opacity: 0, transition: "opacity 0.12s", cursor: "grab", flexShrink: 0, color: "hsl(var(--heroui-default-400))", marginRight: 5, display: "flex", alignItems: "center" }}
              className="ht-grip"
              title="Drag to reorder"
            >
              <GripIcon />
            </span>
          )}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
            {col.label}
          </span>
          {col.uid !== "actions" && (
            <span
              className="ht-rh"
              title="Drag to resize"
              onMouseDown={(e) => handleResizeMouseDown(e, col.uid)}
              onClick={(e) => e.stopPropagation()}
              onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
            />
          )}
        </div>
      </TableColumn>
    );
  }, [dragOver, draggingUid, widths, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, handleResizeMouseDown]);

  const buildCell = React.useCallback((row, col) => {
    const isDragOver = dragOver === col.uid;
    return (
      <TableCell
        key={col.uid}
        style={{
          width: widths[col.uid], minWidth: widths[col.uid], maxWidth: widths[col.uid],
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          background: isDragOver ? "hsl(var(--heroui-primary-50))" : undefined,
          borderLeft: isDragOver ? "2px solid hsl(var(--heroui-primary))" : undefined,
          transition: "background 0.1s",
        }}
      >
        {renderCell(row, col)}
      </TableCell>
    );
  }, [dragOver, widths, renderCell]);

  // ── Toolbar ────────────────────────────────────────────────────────────────
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value)); setPage(1);
  }, []);
  const onSearchChange = React.useCallback((v) => {
    setFilterValue(v ?? ""); setPage(1);
  }, []);

  const topContent = (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{ base: "w-full sm:max-w-[44%]", inputWrapper: "border-1" }}
          placeholder={`Search by ${resolvedSearchKey}...`}
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {/* Filter dropdown — only rendered if filterOptions is provided */}
          {filterOptions && (
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  {capitalize(filterOptions.field)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label={`${filterOptions.field} filter`}
                closeOnSelect={false}
                selectedKeys={activeFilter}
                selectionMode="multiple"
                onSelectionChange={setActiveFilter}
              >
                {(filterOptions.options ?? []).map(opt => (
                  <DropdownItem key={opt.uid} className="capitalize">{capitalize(opt.name)}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}

          {/* Column visibility — only for scrollable mid columns */}
          {midColsInit.length > 0 && (
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Visible columns"
                closeOnSelect={false}
                selectedKeys={visibleMidSet}
                selectionMode="multiple"
                onSelectionChange={setVisibleMidSet}
              >
                {midColsInit.map(c => (
                  <DropdownItem key={c.uid} className="capitalize">{capitalize(c.label)}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}

          {/* Add New button — only rendered if onAddNew is provided */}
          {onAddNew && (
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon size={18} />}
              size="sm"
              onPress={onAddNew}
            >
              {addNewLabel}
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          {totalLabel ?? `Total ${data.length} items`}
        </span>
        <label className="flex items-center text-default-400 text-small gap-1">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
            defaultValue={rowsPerPageOptions[0]}
          >
            {rowsPerPageOptions.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center mt-2">
      <Pagination
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        isDisabled={hasSearch}
        page={page}
        total={totalPages}
        variant="light"
        onChange={setPage}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${pageRows.length} selected`}
      </span>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{TABLE_STYLES}</style>

      {topContent}

      <div className="ht-zones">

        {/* LEFT zone */}
        {leftCols.length > 0 && (
          <div className="ht-zone-left" ref={leftRef}>
            <Table
              isCompact removeWrapper
              aria-label="Data table - sticky left columns"
              checkboxesProps={{ classNames: { wrapper: "after:bg-foreground after:text-background text-background" } }}
              classNames={sharedClassNames}
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              sortDescriptor={sortDescriptor}
              onSelectionChange={setSelectedKeys}
              onSortChange={setSortDescriptor}
            >
              <TableHeader>
                {leftCols.map(col => buildColumnHeader(col, { draggable: false }))}
              </TableHeader>
              <TableBody emptyContent="No data found" items={sorted}>
                {(item) => (
                  <TableRow key={item.id}>
                    {leftCols.map(col => buildCell(item, col))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* MIDDLE zone — scrollable, reorderable */}
        {visibleMidCols.length > 0 && (
          <div className="ht-zone-mid" ref={midRef}>
            <Table
              isCompact removeWrapper
              aria-label="Data table - scrollable columns"
              classNames={sharedClassNames}
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <TableHeader>
                {visibleMidCols.map(col => buildColumnHeader(col, { draggable: true }))}
              </TableHeader>
              <TableBody emptyContent=" " items={sorted}>
                {(item) => (
                  <TableRow key={item.id}>
                    {visibleMidCols.map(col => buildCell(item, col))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* RIGHT zone — sticky right */}
        {rightCols.length > 0 && (
          <div className="ht-zone-right" ref={rightRef}>
            <Table
              isCompact removeWrapper
              aria-label="Data table - sticky right columns"
              classNames={sharedClassNames}
            >
              <TableHeader>
                {rightCols.map(col => buildColumnHeader(col, { draggable: false }))}
              </TableHeader>
              <TableBody emptyContent=" " items={sorted}>
                {(item) => (
                  <TableRow key={item.id}>
                    {rightCols.map(col => buildCell(item, col))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

      </div>

      {bottomContent}
    </>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE USAGE
// Copy the block below into your app's page/component file.
// ─────────────────────────────────────────────────────────────────────────────

const statusColorMap = { active: "success", paused: "danger", vacation: "warning" };

const statusOptions = [
  { name: "Active",   uid: "active"   },
  { name: "Paused",   uid: "paused"   },
  { name: "Vacation", uid: "vacation" },
];

const COLUMNS = [
  {
    uid: "name", label: "NAME", zone: "left", sortable: true, width: 240,
    render: (row) => (
      <User
        avatarProps={{ radius: "full", size: "sm", src: row.avatar }}
        classNames={{ description: "text-default-500" }}
        description={row.email}
        name={row.name}
      />
    ),
  },
  {
    uid: "role", label: "ROLE", zone: "left", sortable: true, width: 160,
    render: (row) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{row.role}</p>
        <p className="text-bold text-tiny capitalize text-default-500">{row.team}</p>
      </div>
    ),
  },
  {
    uid: "status", label: "STATUS", zone: "left", sortable: true, width: 130,
    render: (row) => (
      <Chip className="capitalize border-none gap-1 text-default-600" color={statusColorMap[row.status]} size="sm" variant="dot">
        {row.status}
      </Chip>
    ),
  },
  { uid: "team",  label: "TEAM",  zone: "mid", sortable: false, width: 160 },
  { uid: "age",   label: "AGE",   zone: "mid", sortable: true,  width: 80  },
  { uid: "email", label: "EMAIL", zone: "mid", sortable: false, width: 240 },
  {
    uid: "actions", label: "ACTIONS", zone: "right", sortable: false, width: 80,
    render: (_row) => (
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon className="text-default-400" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="view">View</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  },
];

const USERS = [
  { id: 1, name: "Tony Reichert",   role: "CEO",        team: "Management",  status: "active",   age: "29", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", email: "tony.reichert@example.com" },
  { id: 2, name: "Zoey Lang",       role: "Tech Lead",  team: "Development", status: "paused",   age: "25", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", email: "zoey.lang@example.com" },
  { id: 3, name: "Jane Fisher",     role: "Sr. Dev",    team: "Development", status: "active",   age: "22", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", email: "jane.fisher@example.com" },
  { id: 4, name: "William Howard",  role: "C.M.",       team: "Marketing",   status: "vacation", age: "28", avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d", email: "william.howard@example.com" },
  { id: 5, name: "Kristen Copper",  role: "S. Manager", team: "Sales",       status: "active",   age: "24", avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d", email: "kristen.cooper@example.com" },
  { id: 6, name: "Brian Kim",       role: "P. Manager", team: "Management",  status: "active",   age: "29", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", email: "brian.kim@example.com" },
  { id: 7, name: "Michael Hunt",    role: "Designer",   team: "Design",      status: "paused",   age: "27", avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d", email: "michael.hunt@example.com" },
  { id: 8, name: "Samantha Brooks", role: "HR Manager", team: "HR",          status: "active",   age: "31", avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d", email: "samantha.brooks@example.com" },
  { id: 9, name: "Frank Harrison",  role: "F. Manager", team: "Finance",     status: "vacation", age: "33", avatar: "https://i.pravatar.cc/150?img=4",                email: "frank.harrison@example.com" },
  { id: 10, name: "Emma Adams",     role: "Ops Manager",team: "Operations",  status: "active",   age: "35", avatar: "https://i.pravatar.cc/150?img=5",                email: "emma.adams@example.com" },
];

export function ExampleUsage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <HeroUIDataTable
        columns={COLUMNS}
        data={USERS}
        searchKey="name"
        filterOptions={{ field: "status", options: statusOptions }}
        onAddNew={() => alert("Add new clicked!")}
        addNewLabel="Add New"
        totalLabel={`Total ${USERS.length} users`}
        defaultSortCol="age"
        defaultSortDir="ascending"
        rowsPerPageOptions={[5, 10, 15]}
      />
    </div>
  );
}