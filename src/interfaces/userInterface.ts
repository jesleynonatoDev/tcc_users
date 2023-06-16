export interface UserInterface extends CreateAt {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface CreateAt {
    date: Date
}