import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "content",
    });
    //file has been uploaded successfully
    console.log("Response from cloudinary", response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log("Error occured while uploading the file at cloudinary", error);

    return null;
  }
};

const removeFromCloudinary = async (oldImageURL) => {
  try {
    const oldImage = oldImageURL.slice(-24, -4);
    console.log(oldImage);

    if (!oldImage) return null;
    //remove from cloudinary
    const response = await cloudinary.uploader.destroy(oldImage, {
      resource_type: "image",
    });
    console.log("Respons from cloudinary", response);
    return response;
  } catch (error) {
    console.log("Error occured while removing the file from cloudinary", error);
    return null;
  }
};
// const removeImageFromCloudinary = async (oldImageURL) => {
//   try {
//     const oldImage = oldImageURL.slice(-24, 85);
//     console.log(oldImage);

//     if (!oldImage) return null;
//     //remove from cloudinary
//     const response = await cloudinary.uploader.destroy(oldImage, {
//       resource_type: "image",
//     });
//     console.log("Respons from cloudinary", response);
//     return response;
//   } catch (error) {
//     console.log("Error occured while removing the file from cloudinary", error);
//     return null;
//   }
// };


//without folder
// const removeImageFromCloudinary = async (oldImageURL) => {
//   try {
//     // Extract the public ID correctly (Cloudinary URL pattern may vary)
//     const urlParts = oldImageURL.split("/");
//     console.log("URL Parts:", urlParts);

//     const filenameWithExt = urlParts[urlParts.length - 1]; // Get last part of the URL
//     console.log("Filename with Extension:", filenameWithExt);
//     const publicId = filenameWithExt.split(".")[0]; // Remove file extension

//     console.log("Public ID:", publicId);

//     if (!publicId) return null;

//     // Remove from Cloudinary
//     const response = await cloudinary.uploader.destroy(publicId, {
//       resource_type: "image",
//       folder: "content",
//     });

//     console.log("Response from Cloudinary:", response);
//     return response;
//   } catch (error) {
//     console.log("Error occurred while removing the file from Cloudinary", error);
//     return null;
//   }
// };


const removeImageFromCloudinary = async (imageURL) => {
  try {
    // Extract folder and file name from the URL
    const urlParts = imageURL.split("/");
    const folderAndFilename = urlParts.slice(-2).join("/"); // Extracts folder/filename.ext
    const publicId = folderAndFilename.split(".")[0]; // Removes file extension

    if (!publicId) return null;

    // Delete from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log("Response from Cloudinary:", response);
    return response;
  } catch (error) {
    console.error("Error removing image from Cloudinary:", error);
    return null;
  }
};

export {
  uploadOnCloudinary,
  removeFromCloudinary,
  removeImageFromCloudinary,
};
