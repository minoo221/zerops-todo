import { inject } from "@angular/core";
import { Store, createActionGroup, createFeature, createReducer, emptyProps, on, props, select } from "@ngrx/store";
import { FEATURE_NAME, ClientsState, ClientEntity, ClientAddPayload, ClientAddResponse } from "./clients.model";

const initialState: ClientsState = {
	data: [],
};

export const clientsActions = createActionGroup({
	source: FEATURE_NAME,
	events: {
		init: emptyProps(),

		get: emptyProps(),
		"get success": props<{ res: ClientEntity[] }>(),
		"get fail": emptyProps(),

		getOne: props<{ clientId: string }>(),
		"getOne success": props<{ res: ClientEntity[] }>(),
		"getOne fail": emptyProps(),

		add: props<{ payload: ClientAddPayload }>(),
		"add success": props<{ res: ClientAddResponse }>(),
		"add fail": emptyProps(),

		delete: props<{ id: number }>(),
		"delete success": props<{ id: number }>(),
		"delete fail": emptyProps(),
	},
});

export const clientsState = createFeature({
	name: FEATURE_NAME,
	reducer: createReducer(
		initialState,
		on(clientsActions.getSuccess, (state, { res }) => ({
			...state,
			data: res,
		})),
		on(clientsActions.getOneSuccess, (state, { res }) => ({
			...state,
			data: res,
		})),
		on(clientsActions.addSuccess, (state, { res }) => ({
			...state,
			data: [res, ...state.data],
		})),
		on(clientsActions.deleteSuccess, (state, { id }) => ({
			...state,
			data: state.data.filter((todo) => todo.id !== id),
		})),
	),
});

export function clientsEntity() {
	const store = inject(Store);
	return {
		clients$: store.pipe(select(clientsState.selectData)),
	};
}
