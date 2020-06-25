var nasaImages=$("#nasa-Images");
var input = $("form input");
var next=$("#next");
var prev=$("#prev")
var page=1;

((function() {
    prev.attr("disabled","true");
    next.attr("disabled","true");
    }
))();

function updateButtons(photos){
    console.log(photos.length);
    if(page === 1){
        prev.attr("disabled","true");
        next.removeAttr("disabled");
    } else if(photos.length === 0){
        next.attr("disabled","true");
        prev.removeAtrr("disabled");
        --page;
    }else{
        prev.removeAttr("disabled");
        next.removeAttr("disabled");
    }
}

function showPage(page){
    let sol=input.val();
    if(sol=== ""){
        alert("please fill the field");
        return;
    }

    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&page=" + page + "&api_key=hx8FPMQzWpjcPe55bsIWMI4yECj647umuOck9mTT";
    
    $.get(url, function(data){
        let photos =data.photos;
        updateButtons(photos);

        if(photos.length === 0){
            alert("No more images to show");
        } else {
            $("#nasa-Images img").remove();
            for(let photo of photos){
                nasaImages.append('<img src="'+ photo.img_src+'" alt="'+ photo.id +'" >');

            }
        }
    });
}

$("form button").click(function(e){
    e.preventDefault();
    page=1;
    showPage(page);
});

prev.click(function(e){
    showPage(--page);

});

next.click(function(e){
    showPage(++page);
});

