song="";
status="";
objects=[];

function preload()
{
    song=loadSound("baby.mp3");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting  Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
   if(error)
   {
       console.log(error);
   }
   console.log(results);
   objects=results;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status!="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill(r,g,b);
            perecent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person")
            {
                document.getElementById("number_of_objects").innerHTML="Baby found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby not found";
                console.log("play");
                song.play();
            }
        }
        if(objects.length==0)
        {
            document.getElementById("number_of_objects").innerHTML="Baby not found";
            console.log("play");
            song.play();
            
        }

            }
        }
 
