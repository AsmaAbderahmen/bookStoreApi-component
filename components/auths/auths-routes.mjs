
import  {
    
    refresh_token,
    signin,
    change_password,
    forget_password_send_email,
    forget_password_verify_code,
    change_password_on_recovering


 }  from './auths-controller.mjs';
import Validator from "./auths-validator.mjs";
import { App } from '../../app/index.js';
import { check_auth } from '../../app/middlewares/check-Auth.js';
const router   = App.getRouter();
const validator = new Validator();

router.post('/signin',validator.request.signin, signin);

router.post('/refresh-token', validator.request.refresh_token ,refresh_token);

router.post('/change-password',[check_auth, validator.request.change_password] , change_password);

router.post('/forget-password/send-email', validator.request.forget_password_send_email, forget_password_send_email);

router.post('/forget-password/verify-code', validator.request.forget_password_verify_code,forget_password_verify_code);

router.post('/forget-password/new-password',validator.request.signin, change_password_on_recovering);



export const Router =  router;
