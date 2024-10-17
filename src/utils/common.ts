


import {  User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { PaginationMetaData } from "../model";



export const hashPassword = async (password = "Asdf@123$"): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a random salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const compareHashedPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const createJwtToken = (payload: object, secretKey: string): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  return token;
};

export const getUserFromToken = (token: string) => {
  if (process.env.JWT_SECRET_KEY) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as User;
    return decodedToken;
  }
  return null;
};

export const replaceNullWithEmptyString = <T extends object>(obj: any): T => {
  const newObj = { ...obj }; // Create a copy of the object to avoid mutation
  Object.keys(newObj).forEach((key: keyof any) => {
    if (newObj[key] === null) {
      newObj[key] = "" as T[keyof T];
    } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
      newObj[key] = replaceNullWithEmptyString(newObj[key] as object); // Add type assertion here
    }
  });
  return newObj as T;
};


export class PaginatedResponse<T> {
  data: T;
  metaData?: PaginationMetaData | null;
  message?: string;

  constructor(data: T, metaData?: PaginationMetaData | null, message?: string) {
    this.data = data;
    if (metaData) this.metaData = metaData;
    this.message = message;
  }
}

export function capitalizeFirstLetterOfEachWord(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function moveFile(oldPath: string, newPath: string) {
  if (!fs.existsSync(oldPath)) {
    console.error("The source file does not exist");
    return;
  }
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      if (err.code === "EXDEV") {
        copy();
      } else {
        console.error(err);
      }
      return;
    }
    // console.log('File moved successfully');
  });

  function copy() {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on("error", console.error);
    writeStream.on("error", console.error);

    readStream.on("close", function () {
      fs.unlink(oldPath, console.error);
    });

    readStream.pipe(writeStream);
  }
}

export async function moveFileAsync(oldPath: string, newPath: string) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(oldPath)) {
      console.error("The source file does not exist");
      return;
    }

    fs.rename(oldPath, newPath, async function (err) {
      if (err) {
        if (err.code === "EXDEV") {
          try {
            await copyAsync(oldPath, newPath);
            resolve("File moved successfully");
          } catch (error) {
            reject(error);
          }
        } else {
          reject(err);
        }
        return;
      }
      resolve("File moved successfully");
    });
  });
}

async function copyAsync(oldPath: string, newPath: string) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on("error", reject);
    writeStream.on("error", reject);

    readStream.on("close", function () {
      fs.unlink(oldPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("File moved successfully");
        }
      });
    });

    readStream.pipe(writeStream);
  });
}

export const getPlaceholderFile = (serverBaseUrl: string) => {
  return {
    id: "82a14567-70ae-46e3-9544-2b8eb39c2a34",
    name: "product-placeholder.png",
    path: "public/images/product-placeholder.png",
    url: `${serverBaseUrl}/images/product-placeholder.png`,
    mimeType: "image/png",
    size: 108544,
    created_at: "2024-04-18T04:46:08.995Z",
    updated_at: "2024-04-18T04:46:08.995Z",
    deleted_at: null,
  };
};




export const getStartDate = (filter: "today" | "week" | "month" | "year") => {
  const now = new Date();
  switch (filter) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "week":
      const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      return new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "year":
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date();
  }
};






