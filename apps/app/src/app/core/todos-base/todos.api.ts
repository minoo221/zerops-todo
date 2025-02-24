import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TodoAddPayload, TodoAddResponse, TodoEntity, TodoUpdatePayload, TodoUpdateResponse } from "./todos.model";

@Injectable({ providedIn: "root" })
export class TodosApi {
	#httpClient = inject(HttpClient);
	#apiUrl = `${process.env.Z_API_URL}/todos`;
	#clientId = process.env.Z_CLIENT_ID;

	add$(data: TodoAddPayload) {
		console.log(data);

		return this.#httpClient.post<TodoAddResponse>(this.#apiUrl, data);
	}

	update$(id: number, data: TodoUpdatePayload) {
		return this.#httpClient.put<TodoUpdateResponse>(`${this.#apiUrl}/${id}`, data);
	}

	delete$(id: number) {
		return this.#httpClient.delete(`${this.#apiUrl}/${id}`);
	}

	search$(clientId: number) {
		return this.#httpClient.get<TodoEntity[]>(`${this.#apiUrl}?clientId=${clientId}`);
	}

	markAllComplete$() {
		return this.#httpClient.patch<TodoUpdateResponse>(`${this.#apiUrl}/mark-all-as-completed?clientId=${this.#clientId}`, {});
	}
}
