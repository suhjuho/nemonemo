function formatTime(currentTime: number) {
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor(currentTime / 60) - hours * 60;
  const seconds = currentTime % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default formatTime;
