import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      console.log('Fetching scores...');
      try {
        const res = await fetch("/api/scores", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.statusText}`);
        }

        const result = await res.json();
        console.log('Scores fetched successfully:', result);
        setData(result.records);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError(error.message);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="grow flex flex-col gap-10 items-center mt-10 lg:mt-0 lg:justify-center max-w-screen-lg w-full m-auto px-4">
      <h1 className="lg:-mt-14 text-center">
        Voici la crème de la <span className="outlined">crème</span>
      </h1>
      {error ? (
        <p className="text-red-500">Erreur: {error}</p>
      ) : (
        <div className="overflow-x-auto w-full border-primary border-[3px] rounded-xl h-96">
          <table className="table table-pin-rows table-pin-cols">
            <thead className="border-b-[3px] border-primary text-primary text-lg">
              <tr>
                <th>Pseudo</th>
                <th>Score</th>
                <th>Catégorie</th>
                <th>Date</th> {/* Nouvelle colonne pour la date */}
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((player, i) => (
                  <tr
                    key={player.id}
                    className={`font-medium ${
                      i % 2 === 0 ? "bg-primary/10" : ""
                    }`}
                  >
                    <td>{player.fields.pseudo}</td>
                    <td>{player.fields.score}</td>
                    <td>{player.fields.category}</td>
                    <td>{new Date(player.fields.date).toLocaleDateString("en-GB")}</td> {/* Affiche la date */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Chargement...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
