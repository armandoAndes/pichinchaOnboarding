export interface BookRegister {
    name: string;
    image: string;
    url: string;
    summary: string;
    nameAuthor: string;
    public: boolean;
    category: string[];
    title: string;
    id?: string;
    isbn13?: number;
    price?: number;
    userRegister?: string;
    resume?: string;
    author?: string;
}
export interface SelectComponentItemInterface {
    label: string;
    value: string;
}