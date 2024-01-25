import { AppDataSource } from "../data-source";
import { Photo } from "./Photo";

/**
 * --- 參數類型介面 ---
 * @description [Photo_019cfcbc]. 用於傳入 "Photo" 的參數
 * @property {number} [Id] 唯一辨識碼 - number類型:  功能: 照片ID .
 * @property {string} [Name] 名稱 - string類型: 功能: 照片標名.
 */
export interface PhotoParams {
  Id?: number;
  Name?: string;
}

/**
 * CRUD Entity - Photo. [Photo_019cfcbc]
 * @class
 * @description [Photo_019cfcbc], Photo(照片) 增刪改功能
 */
export class PhotoCRUD {
  /**
   * 創建一個新的 Photo 實體。
   * @param {PhotoParams} params - 新的實體參數。可以傳入 Id, Name (中文名稱: 唯一辨識碼, 名稱)。
   * @returns {Promise<Photo>} 返回一個 Promise，包含新創建的 Photo 實體。
   * @description [Photo_019cfcbc]. 創建一個新的 Photo 實體。
   */
  async createPhoto(params: PhotoParams): Promise<Photo> {
    try {
      const photo = new Photo();
      photo.Id = params.Id;
      photo.Name = params.Name;
      return await AppDataSource.manager.save(photo);
    } catch (e) {
      console.log("Error in : PhotoCRUD - createPhoto " + e.toString());
      throw e;
    }
  }

  /**
   * 查詢指定 Photo 的數據。
   * @param {PhotoParams} params - 查詢條件，包括所有必要的字段。必須傳入  (中文名稱: )。
   * @returns {Promise<Photo[]>} 返回一個 Promise，包含符合條件的 Photo 實體數組。
   * @description [Photo_019cfcbc]. 查詢指定 Photo 的數據。
   */
  async getPhotos(params: PhotoParams): Promise<Photo[]> {
    try {
      return await AppDataSource.manager
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .where('photo.Id = :Id', params)
        .getMany();
      //
    } catch (e) {
      console.log("Error in : PhotoCRUD - getPhoto " + e.toString());
      throw e;
    }
  }

  /**
   * --- 更新指定 Photo 的資料 ---
   * entityID: []
   * @param {PhotoParams} params - 包含更新物件。必要傳入  (中文名稱: )
   * @param {boolean} isNotEmptyEnter - 如果為 true，則只更新非空的字段，預設為 false。
   * @returns {Promise<void>} 回傳一個 Promise，表示更新操作的完成。
   * @description [Photo_019cfcbc]. 更新指定 Photo 的資料。
   */
  async updatePhoto(
    params: PhotoParams,
    isNotEmptyEnter: Boolean = false
  ): Promise<void> {
    try {
      const updateData = {};
      if (isNotEmptyEnter ? params.Id : true) {
        updateData["Id"] = params.Id;
      }
      if (isNotEmptyEnter ? params.Name : true) {
        updateData["Name"] = params.Name;
      }

      await AppDataSource.manager
        .createQueryBuilder()
        .update(Photo)
        .set(updateData)
        .where("photo.Id = :Id", { Id: params.Id })
        .execute();
    } catch (e) {
      console.log("Error in : PhotoCRUD - upatePhoto " + e.toString());
      throw e;
    }
  }
}
