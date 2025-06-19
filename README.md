# Library CRUD

## Objective

Make a Library Management System using latest version of TypeScript.
Making a CRUD ( Create, Read, Update, Delete ), where it connects to SQL or NoSQL database
## Functional Requiriments

 - Must Be an API
 - The book structure is:
	 - Title
	 - Author
	 - ISBN
	 - Published Year
	 - ( Opitional ) Editing Entity
## Technical Requiriments
 - Latest version of Typescript
 - Any type of Database

## How to run 
To run this project you will need NodeJs v20.15 or above.

 - Clone this project on your machine
 `git clone https://github.com/KsmKayk/fiap-fullstack-challenges.git`
 - Go to this branch **phase1-library-crud**
   `git checkout phase1-library-crud`
 - Install project dependencies
`yarn install` or `npm install` or `pnpm install`
 - Run migrations
`npx prisma migrate`
 - start the project
 `yarn dev` or `npm run dev`

## API Routes

Base url: `http://localhost:3333/`

### Health Check

| Method | Route | Description      | Body/Query Params |
| ------ | ----- | ---------------- | ----------------- |
| GET    | `/`   | Hello World Test | -                 |

---

### Books

| Method | Route        | Description              | Body/Query Params                                                                                                                                                   |
| ------ | ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/books`     | List all books or filter | Query: `id?: string`, `title?: string`                                                                                                                              |
| POST   | `/books`     | Create a new book        | Body: <br> `title: string` <br> `author: string` <br> `isbn: string` <br> `publishedYear: number` <br> `editingEntityId?: string` <br> `editingEntityName?: string` |
| PUT    | `/books/:id` | Update a book            | Body: <br> `title?: string` <br> `author?: string` <br> `isbn?: string` <br> `publishedYear?: number`                                                               |
| DELETE | `/books/:id` | Delete a book            | -                                                                                                                                                                   |

---

### Editing Entities

| Method | Route                                      | Description                              | Body/Query Params                     |
| ------ | ------------------------------------------ | ---------------------------------------- | ------------------------------------- |
| GET    | `/editing-entities`                        | List all editing entities or filter      | Query: `id?: string`, `name?: string` |
| POST   | `/editing-entities`                        | Create a new editing entity              | Body: <br> `name: string`             |
| PUT    | `/editing-entities/:id`                    | Update an editing entity                 | Body: <br> `name: string`             |
| DELETE | `/editing-entities/:id`                    | Delete an editing entity                 | -                                     |
| POST   | `/editing-entities/:id/connect/:bookId`    | Connect a book to an editing entity      | -                                     |
| POST   | `/editing-entities/:id/disconnect/:bookId` | Disconnect a book from an editing entity | -                                     |

---

## Examples

### Create a Book

```json
POST /books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "publishedYear": 2008,
  "editingEntityId": "optional-entity-id",
  "editingEntityName": "optional-entity-name"
}
```

### Create an Editing Entity

```json
POST /editing-entities
{
  "name": "Editora Exemplo"
}
```

---

## Observations

- I've used Insomnia to test the API, the Requests export is the file InsomniaRequests.json.
- All endpoints returns JSON.
- If you provide both `editingEntityId` and `editingEntityName` when creating a book, the `editingEntityId` will be checked. If it exists, it will check if the `editingEntityName` matches the existing entity. If it does not match, it will return an error.
- If you provide an `editingEntityId` that does not exist, it will return an error.
- If you provide an `editingEntityName` that does not exist, it will create a new editing entity with that name.

