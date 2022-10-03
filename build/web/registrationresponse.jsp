<%-- 
    Document   : registrationresponse
    Created on : 9 Sep, 2021, 11:02:19 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    boolean result=(boolean)request.getAttribute("result");
    boolean userfound=(boolean)request.getAttribute("userfound");
    if(userfound==true)
            out.println("uap");
    else if(result==true)
            out.println("success");
    else
            out.println("error");
%> 