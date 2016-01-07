angular.module('starter.services', [])





.factory('MinsData' , function($http  , $filter , $cordovaSQLite , $q){



// common Globle variable to keep track of the navigation
var track_view_first = [0];
var track_view_second =[0];


/**
* Function getchild()
* -
* @params mainid is current selected minding id
* @params parent_id int
* this will return all elemen with parent id equal to the parent_id
* @returned type json
*/ 


var updateDiginElement = function(mainid , item , currenitem) {

    // var queryy = 'UPDATE digins SET fav = ? WHERE id= ?';
    //   return $cordovaSQLite.execute(db, queryy, [ value ,   id ]).then(function(res) {
    //       console.log("updated");
    //     }, function (err) {
    //       // alert(err)
    //       console.log(err);
    //     });
      

}

    var updateMindingFavQ = function(id , value){
     var asdf = [];
      var queryy = 'UPDATE mines SET fav = ? WHERE id= ?';
      return $cordovaSQLite.execute(db, queryy, [ value ,   id ]).then(function(res) {
          console.log("updated");
        }, function (err) {
          // alert(err)
          console.log(err);
        });
      
        
    }



    var getResolverDatafunc = function(mainid){
      // console.log("df");

      
       var query = "SELECT id , name, description FROM mines WHERE id = ?";
       return  getMyLoopData(mainid , 0)
                  .then(function(res){
                    var array = [];
                    var tempobj = {};
                     angular.forEach( res , function(value , key){
                     if (value.parent == 0) {
                      array.push(value);
                     var ad = checkchildren( res , value.id );
                     value.children = ad;
                        };
                     }) 
                     tempobj.data = array;
                     console.log("=>>>>>>");
                     console.log(tempobj)
                      return tempobj;
                 })

          
              // console.log(tempobj)
            // return tempobj;
    

    }


      var getMyLoopData = function(mainid , parentid , condi){

      var mainobj = [];
      var queryy = 'SELECT id , name , description , parent FROM digins WHERE mine_id = ?'          
     
      return $cordovaSQLite.execute(db, queryy, [ mainid ]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  var tempobj = {};
                  tempobj.id =  res.rows.item(i).id;
                  tempobj.name =  res.rows.item(i).name;
                  tempobj.description =  res.rows.item(i).description;
                  tempobj.parent =  res.rows.item(i).parent;
                   mainobj.push(tempobj);
               }
                 return mainobj;
            } else {
               // console.log("No results found");
            }

           
        }, function (err) {
          // alert(err)
          console.log(err);
        });
      

      }

    var getAllMines = function($scope) {
      var temparray = [];
     $scope.mins = [];

        var query = "SELECT id , name, description , fav , created_at , updated_at FROM mines";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  var tempobj = {};
                  tempobj.id = res.rows.item(i).id;
                  tempobj.name = res.rows.item(i).name;
                   
                   // console.log("<<<---------This is description field ------------->>>");
                   // console.log(res.rows.item(i).description);
                   if (res.rows.item(i).description == "undefined") {
                    tempobj.description = "";
                   } else {
                     tempobj.description = res.rows.item(i).description;
                   }

                  tempobj.fav = res.rows.item(i).fav;
                  tempobj.created_at = res.rows.item(i).created_at;
                   tempobj.updated_at = res.rows.item(i).updated_at;
                  $scope.mins.push(tempobj);
                    // console.log(tempobj);
                    // console.log("SELECTED -> " + res.rows.item(i).fav + " " + res.rows.item(i).description);
                }

            } else {
                // console.log("No results found");
            }
        }, function (err) {
          console.log(err);
        });
    }



    /**
    * function localgetChildren
    * 
    */ 
    var localgetChildren = function(mainid , parentid) {
        
      var mainobj = [];

         var queryy = 'SELECT id , name , description , parent FROM digins WHERE mine_id = ? AND parent = ?'          
            var query = "SELECT id , name, description FROM mines";
      return  $cordovaSQLite.execute(db, queryy, [ mainid , parentid ]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  var tempobj = {};
                  tempobj.id = res.rows.item(i).id;
                  tempobj.name = res.rows.item(i).name;

                   if (res.rows.item(i).description == "undefined") {
                    tempobj.description = "";
                   } else {
                     tempobj.description = res.rows.item(i).description;
                   }
                  
                  tempobj.parent = res.rows.item(i).parent;
                  mainobj.push(tempobj);
                 // console.log(tempobj);
                 // console.log("SELECTED -> " + res.rows.item(i).name + " " + res.rows.item(i).description);
                }
            } else {
               // console.log("No results found");
            }

            return mainobj;
        }, function (err) {
          // alert(err)
          console.log(err);
        });
      

        


    }



    var getDiginDataById = function($scope , main_id , parent_id) {

      var mainobj = [];

         var queryy = 'SELECT id , name , description , parent FROM digins WHERE mine_id = ? AND parent = ?'          
            var query = "SELECT id , name, description FROM mines";
      return  $cordovaSQLite.execute(db, queryy, [ main_id , parent_id ]).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  var tempobj = {};
                  tempobj.id = res.rows.item(i).id;
                  tempobj.name = res.rows.item(i).name;
                  tempobj.description = res.rows.item(i).description;
                  tempobj.parent = res.rows.item(i).parent;
                  mainobj.push(tempobj);
                  // console.log(tempobj);
                   
                    // console.log("SELECTED -> " + res.rows.item(i).name + " " + res.rows.item(i).description);
                }
            } else {
               // console.log("No results found");
            }

            return mainobj;
        }, function (err) {
          // alert(err)
           console.log(err);
        });



    }

    var sizee = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


