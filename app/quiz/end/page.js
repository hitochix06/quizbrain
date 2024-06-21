"use client";
import { usePlayerStore } from "@/store/player";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { score, category } = usePlayerStore();
  const pseudoRef = useRef(null);
  const [sending, setSending] = useState(false);

  const saveScore = async () => {
    if (pseudoRef.current.value.length < 3) {
      alert("Il te faut un pseudo + long !");
      return;
    }
    setSending(true);
    const payload = {
      pseudo: pseudoRef.current.value,
      score,
      category,
    };
    console.log("Payload envoyé:", payload);
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Réponse de l'API:", data);
      if (data.result) {
        router.push("/");
      } else {
        alert("Une erreur est survenue lors de l'enregistrement du score");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    } finally {
      setSending(false);
    }
  };

  if (!category) {
    return router.push("/");
  }

  return (
    <div className="grow pt-24 flex flex-col items-center gap-14 px-4">
      <h1 className="text-center">
        Félicitations, votre score est de{" "}
        <span className="outlined">{score}/10</span>
      </h1>
      <label className="input input-bordered flex items-center gap-2 max-w-96 pe-0 border-primary border-2">
        <input
          required
          type="text"
          className="grow"
          placeholder="Pseudo"
          minLength="3"
          maxLength="20"
          ref={pseudoRef}
        />
        <span
          className={`btn btn-primary w-32 ${sending ? "btn-disabled" : ""}`}
          onClick={saveScore}
        >
          {sending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "M'enregistrer"
          )}
        </span>
      </label>
      <img
        className="mix-blend-multiply max-h-[400px]"
        src="/illustrations/end.png"
        alt="end illustration"
      />
    </div>
  );
}
