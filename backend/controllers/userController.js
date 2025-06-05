import User from "../models/Users.js";
import logger from "../utils/logger.js"

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "Failed to load user profile", error: err.message })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const {
      name,
      email,
      phone,
      profile,
      bank
    } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
        profile,
        bank
      },
      { new: true, runValidators: true }
    ).select("-password")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    logger.info(`User Profile updated successfully: ${email}`)
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message })
  }
}

export const uploadUserDocument = async (req, res) => {
    const { type, url, uploadedAt } = req.body; 
    const userId = req.user._id;

    if (!type || !url || !uploadedAt) {
        return res.status(400).json({ message: 'Document type (as "type") and document URL (as "url") and upload Date in string (as "uploadedAt") are required.' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const existingDocIndex = user.documents.findIndex(doc => doc.docName === type);

        let httpStatus = 200; 
        let successMessage = `Document '${type}' updated successfully.`;

        if (existingDocIndex > -1) {
            user.documents[existingDocIndex].docUrl = url;
            user.documents[existingDocIndex].uploadedOn = uploadedAt;
        } else {
            user.documents.push({ docName: type, docUrl: url , uploadedOn: uploadedAt  });
            httpStatus = 201;
            successMessage = `Document '${type}' added successfully.`;
        }

        await user.save();
        console.log(user)
        logger.info(`Ducument ${docName} uploaded Successfully by ${user.email}`)
        res.status(httpStatus).json({
            message: successMessage,
            documents: user.documents
        });

    } catch (error) {
        console.error('Error processing user document:', error);
        if (error.name === 'ValidationError') {
          logger.warn(`Document Upload failed: ${req.user.email}`)
            return res.status(400).json({ message: error.message, errors: error.errors });
        }
        res.status(500).json({ message: 'Server error while processing document.' });
    }
};