/**
 * Auto-generated JEST test code
 * Author: Jerry Huang, Henry Ford.
 * Generated on: 2024123231958
 *
 * The code below is automatically generated and should not be modified manually.
 */

import { describe, expect, test, jest, beforeAll } from "@jest/globals";
import { AppDataSource } from "../data-source";
import { UserCRUD } from "./UserCRUD";
import { PhotoCRUD } from "./PhotoCRUD";

jest.mock("../data-source", () => ({
  AppDataSource: {
    initialize: jest.fn().mockResolvedValue(undefined),
    manager: {
      save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
    },
  },
}));

jest.mock("./User", () => {
  return {
    User: function () {
      (this.Id = null), (this.Url = null), (this.Photo = null);
    },
    UserCRUD: jest.fn().mockImplementation(() => ({
      createUser: jest
        .fn()
        .mockImplementation((userData) => Promise.resolve(userData)),
      getUsers: jest
        .fn()
        .mockImplementation((query) => Promise.resolve([query])),
      updateUser: jest
        .fn()
        .mockImplementation((updateData) => Promise.resolve(updateData)),
    })),
  };
});

jest.mock("./Photo", () => {
  return {
    Photo: function () {
      (this.Id = null), (this.Name = null);
    },
    PhotoCRUD: jest.fn().mockImplementation(() => ({
      createPhoto: jest
        .fn()
        .mockImplementation((photoData) => Promise.resolve(photoData)),
    })),
  };
});

describe("UserCRUD operations", () => {
  let userService: UserCRUD;
  let photoService: PhotoCRUD;

  beforeAll(async () => {
    await AppDataSource.initialize();
    userService = new UserCRUD();
    photoService = new PhotoCRUD();
  });

  test("createUser and createPhoto", async () => {
    const userData = { Id: 1, Url: "http://google.com", Photo: null };
    const photoData = { Id: 1, Name: "Pekora-tech" };

    const newPhoto = await photoService.createPhoto(photoData);
    expect(newPhoto).toEqual(photoData);

    userData.Photo = newPhoto;

    const newUser = await userService.createUser(userData);
    expect(newUser).toEqual(userData);
  });
});
