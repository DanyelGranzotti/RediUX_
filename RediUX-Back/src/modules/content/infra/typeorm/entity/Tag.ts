import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";

@Entity("tag")
class Tag {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Content, (content) => content.id)
  content: Content[];
}
export { Tag };
