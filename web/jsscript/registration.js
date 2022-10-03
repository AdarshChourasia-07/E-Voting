let username,password,cpassword,city,address,adhar,email,mobile;
function addUser()
{
    username=$("#username").val();
    password=$("#password").val();
    cpassword=$("#cpassword").val();
    city=$("#city").val();
    address=$("#address").val();
    adhar=$("#adhar").val();
    email=$("#email").val();
    mobile=$("#mobile").val();
    if(validateUser())
    {
        if(password!==cpassword)
        {
        swal("Error!","Passwords do not match","error");
        return ;
        }
        else
        {
            if(checkEmail()===false)
                 return ;
             
            let data = {
                username:username,
                password:password,
                city:city,
                address:address,
                userid:adhar,
                email:email,
                mobile:mobile
            };
            let xhr=$.post("RegistrationControllerServlet",data,processResponse);   
            
            xhr.fail(handleError);
           
        }
    }
}
function processResponse(responseText,textStatus,xhr)
{
    let str=responseText.trim();
    if(str==="success")
    {
        swal("Success","Registration Successfully Done! You Can Now Login","success");
        setTimeout(redirectUser,3000);
        
    }
    
    else if(str==="uap")
        swal("Error","Sorry The Userid Is Already Present!","error");
    else
        swal("Error","Registration Failed!Try Again","error");
}
function handleError(xhr)
{
    swal("Error","Problem IN Server Communication :"+xhr.statusText,"error");
}




function validateUser()
{
    if(username==="" || password==="" || cpassword==="" || city==="" || address==="" ||adhar==="" ||email===""||mobile==="")
    {
        swal("Error!","All Fields are Mandatory","error");
        return false;
    }
    return true;
}
function checkEmail()
{
    let attheratepos=email.indexOf("@");
    let dotpos=email.indexOf(".");
    if(attheratepos<1 || dotpos < attheratepos+2 || dotpos+2 >= email.length)
    {
        swal("Error!","Please Enter a Valid Email","error");
        return false;
    }
    return true;
}
function redirectUser()
{
    window.location="login.html";
}
//function checkMobile() is Homework html page me textbox hai isi liye numbers bhi check krne pdenge
/*$(document).ready(check);
function check(){
let mob=document.querySelector("#mobile");
mob.addEventListener("keypress",(e)=>{
    if(e.charCode<48 || e.charCode>57)
        e.preventDefault();
});
}*/
jQuery(document).ready(function () {
      jQuery("#mobile").keypress(function (e) {
         var length = jQuery(this).val().length;
       if(length >9) {
            return false;
       } else if(e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
       } else if((length === 0) && (e.which === 48)) {
            return false;
       }
      });
    });


/*$(document).ready(checkadhar);
function checkadhar(){
let adhar=document.querySelector("#adhar");
adhar.addEventListener("keypress",(e)=>{
    if(e.charCode<48 || e.charCode>57)
        e.preventDefault();
});
}*/

jQuery(document).ready(function () {
      jQuery("#adhar").keypress(function (e) {
         var length = jQuery(this).val().length;
       if(length > 11) {
            return false;
       } else if(e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
       } else if((length === 0) && (e.which === 48)) {
            return false;
       }
      });
    });