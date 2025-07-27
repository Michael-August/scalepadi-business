import BusinessSetUp from "@/components/Business-setup"
import { Suspense } from "react"

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BusinessSetUp />
        </Suspense>
    )
}

export default Page
