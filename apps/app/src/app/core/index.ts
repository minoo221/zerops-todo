import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TodosEffects } from './todos-base/todos.effects';
import { todosState } from './todos-base/todos.state';
import { clientsState } from './clients-base/clients.state';
import { ClientsEffects } from './clients-base/clients.effects';

export const CORE_EFFECTS = [provideEffects(TodosEffects)] as const;

export const CORE_CLIENT_EFFECTS = [provideEffects(ClientsEffects)] as const;

export const CORE_STATE = [provideState(todosState)] as const;

export const CORE_CLIENT_STATE = [provideState(clientsState)] as const;
