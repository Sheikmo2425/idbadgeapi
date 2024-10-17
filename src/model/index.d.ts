import { Request } from 'express';
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    employeeId?: string;
  }
}

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}
export type PaginationMetaData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};
export interface BaseQuery{

  role?:string,
  Category?: number|null;
  OrderBy?: string;
  SearchTerm?: string;
  PageNumber: number;
  PageSize: number;
  DepartmentID?:number
  IsActive?:string
  StoreId?:string
  
}


export interface BaseParams{
  id:string
}

export interface dictionarygetall extends Request{

  query:BaseQuery,
  
}