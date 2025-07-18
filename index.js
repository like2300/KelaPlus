
const video = document.getElementById("bg-video");

const startTime = 0;
const endTime = 2;

video.addEventListener("loadedmetadata", () => {
    video.currentTime = startTime;
    video.play(); // Assure le démarrage
});

video.addEventListener("timeupdate", () => {
    if (video.currentTime >= endTime - 0.05) {
        video.classList.add("fade-out");

        // Stoppe la vidéo pour éviter conflit de frames
        video.pause();

        setTimeout(() => {
            video.currentTime = startTime;

            // Enlève le fade et relance
            video.classList.remove("fade-out");
            video.classList.add("fade-in");

            video.play();
        }, 300); // Temps de fondu
    }
});

// En cas de redémarrage (facultatif)
video.addEventListener("ended", () => {
    video.currentTime = startTime;
    video.play();
}); 