import { ReactiveFormsModule } from "@angular/forms";
import { Component, ChangeDetectionStrategy, inject, computed, output, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ClientAddPayload } from "../../core/clients-base/clients.model";
import { TodoClientAddFormInstance } from "./todo-client-add.form";

@Component({
	selector: "app-todo-users-add",
	imports: [ReactiveFormsModule, MatDialogActions, MatDialogTitle, MatDialogContent, MatFormField, MatButtonModule, MatInputModule],
	templateUrl: "./todo-client-add.component.html",
	styleUrl: "./todo-client-add.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoClientAddComponent {
	formInstance = inject(MAT_DIALOG_DATA) as TodoClientAddFormInstance;
	formControls = computed(() => this.formInstance.getControls());
	addClient = output<ClientAddPayload>();
	readonly dialogRef = inject(MatDialogRef<TodoClientAddComponent>);

	submitForm() {
		if (this.formInstance.getControls().valid) {
			const formData: ClientAddPayload = this.formControls().getRawValue();
			this.dialogRef.close(formData); // 🔥 Pošleme dáta do hlavnej komponenty
		}
	}
}
