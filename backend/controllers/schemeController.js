import Scheme from "../models/Scheme.js"
import logger from "../utils/logger.js"

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find()
    res.status(200).json(schemes)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schemes", error: err.message })
  }
}

export const createScheme = async (req, res) => {
  try {
    const newScheme = new Scheme({
      ...req.body,
      addedBy: req.user._id,
    })

    const saved = await newScheme.save()
    logger.info(`${newScheme.name} scheme is added successfully by: ${req.user.email}`)
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: "Failed to create scheme", error: err.message })
  }
}

export const updateScheme = async (req, res) => {
  try {
    const updated = await Scheme.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    if (!updated) return res.status(404).json({ message: "Scheme not found" })
    logger.info(`${updated.name} scheme is updated successfully by ${req.user.email}`)
    res.status(200).json(updated)
  } catch (err) {
    logger.warn(`scheme updated Failed`)
    res.status(500).json({ message: "Failed to update scheme", error: err.message })
  }
}

export const deleteScheme = async (req, res) => {
  try {
    const deleted = await Scheme.findByIdAndDelete(req.params.id)
    const schemeName = deleted.name;
    if (!deleted) return res.status(404).json({ message: "Scheme not found" })
      logger.info(`${schemeName} scheme is deleted successfully by: ${req.user.email}`)
    res.status(200).json({ message: "Scheme deleted successfully" })
  } catch (err) {
    logger.warn(`scheme deletion is failed`)
    res.status(500).json({ message: "Failed to delete scheme", error: err.message })
  }
}

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id)

    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" })
    }

    res.status(200).json(scheme)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch scheme", error: err.message })
  }
}