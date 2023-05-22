export interface ResponseCreateBookInterface {
    cod: string;
    status: boolean;
}
export interface RequestCreateBookInterface {
    title: string;
    author: string;
    resume: string;
    image: string;
    url: string;
    userRegister: string;
    category: number[];
    public: boolean;
    isbn13: 2;
    price: number;
}