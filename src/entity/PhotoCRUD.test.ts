/**
 * Auto-generated JEST test code
 * Author: Jerry Huang, Henry Ford.
 * Generated on: 2024123231959
 *
 * The code below is automatically generated and should not be modified manually.
 */

import { describe, expect, test, jest, beforeAll } from "@jest/globals";
import { AppDataSource } from "../data-source";
import { PhotoCRUD } from "./PhotoCRUD";

jest.mock("../data-source", () => ({
  AppDataSource: {
    initialize: jest.fn().mockResolvedValue(undefined),
    manager: {
      save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
    },
  },
}));

jest.mock("./Photo", () => {
  return {
    Photo: function () {
      (this.Id = null), (this.Name = null);
    },
    PhotoCRUD: jest.fn().mockImplementation(() => ({
      createPhoto: jest
        .fn()
        .mockImplementation((photoData) => Promise.resolve(photoData)),
      getPhotos: jest
        .fn()
        .mockImplementation((query) => Promise.resolve([query])),
      updatePhoto: jest
        .fn()
        .mockImplementation((updateData) => Promise.resolve(updateData)),
    })),
  };
});

describe("PhotoCRUD operations", () => {
  let photoService: PhotoCRUD;

  beforeAll(async () => {
    await AppDataSource.initialize();
    photoService = new PhotoCRUD();
  });

  test("createPhoto", async () => {
    const photoData = { Id: 1, Name: "Pekora-tech" };

    const newPhoto = await photoService.createPhoto(photoData);
    expect(newPhoto).toEqual(photoData);
  });
});
