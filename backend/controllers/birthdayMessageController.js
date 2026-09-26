import BirthdayMessage from "../models/rara.model.js";

export const saveBirthdayMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const newMessage = await BirthdayMessage.create({
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Birthday message saved successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};