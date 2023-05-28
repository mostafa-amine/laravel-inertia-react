import { Head, usePage } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";






export default function Index() {
    const { auth_user } = usePage().props
    return (
        <DashboardLayout>
            <Head title="Dashboard"></Head>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                    <h1>Welcome to dahboard <span className="font-bold">{auth_user}</span></h1>
                </div>
                {/* /End replace */}
            </div>
        </DashboardLayout>
    )
}
