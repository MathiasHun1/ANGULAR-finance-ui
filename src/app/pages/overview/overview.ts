import { Component, computed, effect, inject, signal } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  BalanceModel,
  ExtendedBudget,
  TransactionModel,
} from "../../models/models";
import { CommonModule } from "@angular/common";
import { PotsService } from "../../services/pots-service";
import { RouterLink } from "@angular/router";
import { ListItem } from "../../shared/components/list-item/list-item";
import { TransactionService } from "../../services/transaction-service";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";
import { RecurringbillsService } from "../../services/recurringbills-service";
import { OnInit } from "@angular/core";
import { BalanceService } from "../../services/balance-service";
import { LoadingStatus } from "../../shared/components/loading-status/loading-status";

@Component({
  selector: "app-overview",
  imports: [CommonModule, RouterLink, ListItem, Chart, LoadingStatus],
  templateUrl: "./overview.html",
  styleUrl: "./overview.scss",
})
export class Overview implements OnInit {
  private potsService = inject(PotsService);
  private transactionsService = inject(TransactionService);
  private budgetService = inject(BudgetService);
  private billsService = inject(RecurringbillsService);
  private balanceService = inject(BalanceService);

  //fetch all data on init if not already fetched
  ngOnInit(): void {
    if (!this.balanceService.balanceData()) {
      this.balanceService.loadData();
    }

    if (!this.potsService.pots()) {
      this.potsService.loadData();
    }

    if (!this.budgetService.budgets()) {
      this.budgetService.loadData();
    }

    if (!this.billsService.billTypes()) {
      this.billsService.loadData();
    }

    if (!this.transactionsService.allTransactions()) {
      this.transactionsService.loadData();
    }
  }

  //check if  all data is loaded
  allLoaded = computed(() => {
    return (
      this.balanceService.balanceLoaded() &&
      this.potsService.dataLoaded() &&
      this.budgetService.dataLoaded() &&
      this.billsService.dataLoaded() &&
      this.transactionsService.dataLoaded()
    );
  });
  //balance related data
  balanceData = this.balanceService.balanceData;

  //transactions related data
  transactions = computed<TransactionModel[]>(() => {
    const transactions = this.transactionsService.computedTransactions();
    if (!transactions) {
      return [];
    }

    return transactions.slice(0, 5);
  });

  //budgets related data
  budgets = computed<ExtendedBudget[]>(() => {
    const budgetsAll = this.budgetService.extendedBudgets();
    if (!budgetsAll) {
      return [];
    }

    return budgetsAll.slice(0, 4);
  });

  //pots related data
  totalSavedPots = this.potsService.totalSavedPots;
  pots = computed(() => {
    const potsData = this.potsService.pots();
    if (!potsData) {
      return [];
    }

    return potsData.slice(0, 4);
  });

  //Recurring-bills related data
  paidBills = this.billsService.paidBills;
  upcomingBills = this.billsService.upcomingBills;
  dueSoonBills = this.billsService.dueSoonBills;
  getTotalAmount = this.billsService.getTotalAmount;
}
