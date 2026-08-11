// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "This was a GET request" });
  } else if (req.method === "POST") {
    res.status(200).json({ received: req.body });
  }
}
