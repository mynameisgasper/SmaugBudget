$(document).ready(function() {
    //fix "," at the start of connections
    var selector = document.getElementsByClassName("fixFirst");
    for (var i in selector) {
        if (selector[i].innerText) {
            selector[i].innerText = selector[i].innerText.substring(2);
        }
    }

    $("#addPfp").change(function(){
        readURL(this);
    });
});

function updateUserInfo() {
    var forms = document.forms["userInfo"];
    console.log(forms);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-pic').attr('style', "background-image: url('" + e.target.result + "')").fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}