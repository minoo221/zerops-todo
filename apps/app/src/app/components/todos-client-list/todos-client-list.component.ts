import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ClientEntity } from '../../core/clients-base/clients.model';

@Component({
  selector: 'z-todos-client-list',
  imports: [MatChipsModule],
  templateUrl: './todos-client-list.component.html',
  styleUrl: './todos-client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosClientListComponent {
  clients = input<ClientEntity[]>([]);
  deleteItem = output<number>();
  selectClient = output<number>();
}
