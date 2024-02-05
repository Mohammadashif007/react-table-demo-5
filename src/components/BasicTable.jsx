import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import mData from "../MOCK_DATA.json";
import { useMemo, useState } from "react";
// import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

// import './Style.css';

const BasicTable = () => {
    const data = useMemo(() => mData, []);
    const columns = [
        {
            header: "Id",
            accessorKey: "id",
        },
        {
            header: "Name",
            columns: [
                {
                    header: "First ",
                    accessorKey: "first_name",
                },
                {
                    header: "Last ",
                    accessorKey: "last_name",
                },
            ],
        },
        // {
        //     header: "First Name",
        //     accessorKey: "first_name",
        // },
        // {
        //     header: "Last Name",
        //     accessorKey: "last_name",
        // },
        // {
        //     header: "Name",
        //     accessorFn: (row) => `${row.first_name} ${row.last_name} Gender:${row.gender}`,
        // },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Gender",
            accessorKey: "gender",
        },
        {
            header: "DOB",
            accessorKey: "dob",
        },
    ];
    // console.log(columns);

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });

    return (
        <div className="w3-container">
            <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
            <table className="w3-table-all">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {/* <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            </table>
            <div>
                <button onClick={() => table.setPageIndex(0)}>Fist Page</button>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Previous Page
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Next Page
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                    Last Page
                </button>
            </div>
        </div>
    );
};

export default BasicTable;
