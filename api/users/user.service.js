const pool = require("../../config/database");
module.exports = {
    getUserByUserEmail: (email, callback) => {
        console.log("email" + email);
        pool.query(
            `select * from admin where email=?`,
            [email],
            (error, result, fields) => {
                if (error) {
                   callback(error);
            
                }

                return callback(null, result[0]);
            }
        );
    },

    create: (data, callback) => {
        var resVehicle;
        var resCustomer;
        var id;
        var cid;
        var vid;
        var tid;
        var inid;
        pool.query(
            `update  slot set availability="1" where (floor=? and slotno=?)`,

            [
                data.floor,
                data.slotno
            ],

            (error, result, field) => {
                if (error) {
                    console.log(" in slot table error: " + error)
                    return callback(error);
                }
                return result;
                //  id = result.insertId
                // console.log(id);

            }
        );


        pool.query
            (
                `select slotid from slot where (slotno=? and floor=?)`,

                [

                    data.slotno,
                    data.floor
                ],
                (error, result1, fields) => {

                    if (error) {
                        return callback(error);
                    }

                    id = result1[0].slotid;
                    console.log(id)



                    pool.query(
                        `insert into customer(email,contact,fullname,photoid_type,uid_no,address) values(?,?,?,?,?,?)`,

                        [

                            data.email,
                            data.contact,
                            data.fullname,
                            data.photoid_type,
                            data.uid_no,
                            data.address
                        ], (error, result2, fields) => {
                            if (error) {
                                console.log(" in customer table error " + error)
                                return callback(error);

                            }
                            
                            cid = result2.insertId
                            // console.log(id);
                            //return result;
                            pool.query(

                                `insert into vehicle(vehicle_no,vehicle_model,vehicle_color,customerid)values(?,?,?,${cid})`,
                                [
                                    data.vehicle_no,
                                    data.vehicle_model,
                                    data.vehicle_color
                                ],

                                (error, result3, fields) => {

                                    if (error) {
                                        console.log("error of vehicle table insertion " + error);
                                        // //resVehicle=error;
                                        return callback(error);
                                    }
                                    vid = result3.insertId;
                                    console.log("in vehicle" + vid);


inid= new Date().toLocaleDateString(); 
console.log(inid);
 
                                    //       //  resVehicle=result2[0];
                                    //        // console.log("resultvehicle in func "+result);
                                    pool.query(`insert into checkin(timein,vehicleid,slotid,indate)values(now(),${vid},${id},"${inid}")`,

                                        (err, result4, field) => {

                                            if (err) { 
                                                return callback(err); 
                                            }
                                            console.log("hello" + result4);
                                            return callback(null,result4.insertId);
                                        })
                                })
                            //  return callback(null,result2)
                        })
                 //   return callback(null, result1);

                })

    },


    create2: (data, callback) => {

        var sid;
        var vid;
        var tin;
        var tout;
        var charge;
        var odate;
     odate =new Date().toLocaleDateString(); 

        let promise=new Promise( function(resolve,reject){
            pool.query(
            `update checkin set timeout=now(),outdate="${odate}" where token=?`,

            [
                data.token
            ],

            (error, result, fields) => {

                if (error) {
                    return callback(error);
                }
               // return result;
            

        pool.query(

            `select slotid,vehicleid,timein,timeout,Indate,outdate from checkin where token=?`,
            [
                data.token
            ],
            (error, result1, fields) => {

                if (error) {
                    return callback(error);
                }

                sid = result1[0].slotid;
                vid = result1[0].vehicleid;
                tin = result1[0].timein;
                tout = result1[0].timeout;
                indate=result1[0].Indate;
                outdate=result1[0].outdate;
                console.log(tin)
                console.log(tout);
                console.log(sid);
                console.log(vid);
                console.log(indate);
                console.log(outdate);

               
               // return callback(null,result1);
            

                pool.query(
                    `update slot set availability="0" where slotid=${sid}`,

                    (error, result2, fields)  => {

                        if (error) {
                            return callback(error);
                        }
  



                        // console.log(tin);
                        // console.log(tout);
                        hin = tin.substring(0, 2);
                        min = tin.substring(3, 5);
                        hout = tout.substring(0, 2);
                        mout = tout.substring(3, 5);
                        h1 = parseInt(hin);
                        m1 = (parseInt(min)) / 60;
                        h2 = parseInt(hout);
                        m2 = (parseInt(mout)) / 60;
                        tin1 = h1 + m1;
                        tout1 = h2 + m2;
                        console.log(tin1);
                        console.log(tout1);
                        dateCompare(indate, outdate); 
                        function dateCompare(d1, d2){
                            var date1 = new Date(d1);
                            var  date2 = new Date(d2);
                        
                            if(date1 > date2){
                                console.log(`${d1} is greater than ${d2}`)
                            } else if(date1 < date2){
                                charge = ((tout1 - tin1) + 24 ) *50;
                            } else{
                                charge = (tout1 - tin1) * 50;
                            }
                        }
                        console.log("charge "+charge);
                        // if (tout1 - tin1 > 0) {
                        //     charge = (tout1 - tin1) * 50;

                        // }
                        // else {
                        //     charge = ((tin1 - tout1) + 24) * 50;
                        // }
                        // console.log(charge);

                        pool.query(
                            `select token from checkin where vehicleid=${vid}`,
                            (error, result3, fields) => {

                                if (error) 
                                {
                                    return callback(error);
                                }

                                token = result3[0].token;
                                console.log(token);

                                pool.query(
                                    `insert into payment(charges,vehicleid,token) values(${charge},${vid},${token})`,
                                    [
                                    //     data.charges,
                                    //     data.vehicleid,
                                    //     data.token
                                     ],
                                    (error, result4, fields) => {

                                        if (error) {
                                            reject(error);
                                        }
                                        else{
                                            resolve(result4);
                                        }
                                      // return callback(null, data.charges);
                                       
                                      // return callback(null, data.charges)
                                    });
                                //    pool.query(
                                //        `select charges from payment where token = `
                           
                                //    ) 
                                
                            });

                    });

                
            });

        });
    }).then(function(result){
        pool.query(
            `select charges from payment where token =${token}`,
            (error, result5, fields) => {

                if (error) 
                {
                    return callback(error);
                }
                console.log("result5 "+result5[0]);
                console.log("result5 charges"+result5[0].charges);
                return callback(null, result5[0]);

})
            },function(err){
                console.log(err)
            
    })
        

    },

    create3:(data,callback) =>
    {
        pool.query(
            `select customer.fullname,customer.contact,vehicle.vehicle_no,checkin.timein,checkin.timeout,checkin.indate,checkin.outdate,payment.charges from customer inner join vehicle on vehicle.customerid=customer.customerid inner join checkin on checkin.vehicleid=vehicle.vehicleid inner join payment on payment.token=checkin.token where payment.token=?`,
      [
           data.token
      ],
      (error,result,field)=>{
          if(error)
          {
              return callback(error);

          }
          console.log("result "+ result[0].fullname);
              return callback(null,result[0]);

      });
            
    },

    create4: (data, callback) => {

        pool.query(` select fullname,charges,timein,timeout from customer
         inner join vehicle on vehicle.customerid=customer.customerid
         inner join checkin on checkin.vehicleid=vehicle.vehicleid
         inner join payment on payment.token=checkin.token where checkin.indate between ? and ? `,
         [data.fromdate,data.todate
    ],(error,result,field)=>{
              if(error){
                 return callback(error);
              }
                     return callback(null,result);
             
    });


    },

create5: callback => {
    pool.query(
        `select slotno,floor,availability from slot `,      
         [],
        
        (error,result,field)=>{
                  if(error){
                     return callback(error);
                  }
                         return callback(null,result);
                 
        });
    
    },
    create6: callback => {
        pool.query(
            `select slotno,floor,availability from slot`,   
             [],
            
            (error,result,field)=>{
                      if(error){
                         return callback(error);
                      }
                             return callback(null,result);
                     
            });
        
        },
        
}




