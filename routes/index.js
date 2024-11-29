import {Router} from "express";
import usersRouter from './super_admin/RegisterUsers.js';
import confirmUserRouter from './super_admin/ConfirmUser.js';
import loginRoute from './super_admin/Login.js';
import passReset from './super_admin/forgot-password.js';
import registerLandlord  from "./landlord/RegisterLandloard.js";
import propertyRoute from "./landlord/propertyRoute.js";
import registerTenant from "./landlord/RegisterTenant.js";

const router = Router()

router.use('/users/', usersRouter);
router.use('/users/', confirmUserRouter);
router.use('/users/', loginRoute);
router.use('/users/', passReset);
router.use('/landlord/', registerLandlord);
router.use('/landlord/', propertyRoute);
router.use('/tenant/', registerTenant);


export default  router;