import cookie from "cookie";

const logout = async (req, res) => {
  if (req.method === "POST") {
    // Destroy the http only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed!`,
    });
  }
};

export default logout;
