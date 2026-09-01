"use client";

export function WinkButtom({ name }: { name: string }) {
  return (
    <button onClick={() => alert(`Вы подмигнули ${name}!`)} className="ml-4">
      Подмигнуть
    </button>
  );
}
