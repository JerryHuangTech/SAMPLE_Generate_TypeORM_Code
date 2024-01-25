import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Photo } from "./Photo";

/**
 * --- 參數類型介面 ---
 * @description [User_9c839f6b]. 用於傳入 "User" 的參數 
 * @property {number} [Id] 唯一辨識碼 - number類型:  功能: 用戶ID . 
 * @property {string} [Url] URL - string類型:  功能: 用戶的個人網址 . 
 * @property {Photo[]} [Photo] 照片 - 參考類型:  功能: 用戶可擁有多個照片 . 
 */
export interface UserParams {
  Id?: number;
  Url?: string;
  Photo?: Photo[];
};

/**
 * CRUD Entity - User. [User_9c839f6b]
 * @class
 * @description [User_9c839f6b], User(用戶) 增刪改功能
 */
export class UserCRUD {
  /**
   * 創建一個新的 User 實體。
   * @param {UserParams} params - 新的實體參數。可以傳入 Id, Url, Photo (中文名稱: 唯一辨識碼, URL, 照片)。
   * @returns {Promise<User>} 返回一個 Promise，包含新創建的 User 實體。
   * @description [User_9c839f6b]. 創建一個新的 User 實體。 
   */
  async createUser(params: UserParams): Promise<User> {
    try {
      const user = new User();
      user.Id = params.Id;
      user.Url = params.Url;
      user.Photo = params.Photo;
      return await AppDataSource.manager.save(user);      
    } catch (e) {
      console.log("Error in : UserCRUD - createUser " + e.toString());
      throw e;
    }
  }
  
  /**
   * 查詢指定 User 的數據。
   * @param {UserParams} params - 查詢條件，包括所有必要的字段。必須傳入 Id (中文名稱: 唯一辨識碼)。
   * @returns {Promise<User[]>} 返回一個 Promise，包含符合條件的 User 實體數組。
   * @description [User_9c839f6b]. 查詢指定 User 的數據。
   */
  async getUsers(params: UserParams): Promise<User[]> {
    try {
      return await AppDataSource.manager
      .getRepository(User)
      .createQueryBuilder("user").leftJoinAndSelect("user.Photo", "photo")
      .where("user.Id = :Id", params)
      .getMany()
      // .then((entities) => entities.map((entity) => entity.photo));
    } catch (e) {
      console.log("Error in : UserCRUD - getUser " + e.toString());
      throw e;
    }
  }
  
  /**
   * --- 更新指定 User 的資料 ---
   * entityID: [User_9c839f6b]
   * @param {UserParams} params - 包含更新物件。必要傳入 Id (中文名稱: 唯一辨識碼)
   * @param {boolean} isNotEmptyEnter - 如果為 true，則只更新非空的字段，預設為 false。
   * @returns {Promise<void>} 回傳一個 Promise，表示更新操作的完成。
   * @description [User_9c839f6b]. 更新指定 User 的資料。
   */
  async updateUser(params: UserParams, isNotEmptyEnter: Boolean = false): Promise<void> {
    try{
      const updateData = {};
      if (isNotEmptyEnter ? params.Url : true) { updateData["Url"] = params.Url; };
       if (isNotEmptyEnter ? params.Photo : true) { updateData["Photo"] = params.Photo; };

      await AppDataSource.manager
      .createQueryBuilder()
      .update(User)
      .set(updateData)
      .where("user.Id = :Id", { Id: params.Id })
      .execute();
    } catch (e) {
      console.log("Error in : UserCRUD - upateUser " + e.toString());
      throw e;
    }
  }
}