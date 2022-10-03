function addvote()
{
  //PICK UP THE SELECTED CANDIDATE ID AND CALL THE ADDVOTECONTROLLERSERVLET
    var id=$('input[type=radio][name=flat]:checked').attr('id');
    data={candidateid:id};
    $.post("AddVoteControllerServlet",data,processresponse);
    
}

function processresponse(responseText)
{
    //CHECK THE RESPONSE ,SHOW THE POPUP , REDIRECT TO VOTING RESPONSE
    
    responseText=responseText.trim();
    if(responseText==="success")
    {
        swal("Success","Voting done","success").then((value)=>{
            window.location="votingresponse.jsp";
        });
        
    }
    else
    {
        swal("Failure","Voting Failed","error").then((value)=>{
            window.location="votingresponse.jsp";
        });
    }
    
}
