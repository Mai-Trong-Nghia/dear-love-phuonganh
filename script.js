const textList = [
  "Gửi đến emm ❤️",
  "Cảm ơn emm đã đến bên anhh 💖",
  "Quan tâm và chăm sóc anhh 💑",
  "Em là ebe đẹp nhứt 💕"
];

const colors = ["neon-red", "neon-green", "neon-blue", "neon-purple", "neon-yellow"];
const imageSources = ["images/Love1.jpg", "images/Love2.jpg", "images/Love3.jpg"];

// 👉 Số khe dọc bạn muốn chia (nhiều hơn = đỡ đè hơn, nhưng rải rộng quá có thể lặp)
const totalSlots = 10;

// 👉 Hàm tính vị trí left dựa trên slot
function getSlotLeft(slotIndex) {
  const slotWidth = 100 / totalSlots;
  const randomOffset = Math.random() * slotWidth; // tạo độ ngẫu nhiên trong khe
  return `${slotIndex * slotWidth + randomOffset}%`;
}

// 👉 Tạo chữ rơi vào các khe lẻ (1, 3, 5, 7, 9)
function createFallingText() {
  const text = document.createElement("p");
  text.classList.add("falling-text", colors[Math.floor(Math.random() * colors.length)]);
  text.innerText = textList[Math.floor(Math.random() * textList.length)];

  const oddSlots = Array.from({ length: totalSlots }, (_, i) => i).filter(i => i % 2 !== 0);
  const slotIndex = oddSlots[Math.floor(Math.random() * oddSlots.length)];
  text.style.left = getSlotLeft(slotIndex);

  document.body.appendChild(text);
  setTimeout(() => text.remove(), 7000);
}

// 👉 Tạo ảnh rơi vào các khe chẵn (0, 2, 4, 6, 8)
function createFallingImage() {
  const img = document.createElement("img");
  img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
  img.classList.add("gallery-image");

  const evenSlots = Array.from({ length: totalSlots }, (_, i) => i).filter(i => i % 2 === 0);
  const slotIndex = evenSlots[Math.floor(Math.random() * evenSlots.length)];
  img.style.left = getSlotLeft(slotIndex);
  img.style.animationDuration = `${4 + Math.random() * 4}s`;

  document.body.appendChild(img);
  setTimeout(() => img.remove(), 7000);
}

// 👉 Tạo liên tục chữ và ảnh rơi
setInterval(() => {
  for (let i = 0; i < 3; i++) createFallingText();
}, 300);

setInterval(() => {
  for (let i = 0; i < 3; i++) createFallingImage();
}, 350);

// 👉 Phát nhạc khi người dùng click
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  const playAudio = () => {
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(err => {
        console.log("Trình duyệt chặn autoplay:", err);
      });
    }
  };
  document.addEventListener('click', playAudio, { once: true });
});
