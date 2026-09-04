async function getGithubProfile() {
  const res = await fetch("https://api.github.com/orgs/vercel", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch github profile");

  return res.json();
}

export default async function Home() {
  const data = await getGithubProfile();

  return (
    <main className="p-10 bg-black text-white min-h-screen">
      <h2>Профиль: {data.name}</h2>
      <p>Desc: {data.description}</p>
      <p>Public Repos: {data.public_repos}</p>
    </main>
  );
}
