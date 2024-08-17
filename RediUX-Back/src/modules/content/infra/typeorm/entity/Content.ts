import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./Tag";

@Entity("content")
class Content {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  autor: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  media_type: string;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable({
    name: "content_tags",
    joinColumn: {
      name: "content_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];
}

export { Content };
