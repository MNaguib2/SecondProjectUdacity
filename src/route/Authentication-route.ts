import { Router } from "express"; 
import { signuphandler, SignIn } from "../handlers/Authentication-handler";
import { body } from 'express-validator';
const router = Router();

router.post('/signUp', [body('email', 'Please Entre Valid email').isEmail().isLowercase().trim(),
                            body('password', 'Please Entre Valid password Minimum 6 character').isAlphanumeric().isLength({min: 6}).trim()] 
                            ,signuphandler)
router.put('/signIn',[body('email', 'Please Entre Valid email').isEmail().isLowercase().trim(),
body('password', 'Please Entre Valid password Minimum 6 character').isAlphanumeric().isLength({min: 6}).trim()]  , SignIn)

export default router;