let accountdetails = {
    1000: { acno: 1000, name: "aswathi", balance: 5000, password: "user1" },
    1001: { acno: 1001, name: "usertwo", balance: 3000, password: "user2" },
    1002: { acno: 1002, name: "userthree", balance: 7000, password: "user3" },
    1003: { acno: 1003, name: "userfour", balance: 8000, password: "user4" },
    1004: { acno: 1004, name: "userfive", balance: 9000, password: "user5" },
}

let currentUser

const register = (acno,name,password) =>{
    console.log("register called");
    
    if (acno in accountdetails){
   
   return{
       status:false,
       statusCode:422,
       message:"user already exist. please login"

   }
 }
   
    accountdetails[acno]={
     acno,
     balance:0,
     name,
     password
     
   }
   
   console.log(accountdetails);
   return {
       staus:true,
       statusCode:200,
       message:"registration succesful"
   }
}

const login = (req,accno,pwd) =>{
    let dataset = accountdetails;
        if (accno in dataset) {
            var pswd1 = dataset[accno].password
            
            if(pswd1==pwd){
              req.session.currentUser= dataset[accno].name
              
              return{

              
            status:true,
            statusCode:200,
            message:"login succesfull"
              }
            }
            else {
                
                return {
                    status:false,
                  
                    message:"incorrect password"
            }
        }
    }
            else {
          
             return{
                    status:false,
                     statusCode:422,
                    message:"no user exist with provideded account number"
             } 
        }

        }
        const deposit = (acno,pwd,amount)=>{
          
          var amt = parseInt(amount);
            let dataset = accountdetails;
          if (acno in accountdetails) {
              var pswd1 = dataset[acno].password;
              
              if(pswd1==pwd){
                dataset[acno].balance+=amt;
                return{
                    status:true,
                     statusCode:200,
                    message:"amount has been credited",
                    balance:dataset[acno].balance
             } 
                
                
              }
              else {
                return{
                    status:true,
                     statusCode:200,
                    message:"incorrect password"
                    
             } 
                  
              }
          }
          else{
             return{
                status:false,
                 statusCode:422,
                message:"no user exist with provided account number"
                
         } 
            
          }
  
          }

          const withdraw = (acno,pwd,amount)=>{
            var amt = parseInt(amount);
              let dataset = accountdetails;
            if (acno in accountdetails) {
                var pswd1 = dataset[acno].password
                 
                if(pswd1==pwd){
                  if (dataset[acno].balance>amount){
                  dataset[acno].balance-=amt
                  return{
                      status:true,
                       statusCode:200,
                      message:"amount has been debited",
                      balance:dataset[acno].balance
               } 
                  
                  
                }
                else {
                  return{
                      status:true,
                       statusCode:200,
                      message:"insufficient balance"
                      
               } 
                    
                }
            }
          }
            else{
              return{
                  status:false,
                   statusCode:422,
                  message:"no user exist with provided account number"
                  
           } 
              
            }
    
            }
module.exports = { 
    register,
    login,
    deposit,
    withdraw
}
