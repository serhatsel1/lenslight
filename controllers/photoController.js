import { json } from "express";
import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const creatPhoto = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "lenslight",
    }
  );
  console.log("RESULT -->", result);

  // console.log("REQ BODY", req.body);
  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
      url: result.secure_url,
      image_id: result.public_id,
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(201).redirect("users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = res.locals.user
      ? await Photo.find({ user: { $ne: res.locals.user._id } })
      : await Photo.find({});
    res.status(200);
    res.render("photos", {
      photos,
      link: "photos",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById({ _id: req.params.id }).populate("user");
    let isOwner = false;

    if (res.locals.user) {
      isOwner = photo.user.equals(res.locals.user._id);
    }

    if (!photo) {
      // Fotoğraf bulunamazsa, uygun bir hata mesajı ile birlikte kullanıcıya geri dön
      return res.status(404).json({
        succeded: false,
        error: "Photo not found",
      });
    }

    res.status(200).render("photo", {
      photo,
      link: "photos",
      isOwner,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    const photo_id = photo.image_id;

    await cloudinary.uploader.destroy(photo_id);

    await Photo.findOneAndDelete({ _id: req.params.id });

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const updatePhoto = async (req, res) => {
  try {
    let photo = await Photo.findById(req.params.id);

    if (req.files) {
      const photoId = photo.image_id;
      await cloudinary.uploader.destroy(photoId);

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          user_filename: true,
          folder: "lenslight",
        }
      );
      photo.url = result.secure_url;
      photo.image_id = result.public_id;

      fs.unlinkSync(req.files.image.tempFilePath);
    }
    photo.name = req.body.name;
    photo.description = req.body.description;

    photo.save();

    res.status(200).redirect(`/photos/${req.params.id}`);
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

export { creatPhoto, getAllPhotos, getAPhoto, deletePhoto, updatePhoto };
