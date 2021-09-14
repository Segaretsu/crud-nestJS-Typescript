import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  isbn: number;

  @Column()
  nombre: string;

  @Column()
  autor: string;  
}