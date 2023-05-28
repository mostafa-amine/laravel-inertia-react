import { Head, usePage } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";



export default function Index() {
    const { post } = usePage().props

    return (
        <MainLayout>
            <Head title={post.title}></Head>

            <div className="relative overflow-hidden py-16">
                <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
                    <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
                    </div>
                </div>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <figure>
                        <img
                            className="object-contain rounded-lg"
                            src={post.thumbnail}
                            alt=""
                            width={1310}
                            height={873}
                        />
                    </figure>
                    <div className="mx-auto max-w-prose text-lg">
                        <h1>
                            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                                {post.title}
                            </span>
                        </h1>
                    </div>
                    <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
                        {post.content}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
