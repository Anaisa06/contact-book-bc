import { Contact } from "src/contacts/entities/contact.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        name: 'phone_number'
    })
    phoneNumber: string;

    @Column({
        type: 'boolean',
        default: false
    })
    onboarding: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    syncronization: boolean;

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
}