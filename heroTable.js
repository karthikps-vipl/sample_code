
import React from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button,
  DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
  Chip, User, Pagination,
} from "@heroui/react";

// ─── Static data ───────────────────────────────────────────────────────────────
export const statusOptions = [
  { name: "Active",   uid: "active"   },
  { name: "Paused",   uid: "paused"   },
  { name: "Vacation", uid: "vacation" },
];

export const users = [
  { id:1,  name:"Tony Reichert",   role:"CEO",           team:"Management",            status:"active",   age:"29", avatar:"https://i.pravatar.cc/150?u=a042581f4e29026024d", email:"tony.reichert@example.com"   },
  { id:2,  name:"Zoey Lang",       role:"Tech Lead",     team:"Development",           status:"paused",   age:"25", avatar:"https://i.pravatar.cc/150?u=a042581f4e29026704d", email:"zoey.lang@example.com"        },
  { id:3,  name:"Jane Fisher",     role:"Sr. Dev",       team:"Development",           status:"active",   age:"22", avatar:"https://i.pravatar.cc/150?u=a04258114e29026702d", email:"jane.fisher@example.com"      },
  { id:4,  name:"William Howard",  role:"C.M.",          team:"Marketing",             status:"vacation", age:"28", avatar:"https://i.pravatar.cc/150?u=a048581f4e29026701d", email:"william.howard@example.com"   },
  { id:5,  name:"Kristen Copper",  role:"S. Manager",    team:"Sales",                 status:"active",   age:"24", avatar:"https://i.pravatar.cc/150?u=a092581d4ef9026700d", email:"kristen.cooper@example.com"   },
  { id:6,  name:"Brian Kim",       role:"P. Manager",    team:"Management",            status:"active",   age:"29", avatar:"https://i.pravatar.cc/150?u=a042581f4e29026024d", email:"brian.kim@example.com"        },
  { id:7,  name:"Michael Hunt",    role:"Designer",      team:"Design",                status:"paused",   age:"27", avatar:"https://i.pravatar.cc/150?u=a042581f4e29027007d", email:"michael.hunt@example.com"     },
  { id:8,  name:"Samantha Brooks", role:"HR Manager",    team:"HR",                    status:"active",   age:"31", avatar:"https://i.pravatar.cc/150?u=a042581f4e27027008d", email:"samantha.brooks@example.com"  },
  { id:9,  name:"Frank Harrison",  role:"F. Manager",    team:"Finance",               status:"vacation", age:"33", avatar:"https://i.pravatar.cc/150?img=4",                  email:"frank.harrison@example.com"   },
  { id:10, name:"Emma Adams",      role:"Ops Manager",   team:"Operations",            status:"active",   age:"35", avatar:"https://i.pravatar.cc/150?img=5",                  email:"emma.adams@example.com"       },
  { id:11, name:"Brandon Stevens", role:"Jr. Dev",       team:"Development",           status:"active",   age:"22", avatar:"https://i.pravatar.cc/150?img=8",                  email:"brandon.stevens@example.com"  },
  { id:12, name:"Megan Richards",  role:"P. Manager",    team:"Product",               status:"paused",   age:"28", avatar:"https://i.pravatar.cc/150?img=10",                 email:"megan.richards@example.com"   },
  { id:13, name:"Oliver Scott",    role:"S. Manager",    team:"Security",              status:"active",   age:"37", avatar:"https://i.pravatar.cc/150?img=12",                 email:"oliver.scott@example.com"     },
  { id:14, name:"Grace Allen",     role:"M. Specialist", team:"Marketing",             status:"active",   age:"30", avatar:"https://i.pravatar.cc/150?img=16",                 email:"grace.allen@example.com"      },
  { id:15, name:"Noah Carter",     role:"IT Specialist", team:"I. Technology",         status:"paused",   age:"31", avatar:"https://i.pravatar.cc/150?img=15",                 email:"noah.carter@example.com"      },
  { id:16, name:"Ava Perez",       role:"Manager",       team:"Sales",                 status:"active",   age:"29", avatar:"https://i.pravatar.cc/150?img=20",                 email:"ava.perez@example.com"        },
  { id:17, name:"Liam Johnson",    role:"Data Analyst",  team:"Analysis",              status:"active",   age:"28", avatar:"https://i.pravatar.cc/150?img=33",                 email:"liam.johnson@example.com"     },
  { id:18, name:"Sophia Taylor",   role:"QA Analyst",    team:"Testing",               status:"active",   age:"27", avatar:"https://i.pravatar.cc/150?img=29",                 email:"sophia.taylor@example.com"    },
  { id:19, name:"Lucas Harris",    role:"Administrator", team:"Information Technology",status:"paused",   age:"32", avatar:"https://i.pravatar.cc/150?img=50",                 email:"lucas.harris@example.com"     },
  { id:20, name:"Mia Robinson",    role:"Coordinator",   team:"Operations",            status:"active",   age:"26", avatar:"https://i.pravatar.cc/150?img=45",                 email:"mia.robinson@example.com"     },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlusIcon = ({ size = 24, ...p }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...p}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <path d="M6 12h12"/><path d="M12 18V6"/>
    </g>
  </svg>
);
const VerticalDotsIcon = ({ size = 24, ...p }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...p}>
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
  </svg>
);
const SearchIcon = (p) => (
  <svg fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...p}>
    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronDownIcon = ({ strokeWidth = 1.5, ...p }) => (
  <svg fill="none" height="1em" viewBox="0 0 24 24" width="1em" {...p}>
    <path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}/>
  </svg>
);
const GripIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
    <circle cx="3" cy="2"  r="1.3" fill="currentColor"/>
    <circle cx="7" cy="2"  r="1.3" fill="currentColor"/>
    <circle cx="3" cy="7"  r="1.3" fill="currentColor"/>
    <circle cx="7" cy="7"  r="1.3" fill="currentColor"/>
    <circle cx="3" cy="12" r="1.3" fill="currentColor"/>
    <circle cx="7" cy="12" r="1.3" fill="currentColor"/>
  </svg>
);

