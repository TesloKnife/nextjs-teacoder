import { CARS } from "@/app/page";
import { CloseButton } from "./CloseButton";

interface PhotoModalProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: PhotoModalProps) {
  const { id } = await params;
  const car = CARS.find((c) => c.id === id);
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 p-12 rounded-4xl border border-zinc-800 max-w-lg w-full shadow-2xl">
        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest block mb-2">
          Intercepted
        </span>
        <h2 className="text-white">{car.name}</h2>
        <p className="text-white">
          Этот контент перехвачен. Вы видите его в модалке но в адресной строке
          /photo/id
        </p>
        <CloseButton />
      </div>
    </div>
  );
}
