import logo from "../assets/logo-cloud-branca.png";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2 w-full bg-zinc-900 justify-center">
      {/* <h1 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-3xl dark:text-white">
        CLOUD DESIGN
      </h1> */}
      <img src={logo} alt="logo cloud design" className="h-18 w-96 my-2" />
    </div>
  );
}
