

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Safari", filePath: "songs/1.mp3", coverPath: "cover/1.jpg",duration:"3:07"},
    {songName: "Lean On", filePath: "songs/2.mp3", coverPath: "cover/2.jpg",duration:"2:56"},
    {songName: "Love Me Like You Do", filePath: "songs/3.mp3", coverPath: "cover/3.webp",duration:"4:13"},
    {songName: "Wolves", filePath: "songs/4.mp3", coverPath: "cover/4.jpg",duration:"3:17"},
    {songName: "Ignite - Alan Walker", filePath: "songs/5.mp3", coverPath: "cover/5.jpg",duration:"3:43"},
    {songName: "Itna-Tumhe-Chahna-Hai", filePath: "songs/6.mp3", coverPath: "cover/6.jpg",duration:"2:27"},
    {songName: "Tum-Mere-Ho", filePath: "songs/7.mp3", coverPath: "cover/7.jpg",duration:"3:12"},
    {songName: "Tumse Bhi Zyada", filePath: "songs/8.mp3", coverPath: "cover/8.jpg",duration:"5:19"},
    {songName: "Ek Nazar Me Bhi", filePath: "songs/9.mp3", coverPath: "cover/9.jpg",duration:"4:40"},
    {songName: "Yeh Raaten Yeh Mausam", filePath: "songs/10.mp3", coverPath: "cover/10.jpg",duration:"3:39"},
    {songName: "Dooriyan", filePath: "songs/11.mp3", coverPath: "cover/11.jpg",duration:"3:35"},
    {songName: "Dil Ibaadat", filePath: "songs/12.mp3", coverPath: "cover/12.jpg",duration:"5:29"},
    {songName: "O Re Piya", filePath: "songs/13.mp3", coverPath: "cover/13.jpg",duration:"6:19"},
    {songName: "Shri-Ram-Janki", filePath: "songs/14.mp3", coverPath: "cover/14.jpg",duration:"8:32"},
    {songName: "Dulhe Ka Shehra", filePath: "songs/15.mp3", coverPath: "cover/15.jpg",duration:"8:32"},
    {songName: "Let-Me-Down-Slowly", filePath: "songs/16.mp3", coverPath: "cover/16.jpg",duration:"2:49"},
    {songName: "Perfect-Ed-Sheeran", filePath: "songs/17.mp3", coverPath: "cover/17.jpg",duration:"4:23"},
    {songName: "Bandeya", filePath: "songs/18.mp3", coverPath: "cover/18.jpg",duration:"3:04"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.add('fa-play-circle');
            element.classList.remove('fa-pause-circle');
        })
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if (e.target.id==songIndex&&(!audioElement.paused)) {
            audioElement.pause();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle'); 
        }
       else{ 
        if(e.target.id==songIndex&&audioElement.paused) {makeAllPlays();
           
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
           
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
           
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');             
        }
        
        else{makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');}}
    })
   
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=17){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
   
     
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
    
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
})


setInterval(() => {
if (audioElement.currentTime==audioElement.duration) {
    
    if(songIndex>=17){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
      
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
    
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle')
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle')
    
   
}}, 1000);
setInterval(() => {
     let timer=document.getElementById('timer');
    if ( parseInt((audioElement.duration-audioElement.currentTime)%60)<10) {
        timer.innerText=`${ parseInt((audioElement.duration-audioElement.currentTime)/60)}:0${ parseInt((audioElement.duration-audioElement.currentTime)%60)}`
    } else {
        timer.innerText=`${ parseInt((audioElement.duration-audioElement.currentTime)/60)}:${ parseInt((audioElement.duration-audioElement.currentTime)%60)}`
    }
   
}, 1000);
