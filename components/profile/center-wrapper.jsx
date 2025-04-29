export default function CenterInfoWrapper({ children, isMobile }) {
  return (
    <div
      id="center-info-profile"
      className={`w-full sm:w-4/6 2xl:w-[56%] ${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col gap-2`}
    >
      {children}
    </div>
  );
}
