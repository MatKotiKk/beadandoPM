


$(document).ready(function(){
    getManufacturerNames();
    $(".navbar button").click(function(event) {
      var page = $(this).data("page");
      switch (page) {
        case "addcar":
          $("#content").load('newcar.html #carcontainer')
        break;
        case "addmanufacturer":
          $("#content").load('newmanufacturer.html #manufacturerContainer')
          break;
        case "carlist":
        {
          $("#content").load('carlist.html #carListContainer')
          getCarList();
          break;
        }
        case "manufacturerlist":
        {
          $("#content").load('manufacturerlist.html #manufacturerListContainer')
          getManufacturerList();
          break;
        }
        default:
        location.reload();
    }
  });


});

  function getManufacturerNames() {
    var url = "manufacturers";
    $.getJSON( url, function( data ) {
      for (var i = 0; i < data.length; i++) {
          var manufacturer = data[i];
          console.log(manufacturer.name);
          $("#carsOfmanufacturer .manufactureSelect").append("<option value='"+ manufacturer.name +"'>"+ manufacturer.name +"</option>");
      }
    });
  };

  function getCarList(){
    var url = "cars";
    $.getJSON( url, function( data ) {
      for (var i = 0; i < data.length; i++) {          
		  var car = data[i];
          $("#carList").append("<tr><td>"+ car.name +"</td>"+
                          "<td>"+ car.consumption +"</td>"+
                          "<td>"+ car.color +"</td>"+
                          "<td>"+ car.manufacturer +"</td>"+
                          "<td>"+ car.available +"</td>"+
                          "<td>"+ car.year +"</td>"+
                          "<td>"+ car.horsepower +"</td>"+
                          "</tr>");
      }
    });
  };

  function getManufacturerList(){
    var url = "manufacturers";
    $.getJSON( url, function( data ) {
      for (var i = 0; i < data.length; i++) {
          var manufacturer = data[i];
          console.log(manufacturer.consumption);
          $("#carList").append("<tr><td>"+ manufacturer.name +"</td>"+
                          "<td>"+ manufacturer.country +"</td>"+
                          "<td>"+ manufacturer.founded +"</td>"+
                          "</tr>");
      }
    });
  };

  function newCar(event){
    event.preventDefault();
    var url = $("#carform").attr("action");

    var formdata = {
      'name' : $('input[name=name]').val(),
      'consumption' : $('input[name=consumption]').val(),
      'color' : $('input[name=color]').val(),
      'manufacturer' : $('input[name=manufacturer]').val(),
      'year' : parseInt($('input[name=year]').val()),
      'available' : parseInt($('input[name=available]').val()),
      'horsepower' : parseInt($('input[name=horsepower]').val())
    }
	
    $.post( url, formdata, function( data ){}, "json")
		.fail(function(){alert("Error"); return false;})
		
    return false;
  };

  function addManufacturerCookie(name, value) {
    document.cookie = name + "=" + value + ";path=/manufacturer";
  };

  function getCarsOfManufacturer(event) {
    event.preventDefault();
    addManufacturerCookie("name" , $(".manufactureSelect option:selected").text());
    url = "/manufacturer";
    $.getJSON( url, function( data ) {
		console.log(data);
		if(data.length == 0){$("#carsTable").html("<h2>This manufacturer does not have any car<h2>");}else
		{
			$("#carsTable").html("<table><tr><th>Name</th>" +
							  "<th>Color</th>" +
							  "<th>Consumption</th>" +
							  "<th>Available</th>" +
							  "<th>Year</th>" +
							  "<th>Horsepower</th>" +
							  "</tr>");
		  for (var i = 0; i < data.length; i++) {
			  var car = data[i];
			  $("#carsTable table").append("<tr><td>"+ car.name +"</td>"+
							  "<td>"+ car.consumption +"</td>"+
							  "<td>"+ car.color +"</td>"+
							  "<td>"+ car.available +"</td>"+
							  "<td>"+ car.year +"</td>"+
							  "<td>"+ car.horsepower +"</td>"+
							  "</tr>");
		  }
		  $("#carsTable").append("</table>");
		}
    });
  };

  function newManufacturer(event){
    event.preventDefault();
    var url = $("#manufacturerform").attr("action");
    var formdata = {
      'name' : $('input[name=name]').val(),
      'country' : $('input[name=country]').val(),
      'founded' : $('input[name=founded]').val()
	};

	$.post( url, formdata, function( data ){}, "json")
		.fail(function(){alert("Error"); return false;})

	
    return false;
  };