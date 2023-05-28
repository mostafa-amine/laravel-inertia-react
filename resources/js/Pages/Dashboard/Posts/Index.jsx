import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import { PencilSquareIcon, CursorArrowRaysIcon } from '@heroicons/react/20/solid'
import DashboardLayout from "../../../Layouts/DashboardLayout";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Home() {
    const { posts, searchQuery } = usePage().props
    const { data, setData, get } = useForm({
        search: searchQuery
    })

    function searchHandleSubmit(e) {
        e.preventDefault()
        get(`/dashboard/posts`, { preserveState: true })
    }

    function handleDelete(id) {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dashboard/posts/${id}`)
            }
        })
    }

    return (
        <DashboardLayout>
            <Head title="Posts"></Head>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Posts</h1>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <Link
                                    href="/dashboard/posts/create"
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Create Post
                                </Link>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    {/* Search */}
                                    <form onSubmit={searchHandleSubmit} action="/" method="get">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Search Posts
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        value={data.search}
                                                        onChange={e => setData('search', e.target.value)}
                                                        type="text"
                                                        name="search"
                                                        id="search"
                                                        className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Search ..."
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                >
                                                    <CursorArrowRaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    <span>Search</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mt-2">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Id
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Title
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Content
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Author
                                                    </th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                        <span className="sr-only">Edit</span>
                                                        <span className="sr-only">Delete</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {posts.map((post) => (
                                                    <tr key={post.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {post.id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.title}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.content.substr(0, 40)}...</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.user.name}</td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <Link href={"/dashboard/posts/" + post.id + '/' + "edit"} className="text-indigo-600 hover:text-indigo-900">
                                                                Edit
                                                            </Link>
                                                            <button onClick={() => handleDelete(post.id)} href="#" className="ms-3 text-red-600 hover:text-red-900">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </DashboardLayout >
    )
}
