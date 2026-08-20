function chunkText(text, chunkSize = 500, overlap = 100) {

  let result = [];
  let start = 0;

  while (start < text.length) {
    const piece = text.slice(start, start + chunkSize);
    result.push(piece);
    start += chunkSize - overlap;
  }

  return result;
};

export default chunkText;

console.log(chunkText("This is a test sentence for chunking. ".repeat(20), 100, 20));