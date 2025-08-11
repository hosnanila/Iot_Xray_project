import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Dataset } from './datasets';

@Entity('xray_data')
export class XrayData {
  @PrimaryGeneratedColumn('uuid') // یا 'increment' برای عددی
  id: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column('double precision')
  intensity: number;

  @Column('double precision')
  averageIntensity: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Dataset, (dataset) => dataset.xrayData, { nullable: false })
  dataset: Dataset;
}
