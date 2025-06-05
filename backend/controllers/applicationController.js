import Application from "../models/Application.js"
import Scheme from "../models/Scheme.js"
import logger from "../utils/logger.js"

export const applyToScheme = async (req, res) => {
  try {
    const schemeId = req.params.schemeId
    const userId = req.user._id

    const scheme = await Scheme.findById(schemeId)
    if (!scheme) return res.status(404).json({ message: "Scheme not found" })

    const existingApp = await Application.findOne({ user: userId, scheme: schemeId })
    if (existingApp){
      logger.warn(`Applicarion failed can not apply to already applied scheme userID: ${userId}`)
      return res.status(400).json({ message: "Already applied to this scheme" })}

    const {
      name,
      dateOfBirth,
      address,
      aadharNumber,
      landHolding,
      income,
      education,
      farmingExperience,
      bankName,
      bankAccount,
      ifscCode,
    } = req.body.filledInfo

    const {
      documents
    } = req.body

    const newApp = new Application({
      user: userId,
      scheme: schemeId,
      filledInfo: {
        name,
        dateOfBirth,
        address,
        aadharNumber,
        landHolding,
        income,
        education,
        farmingExperience,
        bankName,
        bankAccount,
        ifscCode
      },
      documents
    })

    const savedApp = await newApp.save()
    logger.info(`Application successfull for scheme: ${schemeId} by user: ${userId}`)
    res.status(201).json(savedApp)
  } catch (err) {
    res.status(500).json({ message: "Failed to apply", error: err.message })
  }
}

export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id
    const applications = await Application.find({ user: userId }).populate("scheme", "title schemeType")
    res.status(200).json(applications)
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications", error: err.message })
  }
}

export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("user", "name email")
      .populate("scheme", "title schemeType")
    res.status(200).json(apps)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications", error: err.message })
  }
}

export const updateApplicationStatus = async (req, res) => {
  try {
    const appId = req.params.id
    const { status, remark } = req.body

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const updatedApp = await Application.findByIdAndUpdate(
      appId,
      {
        status, remark,
        reviewedAt: new Date(),
        reviewedBy: req.user._id
      },
      { new: true }
    )

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" })
    }
    logger.info(`applicarion ${appId} is ${status} by ${req.user.email}`)
    res.status(200).json(updatedApp)
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message })
  }
}

export const getMySingleApplication = async (req, res) => {
  try {
    const appId = req.params.id
    const userId = req.user._id

    const application = await Application.findOne({ _id: appId, user: userId }).populate("user", "email phone")
      .populate("scheme", "title schemeType fullDescription")
    
    if (!application) {
      return res.status(404).json({ message: "Application not found or access denied" })
    }

    res.status(200).json(application)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch application", error: err.message })
  }
}