import LoginRouter from "./LoginRouter"
import CustomerRouter from './CustomerRouter';

const loginRouter = new LoginRouter();
const customerRouter = new CustomerRouter();

export { loginRouter, customerRouter };