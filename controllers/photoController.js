import { json } from "express";
import Photo from "../models/photoModel.js";

const creatPhoto = async (req, res) => {
  // console.log("REQ BODY", req.body);
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({
      succeded: true,
      photo,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});
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
    const photo = await Photo.findById({ _id: req.params.id });

    res.status(200);
    res.render("photo", {
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
