export class Person {

    private _firstName: string;
    private _lastName: string;


    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName  = lastName;
    }

    public welcome(): string {
        return `Hello, my name is ${this._firstName} ${this._lastName}`;
    }
}