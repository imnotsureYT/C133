img = "";

status = "";
// result1 = "";
// result2 = "";

// results1X = 0;
// results1Y = 0;
// results1W = 0;
// results1H = 0;

// results2X = 0;
// results2Y = 0;
// results2W = 0;
// results2H = 0;

objects = [];

function preload()
{
    img = loadImage('living.png');
}

function setup()
{
    canvas = createCanvas(640,480);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw()
{
    image(img, 0, 0, 640, 480);
    // text(result1, results1X, results1Y);
    canvas.center();
    
    // rect(results1X, results1Y, results1W, results1H);

    if (status != "")
    {
        for (i=0; i<objects.length; i++)
        {
            percent = floor(objects[i].confidence*100);
            stroke('#FF0000');
            fill('#FF0000');
            noFill();
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded()
{
    console.log('Model Loaded');
    status = true;
    objectDetector.detect(img, gotResult);
}

function back()
{
    window.location = "index.html";
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else 
    {
        document.getElementById('num').innerHTML = "Currently detecting - "+results.length+" Objects";
        console.log(results);
        // result1 = results[0].label;
        // results1X = Math.round(results[0].x);
        // results1Y = Math.round(results[0].y);
        // results1W = Math.round(results[0].width);
        // results1H = Math.round(results[0].height);
        objects = results;
    }
}