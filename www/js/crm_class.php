<!DOCTYPE HTML>
<html>
<head>
  <script type="text/javascript" src="js/canvasjs.min.js"></script>
  <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript">


$(document).ready(function(){



    $("#country").on('click' , function(){
      console.log("you just clicked on country button");

      $.ajax({
  url: "chartajax.php?query=country",
  context: document.body
}).done(function(result) {
   

  var asdf = jQuery.parseJSON(result);
  console.log(asdf);

  var data = [];

  $.each(asdf , function(key , value){
    var tempobj =  { y: value , indexLabel: key };
    data.push(tempobj);
  });


  var chart = new CanvasJS.Chart("chartContainer", 
   {
    title:{
      text: "Country User Count"
    },
    legend: {
      maxWidth: 3050,
      itemWidth: 2
    },
    data: [
    {
      type: "pie",
      showInLegend: true,
      legendText: "{indexLabel}",
      dataPoints: data
    }
    ]
  });
  chart.render();
  // console.log(result);
});



    });

    $("#source").on('click' , function(){
      console.log("you just clicked on source button");
    });

    $("#status").on('click' , function(){
      console.log("you just clicked on status button");
    });

});


window.onload = function () {

$.ajax({
  url: "chartajax.php",
  context: document.body
}).done(function(result) {
   

  var asdf = jQuery.parseJSON(result);
  console.log(asdf);

  var data = [];

  $.each(asdf , function(key , value){
    var tempobj =  { y: value , indexLabel: key };
    data.push(tempobj);
  });


  var chart = new CanvasJS.Chart("chartContainer", 
   {
    title:{
      text: "Country User Count"
    },
    legend: {
      maxWidth: 3050,
      itemWidth: 2
    },
    data: [
    {
      type: "pie",
      showInLegend: true,
      legendText: "{indexLabel}",
      dataPoints: data
    }
    ]
  });
  chart.render();
  // console.log(result);
});


}
</script>
</head>
 
<body>

<div class="nav">
 <a  id="country"> Country </a>
 <a id="source"> Source </a>
 <a id="status"> Status </a>
</div>

  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</body>
</html>