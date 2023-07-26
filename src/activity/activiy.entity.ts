import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/entity/user.entity';
  
  @Entity('activity')
  export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    owner_id: string;
  
    @Column()
    editorId: string;

    @Column()
    origin: string;

    @Column()
    details: string;
  
    @CreateDateColumn()
    createDate: Date;
  
    @UpdateDateColumn()
    updateDate: Date;
  
    /**
     * relationships
     */
    @ManyToOne(() => User, (data) => data.id)
    @JoinColumn({ name: 'owner_id' })
    user: User;
  }
  