import Image from "next/image";

const Showcase = () => {
  return (
    <div className="relative">
      <div className="h-72 relative overflow-hidden">
        <Image
          className="object-cover brightness-50"
          src="/images/showcase.jpg"
          alt="Showcase"
          fill
        />
      </div>
      <div className="absolute top-2/4 left-2/4 text-white -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome To The Party</h1>
        <h2 className="text-xl font-bold">Find the hottest DJ Events</h2>
      </div>
    </div>
  );
};

export default Showcase;
