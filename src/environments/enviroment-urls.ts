export const enviromentUrls = {
    login: `http://localhost:3001/users/login`,
    createUser: `http://localhost:3001/users/create`,
    verifyUser: (name: string) => `http://localhost:3001/users/exist-name?name=${name}`,
    verifyEmail: (email: string) => `http://localhost:3001/users/exist-email?email=${email}`,
    listCategorys: `http://localhost:3001/category`,
    getBooksByToken: `http://localhost:3001/books/owner`,
    createBook: `http://localhost:3001/books/owner`

}