import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClientAddPayload, ClientAddResponse, ClientEntity } from "./clients.model";

@Injectable({ providedIn: "root" })
export class ClientsApi {
	#httpClient = inject(HttpClient);
	#apiUrl = `${process.env.Z_API_URL}/clients`;
	#clientId = process.env.Z_CLIENT_ID;

	get$() {
		return this.#httpClient.get<ClientEntity[]>(`${this.#apiUrl}`);
	}

	getOne$() {
		return this.#httpClient.get<ClientEntity[]>(`${this.#apiUrl}/${this.#clientId}`);
	}

	add$(data: ClientAddPayload) {
		return this.#httpClient.post<ClientAddResponse>(this.#apiUrl, {
			...data,
			clientId: this.#clientId,
		});
	}

	delete$(id: number) {
		return this.#httpClient.delete(`${this.#apiUrl}/${id}`);
	}
}
