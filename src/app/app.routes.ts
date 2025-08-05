import { Routes } from "@angular/router";
import { Overview } from "./pages/overview/overview";
import { Transactions } from "./pages/transactions/transactions";
import { Budgets } from "./pages/budgets/budgets";
import { Pots } from "./pages/pots/pots";
import { RecurringBills } from "./pages/recurring-bills/recurring-bills";

export const routes: Routes = [
  { path: "", component: Overview },
  { path: "transactions", component: Transactions },
  { path: "budgets", component: Budgets },
  { path: "pots", component: Pots },
  { path: "recurring-bills", component: RecurringBills },
];
