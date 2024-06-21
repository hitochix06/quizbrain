import { NextResponse } from "next/server";

// Récupération des variables d'environnement
const BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID;
const TABLE_NAME = "datascore";
const VIEW_NAME = "score";
const API_TOKEN = process.env.NEXT_AIRTABLE_TOKEN;

const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export async function GET() {
  console.log("Fetching data from Airtable...");
  try {
    const response = await fetch(`${BASE_URL}?view=${VIEW_NAME}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return NextResponse.json({ records: data.records });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  console.log("Réception de la demande POST pour enregistrer le score...");
  const { pseudo, score, category } = await req.json();

  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          pseudo,
          score,
          category,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API Airtable: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Score saved successfully:", data);
    return NextResponse.json({
      result: true,
      message: "Score bien enregistré",
      record: data,
    });
  } catch (error) {
    console.error("Score d’enregistrement d’erreur:", error);
    return NextResponse.json(
      { message: "erreur de serveur interne", error: error.message },
      { status: 500 }
    );
  }
}
