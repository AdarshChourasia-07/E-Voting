/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.UserDTO;
import evoting.dto.UserDetails;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author hp
 */
public class UserDAO {
        private static PreparedStatement ps,ps1;
        private static Statement st;
    static
    {
        try
        {           
            ps=DBConnection.getConnection().prepareStatement("Select user_type from user_details where adhar_no=? and password=?");
            //ps1 was added for removing user
            ps1=DBConnection.getConnection().prepareStatement("delete from user_details where adhar_no=?");
            st=DBConnection.getConnection().createStatement();
        }
        catch(Exception ex)
        {
            System.out.println("Error In DB comm:"+ex);

        }
    }
public static String validateUser(UserDTO user) throws SQLException {
        ps.setString(1,user.getUserid());
        ps.setString(2,user.getPassword());
        ResultSet rs= ps.executeQuery();
        if(rs.next())
            return rs.getString(1);
      return null;
    }

//ASSIGNMENT

public static ArrayList<UserDetails> getAllUser() throws SQLException
    {
        ResultSet rs=st.executeQuery("select adhar_no,username,address,city,email,mobile_no from user_details where user_type='Voter'");
        ArrayList<UserDetails> userdetails=new ArrayList<>();
        while(rs.next())
        {
            UserDetails ud=new UserDetails();
            ud.setUserid(rs.getString(1));
            ud.setUsername(rs.getString(2));
            ud.setAddress(rs.getString(3));
            ud.setCity(rs.getString(4));
            ud.setEmail(rs.getString(5));
            ud.setMobile(rs.getString(6));
            userdetails.add(ud);
        }
        return userdetails;
    }

    public static int deleteUser(String uid) throws SQLException
    {
        ps1.setString(1, uid);
        int res=ps1.executeUpdate();
        return res;
    }




}
