import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateDatatable = async (fullPath) => {
  const datatableDir = path.join(fullPath, 'src', 'components', 'DataTables');
  createFolder(datatableDir);

  const filePath = path.join(datatableDir, 'ThemedDataTable.jsx');

  const content = `import { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Pencil, Trash2, ChevronUp, ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../Tooltips/Tooltip";

export const ThemedDataTable = ({
  columns,
  data,
  editPath = "",
  onDelete,
  onEdit = () => {},
  customActions = () => null,
  filters,
  extraFilters
}) => {
  const { t } = useTranslation();

  const defaultItemPerPage = 10;
  const showActions = !!editPath || typeof onDelete === "function";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPage);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getNestedValue = (obj, path) => {
    if (!obj || !path) return undefined;
    const parts = path.replace(/\\[(\\w+)\\]/g, '.$1').replace(/^\\./, '').split('.');
    return parts.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const filteredData = data.filter((row) =>
    columns.some((column) => {
      const value = column.render ? column.render(row) : getNestedValue(row, column.key);
      return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  const sortedData = [...filteredData];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const valueA = getNestedValue(a, sortColumn) ?? "";
      const valueB = getNestedValue(b, sortColumn) ?? "";
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
      return sortDirection === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });
  }

  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalRecords);
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (columnKey) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column || column.key === "-" || column.render) return;
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const generatePaginationRange = () => {
    const range = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      if (startPage > 2) range.push("...");
      for (let i = startPage; i <= endPage; i++) range.push(i);
      if (endPage < totalPages - 1) range.push("...");
      range.push(totalPages);
    }
    return range;
  };

  const hasCustomActions = (item) => !!customActions?.(item);

  return (
    <div className="w-full border-2 border-gray-100 shadow-xl rounded-xl overflow-hidden p-4 animate__animated animate__fadeIn animate__faster">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary-dark sm:text-sm"
          />
        </div>
        {/* Filtros horizontales aquí */}
        {filters && (
          <div className="flex items-center gap-2">
            {filters}
          </div>
        )}
      </div>

      {/* Extra filters (debajo del buscador) */}
      {extraFilters && (
        <div className="w-full mb-4">
          {extraFilters}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full w-full table-fixed divide-y divide-gray-300">
          <thead className="bg-primary">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={classNames(
                    "px-4 py-3 text-sm font-semibold text-white cursor-pointer",
                    column.width || "w-40",
                    {
                      "text-left": !column.align_col || column.align_col === "left",
                      "text-center": column.align_col === "center",
                      "text-right": column.align_col === "right",
                    }
                  )}
                  onClick={() => handleSort(column.key)}
                >
                  <div className={classNames("flex items-center gap-1", {
                    "justify-start": !column.align_col || column.align_col === "left",
                    "justify-center": column.align_col === "center",
                    "justify-end": column.align_col === "right",
                  })}>
                    {column.label.toUpperCase()}
                    {sortColumn === column.key &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-40">
                  {String(t("actions")).toUpperCase()}
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => {
                const rowKey = item.id && !isNaN(item.id) ? \`row-\${item.id}\` : \`row-\${index}\`;
                return (
                  <tr key={rowKey} className="even:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={\`\${column.key}-\${rowKey}\`}
                        className={classNames(
                          "px-4 py-4 text-sm text-gray-500",
                          column.width || "w-40",
                          {
                            "text-left": !column.align_row || column.align_row === "left",
                            "text-center": column.align_row === "center",
                            "text-right": column.align_row === "right",
                          },
                          "whitespace-nowrap overflow-hidden truncate"
                        )}
                      >
                        {column.render ? column.render(item) : getNestedValue(item, column.key) ?? "-"}
                      </td>
                    ))}
                    {showActions && (
                      <td className="w-40 px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex flex-wrap justify-center items-center gap-2">
                          {customActions(item)}
                          {editPath && !hasCustomActions(item) && (
                            <Tooltip text={t("edit")}>
                              <Link to={\`\${editPath}/edit/\${item.id}\`} onClick={() => onEdit(item.id)} className="p-1 rounded hover:bg-gray-100 transition">
                                <Pencil className="w-5 h-5 shrink-0 text-primary" />
                              </Link>
                            </Tooltip>
                          )}
                          {typeof onDelete === "function" && (
                            <Tooltip text={t("delete")}>
                              <button onClick={() => onDelete(item.id)} className="p-1 rounded hover:bg-gray-100 transition">
                                <Trash2 className="w-5 h-5 shrink-0 text-danger" />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr key="no-data">
                <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center py-4 text-gray-500">
                  {t("no_results_found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">{t("show")}</span>
          <select
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 50, 100].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="text-gray-500 ml-2">
            {indexOfFirstItem + 1} - {indexOfLastItem} de {totalRecords}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            {t("back")}
          </button>
          {generatePaginationRange().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={\`px-3 py-2 text-sm rounded-md \${currentPage === page ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"}\`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

Datatable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  editPath: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  customActions: PropTypes.func,
  filters: PropTypes.node,
  extraFilters: PropTypes.node,
};
`.trimStart(); // Puedes reemplazar esta línea por el contenido completo del componente

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}