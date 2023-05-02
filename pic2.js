imgt="";
status="";
objectDetector="";
objects=[];

function preload() {
    imgt=loadImage('picture_2.jpg');

}
function setup() {
    canvas=createCanvas(500,430);
    canvas.position(410,230);
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model has loaded!!");
    status=true;
    objectDetector.detect(imgt,gotResult);
}
function draw() {
    image(imgt,0,0,500,430);
    if(status!= "") {
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_objects").innerHTML="Number of Objects Detected :"+objects.length;
            percent=floor(objects[i].confidence*100);
            fill("#FF0000");
            text(objects[i].label+" "+percent+"%",objects[i].x-80,objects[i].y+3);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x-90,objects[i].y-10,objects[i].width-50,objects[i].height-30);
        
        }
    }
}
function gotResult(error,results) {
    if(error) {
        console.error(error);
    }else{
        console.log(results);
        objects=results;
    }
    }
