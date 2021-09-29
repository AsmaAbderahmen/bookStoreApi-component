import  pkg from 'nodemailer';
const  {createTransport} = pkg;
const contact = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

var transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: contact,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

export var send_mail= async (data)=>{
    /*
    * data:{email: the email to sendto
    * , subject: the subject of the email
    * , html: the html code of the email
    * }
    * */
    var mailOptions = {
        from: contact,
        to: data.email,
        subject: data.subject,
        text: 'BookStoreApi',
        html: data.html
    };

    await transporter.sendMail(mailOptions).then( (info, error)=> {
        if (error) {
            return ('error')
        }
        else {
            return ('done')
        }
    }).catch(function (err) {
        return (err)

    });
};
