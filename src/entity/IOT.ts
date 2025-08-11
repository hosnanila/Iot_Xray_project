import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class XrayData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('float')
  intensity: number;

  @Column('float')
  averageIntensity: number;
}
