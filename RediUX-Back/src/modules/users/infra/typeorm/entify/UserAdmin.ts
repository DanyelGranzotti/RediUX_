import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_admin")
class UserAdmin {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export { UserAdmin };
