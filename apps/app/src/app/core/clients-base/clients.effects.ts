import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { ClientsApi } from "./clients.api";
import { clientsActions } from "./clients.state";
import { TodoAddFormInstance } from "../../components/todo-add-form/todo-add-form.form";

@Injectable()
export class ClientsEffects implements OnInitEffects {
	// deps
	#actions$ = inject(Actions);
	#api = inject(ClientsApi);
	#snack = inject(MatSnackBar);
	#clientsAddFormInstance = inject(TodoAddFormInstance);

	getOnInit$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(clientsActions.init),
			switchMap(() =>
				this.#api.get$().pipe(
					map((res) => clientsActions.getSuccess({ res })),
					catchError(() => of(clientsActions.getFail())),
				),
			),
		),
	);

	getOne$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(clientsActions.init),
			switchMap(() =>
				this.#api.get$().pipe(
					map((res) => clientsActions.getOneSuccess({ res })),
					catchError(() => of(clientsActions.getOneFail())),
				),
			),
		),
	);

	add$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(clientsActions.add),
			switchMap(({ payload }) =>
				this.#api.add$(payload).pipe(
					map((res) => clientsActions.addSuccess({ res })),
					catchError(() => of(clientsActions.addFail())),
				),
			),
		),
	);

	onAddResetAddForm$ = createEffect(
		() =>
			this.#actions$.pipe(
				ofType(clientsActions.addSuccess),
				tap(() => this.#clientsAddFormInstance.reset()),
			),
		{ dispatch: false },
	);

	/*  onAddSuccessShowSnackbar$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(clientsAddFormInstance.addSuccess),
        tap(() => this.#openSnack('Úkol přidán'))
      ),
    { dispatch: false }
  ); */

	delete$ = createEffect(() =>
		this.#actions$.pipe(
			ofType(clientsActions.delete),
			mergeMap(({ id }) =>
				this.#api.delete$(id).pipe(
					map(() => clientsActions.deleteSuccess({ id })),
					catchError(() => of(clientsActions.deleteFail())),
				),
			),
		),
	);

	onDeleteSuccessShowSnackbar$ = createEffect(
		() =>
			this.#actions$.pipe(
				ofType(clientsActions.deleteSuccess),
				tap(() => this.#openSnack("Používatel smazán")),
			),
		{ dispatch: false },
	);

	#openSnack(message: string) {
		this.#snack.open(message, "Zavřít", { horizontalPosition: "start" });
	}

	ngrxOnInitEffects() {
		return clientsActions.init();
	}
}
