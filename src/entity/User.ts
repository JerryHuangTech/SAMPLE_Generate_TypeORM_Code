import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Photo } from "./Photo";

/**
 * Entity - User. [User_9c839f6b]
 * @class
 * @description [User_9c839f6b], User(用戶) 物件項目之框架
 */
@Entity()
export class User {
  /**
   * 1-[193428D4-273E-4F82-914E-F330C4F13005] 唯一辨識碼
   * @property {number} [User]
   * @description  功能: 用戶ID
   */
  @PrimaryGeneratedColumn()
  Id!: number;

  /**
   * 2-[2DF18999-6A48-46D6-8F6F-EE11355681BB] URL
   * @property {string} [User]
   * @description  功能: 用戶的個人網址
   */
  @Column()
  Url?: string;

  /**
   * 3-[E63FFC33-CA46-41BD-B3A0-1C473FA1B8BB] 照片
   * @property {Photo[]} [User]
   * @description  功能: 用戶可擁有多個照片
   * @relation User - 與Photo的OneToMany關聯
   */
  @OneToMany(() => Photo, (photo) => photo.User)
  Photo?: Photo[];
}
