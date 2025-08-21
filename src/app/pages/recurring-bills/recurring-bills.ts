import { Component, computed, effect, inject } from "@angular/core";
import { RecurringbillsService } from "../../services/recurringbills-service";
import { CommonModule } from "@angular/common";
import { Signal } from "@angular/core";
import { RecurringBill } from "../../models/models";

@Component({
  selector: "app-recurring-bills",
  imports: [CommonModule],
  templateUrl: "./recurring-bills.html",
  styleUrl: "./recurring-bills.scss",
})
export class RecurringBills {
  private billsService = inject(RecurringbillsService);

  billTypes = this.billsService.billTypes;
  sortedBills = computed(() => {
    const billsCopy = [...this.billTypes()];
    return billsCopy.sort((a, b) => a.dueDate - b.dueDate);
  });

  paidBills = computed(() => {
    return this.billTypes().filter((b) => b.dueDate < new Date().getDate());
  });

  dueSoonBills = computed(() =>
    this.billTypes().filter((b) => {
      const today = new Date().getDate();
      return today < b.dueDate && today >= b.dueDate - 3;
    })
  );

  upcomingBills = computed(() =>
    this.billTypes().filter((b) => new Date().getDate() <= b.dueDate)
  );

  getTotalAmount(bills: RecurringBill[]) {
    return Number(
      bills
        .reduce((total, bill) => {
          return total + bill.amount;
        }, 0)
        .toFixed(2)
    );
  }

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
}
