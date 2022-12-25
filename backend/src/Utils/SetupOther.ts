import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

export default (app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(helmet())
}