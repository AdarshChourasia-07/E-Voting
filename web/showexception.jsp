<%-- 
    Document   : showexception
    Created on : 9 Sep, 2021, 11:08:56 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    Exception ex=(Exception)request.getAttribute("Exception");
    System.out.println("Exception is :"+ex);
    out.println("Some Exception Occured"+ex.getMessage());
%>
