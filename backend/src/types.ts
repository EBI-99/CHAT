import { Request } from 'express'

// Interface DataBase
export interface UserInterface {
    username: string
    email: string
    password: string
}

// User Authentication
export interface DataStore {
    _id: string
}

export interface RequestUser extends Request {
    user: DataStore
}

