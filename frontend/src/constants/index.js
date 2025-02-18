import { HomeIcon, PlusCircle, List, Calendar, Folder } from "lucide-react";

export const navLinks = [
  {
    id: "home",
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
  {
    id: "newTransaction",
    name: "Transaction",
    link: "/newtransaction",
    icon: PlusCircle,
  },
  {
    id: "viewAll",
    name: "View",
    link: "/view",
    icon: List,
  },
  {
    id: "monthly",
    name: "Monthly",
    link: "/monthly",
    icon: Calendar,
  },
  {
    id: "categories",
    name: "Category",
    link: "/categories",
    icon: Folder,
  },
];

export const categoriesList = [
  {
    id: "food",
    name: "Food",
  },
  {
    id: "transport",
    name: "Transport",
  },
  {
    id: "shopping",
    name: "Shopping",
  },
  {
    id: "health",
    name: "Health",
  },
  {
    id: "entertainment",
    name: "Entertainment",
  },
  {
    id: "bills",
    name: "Bills",
  },
  {
    id: "education",
    name: "Education",
  },
  {
    id: "rent",
    name: "Rent",
  },
  {
    id: "misc",
    name: "Miscellaneous",
  },
];
