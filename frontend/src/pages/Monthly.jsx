import { api } from "@/App";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Monthly = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  // current year
  const currentYear = new Date().getFullYear();

  // Get transactions
  useEffect(() => {
    api
      .get("/transaction")
      .then((response) => {
        const data = response.data.data;
        setTransactions(data);

        const groupedByMonth = data.reduce((acc, transaction) => {
          const transactionDate = new Date(transaction.date);
          const month = transactionDate.getMonth();
          const year = transactionDate.getFullYear();

          // fetching current year's data
          if (year === currentYear) {
            if (acc[month]) {
              acc[month] += transaction.amount;
            } else {
              acc[month] = transaction.amount;
            }
          }
          return acc;
        }, {});

        const chartData = Object.keys(groupedByMonth).map((monthIndex) => ({
          name: new Date(currentYear, monthIndex).toLocaleString("default", {
            month: "long",
          }),
          Expenses: groupedByMonth[monthIndex],
        }));

        setChartData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [currentYear]);

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6">
        Monthly Expenses
      </h2>
      <hr className="border-grey-2 mb-32" />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ left: 40, right: 40, top: 20, bottom: 20 }}
          barCategoryGap="30%"  
        >
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Expenses", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Expenses" fill="cyan" radius={4} barSize={75} className="cursor-pointer" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Monthly;
