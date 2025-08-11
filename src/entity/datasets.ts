import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { XrayData } from './xray-data.entity';

@Entity('datasets')
export class Dataset {
  @PrimaryColumn()
  id: string;  // مثل "66bb584d4ae73e488c30a072"

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => XrayData, (xrayData) => xrayData.dataset)
  xrayData: XrayData[];
}