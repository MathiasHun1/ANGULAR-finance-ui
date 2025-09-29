import { Component, inject, OnInit } from "@angular/core";
import { RecurringbillsService } from "../../services/recurringbills-service";
import { CommonModule } from "@angular/common";
import { RecurringBill } from "../../models/models";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-recurring-bills",
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: "./recurring-bills.html",
  styleUrl: "./recurring-bills.scss",
})
export class RecurringBills implements OnInit {
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

  ngOnInit(): void {
    if (!this.billsService.billTypes()) {
      this.billsService.getRecurringBills();
    }
  }
}
