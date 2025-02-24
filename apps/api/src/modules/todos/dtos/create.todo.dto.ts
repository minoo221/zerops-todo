import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {
	@ApiProperty({ description: "clientId - use your initials" })
	@IsNumber()
	readonly clientId: number;

	@ApiProperty({ description: "The text of the todo item" })
	@IsString()
	readonly text: string;

	@ApiProperty({
		description: "The completion status of the todo item",
		default: false,
	})
	@IsBoolean()
	readonly completed: boolean;
}
