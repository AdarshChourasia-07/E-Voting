<%-- 
    Document   : adminshowcandidate
    Created on : 11 Sep, 2021, 6:13:37 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="org.json.JSONObject"%>
<%@page import="evoting.dto.CandidateDetails" %>
<%@page import="java.util.ArrayList"%>

<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
        {
            response.sendRedirect("accessdenied.html");
            return;
        }    
    String result=(String)request.getAttribute("result");
    StringBuffer displayBlock=new StringBuffer();
    if(result!=null &&result.equalsIgnoreCase("candidatelist"))
    {
        ArrayList<String> candidateId=(ArrayList<String>)request.getAttribute("candidateid");
         // write the code
        displayBlock.append("<option value=''>Choose Id</option>");
        for(String c:candidateId)
        {
            displayBlock.append("<option value='"+c+"'>"+c+"</option>");
        }
        JSONObject json=new JSONObject();        
        json.put("cids", displayBlock.toString());
        out.println(json);
        System.out.println("In adminshowcandidate");
        System.out.println(displayBlock);
        

    }
    else if(result!=null &&result.equals("details"))
        {
            CandidateDetails cd=(CandidateDetails)request.getAttribute("candidate");
            String str="<img src='data:image/jpg;base64,"+cd.getSymbol()+"'style='width:300px;height:200px;'/>";
            // write the code
            displayBlock.append("<table>"
                            +"<tr><th>User Id:</th><td>"+cd.getUserId()+"</td></tr>"
                            +"<tr><th>Candidate Name:</th><td>"+cd.getCandidateName()+"</td></tr>"
                            +"<tr><th>City:</th><td>"+cd.getCity()+"</td></tr>"
                            +"<tr><th>Party:</th><td>"+cd.getParty()+"</td></tr>"
                            +"<tr><th>Symbol:</th><td>" +str+"</td></tr>"
                            +"</table>");
            System.out.println(displayBlock);
            JSONObject json=new JSONObject();
            //json.put("image", str);
            json.put("subdetails", displayBlock.toString());
            out.println(json);

        }
%>
    
    