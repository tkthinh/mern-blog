import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="xl:grid xl:grid-cols-12">
      <Feed />
      <Sidebar />
    </div>
  )
}