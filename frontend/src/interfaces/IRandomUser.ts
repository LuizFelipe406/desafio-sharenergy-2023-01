export default interface IRandomUser {
  name: {
    first: string,
    last: string,
  },
  email: string,
  login: {
    username: string,
  },
  dob: {
    age: number,
  },
  picture: {
    large: string,
  }
}