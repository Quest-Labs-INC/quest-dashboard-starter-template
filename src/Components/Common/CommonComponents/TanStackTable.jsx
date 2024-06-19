import React from 'react'
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'
import {useMemo} from 'react'

export default function BasicTable({ fields, tableData} ) {


    // const fields = [
    //     { id: 'project_id', label: 'Project ID', type: 'number', link: true, showInPopup: false},
    //     { id: 'project', label: 'Project', type: 'text', showInPopup: true},
    //     { id: 'status', label: 'Status', type: 'text', showInPopup: true},
    //     { id: 'due_date', label: 'Due Date', type: 'text', showInPopup: true},
    //     { id: 'lead', label: 'Lead', type: 'text', showInPopup: true},
    //   ];


    const columns = [
        {
            header: 'project_id',
            accessorKey: 'project_id',
            footer: 'project_id'
        },
        {
            header: 'project',
            accessorKey: 'project',
            footer: 'project'
        },
        {
            header: 'status',
            accessorKey: 'status',
            footer: 'status'
        },
        {
            header: 'due_date',
            accessorKey: 'due_date',
            footer: 'due_date'
        }, 
        {
            header: 'lead',
            accessorKey: 'lead',
            footer: 'lead'
        }
    ]

    const data = useMemo(() => tableData, [])
    const table = useReactTable({tableData, columns, getCoreRowModel: getCoreRowModel()})

    return <div>
        <table>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.project_id}> 
                    {headerGroup.headers.map(header => <th key={header.project_id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th> )}
                </tr>
            ))}

            <tbody>
                {table.getRowModel().rows.map(row =>  (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}

                <tr>
                    <td>
                        1
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Project ID</td>
                </tr>
            </tfoot>
        </table>
    </div>
}