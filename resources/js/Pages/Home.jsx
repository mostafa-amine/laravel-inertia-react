
import { Head, usePage, Link } from "@inertiajs/react"
import { ExclamationTriangleIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import MainLayout from "../Layouts/MainLayout"


export default function Hello() {
    const { flash, posts } = usePage().props
    console.log(posts)

    return (
        <MainLayout>
            <Head title="Home Page" />
            <div className="container p-10">
                {flash.message && (
                    <div className="border-l-4 border-green-400 bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationTriangleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    {flash.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="container">
                <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
                    <div className="absolute inset-0">
                        <div className="h-1/3 sm:h-2/3" />
                    </div>
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Articles</h2>
                        </div>
                        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                            {posts.data.map((post) => (
                                <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={post.thumbnail} alt="" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                        <div className="flex-1">
                                            {/* <p className="text-sm font-medium text-indigo-600">
                                        <a href={post.category.href} className="hover:underline">
                                            {post.category.name}
                                        </a>
                                    </p> */}
                                            <Link href={"posts" + '/' + post.slug} className="mt-2 block">
                                                <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                                <p className="mt-3 text-base text-gray-500">{post.content.substring(0, 70)}</p>
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <a href="#">
                                                    <span className="sr-only">{post.user.name}</span>
                                                </a>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    <a href="#" className="hover:underline">
                                                        {post.user.name}
                                                    </a>
                                                </p>
                                                <div className="flex space-x-1 text-sm text-gray-500">
                                                    {/* <time dateTime={post.datetime}>{post.date}</time> */}
                                                    <span aria-hidden="true">&middot;</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                </div >
            </div>

            <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium">{' ' + posts.from + ' '}</span>
                        to
                        <span className="font-medium">{' ' + posts.to}</span> of{' '}
                        <span className="font-medium">{posts.total}</span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <Link
                        preserveScroll
                        href={posts.prev_page_url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                    <Link
                        preserveScroll
                        href={posts.next_page_url}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                </div>
            </nav>
        </MainLayout>
    )
}
