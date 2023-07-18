function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

function BufferImage({ bufferImage, className }) {
  let base64Flag = "data:image/jpeg;base64,";
  let imageStr = arrayBufferToBase64(bufferImage?.data);
  return (
    <img className={className} src={base64Flag + imageStr} alt="description" />
  );
}

export default BufferImage;
