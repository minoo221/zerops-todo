import { MatCardModule } from "@angular/material/card";
import { Component, ChangeDetectionStrategy, input, output, inject } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { ClientAddPayload, ClientEntity } from "../../core/clients-base/clients.model";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { TodoClientAddComponent } from "../todo-client-add/todo-client-add.component";
import { TodoClientAddFormInstance } from "../todo-client-add/todo-client-add.form";

@Component({
	selector: "z-todos-client-list",
	imports: [MatChipsModule, MatCardModule, MatIcon, MatButtonModule, MatTooltipModule],
	templateUrl: "./todos-client-list.component.html",
	styleUrl: "./todos-client-list.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosClientListComponent {
	clients = input<ClientEntity[]>([]);
	selectedClient = input<number>();
	deleteClient = output<number>();
	selectClient = output<number>();
	addClient = output<ClientAddPayload>();

	readonly dialog = inject(MatDialog);

	openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
		const formInstance = new TodoClientAddFormInstance();
		const dialogRef = this.dialog.open(TodoClientAddComponent, {
			data: formInstance,
			width: "480px",
			enterAnimationDuration,
			exitAnimationDuration,
		});

		dialogRef.afterClosed().subscribe((result: ClientAddPayload | undefined) => {
			if (result) {
				console.log("The dialog was closed", result);
				this.addClient.emit(result);
			}
		});
	}
}
