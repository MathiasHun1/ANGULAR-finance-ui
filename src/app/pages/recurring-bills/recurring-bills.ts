import { Component, computed, effect, inject, signal } from "@angular/core";
import { RecurringbillsService } from "../../services/recurringbills-service";
import { CommonModule } from "@angular/common";
import { RecurringBill, SortOptions } from "../../models/models";
import { FormsModule, FormControl } from "@angular/forms";

@Component({
  selector: "app-recurring-bills",
  imports: [CommonModule, FormsModule],
  templateUrl: "./recurring-bills.html",
  styleUrl: "./recurring-bills.scss",
})
export class RecurringBills {
  private billsService = inject(RecurringbillsService);

  sortedBills = this.billsService.sortedBills;
  paidBills = this.billsService.paidBills;
  dueSoonBills = this.billsService.dueSoonBills;
  upcomingBills = this.billsService.upcomingBills;

  sortValue = this.billsService.sortValue;
  searchFieldValue = this.billsService.searchFieldValue;

  getTotalAmount = this.billsService.getTotalAmount;

  getDueDateInfo(dueDate: number) {
    const todaysDay = new Date().getDate();

    if (todaysDay > dueDate) {
      return {
        path: "/images/icon-bill-paid.svg",
        isClose: false,
      };
    }

    if (todaysDay <= dueDate && todaysDay >= dueDate - 3) {
      return {
        path: "/images/icon-bill-due.svg",
        isClose: true,
      };
    }

    return {
      path: "",
      isClose: false,
    };
  }

  filterBills(bills: RecurringBill[]) {
    if (!this.searchFieldValue) {
      return bills;
    }

    return bills.filter((b) =>
      b.name.toLowerCase().trim().includes(this.searchFieldValue())
    );
  }
}
