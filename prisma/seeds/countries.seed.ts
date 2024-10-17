import fs from 'fs';
import csv from 'csv-parser';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import path from 'path';
import {faker} from '@faker-js/faker'



const seedCountries = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
  const countries:any[] = [];
  const csvFilePath = path.resolve(__dirname, '../../public/countries.csv');


  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const countryData = {
          id: row.name?.trim()?.toLowerCase() === "singapore" ? "1fadf10d-8c9d-452a-9e09-1d88d465f548" : faker.string.uuid(),
          name: row.name,
          currency_symbol: row.currency_symbol,
          countryCode: row.iso2,
          currencyCode: row.currency,
          phone_code: row.phone_code,
        };
        countries.push(countryData);
      })
      .on('end', async () => {
        try {
          await prisma.country.createMany({
            data: countries,
            skipDuplicates: true
          });
          resolve("OK");
        } catch (error) {
          reject(error);
        }
      });
  });
};

export default seedCountries;
