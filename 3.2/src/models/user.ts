import { Query, QueryResult } from 'pg'
import { db } from '../connectDB'

// select books by limit and offset
export async function getBooks(offset:number, limit = 10) {
    const q = `select books.name, string_agg(authors.name, ', ') as authors from books
    join books_authors on books_authors.book = books.id
    join authors on authors.id = books_authors.author
    and books.del = false
    group by books.name
    limit $1 offset $2`
    return await db.query(q, [limit, offset])
}

//search 
export async function search(query:string) {
    const q = `select books.name, string_agg(authors.name, ', ') as authors from books
    join books_authors on books_authors.book = books.id
    join authors on authors.id = books_authors.author 
    where authors.name like '$1' or books.name like '$1'
    group by books.name`
    return await db.query(q, [query])
}

//author
export async function getBooksByAuthor(id:number) {
    const q = `select books.name, string_agg(authors.name, ', ') as authors from books
    join books_authors on books_authors.book = books.id
    join authors on authors.id = books_authors.author
    where authors.id = $1
    group by books.name`
    return await db.query(q, [id])
}

//year
export async function getBooksByYear(year:number) {
    const q = `select books.name, string_agg(authors.name, ', ') as authors from books
    join books_authors on books_authors.book = books.id
    join authors on authors.id = books_authors.author
    where books.year = $1
    group by books.name`
    return await db.query(q, [year])

}

//book by id
export async function getBook(id: number):Promise<QueryResult<any>> {
    const q = `select books.id, books.name, books.year, string_agg(authors.name, ', ') as authors from books
    join books_authors on books_authors.book = books.id
    join authors on authors.id = books_authors.author
    where books.id = $1
    group by books.id`
    return await db.query(q, [id])
}
