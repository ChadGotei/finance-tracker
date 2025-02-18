import { Routes, Route } from "react-router-dom";
import {
  Categories,
  EditTransaction,
  Home,
  Monthly,
  NewTransaction,
  NotFound,
  Profile,
  SetBudget,
  Transaction,
  View,
} from "./pages";
import Layout from "@/components/layout";

import axios from "axios";
import { Toaster } from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/",
});

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/newtransaction" element={<NewTransaction />} />
          <Route path="/view" element={<View />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/view/:id" element={<Transaction />} />
          <Route path="/edit/:id" element={<EditTransaction />} />
          <Route path="/categories/setbudget" element={<SetBudget />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
