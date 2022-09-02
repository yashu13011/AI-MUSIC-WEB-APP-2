song1 = "";
song2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("DYNAMITE.mp4");
    song2 = loadSound("Make it right.mp4")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log('The model is loaded!!');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("The x of left wrist is " + leftWristX);
        console.log("The y of left wrist is " + leftWristY);
        console.log("The x of right wrist is " + rightWristX);
        console.log("The y of right wrist is " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}

function draw(){
    image(video ,0,0,600,500);

    fill("#fc0303");
    stroke("#fc0303");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name is Make It Right";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Song name is Dynamite";
        }
    }
}

function play(){
    song1.play();
    song2.play();
}