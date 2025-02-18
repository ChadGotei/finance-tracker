import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { api } from "@/App";
import { toastSuccess } from "@/lib/toastFn";
import toast from "react-hot-toast";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);

  // Get transactions
  useEffect(() => {
    api
      .get("/transaction")
      .then((response) => {
        setTransactions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  async function onDelete(id) {
    try {
      setDelLoading(true);
      await api.delete(`/transaction/${id}`);
      setTransactions((trx) => trx.filter((t) => t._id !== id));
      toastSuccess("Transaction deleted successfully!");
    } catch (error) {
      toast.error("Error occurred while deleting");
    } finally {
      setDelLoading(false);
    }
  }

  // shadcn tables column
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => `₹${info.getValue()}`,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Button className="p-2 w-12 bg-grey-2 hover:bg-grey-1 text-white rounded-lg transition-all cursor-pointer group hidden sm:flex">
            <Link to={`/edit/${row.original._id}`}>
              <span className="text-white group-hover:text-cyan transition-all">
                <Pencil size={18} />
              </span>
            </Link>
          </Button>
          <Button
            className="p-2 w-12 bg-grey-2 hover:bg-grey-1 text-white rounded-lg transition-all cursor-pointer group"
            onClick={() => onDelete(row.original._id)}
          >
            <span className="text-white group-hover:text-cyan transition-all">
              {delLoading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </span>
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6">
        Transactions
      </h2>
      <hr className="border-gray-800 mb-6" />

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <Table className="border border-gray-800 rounded-lg overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-900">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-grey-1 text-cyan text-left px-4 py-3 text-lg hover:cursor-pointer hover:text-white/90"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-[#302c2c] transition-all text-[17px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TransactionsTable;
