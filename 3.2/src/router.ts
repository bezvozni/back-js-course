import express from 'express'
//import controller from './controler'
import bodyParser from 'body-parser'

const urlEncodedParser = bodyParser.urlencoded({extended : false})

export const router = express.Router();

router.use('/', (req,res)=>{
    res.render('book-page.pug', { books: [
      {name: 'one', authors: ['gog','gricha'], year: 1991, clicks: 5},
      {name: 'two', authors: ['bob', 'tiche'], year: 2020, clicks: 10},
    ]})
  })
