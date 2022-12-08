//The URIs of the REST endpoint
VUPS = "https://prod-01.northeurope.logic.azure.com:443/workflows/8c78def6c21f46e49e2c94d4fad5514a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Pj2D2e3mhsTuEm5_EEghqrftogZyTP9bOTnSbqaR_Lc";
RAIb00715616 = "https://prod-49.northeurope.logic.azure.com:443/workflows/6f9c46d16d8c4032b20b263be3898fe3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ejg7jh9HPnAEN-qwx5v_DQ1ORyEhwgjNpYbkw0bY0Ig";
DAIb00715616a = "https://prod-44.northeurope.logic.azure.com/workflows/c84fe526d14e447abdee05df118a5216/triggers/manual/paths/invoke/";
DAIb00715616b = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t9eCkQWKHJkhziXB8IldiNUuBKF2mqR1Qn0y1Wx_Ozg";
BLOB_ACCOUNT = "https://blobstorageb00715616.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewAsset();

  });

  $("#deleteImages").click(function () {

    //Run the get asset list function
    deleteAsset(id);

  });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {

  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data object
  submitData.append('videoID', $('#videoID').val());
  submitData.append('title', $('#Title').val());
  submitData.append('publisher', $('#Publisher').val());
  submitData.append('producer', $('#Producer').val());
  submitData.append('genre', $('#Genre').val());
  submitData.append('rating', $('#Rating').val());
  submitData.append('file', $("#UpFile")[0].files[0]);

  document.getElementById("newAssetForm").reset();


  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: VUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {

    }
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAIb00715616, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<video controls width='400'  src='" + BLOB_ACCOUNT + val["filePath"] + "'></video> <br />");
      items.push("VideoID : " + val["videoID"] + "<br />");
      items.push("Movie : " + val["title"] + "<br />");
      items.push("Publisher: " + val["publisher"] + "<br />");
      items.push("Producer: " + val["producer"] + "<br />");
      items.push("Genre: " + val["genre"] + "<br />");
      items.push("Rating: " + val["rating"] + "<br />");
      items.push("<hr />");
    });

    //Clear the assetlist div
    $("#ImageList").empty();

    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      class: "my-new-list",
      html: items.join(""),
    }).appendTo("#ImageList");
  });
}

function deleteAsset(id) {

  $.ajax({

    type: "DELETE",

    //Note the need to concatenate the
    url: DAIb00715616a + id + DAIb00715616b,

  }).done(function (msg) {
    //On success, update the assetlist.

    getImages();
  });
}
function productAddToTable() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#productTable tbody").length == 0) {
      $("#productTable").append("<tbody></tbody>");
  }

  // Append product to the table
  $("#productTable tbody").append(
      "<tr>" +
      "<td>" + $("#productname").val() + "</td>" +
      "<td>" + $("#introdate").val() + "</td>" +
      "<td>" + $("#url").val() + "</td>" +
      "<td>" +
      "<button type='button' onclick='productDelete(this);' class='btn btn-default'>" + "<span class='glyphicon glyphicon-remove' />" +
      "</button>" +
      "</td>" +
      "</tr>");
}

