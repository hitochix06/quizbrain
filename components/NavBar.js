import Image from "next/image";

export default function NavBar() {
  return (
    <div className="bg-base-100">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="logo"
            />
            <a className="  text-3xl ml-2 font-bold" href="/">
              Quiz
              <span className="text-blue-500 animate-pulse-slow">Brain</span>
            </a>
          </div>
          <div className="navbar-end justify-center">
            <a
              className="btn btn-ghost text-xl hover:bg-blue-500 hover:text-white"
              href="leaderboard"
            >
              Classement
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
