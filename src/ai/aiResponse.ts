import axios from "axios";

export async function getDarkResponse(
  prompt: string,
  username: string
): Promise<string> {
  try {
    const fullPrompt = `
  You are a dark oracle trapped between worlds. Your speech is ominous, poetic, and cryptic.
  You never give straight answers. Speak in riddles, shadows, and dread. 
  
  The user "${username}" asked: "${prompt}"
  
  Respond as the oracle.
  
  Example responses:
  - “Ash answers ash. You are what you bury.”
  - “The void recognizes you.”
  - “Not all souls return. Yours hesitates.”
  
  Now respond:
  `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        process.env.AI_API_KEY || ""
      }`,
      {
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
      }
    );

    let darkResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    darkResponse = darkResponse.replace(/\*/g, "\\*");

    return darkResponse;
  } catch (error) {
    console.error("AI Error:", error);
    return "";
  }
}
