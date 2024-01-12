import logo from "../assets/images/logo.png"

export default function Spinner() {
  return (
    <div className="flex h-20 w-20 border-8 border-x-orange-300 border-y-orange-400 border-solid rounded-full items-center justify-center animate-spinning mx-auto">
      <img src={logo} alt="logo" className="w-12" />
    </div>
  )
}
