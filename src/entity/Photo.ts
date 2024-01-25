import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';

/**
 * Entity - Photo. [Photo_019cfcbc]
 * @class
 * @description [Photo_019cfcbc], Photo(照片) 物件項目之框架
 */
@Entity()
export class Photo {
  /**
   * 1-[CEDDA81A-32C9-4C86-A49D-68572CDB15F1] 唯一辨識碼
   * @property {number} [Photo]
   * @description  功能: 照片ID
   */
  @Column()
  Id!: number;

  /**
   * 2-[3DC280DF-735C-4D05-A970-C176F690ED4C] 名稱
   * @property {string} [Photo]
   * @description 功能: 照片標名
   */
  @Column()
  Name?: string;

  /**
   * Relation to User
   * @property {User} [User]
   * @description 被關聯項目自動生成
   * @relation Photo - 與User的ManyToOne關聯
   */
  @ManyToOne(() => User, (user) => user.Photo)
  User?: User;
}
