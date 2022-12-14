function redirectadministratorpage()
{
    swal("Admin!","Redirecting To Admin Actions Page!","success").then(value=>{
        window.location="adminactions.jsp";
    });
}
function redirectvotingpage()
{
    swal("Admin!","Redirecting To Voting Controller Page!","success").then(value=>{
        window.location="VotingControllerServlet";
    });
}
function manageuser()
{
    swal("Admin!","Redirecting To User Management Page!","success").then(value=>{
        window.location="manageuser.jsp";
    });
}
function managecandidate()
{
    swal("Admin!","Redirecting To Candidate Management Page!","success").then(value=>{
        window.location="managecandidate.jsp";
    });
}

function showaddcandidateform()
{
removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Add New Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><input type='text' id='cid'></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname'></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addcand=$("#result")[0];
addcand.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
 data={id:"getid"};
    $.post("AddCandidateControllerServlet",data,function(responseText){
        $("#cid").val(responseText);
        $('#cid').prop("disabled",true);
    });

}
function clearText()
{
    $("#addresp").html(""); 
}
function getdetails(e)
{
    if(e.keyCode===13)
    {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText)
        {
          if(responseText.trim()==='ap')
          {
              swal("Error","Candidate already present","error").then(value=>{
                  $("#addcnd").prop("disabled",true);
                    $("#cname").val("");
                    $("#city").val("");
              });
          }
          else
          {
              $("#addcnd").prop("disabled",false);
          let details=JSON.parse(responseText);
          let city=details.city;
          let uname=details.username;
          if(uname==="wrong")
              swal("Wrong Adhar","Invalid Adhar Number","error");
          else
          {
              $("#cname").val(uname);
              $("#city").empty();
              $("#city").append(city);
              $("#cname").prop("disabled",true);
          }
            }
        });
    }
}


   /* if(e.keyCode===13)
    {
        data={uid:$("#uid").val()};
        $.post("AddCandidateControllerServlet",data,function(responseText)
        {   
            let details=JSON.parse(responseText);
            let city=details.city;
            let uname=details.username;
            if(uname==="wrong")
                swal("Wrong Adhaar No!","Adhaar no is invalid!","error");
            else
            {
                $("#cname").val(uname);
                $("#city").empty();
                $("#city").append(city);
                $("#cname").prop("disabled",true);
            }
        });
    }
}*/
function addcandidate()
{
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    alert(data);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "AddNewCandidateControllerServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
                 swal("Admin!", str, "success").then((value)=>{
        showaddcandidateform();
    });
//                $("#addresp").text(str).css("color","green").css("font-weight","bold");
//                window.setTimeout(function(){showaddcandidateform();},5000);
            },
            error: function (e) {
                swal("Admin!", e, "error");
                }
        });
}
function removecandidateForm()
{
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null)
    {
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);   
    }
}



function showcandidate()
{
removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Show Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
data={data:"cid"};
  $.post("ShowCandidateControllerServlet",data,function(responseText){
       var cidlist=JSON.parse(responseText);
      $('#cid').append(cidlist.cids);  
      });


$("#cid").change(function()
{
     var cid=$("#cid").val();
     alert("Sel id:"+cid);
     if(cid===''){
swal("No selection!","Please select an id ","error");
         return;
     }

     data={data:cid};
    $.post("ShowCandidateControllerServlet",data,function(responseText)
    {
clearText();
        var details=JSON.parse(responseText);
        $("#addresp").append(details.subdetails);
//$("#image").append(details.image);
    });
     });
    
     
}

function electionresult()
{
    var data={data:"result"};
    $.post("ElectionResultControllerServlet",data,function(responseText)
    {
        swal("Result Fetched !","Success","success");  
        $("#result").html(responseText.trim());
    });
}

//ASSIGNMENT

