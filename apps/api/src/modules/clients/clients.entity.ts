import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from '../todos/todos.entity';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @OneToMany(() => Todo, (todo) => todo.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  todos: Todo[];
}
