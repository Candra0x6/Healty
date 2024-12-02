import CharacterStats from "@/src/components/character/CharacterStats";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { headers } from "next/headers";
export default async function PlayfulCharacterPage() {
  const getCharacterBadge = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/character/badge`,
    {
      method: "GET",
      headers: await headers(),
    }
  ).then((res) => res.json());

  return (
    <>
      <DashboardNav title="Character" />

      <div className="max-w-6xl w-full overflow-hidden">
        <CharacterStats data={getCharacterBadge.data} />
      </div>
    </>
  );
}
