import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VideoGif from "@/public/work-is-almost-over-happy.gif"
import { CalendarCheck2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const OnboardingrouteTwo = () => {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are almost done!</CardTitle>
                    <CardDescription>We have to now connect yuor calendar to your account.</CardDescription>
                    <Image src={VideoGif} alt="Almost finished gif" className="w-full rounded-lg" />
                </CardHeader>
                <CardContent>
                    <Button className="w-full" asChild>
                        <Link href="/api/auth">
                            <CalendarCheck2 className="size-4 mr-2" />
                            Connect Calendar to your Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default OnboardingrouteTwo