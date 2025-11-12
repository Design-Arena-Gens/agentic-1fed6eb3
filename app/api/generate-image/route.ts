import { NextResponse } from "next/server";

const prompt = `Ultra-detailed cinematic fantasy illustration of a world-class Portuguese footballer wearing Loki-inspired green and gold Asgardian armor with a horned helmet, black leather accents, and a flowing green cape trimmed in gold. He is sprinting forward across a frozen Norse wasteland, pulling a massive silver-white Fenrir wolf with glowing ice-blue eyes, black claws, and frost radiating from its fur. Fenrir snarls with bared fangs while a thick, glowing green magical chain binds it. The environment shows jagged ice shards, Viking longships trapped in ice, swirling snow, and vibrant northern lights. Dramatic lighting, shallow depth of field, epic fantasy concept art, rendered in 8K on a tall 2:3 canvas.`;

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1024x1536",
        quality: "high",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: "Image generation failed.", details: error },
        { status: response.status },
      );
    }

    const data = await response.json();
    const choice = data?.data?.[0];
    const image = choice?.b64_json
      ? `data:image/png;base64,${choice.b64_json}`
      : choice?.url;

    if (!image) {
      return NextResponse.json(
        { error: "The image payload was empty." },
        { status: 502 },
      );
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unexpected error while generating the image." },
      { status: 500 },
    );
  }
}
