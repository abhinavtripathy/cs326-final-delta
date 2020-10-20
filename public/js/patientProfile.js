document.addEventListener("DOMContentLoaded", function() {
    let readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById("avatar").src = e.target.result;
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    let anchors = document.getElementById("file-upload");
    anchors.addEventListener("change", function () {
        readURL(this);
    });
});