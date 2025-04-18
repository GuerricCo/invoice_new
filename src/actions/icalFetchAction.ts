"use server";

export async function icalFetchAction(calendarUrl: string, start: string, end: string) {
  if (!calendarUrl) return null;

  const encodedUrl = encodeURIComponent(calendarUrl);
  const apiUrl = `https://ical.mathieutu.dev/json?from=${start}&to=${end}&summary=&sort=date-asc&grouped=on&url=${encodedUrl}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error("Fetch failed");

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("Réponse non-JSON:", text.slice(0, 200));
      throw new Error("Réponse inattendue, pas du JSON");
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.events)) {
      throw new Error("Les événements sont manquants ou mal formés.");
    }

    return data.events;
  } catch (err) {
    console.error("Erreur iCal:", err);
    return { error: "Impossible de récupérer les données iCal" };
  }
}
