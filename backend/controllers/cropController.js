import Crop from "../models/Crop.js"
import logger from "../utils/logger.js";

export async function getAllCrops(req, res) {
  try {
    const crops = await Crop.find();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createCrop(req, res) {
  try {
    const {
      name,
      season,
      pesticides,
      fertilizers,
      imageUrl,
      cropType,
      waterRequirement,
      soilType,
      growthDuration,
      averageYield
    } = req.body;

    const crop = new Crop({
      name,
      season,
      pesticides,
      fertilizers,
      imageUrl,
      cropType,
      waterRequirement,
      soilType,
      growthDuration,
      averageYield,
      addedBy: req.user ? req.user._id : null
    });

    const createdCrop = await crop.save();
    logger.info(`new crop added successfully by: ${req.user.email}`)
    res.status(201).json(createdCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function updateCrop(req, res) {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    Object.assign(crop, req.body);
    const updatedCrop = await crop.save();
    logger.info(`${crop.name} crop updated successfully by ${req.user.email}`)
    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCrop(req, res) {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    const cropName = crop.name;
    await crop.remove();
    logger.info(`${cropName} crop is deleted by ${req.user.email}`)
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id)

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" })
    }

    res.status(200).json(crop)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Crop", error: err.message })
  }
}