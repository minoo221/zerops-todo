import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class TodoClientAddFormInstance {
	#defaultValues = {
		clientName: "",
	};
	#form = new FormGroup({
		clientName: new FormControl<string>(this.#defaultValues.clientName, {
			validators: [Validators.required],
			nonNullable: true,
		}),
	});

	getControls() {
		return this.#form;
	}

	reset() {
		this.#form.reset(this.#defaultValues);
	}
}
