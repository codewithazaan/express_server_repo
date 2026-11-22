import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();
// /api/v1/users/ = /
router.post("/", userController.createUser)



//!All Users Information get from Database by post man START
router.get('/', auth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUsers)
//!All Users Information get from Database by post man END

//?Single User Information get from Database by post man START
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userController.getSingleUser)
//?Single User Information get from Database by post man END

//*Update a specific User in Database START
router.put('/:id', auth(USER_ROLE.admin, USER_ROLE.user), userController.updateUser)
//*Update a specific User in Database END


//!Delete a specific User in Database START
router.delete('/:id', auth(USER_ROLE.admin),userController.deleteUser)
//!Delete a specific User in Database END

export const userRoute = router;