function getFillColor(categoryName) {
  const colors = {
    Food: "red",
    Transport: "blue",
    Shopping: "green",
    Health: "purple",
    Entertainment: "orange",
    Bills: "yellow",
    Education: "pink",
    Rent: "brown",
    Misc: "grey",
  };

  return colors[categoryName] || "black";
}

export const chartConfig = {
  Expenses: {
    label: "Expenses",
  },
  food: {
    label: "Food",
    color: getFillColor("Food"),
  },
  health: {
    label: "Health",
    color: getFillColor("Health"),
  },
  entertainment: {
    label: "Entertainment",
    color: getFillColor("Entertainment"),
  },
  bills: {
    label: "Bills",
    color: getFillColor("Bills"),
  },
  education: {
    label: "Education",
    color: getFillColor("Education"),
  },
  rent: {
    label: "Rent",
    color: getFillColor("Rent"),
  },
  misc: {
    label: "Misc",
    color: getFillColor("Misc"),
  },
};

export default getFillColor;
