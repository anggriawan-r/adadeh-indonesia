export default function page({ params }: { params: { cat: string } }) {
  return (
    <div className="mt-20 flex h-[calc(100vh-80px-44px)] items-center justify-center">
      {params.cat}
    </div>
  );
}
