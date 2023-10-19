import { Travel } from "@prisma/client";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export type ColumnsTableProps<T> = {
  id?: string;
  name?: string;
  selector: (value: T) => string | number;
};

type TableProps = {
  data: Travel[];
  columns: ColumnsTableProps<Travel>[];
};

const DataTable = (props: TableProps) => {
  return (
    <div className="w-full p-4">
      <div
        id="table-container"
        className="rounded-md overflow-auto shadow-[0px_0px_8px_#ccc] min-h-[28rem]"
      >
        <table className="w-full">
          {/* Columns */}
          <thead className="bg-slate-800 text-white text-left tracking-wide">
            <tr>
              {props.columns.map((column, i) => (
                <th
                  key={`th_column_${i}`}
                  className={twMerge(
                    "px-3 pt-4 pb-2 whitespace-nowrap",
                    column.id == "published" && "w-24"
                  )}
                >
                  {column.name}
                </th>
              ))}
              <th className="px-8 pt-4 pb-2 text-center w-20">Contrôleur</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {props.data.map((row, i_row) => (
              <tr
                key={`tr_row_${i_row}`}
                className={twMerge(
                  "text-gray-600 tracking-wide text-center",
                  i_row % 2 == 0 ? "bg-gray-200" : "bg-gray-300"
                )}
              >
                {props.columns.map((column, i_col) => (
                  <td key={`td_column_${i_col}`} className="px-3">
                    {column.selector(row)}
                  </td>
                ))}
                {/* Edit and Delete button */}
                <td className="flex gap-1 px-8 py-1 justify-center items-center">
                  <button
                    type="button"
                    className={twMerge("btn btn-sky", "text-sm p-2 px-3")}
                  >
                    <MdEdit size={16} />
                    Edit
                  </button>

                  <button
                    type="button"
                    className={twMerge("btn btn-danger", "text-sm p-2 px-3")}
                  >
                    <MdDelete size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
