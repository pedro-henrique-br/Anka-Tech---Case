import { Card, CardContent } from '@/components/ui/card'
import { RegisterForm } from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block md:w-1/2">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #161616 15%, #FA4515 75%, #fc8d6f 100%)" }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/background/imagem.png"
          alt="Imagem decorativa AnkaTech"
          className="absolute top-0 left-0 w-[60%] h-auto scale-x-[-1] opacity-50 -translate-x-15 -translate-y-38"
        />

      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 mb-56">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardContent className="p-0">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
