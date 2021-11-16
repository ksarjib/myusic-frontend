export class User {

  constructor(
    public id: string,
    public fName: string,
    public lName: string,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public dob: string,
    public username: string,
    public gender: number,
    public category: number,
    public status?: number
  ) { }

}