// ─── Zone column definitions ──────────────────────────────────────────────────
// LEFT_COLS: always sticky (rendered in left zone)
// MID_COLS_INIT: scrollable (rendered in middle zone, reorderable)
// RIGHT_COLS: always sticky right (rendered in right zone)

const LEFT_COLS = [
  // Note: the selection column is HeroUI's built-in — we only declare the data cols here.
  // The checkbox is injected automatically by selectionMode="multiple".
  { uid: "name",   label: "NAME",   sortable: true,  w: 240 },
  { uid: "role",   label: "ROLE",   sortable: true,  w: 160 },
  { uid: "status", label: "STATUS", sortable: true,  w: 130 },
];

const MID_COLS_INIT = [
  { uid: "team",  label: "TEAM",  sortable: false, w: 160 },
  { uid: "age",   label: "AGE",   sortable: true,  w: 80  },
  { uid: "email", label: "EMAIL", sortable: false, w: 240 },
];

const RIGHT_COLS = [
  { uid: "actions", label: "ACTIONS", sortable: false, w: 80 },
];

const statusColorMap = { active: "success", paused: "danger", vacation: "warning" };

// ─── Main component ────────────────────────────────────────────────────────────
export default function App() {

  // ── Shared table state ───────────────────────────────────────────────────────
  const [filterValue,    setFilterValue]    = React.useState("");
  const [selectedKeys,   setSelectedKeys]   = React.useState(new Set([]));
  const [statusFilter,   setStatusFilter]   = React.useState("all");
  const [rowsPerPage,    setRowsPerPage]     = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({ column: "age", direction: "ascending" });
  const [page,           setPage]           = React.useState(1);

  // ── Column widths (shared across all zones) ──────────────────────────────────
  const allCols = [...LEFT_COLS, ...MID_COLS_INIT, ...RIGHT_COLS];
  const [widths, setWidths] = React.useState(
    () => Object.fromEntries(allCols.map(c => [c.uid, c.w]))
  );

  // ── Middle zone column order (drag-and-drop reorder only in middle zone) ─────
  const [midOrder, setMidOrder] = React.useState(() => MID_COLS_INIT.map(c => c.uid));
  const midCols = React.useMemo(
    () => midOrder.map(uid => MID_COLS_INIT.find(c => c.uid === uid)),
    [midOrder]
  );

  // ── Drag state (middle zone only) ───────────────────────────────────────────
  const dragSrc      = React.useRef(null);
  const isResizing   = React.useRef(false);
  const [dragOver,   setDragOver]   = React.useState(null);
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

  const handleDragOver = React.useCallback((e, uid) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (uid !== dragSrc.current) setDragOver(uid);
  }, []);

  const handleDragLeave = React.useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null);
  }, []);

  const handleDrop = React.useCallback((e, targetUid) => {
    e.preventDefault();
    const srcUid = dragSrc.current;
    if (!srcUid || srcUid === targetUid) {
      dragSrc.current = null; setDragOver(null); setDraggingUid(null); return;
    }
    setMidOrder(prev => {
      const next = [...prev];
      const si = next.indexOf(srcUid);
      const ti = next.indexOf(targetUid);
      if (si < 0 || ti < 0) return prev;
      next.splice(si, 1);
      next.splice(ti, 0, srcUid);
      return next;
    });
    dragSrc.current = null; setDragOver(null); setDraggingUid(null);
  }, []);

  const handleDragEnd = React.useCallback(() => {
    dragSrc.current = null; setDragOver(null); setDraggingUid(null);
  }, []);

  // ── Resize ───────────────────────────────────────────────────────────────────
  const handleResizeMouseDown = React.useCallback((e, uid) => {
    e.preventDefault(); e.stopPropagation();
    isResizing.current = true;
    const startX = e.clientX;
    const startW = widths[uid] ?? 100;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) => {
      setWidths(prev => ({ ...prev, [uid]: Math.max(60, startW + (ev.clientX - startX)) }));
    };
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

  // ── Data processing ───────────────────────────────────────────────────────────
  const hasSearch = Boolean(filterValue);

  const filtered = React.useMemo(() => {
    let res = [...users];
    if (hasSearch) res = res.filter(u => u.name.toLowerCase().includes(filterValue.toLowerCase()));
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      res = res.filter(u => Array.from(statusFilter).includes(u.status));
    }
    return res;
  }, [filterValue, statusFilter]);

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

  // ── Row-height sync: make every row the same height across all 3 zone tables ─
  // We read heights from left zone (widest cells) and apply to mid + right.
  const leftRef  = React.useRef(null);
  const midRef   = React.useRef(null);
  const rightRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const sync = () => {
      const zones = [leftRef.current, midRef.current, rightRef.current].filter(Boolean);
      if (zones.length < 2) return;

      // Sync header heights
      const headers = zones.map(z => z.querySelector("thead tr:first-child"));
      const headerH = Math.max(...headers.map(h => h?.getBoundingClientRect().height ?? 0));
      headers.forEach(h => { if (h) h.style.height = headerH + "px"; });

      // Sync body row heights row-by-row
      const bodies = zones.map(z => Array.from(z.querySelectorAll("tbody tr")));
      const rowCount = Math.max(...bodies.map(b => b.length));
      for (let i = 0; i < rowCount; i++) {
        const rowH = Math.max(
          ...bodies.map(b => b[i]?.getBoundingClientRect().height ?? 0)
        );
        bodies.forEach(b => { if (b[i]) b[i].style.height = rowH + "px"; });
      }
    };

    sync();
    // Re-sync on resize
    const ro = new ResizeObserver(sync);
    [leftRef, midRef, rightRef].forEach(r => { if (r.current) ro.observe(r.current); });
    return () => ro.disconnect();
  }, [sorted, widths, midOrder]);

  // ── renderCell ────────────────────────────────────────────────────────────────
  const renderCell = React.useCallback((user, key) => {
    switch (key) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{ description: "text-default-500" }}
            description={user.email}
            name={user.name}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.role}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {user.status}
          </Chip>
        );
      case "actions":
        return (
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
        );
      default:
        return user[key];
    }
  }, []);

  // ── Shared column header builder ──────────────────────────────────────────────
  const buildColumnHeader = React.useCallback((col, { draggable = false } = {}) => {
    const isDragOver   = dragOver   === col.uid;
    const isDraggingMe = draggingUid === col.uid;

    return (
      <TableColumn
        key={col.uid}
        align={col.uid === "actions" ? "center" : "start"}
        allowsSorting={col.sortable}
        draggable={draggable}
        onDragStart={draggable ? (e) => handleDragStart(e, col.uid) : undefined}
        onDragOver={draggable  ? (e) => handleDragOver(e, col.uid)  : undefined}
        onDragLeave={draggable ? handleDragLeave                     : undefined}
        onDrop={draggable      ? (e) => handleDrop(e, col.uid)       : undefined}
        onDragEnd={draggable   ? handleDragEnd                       : undefined}
        style={{
          width:    widths[col.uid],
          minWidth: widths[col.uid],
          maxWidth: widths[col.uid],
          background: isDragOver ? "hsl(var(--heroui-primary-100))" : undefined,
          borderLeft: isDragOver ? "2px solid hsl(var(--heroui-primary))" : undefined,
          opacity:    isDraggingMe ? 0.4 : 1,
          overflow:   "visible",
          padding:    0,
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
          {/* Resize handle (on all non-actions cols) */}
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

  // ── Shared cell builder ───────────────────────────────────────────────────────
  const buildCell = React.useCallback((user, col) => {
    const isDragOver = dragOver === col.uid;
    return (
      <TableCell
        key={col.uid}
        style={{
          width:        widths[col.uid],
          minWidth:     widths[col.uid],
          maxWidth:     widths[col.uid],
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
          background:   isDragOver ? "hsl(var(--heroui-primary-50))" : undefined,
          borderLeft:   isDragOver ? "2px solid hsl(var(--heroui-primary))" : undefined,
          transition:   "background 0.1s",
        }}
      >
        {renderCell(user, col.uid)}
      </TableCell>
    );
  }, [dragOver, widths, renderCell]);

  // ── Shared table class names ──────────────────────────────────────────────────
  const sharedClassNames = {
    // border-b / border-divider removed — handled globally in the <style> block below
    th: ["bg-transparent", "text-default-500", "!px-0"],
    td: [
      "first:group-data-[first=true]/tr:before:rounded-none",
      "last:group-data-[first=true]/tr:before:rounded-none",
      "group-data-[middle=true]/tr:before:rounded-none",
      "first:group-data-[last=true]/tr:before:rounded-none",
      "last:group-data-[last=true]/tr:before:rounded-none",
    ],
  };

  // ── Toolbar ───────────────────────────────────────────────────────────────────
  const [visibleMidSet, setVisibleMidSet] = React.useState(
    new Set(MID_COLS_INIT.map(c => c.uid))
  );

  const visibleMidCols = React.useMemo(
    () => midCols.filter(c => visibleMidSet.has(c.uid)),
    [midCols, visibleMidSet]
  );

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
          placeholder="Search by name..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Status filter"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map(s => (
                <DropdownItem key={s.uid} className="capitalize">{capitalize(s.name)}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Column visibility only applies to scrollable middle columns */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Visible middle columns"
              closeOnSelect={false}
              selectedKeys={visibleMidSet}
              selectionMode="multiple"
              onSelectionChange={setVisibleMidSet}
            >
              {MID_COLS_INIT.map(c => (
                <DropdownItem key={c.uid} className="capitalize">{capitalize(c.label)}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            className="bg-foreground text-background"
            endContent={<PlusIcon size={18} />}
            size="sm"
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {users.length} users</span>
        <label className="flex items-center text-default-400 text-small gap-1">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
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

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── Resize handle ───────────────────────────────── */
        .ht-rh {
          position: absolute;
          top: 0; right: -4px;
          width: 8px; height: 100%;
          cursor: col-resize;
          z-index: 40;
          display: flex; align-items: center; justify-content: center;
        }
        .ht-rh::after {
          content: '';
          width: 3px; height: 60%;
          border-radius: 2px;
          background: hsl(var(--heroui-divider));
          transition: background 0.15s, height 0.15s;
          display: block;
        }
        .ht-rh:hover::after, .ht-rh:active::after {
          background: hsl(var(--heroui-primary)); height: 80%;
        }
        /* ── Drag grip (visible on th hover) ─────────────── */
        th:hover .ht-grip { opacity: 1 !important; }

        /* ── Zone layout ─────────────────────────────────── */
        .ht-zones {
          display: flex;
          align-items: stretch;
          border: 1px solid hsl(var(--heroui-divider));
          border-radius: 12px;
          overflow: hidden;           /* clip corners */
        }

        /* LEFT sticky zone — no scrollbar, no flex shrink */
        .ht-zone-left {
          flex: 0 0 auto;
          overflow: hidden;           /* NO horizontal scroll */
          border-right: 1px solid hsl(var(--heroui-divider));
          /* right-side shadow to visually separate from scrollable area */
          box-shadow: 4px 0 8px -2px rgba(0,0,0,0.10);
          z-index: 2;
        }

        /* MIDDLE scrollable zone — horizontal scroll ONLY here */
        .ht-zone-mid {
          flex: 1 1 auto;
          min-width: 0;
          overflow-x: auto;           /* ← THE scrollbar lives here */
          overflow-y: hidden;
        }
        .ht-zone-mid::-webkit-scrollbar { height: 6px; }
        .ht-zone-mid::-webkit-scrollbar-track  { background: hsl(var(--heroui-default-100)); }
        .ht-zone-mid::-webkit-scrollbar-thumb  { background: hsl(var(--heroui-default-300)); border-radius: 3px; }
        .ht-zone-mid::-webkit-scrollbar-thumb:hover { background: hsl(var(--heroui-default-400)); }

        /* RIGHT sticky zone — no scrollbar */
        .ht-zone-right {
          flex: 0 0 auto;
          overflow: hidden;           /* NO horizontal scroll */
          border-left: 1px solid hsl(var(--heroui-divider));
          box-shadow: -4px 0 8px -2px rgba(0,0,0,0.08);
          z-index: 2;
        }

        /* Tables inside zones: fixed layout, no wrapping */
        .ht-zone-left  table,
        .ht-zone-mid   table,
        .ht-zone-right table {
          border-collapse: separate !important;
          border-spacing: 0 !important;
          table-layout: fixed !important;
          /* each table is exactly as wide as its columns */
          width: max-content !important;
        }

        /* Middle zone table can expand beyond container (that's the point) */
        .ht-zone-mid table { min-width: 100%; }

        /* ── Cell borders: full grid on every th and td ─── */
        .ht-zone-left  table th,
        .ht-zone-mid   table th,
        .ht-zone-right table th {
          border-right:  1px solid hsl(var(--heroui-divider)) !important;
          border-bottom: 1px solid hsl(var(--heroui-divider)) !important;
        }
        .ht-zone-left  table td,
        .ht-zone-mid   table td,
        .ht-zone-right table td {
          border-right:  1px solid hsl(var(--heroui-divider)) !important;
          border-bottom: 1px solid hsl(var(--heroui-divider)) !important;
        }
        /* Remove duplicate right border on the last cell of each zone
           (the zone border itself already provides that edge) */
        .ht-zone-left  table th:last-child,
        .ht-zone-left  table td:last-child,
        .ht-zone-mid   table th:last-child,
        .ht-zone-mid   table td:last-child,
        .ht-zone-right table th:last-child,
        .ht-zone-right table td:last-child {
          border-right: none !important;
        }
        /* Remove bottom border on the very last row to avoid double border
           with the outer container edge */
        .ht-zone-left  table tbody tr:last-child td,
        .ht-zone-mid   table tbody tr:last-child td,
        .ht-zone-right table tbody tr:last-child td {
          border-bottom: none !important;
        }

        /* Sticky headers within each zone */
        .ht-zone-left  thead tr th,
        .ht-zone-mid   thead tr th,
        .ht-zone-right thead tr th {
          position: sticky !important;
          top: 0 !important;
          z-index: 10;
          background: hsl(var(--heroui-default-100)) !important;
          white-space: nowrap;
          overflow: visible !important;
        }

        /* Body cell backgrounds */
        .ht-zone-left  tbody tr td,
        .ht-zone-mid   tbody tr td,
        .ht-zone-right tbody tr td {
          background: hsl(var(--heroui-background));
        }

        /* Scrollbar gutter in right corner */
        .ht-zone-mid::-webkit-scrollbar-corner { background: hsl(var(--heroui-default-100)); }
      `}</style>

      {topContent}

      {/*
        ── 3-zone layout ──────────────────────────────────────────────────────
        LEFT zone   : HeroUI Table with selectionMode, LEFT_COLS
        MIDDLE zone : HeroUI Table (no selection), visible MID_COLS — scrolls horizontally
        RIGHT zone  : HeroUI Table (no selection), RIGHT_COLS (actions)
      */}
      <div className="ht-zones">

        {/* ── LEFT zone ── sticky, checkbox + name + role + status ─────── */}
        <div className="ht-zone-left" ref={leftRef}>
          <Table
            isCompact
            removeWrapper
            aria-label="Users table - sticky left columns"
            checkboxesProps={{
              classNames: { wrapper: "after:bg-foreground after:text-background text-background" },
            }}
            classNames={sharedClassNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader>
              {LEFT_COLS.map(col => buildColumnHeader(col, { draggable: false }))}
            </TableHeader>
            <TableBody emptyContent="No users found" items={sorted}>
              {(item) => (
                <TableRow key={item.id}>
                  {LEFT_COLS.map(col => buildCell(item, col))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── MIDDLE zone ── scrollable, team + age + email (reorderable) ─ */}
        <div className="ht-zone-mid" ref={midRef}>
          <Table
            isCompact
            removeWrapper
            aria-label="Users table - scrollable columns"
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

        {/* ── RIGHT zone ── sticky, actions ───────────────────────────── */}
        <div className="ht-zone-right" ref={rightRef}>
          <Table
            isCompact
            removeWrapper
            aria-label="Users table - sticky right columns"
            classNames={sharedClassNames}
          >
            <TableHeader>
              {RIGHT_COLS.map(col => buildColumnHeader(col, { draggable: false }))}
            </TableHeader>
            <TableBody emptyContent=" " items={sorted}>
              {(item) => (
                <TableRow key={item.id}>
                  {RIGHT_COLS.map(col => buildCell(item, col))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

      </div>

      {bottomContent}

      <div style={{
        marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap",
        fontSize: 11, color: "hsl(var(--heroui-default-400))",
      }}>
        <span>⠿ Drag grip in TEAM/AGE/EMAIL headers to reorder middle columns</span>
        <span>↔ Drag right edge of any header to resize</span>
        <span>📌 Checkbox · Name · Role · Status pinned left &nbsp;·&nbsp; Actions pinned right</span>
        <span>↔ Scroll bar appears only under middle columns</span>
      </div>
    </>
  ); 
}