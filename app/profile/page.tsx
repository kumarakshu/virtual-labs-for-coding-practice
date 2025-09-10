import { ProfilePage } from "@/components/profile-page"
import { Header } from "@/components/header"

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProfilePage />
      </main>
    </div>
  )
}
