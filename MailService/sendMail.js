import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thienkhtn113@gmail.com",
    pass: "clro qsdu vgqv hzwt",
  },
});

const sendEmail = async (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { sendEmail };
