import { Role } from "src/common/enums/role.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        name: 'phone_number',
        nullable: true
    })
    phoneNumber: string;

    @Column({
        type: 'decimal',
        default: 6.219129692661363
    })
    latitude: number;

    @Column({
        type: 'decimal',
        default: -75.58361012412955
    })
    longitude: number;

    @Column({
        type: 'enum',
        enum: Role,
        nullable: true
    })
    role: Role;

    @Column({
        name: 'image_uri',
        nullable: true
    })
    imageUri: string;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}
