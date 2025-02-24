import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from '../clients/clients.entity';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @Column()
  text: string;

  @Column()
  clientId: number;

  @ManyToOne(() => Client, (client) => client.todos, {
    onDelete: 'CASCADE',
  })
  client: Client;
}