var checkchildren = function(data , id) {
  var dataa = [];
  angular.forEach(data ,function(value , key){
      if (value.parent == id) {
        // console.log("yes data is present");
        dataa.push(value);
         ad = checkchildren(data , value.id );
         value.children = ad;

      };
  })
  return dataa;
}

  





  return {
    
    lacalall : function($scope){
    // alert("Fetching all data..");
      getAllMines($scope);
    } , 
    updateMindingFav : function($scope , itemid ,value ) {
          updateMindingFavQ( itemid , value);
          getAllMines($scope);

    } ,

    all : function($scope){
    var myDataPromise = getData();
      myDataPromise.then(function(result) {  // this is only run after $http completes
      $scope.mins =  result;

    });

     
    } ,

    /**
    *function localgeMin_by_id
    *
    * params $scope object ,  Int id(mainid)
    * function is setting initial data 
    */ 

    localgetMin_by_id : function($scope , mainid) {
     var receiveddata = getDiginDataById($scope , mainid , 0);
     $scope.z1parent = 0;
     $scope.z3parent = 0;
  
  receiveddata.then(function(result){
     $scope.handle.z1level = result;
     $scope.handle.z3level = result;
    
     if (result.length > 0) {
         $scope.handle.z1childparent = result[0].id;
         $scope.z4parent = result[0].id
           var receivedChilddata = getDiginDataById($scope , mainid , result[0].id);
           receivedChilddata.then(function(recdata){
                $scope.selected_item_z1 = recdata;
                $scope.selected_item_z3 = recdata;
           });  
     } 
      });
       
    }  ,
    saveElement : function($scope , element) {

 var date = new Date();
 var lastWeek = $filter('date')(date, 'MM/dd yyyy - HH:mm');
   console.log("date before creating enw element");
   console.log(lastWeek);
     $cordovaSQLite.execute(db, 'INSERT INTO mines (name , description , created_at , updated_at) VALUES (? , ? , ? , ?)', [element.name , element.description , lastWeek ,lastWeek])
            .then( function(result) {
              console.log("Data Inserted");
              getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });


    } ,

 UpdateMinding : function($scope , item , current_minding_id){

 var sqlupdatedata = "";

 var date = new Date();
 var lastWeek = $filter('date')(date, 'MM/dd yyyy - HH:mm');
    // console.log("This is current date");
    // console.log(date);

 var i = 1;

item.updated_at = lastWeek;

 var length = sizee(item);



// Get the size of an object
var arguarray = [];

   angular.forEach(item , function(value , key){
    arguarray.push(value);
    sqlupdatedata += key + " = " + " ? ";
    if (length > 1 && i < length) {
      sqlupdatedata +=  " , ";
    }
    i++;
    });
console.log(sqlupdatedata);

   arguarray.push(current_minding_id);

   console.log(arguarray);

   var updatesql = "UPDATE mines SET "+sqlupdatedata+" WHERE id= ?";

    
      $cordovaSQLite.execute(db, updatesql  , arguarray )
            .then( function(result) {
              // console.log("Minding update");
              getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });
   // console.log(updatesql);
 } ,
    
    DeleteElement : function($scope , element) {
     
      // var minedata = deleteMineElement( element.id );


        $cordovaSQLite.execute(db, 'DELETE FROM mines WHERE id = ?;', [element.id ])
            .then( function(result) {
              // console.log("Data Deleted");
              getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });
    } ,


    /**
    * function createNewItem
    * function will create new element and will also update all container with same parent id
    */ 

    createNewItemm : function($scope , mainid , name , description  , parentid , zone){
      
     // var minedata = addNewDiginData();

     $cordovaSQLite.execute(db, 'INSERT INTO digins (mine_id , name , description , parent ) VALUES (? , ? , ? , ?)', [mainid , name , description , parentid])
            .then( function(result) {
             // console.log("Data Inserted");
            

        var queryy = 'SELECT id , name , description , parent FROM digins WHERE mine_id = ? AND parent = ?'          
        var query = "SELECT id , name, description FROM mines";
        $cordovaSQLite.execute(db, queryy, [ mainid , parentid ]).then(function(res) {
          var mainobj = [];
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  var tempobj = {};
                  tempobj.id = res.rows.item(i).id;
                  tempobj.name = res.rows.item(i).name;
                  tempobj.description = res.rows.item(i).description;
                  tempobj.parent = res.rows.item(i).parent;
                  // mainobj.push(tempobj);
                  mainobj.push(tempobj);
                  //console.log(tempobj);
                  // console.log("SELECTED -> " + res.rows.item(i).name + " " + res.rows.item(i).description);
                }

         if (parentid == $scope.z1parent) {
             $scope.handle.z1level = mainobj;
             $scope.handle.z1childparent = tempobj.id;
             $scope.selected_item_z1 = [];

         }


         if (parentid == $scope.handle.z1childparent) {
            $scope.selected_item_z1 = mainobj;
         }

         if (parentid == $scope.z3parent) {
             $scope.handle.z3level = mainobj; 
              $scope.z4parent = tempobj.id;
             $scope.selected_item_z3 = [];
         }

         if (parentid == $scope.z4parent) {
        $scope.selected_item_z3 = mainobj;
         }



            } else {
               alert("No results found");
            }
        }, function (err) {
          // alert(err)
          console.log(err);
        });



             // getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });


    

    } ,
 /**
 * function localZ1ClickedElementData
 * function takes 3 arg
 * will return all children of seleted element
 * parent - clickelement
 * mainid selected mind
 * $scope - main scope
 */ 
   localZ1ClickedElementData : function($scope , mainid , parent) {
       // console.log("This is main id");       
       // local get children will get promise obj of children obj
       var children = localgetChildren(mainid , parent.id);
       $scope.handle.z1childparent = parent.id;
       children.then(function(result){
           // console.log("->>>>>>>>>>>>>");
           // console.log(result);
           $scope.selected_item_z1 = result;
       });

   } ,

   localZ3ClickedElementData : function($scope , mainid , parent) {
       // console.log("This is main id");       
       // local get children will get promise obj of children obj
       var children = localgetChildren(mainid , parent.id);
       $scope.z4parent = parent.id;
       // $scope.z4parent = parent.id;

       // console.log("this is z4 parent id");
      // console.log($scope.z4parent);
       children.then(function(result){
           // console.log("->>>>>>>>>>>>>");
           // console.log(result);
           $scope.selected_item_z3 = result;
       });

   } ,

  
    
    localFindAndSetInnerElement : function($scope , mainid , item , zone) {

         return localgetChildren( mainid , item.id  ).then(function(result) {
            // check if result array is greater then 0
          if (result.length > 0) {

            if (zone == 'z1') {
             
             $scope.z1parent = item.id;
             $scope.handle.z1level = result;
             $scope.handle.z1childparent = false;
             $scope.selected_item_z1 = [];
             $scope.handlefir.scrollTop(true);

               if ($scope.z1parent == 0) {
                $scope.showz1up = false;
               } else {
                $scope.showz1up = true;
               }


            //  var childele = localgetChildren( mainid , result[0].id );   
            //  childele.then(function(result) {
            //   // This is selected item for z1
            //   $scope.selected_item_z1 = result;
             

            // });



           } else if(zone == 'z3') {
             $scope.z3parent = item.id;
             $scope.handle.z3level  = result;
           

                $scope.z4parent = false;
                $scope.selected_item_z3 = [];
                $scope.handlethird.scrollTop(true);

              if ($scope.z3parent == 0) {
              $scope.showz3up = false;
               } else {
                $scope.showz3up = true;
               }


             // var childele = localgetChildren( mainid , result[0].id );  
             // childele.then(function(result) {
 
             //  });
           }


          } else {
            // alert("No inner Element found Please add item first");
            

      

          }

           console.log(result);
           if (result.length < 1) {
            console.log("result is empty");
            return false;
           } else {
            return true;
           }
          });


    }  ,
   
    localGoBackFunc : function( $scope , mainid , zone ) {
      var currentparent = 0;
      if (zone == "z1") {
        currentparent = $scope.z1parent;
      } else if(zone == "z3") {
        currentparent = $scope.z3parent;
      }
// first Find element with current id
// second find all elements with parent id of parent id
      console.log(currentparent);
      console.log('dsd');

   var queryy = 'SELECT parent FROM digins WHERE mine_id = ? AND id = ?'          
          
        $cordovaSQLite.execute(db, queryy, [ mainid , currentparent ]).then(function(res) {
            if(res.rows.length > 0) {

                for(var i = 0; i < res.rows.length; i++) {
                  
                  console.log("This is parent id")
                  console.log( res.rows.item(i).parent );
                    
     var data =  localgetChildren( mainid , res.rows.item(i).parent ); 

        if (zone == "z1") {
              
                data.then(function(result) {
              $scope.handle.z1level = result;
             var childele = localgetChildren( mainid , $scope.z1parent );
             childele.then(function(result) {
                $scope.selected_item_z1 = result;
              });
                 // here chanding parent of z1
                  $scope.z1parent = result[0].parent;
                   if ($scope.z1parent == 0) {
                  $scope.showz1up = false;
                   } else {
                    $scope.showz1up = true;
                   }
              });

         } else if(zone == "z3") {

             data.then(function(result) {
                  $scope.handle.z3level = result;
                      var childele = localgetChildren( mainid , $scope.z3parent );
                     childele.then(function(result) {
                        $scope.selected_item_z3 = result;
                      });
                 // here chanding parent of z1
                  $scope.z3parent = result[0].parent;
                   if ($scope.z3parent == 0) {
                    $scope.showz3up = false;
                     } else {
                      $scope.showz3up = true;
                     }

              });

         }
     



                 }
            } else {
               // console.log("No results found");
            }

            
        }, function (err) {
          // alert(err)
          console.log(err);
        });
      



             
    } ,

    goBackFunc : function( $scope , mainid , zone ) {
      
      // get zone id of section 
       if (zone == "z1") {
         
      var data =  getGoBackParentElements( mainid , $scope.z1parent ); 

       data.then(function(result) {
              $scope.handle.z1level = result;
                 
             var childele = getchild( mainid , $scope.z1parent );
             childele.then(function(result) {
                $scope.selected_item_z1 = result;
              });

                 // here chanding parent of z1
                  $scope.z1parent = result[0].parent;
                  
                   if ($scope.z1parent == 0) {
                  $scope.showz1up = false;
                   } else {
                    $scope.showz1up = true;
                   }


              });


      
       } else if (zone == "z3") {
          
          var data =  getGoBackParentElements( mainid , $scope.z3parent ); 

       data.then(function(result) {
                  $scope.handle.z3level = result;

                      var childele = getchild( mainid , $scope.z3parent );
                     childele.then(function(result) {
                        $scope.selected_item_z3 = result;
                      });

                 // here chanding parent of z1
                  $scope.z3parent = result[0].parent;
                  
                   if ($scope.z3parent == 0) {
                    $scope.showz3up = false;
                     } else {
                      $scope.showz3up = true;
                     }

              });

       };


    } 

   , 

    deleteDiginItem : function($scope , mainid , element){
    
        $cordovaSQLite.execute(db, 'DELETE FROM digins WHERE id = ?;', [element.id ])
            .then( function(result) {
               var children = localgetChildren(mainid , element.parent);

                  children.then(function(result){

                 // console.log(result);
        
            if (element.parent == $scope.z1parent) {
                   $scope.handle.z1level = result;
               }
               if (element.parent == $scope.handle.z1childparent) {
                  $scope.selected_item_z1 = result;
               }
               if (element.parent == $scope.z3parent) {
                   $scope.handle.z3level = result; 
               }
               if (element.parent ==    $scope.z4parent) {
              $scope.selected_item_z3 = result;
               }


             });


              // console.log("Data Deleted");
              // getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });


    } , 
    editDiginItem : function($scope , mainid , item , current_minding_id) {
        

   // old edit functionality start here
     var sqlupdatedata = "";
     var i = 1;
    // item.updated_at = lastWeek;
     var length = sizee(item);
    // Get the size of an object
    var arguarray = [];

       angular.forEach(item , function(value , key){
        arguarray.push(value);
        sqlupdatedata += key + " = " + " ? ";
        if (length > 1 && i < length) {
          sqlupdatedata +=  " , ";
        }
        i++;
        });
  

   arguarray.push(current_minding_id.id);
    var updatesql = "UPDATE digins SET "+sqlupdatedata+" WHERE id= ?";
      $cordovaSQLite.execute(db, updatesql  , arguarray )
            .then( function(result) {

               var children = localgetChildren(mainid , current_minding_id.parent);
       // $scope.z4parent = parent.id;
       children.then(function(result){
      if (current_minding_id.parent == $scope.z1parent) {
             $scope.handle.z1level = result;
         }
         if (current_minding_id.parent == $scope.handle.z1childparent) {
            $scope.selected_item_z1 = result;
         }
         if (current_minding_id.parent == $scope.z3parent) {
             $scope.handle.z3level = result; 
         }
         if (current_minding_id.parent ==    $scope.z4parent) {
        $scope.selected_item_z3 = result;
         }
       });
              // getAllMines($scope);
            }, function(error) {
                alert("Error on saving: " + error.message);
            });
            // old edit functionaliy end here
    } ,

    moveElementToNewPos : function($scope , mainid , item , movedid){
    var sql = 'UPDATE digins SET parent = ? WHERE id = ?';
        $cordovaSQLite.execute(db, sql, [movedid , item.id ]).then(function(res) {
          var children = localgetChildren(mainid , movedid);
       // $scope.z4parent = parent.id;
       children.then(function(result){
        
      if (movedid == $scope.z1parent) {
             $scope.handle.z1level = result;
         }
         if (movedid == $scope.handle.z1childparent) {
            $scope.selected_item_z1 = result;
         }
         if (movedid == $scope.z3parent) {
             $scope.handle.z3level = result; 
         }
         if (movedid ==    $scope.z4parent) {
        $scope.selected_item_z3 = result;
         }


       });
          // alert("done");
        }, function (err) {
          // alert(err)
          console.log(err);
        });
   } ,

    moveElementToNewPosBrowse : function($scope  , item , movedid){
    var sql = 'UPDATE digins SET parent = ? WHERE id = ?';
    console.log(movedid);
    if (movedid === undefined) {
      movedid = 0;
    } 
        $cordovaSQLite.execute(db, sql, [movedid , item ]).then(function(res) {
        }, function (err) {
          console.log(err);
        });
   } ,

   moveElementToParentLevel: function($scope, mainid, item) {
    var sql = 'UPDATE digins SET parent = ? WHERE id = ?';
    $cordovaSQLite.execute(db, sql, [0, item.id]).then(function(res) {
        localgetChildren(mainid, 0)
            .then(function(result) {
                if ($scope.z1parent == 0) {
                    $scope.handle.z1level = result;
                }
                if ($scope.handle.z1childparent == 0) {
                    $scope.selected_item_z1 = result;
                }
                if ($scope.z3parent == 0) {
                    $scope.handle.z3level = result;
                }
                if ($scope.z4parent == 0) {
                    $scope.selected_item_z3 = result;
                }
            });
    }, function(err) {
        console.log(err);
    });

} , 

   getBrowseData: function($scope, mainid) {
    var query = "SELECT id , name, description FROM mines WHERE id = ?";
    $cordovaSQLite.execute(db, query, [mainid]).then(function(res) {
        var array = [];
        if (res.rows.length > 0) {
            var tempobj = {};
            tempobj.id = res.rows.item(0).id;
            tempobj.name = res.rows.item(0).name;
            tempobj.description = res.rows.item(0).description;
              getMyLoopData(mainid, 0)
            .then(function(res) {
                $scope.totaldigs = res.length;
                angular.forEach(res, function(value, key) {
                    if (value.parent == 0) {
                        array.push(value);
                        var ad = checkchildren(res, value.id);
                        value.children = ad;
                    };
                })
                tempobj.data = array;
                $scope.diginData = tempobj;
            });
        } else {
            console.log("No results found");
        }
    }, function(err) {
        console.log(err);
    });
} ,  

    getDiginDataResolve : function(mainid) {

      setTimeout(function() {
        console.log("Inside getDiginDataResolve function");
      }, 100);

    } ,

     getBrowseDataResolve : function(mainid){
      // console.log("I am here now");
       // $scope.diginData = [];
       console.log("Reached");
         // var query = "SELECT id , name, description FROM mines WHERE id = ?";
          // console.log($cordovaSQLite.execute());
          getMyLoopData(mainid , 0)
                  .then(function(res){
                    var array = [];
                    var tempobj = {};
                     angular.forEach( res , function(value , key){
                     if (value.parent == 0) {
                      array.push(value);
                     var ad = checkchildren( res , value.id );
                     value.children = ad;
                        };
                     }) 
                     tempobj.data = array;
                     console.log("=>>>>>>");
                     console.log(tempobj)
                      return tempobj;
              // deferred.resolve(tempobj);
              // var promise = deferred.promise;
              // return promise;
                 })

      
       

 // console.log("dfd");

    } , 

    getCurrentMine : function($scope , mainid){
             
       var query = "SELECT id , name, description FROM mines WHERE id = ?";
       
        $cordovaSQLite.execute(db, query , [ mainid ]).then(function(res) {
          var array = [];
           if(res.rows.length > 0) {

                  $scope.mindingname  = res.rows.item(0).name;
                   
                   if(res.rows.item(0).description == "undefined") {
                    $scope.mindingdescription  = "";
                   } else {
                    $scope.mindingdescription  = res.rows.item(0).description;
                   }

                  if ($scope.mindingdescription == "null" || $scope.mindingdescription == null) {
                    $scope.mindingdescription = "";
                  } 
                  $scope.mindfulldesc = "<b class='dropzonezero'>" + $scope.mindingname + "</b> - " + $scope.mindingdescription;

                  if ($scope.mindfulldesc.length >= 85) {
                 $scope.mindfulldesc =  $scope.mindfulldesc.substr(0, 85).concat("...");

                  }

            } else {
               // console.log("No results found");
            }
        }, function (err) {
          // alert(err)
          console.log(err);
        });



    } , 


getTrackVariableFirst : function () {
  return track_view_first;
} , 

getTrackVariableSecond : function() {
  return track_view_second;
} ,

setTrackVariable : function( zone , value) {
  if (zone == "z1") {
    track_view_first.push(value);
  } else if (zone == "z3") {
    track_view_second.push(value);
  }
  
} , 

checkTrackVariable : function(zone , value) {
  if (zone == "z1" || zone == "z2" ) {
    var a = track_view_first.indexOf(value);
    if (a == "-1") {
     return false;
    } else {
      return true;
    }
  } else if(zone == "z3" || zone == "z4" ) {
    var a = track_view_second.indexOf(value);
    if (a == "-1") {
     return false;
    } else {
      return true;
    }
  }
} ,

setTrackVariableSecond : function(value) {
  
} , 

removeTrackVariableFirst : function(zone) {
  if (zone == "z1") {
    track_view_first.pop();  
    return track_view_first;
  } else if(zone == "z3") {
    track_view_second.pop();
    return track_view_second;
  }
  
  
} 

  }
})

