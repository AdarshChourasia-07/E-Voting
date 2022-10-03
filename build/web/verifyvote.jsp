<%-- 
    Document   : verifyvote
    Created on : 12 Sep, 2021, 5:41:51 PM
    Author     : hp
--%>

<%
    String userid=(String)session.getAttribute("userid");
    if(userid==null)
    {
        session.invalidate();
        response.sendRedirect("accessdenied.html");
        return;
    }
    boolean result=(boolean)request.getAttribute("result");
    if(result==true)
        out.println("success");
    else
        out.println("failed");
%>
