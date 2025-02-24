import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed, toObservable, toSignal } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { Store } from "@ngrx/store";
import { map, merge, Subject, filter, switchMap } from "rxjs";
import { TodoAddFormInstance } from "../../components/todo-add-form/todo-add-form.form";
import { TodosActionsComponent } from "../../components/todos-actions/todos-actions.component";
import { TodosListComponent } from "../../components/todos-list/todos-list.component";
import { TodosCounterComponent } from "../../components/todos-counter/todos-counter.component";
import { todosActions, todosEntity } from "../../core/todos-base/todos.state";
import { TodoAddPayload, TodoUpdatePayload } from "../../core/todos-base/todos.model";
import { filterCompletedTodos } from "../../core/todos-base/todos.utils";
import { TodoAddFormComponent } from "../../components/todo-add-form/todo-add-form.component";
import { TodosClientListComponent } from "../../components/todos-client-list/todos-client-list.component";
import { clientsActions, clientsEntity } from "../../core/clients-base/clients.state";

@Component({
	selector: "z-todos",
	templateUrl: "./todos.feature.html",
	styleUrls: ["./todos.feature.scss"],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TodoAddFormComponent,
		MatCardModule,
		TodosActionsComponent,
		TodosListComponent,
		TodosCounterComponent,
		TodosClientListComponent,
	],
})
export class TodosFeature {
	// deps
	#todosEntity = todosEntity();
	#store = inject(Store);
	formInstance = inject(TodoAddFormInstance);

	//clients
	#clientsEntity = clientsEntity();

	// event streams
	onAdd$ = new Subject<{ payload: TodoAddPayload; clientId: number }>();
	onUpdate$ = new Subject<{ id: number; payload: TodoUpdatePayload }>();
	onDelete$ = new Subject<number>();
	onMarkAllComplete$ = new Subject<void>();
	onSearch$ = new Subject<{ clientId: number }>();

	// data
	hideCompletedSignal = signal(false);
	todosSignal = toSignal(this.#todosEntity.todos$);
	visibleTodos = computed(() => (this.hideCompletedSignal() ? filterCompletedTodos(this.todosSignal()) : this.todosSignal()));
	clientsSignal = toSignal(this.#clientsEntity.clients$);
	selectedClientSignal = signal(0);
	firstClientId = signal(0);

	// resolver
	state = computed(() => ({
		todos: this.todosSignal() || [],
		hideCompletedSignal: this.hideCompletedSignal(),
		visibleTodos: this.visibleTodos() || [],
		clients: this.clientsSignal() || [],
		selectedClient: this.selectedClientSignal() || 0,
	}));

	// Derived signal for the first client ID

	#searchAction$ = this.onSearch$.pipe(map((clientId) => todosActions.search(clientId)));
	#addAction$ = this.onAdd$.pipe(map(({ payload, clientId }) => todosActions.add({ payload, clientId })));
	#updateAction$ = this.onUpdate$.pipe(map(({ id, payload }) => todosActions.update({ id, payload })));
	#deleteAction$ = this.onDelete$.pipe(map((id) => todosActions.delete({ id })));
	#markAllCompleteAction$ = this.onMarkAllComplete$.pipe(map(() => todosActions.markAllComplete()));

	constructor() {
		effect(() => {
			const clients = this.clientsSignal();

			if (clients && clients.length > 0) {
				this.selectedClientSignal.set(clients[0].id);
				this.onSearch$.next({ clientId: clients[0].id });
			}
		});
		merge(this.#addAction$, this.#updateAction$, this.#deleteAction$, this.#markAllCompleteAction$, this.#searchAction$)
			.pipe(takeUntilDestroyed())
			.subscribe(this.#store);
	}
}
