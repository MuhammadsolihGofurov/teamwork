import { MainHeader } from "./main";

export default function Header() {
  return (
    <header className="py-3 sm:py-5 fixed top-0 left-0 right-0 w-full z-[100] bg-white sm:border-0 border-b border-black border-opacity-10">
      <MainHeader />
    </header>
  );
}
