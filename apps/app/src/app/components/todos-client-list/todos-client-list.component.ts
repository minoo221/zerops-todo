import { MatCardModule } from "@angular/material/card";
import { Component, ChangeDetectionStrategy, input, output } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { ClientEntity } from "../../core/clients-base/clients.model";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "z-todos-client-list",
	imports: [MatChipsModule, MatCardModule, MatIcon, MatButtonModule],
	templateUrl: "./todos-client-list.component.html",
	styleUrl: "./todos-client-list.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosClientListComponent {
	clients = input<ClientEntity[]>([]);
	deleteClient = output<number>();
	selectClient = output<number>();
}
