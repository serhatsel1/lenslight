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
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

export { creatPhoto, getAllPhotos, getAPhoto };