function deletecandidate()
{

    removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Remove Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
data={data:"cid"};
  $.post("ShowCandidateControllerServlet",data,function(responseText){
       var cidlist=JSON.parse(responseText);
      $('#cid').append(cidlist.cids);  
      });
    
$("#cid").change(function (){
    var cid=$("#cid").val();
    if(cid===' ')
    {
        swal("No Selection","Please select an id","error");
        $("#addresp").empty();
    }
    else
    {
        data={data:cid}; 
        $.post("ShowCandidateControllerServlet",data,function(responseText){
        clearText();
        var details=JSON.parse(responseText);
        $("#addresp").append(details.subdetails); 
        $("#addresp").append("<button type='button' onclick='deleteCand()'>Confirm</button>");
        }); 
    }
});    
}


function deleteCand()
{
    var cid=$("#cid").val();
    data={data:cid}; 
    $.post("DeleteCandidateControllerServlet",data,function(responseText){
        let res=responseText.trim();
        let num=Number(res);
        if(num===0)
        {
            swal("Error","Unable to delete candidate","error");
        }
        else if(num>0)
        {
            swal("Success","Candidate deleted successfully","success").then(value=>{
                location.reload();
            });
        }
        else
        {
            swal("Error","Something went wrong","error");
        }
        
    });
}



function showupdatecandidateform()
{
    
   removecandidateForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Update Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<div style='color:white; font-weight:bold'>Candidate Id:</div></div><select id='cid'></select></div>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
var addPrd=$("#result")[0];
addPrd.appendChild(newdiv);
$("#candidateform").hide();
$("#candidateform").fadeIn(3500);
data={data:"cid"};
  $.post("ShowCandidateControllerServlet",data,function(responseText){
       var cidlist=JSON.parse(responseText);
      $('#cid').append(cidlist.cids);  
      });
 
    
    
$("#cid").change(function (){
    var cid=$("#cid").val();
    if(cid===' ')
    {
        swal("No Selection","Please select an id","error");
        $("#addresp").empty();
    } 
    else
    {
        data={data:cid}; 
        $.post("GetCandidateDetailsControllerServlet",data,function(responseText){
        clearText();
        var details=JSON.parse(responseText);
var newdiv=document.createElement("div");
newdiv.setAttribute("id","candidateform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Update Candidate</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'>\n\
<table><tr><th>Candidate Id:</th><td><input type='text' id='cid1' disabled></td></tr>\n\
<tr><th>User Id:</th><td><input type='text' id='uid' disabled></td></tr>\n\
<tr><th>Candidate Name:</th><td><input type='text' id='cname' disabled></td></tr>\n\
<tr><th>City:</th><td><select id='city'></select></td></tr>\n\
<tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
<tr><td colspan='2'><input type='file' name='files' id='myfile' value='Select Image'></td></tr>\n\
<tr><th><input type='button' value='Update Candidate' onclick='updateCand()' id='updtcnd'></th>\n\
<th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<br><span id='addresp'></span>";
        $("#addresp").append(newdiv);
        $("#cid1").val($("#cid").val());
        $("#uid").val(details.userid);
        $("#cname").val(details.cname);
        details.city.forEach((s)=>{
            $("#city").append(`<option value="${s}">${s}</option>`);
        });
        $("#party").val(details.party);
        $("#addresp").append(details.image);
        }); 
    }
});    
    


}

function updateCand()
{
    if($("#myfile")[0].files.length === 0 || $("#party").val().length===0)
    {
        swal("Warning !","Empty Symbol/Party Name","error");
    }
    else
    {
        var form=$("#fileUploadForm")[0];
        var data=new FormData(form);
        var cid=$("#cid").val();
        var city=$("#city").val();
        var party=$("#party").val();
        data.append("cid",cid);
        data.append("city",city);
        data.append("party",party);
    
        $.ajax({
            type:"POST",
            enctype:"multipart/form-data",
            url:"UpdateCandidateControllerServlet",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout: 600000,
            success: function(data){
                str=data+"....";
                swal("Admin!",str,"success").then((value)=>{
                    $("#addresp").empty();
                });
            },
            error: function(e){
                swal("Admin!",e,"error");
            }
        });
    }
   
}


