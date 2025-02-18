//! WORK FLOW
// 1. Firstly, we get our transactions to calculate total expenses and categories so we can make chartData our of it.
// 2. We make chart data from categories by mapping over it and making a structure like {name, expenses, color}. For color a basic js function is made in lib
// 3. lib also stores the chartConfig
// 4. then our pie chart is displayed with the help of shadcn, basic syntax was adopted from the example provided by shadcn on their website

import { api } from "@/App";
import { useEffect, useState } from "react";
import { Pie, PieChart, Label } from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import getFillColor, { chartConfig } from "@/lib/getChartColor";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Creating chartData with category expenses
  const chartData = categories.map((category) => {
    const totalExpensesForCategory = transactions
      .filter((transaction) => transaction.category === category.name)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      category: category.name,
      expenses: totalExpensesForCategory,
      fill: getFillColor(category.name),
    };
  });

  // getting the categories and transactions from api
  useEffect(() => {
    setIsLoading(true);
    api
      .get("/transaction")
      .then((response) => {
        setTransactions(response.data.data);

        const total = response.data.data.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);

        setTotalExpense(total);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });

    api
      .get("/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-white">
        <h2 className="text-5xl font-bold">Categories</h2>
        <div className="w-full h-[50dvh] flex justify-center items-center">
          <LoaderCircle className="h-32 w-32 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-5xl font-bold text-white/90 tracking-wide mb-6">
        Categories
      </h2>
      <hr className="border-grey-2 sm:mb-20 mb-32" />
      <Button size="lg">
        <Link to={"/categories/setbudget"}>Set Budget</Link>
      </Button>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="expenses"
              nameKey="category"
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-cyan text-3xl font-bold"
                        >
                          {totalExpense.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xl"
                        >
                          Total Expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default Categories;
