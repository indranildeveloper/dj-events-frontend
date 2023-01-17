import { API_URL } from "@/config/index";

const login = async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiResponse = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiResponse.json();

    if (strapiResponse.ok) {
      // @todo: Set the cookie
      res.status(200).json({ user: data.user });
    } else {
      let errorMessage = [];
      if (data.error.details.errors) {
        data.error.details.errors.forEach((err) => {
          errorMessage.push(err.message);
        });
      } else {
        errorMessage.push(data.error.message);
      }

      res.status(data.error.status).json({ message: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed!`,
    });
  }
};

export default login;
