import { Routes } from "@angular/router";
import { Overview } from "./pages/overview/overview";
import { Transactions } from "./pages/transactions/transactions";
import { Budgets } from "./pages/budgets/budgets";
import { Pots } from "./pages/pots/pots";
import { RecurringBills } from "./pages/recurring-bills/recurring-bills";
import { Login } from "./pages/login/login";
import { loggedInGuard } from "./guards/loggedInGuard";
import { notLoggedInGuard } from "./guards/notLoggedINGuard";

export const routes: Routes = [
  { path: "login", component: Login, canActivate: [loggedInGuard] },
  { path: "", component: Overview, canActivate: [notLoggedInGuard] },
  {
    path: "transactions",
    component: Transactions,
    canActivate: [notLoggedInGuard],
  },
  { path: "budgets", component: Budgets, canActivate: [notLoggedInGuard] },
  { path: "pots", component: Pots, canActivate: [notLoggedInGuard] },
  {
    path: "recurring-bills",
    component: RecurringBills,
    canActivate: [notLoggedInGuard],
  },
];
