


import { Prisma} from "@prisma/client";
import {  DefaultArgs } from "@prisma/client/runtime/library";
import { NextFunction, Response } from "express";
import { dictionarygetall } from "../model";
import { prisma } from '..';
import { PaginatedResponse } from "../utils/common";
export const getAlldictionary = async (
  req: dictionarygetall,
  res: Response,
  next: NextFunction
) => {

  const PageNumber = req.query.PageNumber || 1;
  const pageSize = Number(req.query.PageSize || 6);
  const Category = req.query.Category || "All";
  const SearchTerm = req.query.SearchTerm || "";

  let fidManyArgs: Prisma.dictionaryFindManyArgs<DefaultArgs> = {
    orderBy:{
      name:"asc"
    }
  };
 
//   if(Category==="Parent Categories"){
//     fidManyArgs.where={
//       catId:null
//     }
//     if(search){
//       fidManyArgs.where={
//         ...fidManyArgs.where,
//         name:{
//           contains:search,
//           mode:"insensitive"
//         },
      
//       }
//     }
//     fidManyArgs.include={
//       ...fidManyArgs.include,
//       sub_categories:{
//         include:{
//           category_dictionaries:{
//             include:{
//               dictionary:{
//                 include:{
//                   values:true
//                 }
//               }
//             }
          
//           }
//         }
//       }
//     }
//   }else if(Category==="Sub Categories"){
//     console.log("Sub Categories")
//     fidManyArgs.where={
//       parent_id:{
//         not:null
//       }
//     }
//     fidManyArgs.include={
//       ...fidManyArgs.include,
//       parent:true,
//       category_dictionaries:{
//         include:{
//           dictionary:{
//             include:{
//               values:true
//             }
//           }
//         }
      
//       }
//     }
//     if(search){
//       fidManyArgs.where={
//         ...fidManyArgs.where,
//       OR:[{  name:{
//           contains:search,
//           mode:"insensitive"
//         },},
//         {
//         parent:{
//           name:{
//               contains:search,
//             mode:"insensitive"}
//         }}]
//       }
//     }

//   } else{
    if(SearchTerm){
      fidManyArgs.where={
        name:{
          contains:SearchTerm,
          mode:"insensitive"
        }
      }
    }
    fidManyArgs.include={
      ...fidManyArgs.include,
   
    }
//   }
  fidManyArgs.skip = (PageNumber - 1) * pageSize;
  fidManyArgs.take = pageSize;
// console.log(JSON.stringify(fidManyArgs));
  const categories = await prisma?.dictionary.findMany(fidManyArgs);

  const currentPage = PageNumber ? Number(PageNumber) : 1;
  const pagesize = pageSize ? Number(pageSize) : 10;
  const totalCount =
    (await prisma?.dictionary.count({
      where: fidManyArgs.where,
    })) || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginatedResponse = new PaginatedResponse(categories, {
    currentPage: currentPage,
    pageSize: pagesize,
    totalCount: totalCount,
    totalPages: totalPages,
  });
  res.json(paginatedResponse);
};
