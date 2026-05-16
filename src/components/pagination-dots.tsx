export default function PaginationDots() {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="h-[9px] w-[9px] rounded-full bg-black transition-all duration-500" />
      <div className="h-[6px] w-[6px] rounded-full bg-black/15 transition-all duration-500" />
      <div className="h-[6px] w-[6px] rounded-full bg-black/15 transition-all duration-500" />
      <div className="h-[6px] w-[6px] rounded-full bg-black/15 transition-all duration-500" />
    </div>
  );
}
